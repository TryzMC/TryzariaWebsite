/* =========================================================
   TRYZARIA — Boutique (catalogue dynamique + paiement)
   - Charge les produits actifs depuis Supabase (lecture seule, clé anon).
   - Cartes pro : icône, badge, prix, description, avantages.
   - Gère pseudo, code promo (aperçu prix), départ paiement Stripe/PayPal.
   - Bilingue FR/EN, responsive, suit le toggle de langue.
   ⚠️ Aucune décision de prix ici : le serveur recalcule TOUJOURS au paiement.
   ========================================================= */
(function () {
  "use strict";

  var cfg = window.TRYZARIA_SHOP || {};

  /* Couleur d'accent par produit (sinon or par défaut). */
  var ACCENT = {
    rank_bronze: "#cd7f32", rank_silver: "#cfd4da", rank_gold: "#f6c94a",
    rank_platine: "#7fe0ef", rank_master: "#ff7eb6", pack_launch: "#f6c94a",
  };

  var L = {
    fr: {
      eyebrow: "Boutique en jeu", h1: "Soutiens Tryzaria",
      lead: "Débloque ton grade, tes clés et tes avantages exclusifs — livrés automatiquement en jeu, en quelques secondes.",
      tiers_note: "Chaque grade inclut automatiquement tous les avantages des grades précédents — du plus simple au plus complet.",
      pseudo_label: "Ton pseudo Minecraft (celui en jeu)", pseudo_ph: "Pseudo exact",
      coupon_label: "Code promo (optionnel)", coupon_ph: "Ex : LAUNCH10", coupon_apply: "Appliquer",
      coupon_ok: "Code appliqué ✓", coupon_bad: "Code invalide ou expiré",
      buy_card: "💳 Carte", buy_paypal: "PayPal", view_offer: "Voir l'offre",
      loading: "Chargement de la boutique…", empty: "Aucun article disponible pour l'instant.",
      load_err: "Impossible de charger la boutique. Réessaie plus tard.",
      err_pseudo: "Entre d'abord ton pseudo Minecraft (lettres, chiffres, _ ou .).",
      err_generic: "Erreur, réessaie dans un instant.", err_rate: "Trop de tentatives, patiente une minute.",
      err_price_low: "Réduction trop forte pour ce produit.",
      err_shop_closed: "La boutique est temporairement fermée. Reviens vite !",
      secure: "🔒 Paiement sécurisé via Stripe & PayPal. Aucune donnée bancaire ne passe par Tryzaria.",
      delivery: "Hors-ligne au moment de l'achat ? Livraison automatique à ta prochaine connexion.",
      trust_secure: "Paiement 100% sécurisé", trust_instant: "Livraison automatique instantanée",
      trust_nocommission: "100% reversé au serveur", trust_support: "Support Discord réactif",
    },
    en: {
      eyebrow: "In-game shop", h1: "Support Tryzaria",
      lead: "Unlock your rank, keys and exclusive perks — delivered automatically in-game, in seconds.",
      tiers_note: "Every rank automatically includes all perks from the ranks below it — from starter to full loadout.",
      pseudo_label: "Your Minecraft username (in-game)", pseudo_ph: "Exact username",
      coupon_label: "Promo code (optional)", coupon_ph: "e.g. LAUNCH10", coupon_apply: "Apply",
      coupon_ok: "Code applied ✓", coupon_bad: "Invalid or expired code",
      buy_card: "💳 Card", buy_paypal: "PayPal", view_offer: "View offer",
      loading: "Loading shop…", empty: "No item available right now.",
      load_err: "Couldn't load the shop. Try again later.",
      err_pseudo: "Enter your Minecraft username first (letters, digits, _ or .).",
      err_generic: "Error, please try again shortly.", err_rate: "Too many attempts, wait a minute.",
      err_price_low: "Discount too large for this product.",
      err_shop_closed: "The shop is temporarily closed. Come back soon!",
      secure: "🔒 Secure payment via Stripe & PayPal. No card data ever passes through Tryzaria.",
      delivery: "Offline when buying? Automatic delivery on your next login.",
      trust_secure: "100% secure payment", trust_instant: "Instant automatic delivery",
      trust_nocommission: "100% goes to the server", trust_support: "Responsive Discord support",
    },
  };

  var PSEUDO_RE = /^[A-Za-z0-9_.]{1,24}$/;
  var products = [];
  var byId = {};
  var currentProduct = null;
  var activeCoupon = null; // { code, discount_type, discount_value }

  function lang() { try { return localStorage.getItem("tryz_lang") === "en" ? "en" : "fr"; } catch (e) { return "fr"; } }
  function t(k) { return (L[lang()] || L.fr)[k]; }
  function euros(c) { return (c / 100).toLocaleString(lang() === "fr" ? "fr-FR" : "en-US", { style: "currency", currency: "EUR" }); }

  function finalCents(price) {
    if (!activeCoupon) return price;
    var d = activeCoupon.discount_type === "percent"
      ? Math.round(price * activeCoupon.discount_value / 100)
      : Math.round(activeCoupon.discount_value);
    var f = price - d;
    return f < 0 ? 0 : f;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function toast(msg) {
    var el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove("show"); }, 2800);
  }

  function mapError(code) {
    switch (code) {
      case "rate_limited": return t("err_rate");
      case "price_too_low": return t("err_price_low");
      case "invalid_pseudo": return t("err_pseudo");
      case "shop_closed": return t("err_shop_closed");
      case "coupon_not_found": case "coupon_inactive":
      case "coupon_expired": case "coupon_used_up": return t("coupon_bad");
      default: return t("err_generic");
    }
  }

  var $ = function (id) { return document.getElementById(id); };

  function renderLabels() {
    $("shop-eyebrow").textContent = t("eyebrow");
    $("shop-h1").textContent = t("h1");
    $("shop-lead").textContent = t("lead");
    $("shop-tiers-note").textContent = t("tiers_note");
    $("shop-pseudo-label").textContent = t("pseudo_label");
    $("shop-pseudo").placeholder = t("pseudo_ph");
    $("shop-coupon-label").textContent = t("coupon_label");
    $("shop-coupon").placeholder = t("coupon_ph");
    $("shop-coupon-apply").textContent = t("coupon_apply");
    $("shop-secure").textContent = t("secure");
    $("shop-delivery").textContent = t("delivery");
    if ($("trust-secure")) {
      $("trust-secure").textContent = t("trust_secure");
      $("trust-instant").textContent = t("trust_instant");
      $("trust-nocommission").textContent = t("trust_nocommission");
      $("trust-support").textContent = t("trust_support");
    }
  }

  // Emblème texte stylisé pour les grades (DA Tryzaria, net, pas de PNG flou).
  var TIERS = {
    rank_bronze: { w: "BRONZE", n: 1 }, rank_silver: { w: "SILVER", n: 2 },
    rank_gold: { w: "GOLD", n: 3 }, rank_platine: { w: "PLATINE", n: 4 },
    rank_master: { w: "MASTER", n: 5 },
  };
  function buildIcon(p) {
    var tier = TIERS[p.id];
    if (tier) {
      var stars = "";
      for (var s = 0; s < 5; s++) stars += s < tier.n ? "★" : "☆";
      return '<div class="rank-emblem">' +
        '<span class="rank-emblem__crown">♛</span>' +
        '<span class="rank-emblem__word">' + tier.w + "</span>" +
        '<span class="rank-emblem__pips">' + stars + "</span></div>";
    }
    if (p.id === "pack_launch") {
      return '<div class="pack-hero">' +
        '<span class="pack-hero__title">♛ MASTER ♛</span>' +
        buildCluster(["bosscrate.png", "boss.png", "coinetmoney.png"]) +
        "</div>";
    }
    if (Array.isArray(p.icons) && p.icons.length) return buildCluster(p.icons);
    return p.icon ? '<img class="scard__icon" src="assets/img/shop/' + escapeHtml(p.icon) + '" alt="" loading="lazy" />' : "";
  }

  // Cluster de PNG "collés" (chevauchement en éventail). La taille se réduit
  // automatiquement quand il y a beaucoup d'images, pour rester dans la carte.
  function buildCluster(icons) {
    var n = icons.length, sz, ov;
    if (n <= 3) { sz = 60; ov = 12; }
    else if (n <= 6) { sz = 50; ov = 14; }
    else if (n <= 8) { sz = 44; ov = 14; }
    else { sz = 38; ov = 12; }
    var h = '<div class="scard__icons">';
    for (var k = 0; k < n; k++) {
      // Les clés (pas les caisses) passent au-dessus → z-index plus élevé.
      var z = icons[k].indexOf("crate") >= 0 ? 1 : 3;
      h += '<img style="position:relative;z-index:' + z + ";width:" + sz + "px;height:" + sz + "px;margin:0 -" + ov + 'px" ' +
        'src="assets/img/shop/' + escapeHtml(icons[k]) + '" alt="" loading="lazy" />';
    }
    return h + "</div>";
  }
  function buildPrice(p) {
    var base = p.price_cents, fin = finalCents(base);
    return activeCoupon && fin !== base ? "<s>" + euros(base) + "</s> " + euros(fin) : euros(base);
  }
  function nameOf(p) { return escapeHtml(lang() === "en" ? p.name_en : p.name_fr); }
  function descOf(p) { return escapeHtml(lang() === "en" ? p.description_en : p.description_fr); }
  function badgeOf(p) { return lang() === "en" ? p.badge_en : p.badge_fr; }
  function accentOf(p) { return ACCENT[p.id] || "#f6c94a"; }
  function featuresHtml(list, cls) {
    if (!Array.isArray(list) || !list.length) return "";
    var h = '<ul class="' + cls + '">';
    for (var i = 0; i < list.length; i++) h += "<li>" + escapeHtml(list[i]) + "</li>";
    return h + "</ul>";
  }
  // La modale affiche la liste complète (features_full) quand elle existe ;
  // sinon retombe sur la liste courte (features) affichée sur la carte.
  function fullFeaturesOf(p) {
    return Array.isArray(p.features_full) && p.features_full.length ? p.features_full : p.features;
  }

  function cardHtml(p) {
    var badge = badgeOf(p);
    var badgeHtml = badge ? '<span class="scard__badge">' + escapeHtml(badge) + "</span>" : "";
    var cta = '<div class="scard__buy"><button class="sbtn sbtn--card scard__cta" data-open="' + escapeHtml(p.id) + '">' + t("view_offer") + "</button></div>";
    var open = ' data-open="' + escapeHtml(p.id) + '"';
    if (p.featured) {
      return '<article class="scard scard--featured" style="--accent:' + accentOf(p) + '"' + open + ">" +
        badgeHtml + buildIcon(p) +
        '<div class="scard--featured__body">' +
        '<div class="scard__name">' + nameOf(p) + "</div>" +
        '<div class="scard__price">' + buildPrice(p) + "</div>" +
        '<p class="scard__desc">' + descOf(p) + "</p>" + featuresHtml(p.features, "scard__features") +
        "</div>" + cta + "</article>";
    }
    return '<article class="scard" style="--accent:' + accentOf(p) + '"' + open + ">" +
      badgeHtml + buildIcon(p) +
      '<div class="scard__name">' + nameOf(p) + "</div>" +
      '<div class="scard__price">' + buildPrice(p) + "</div>" +
      '<p class="scard__desc">' + descOf(p) + "</p>" + featuresHtml(p.features, "scard__features") + cta +
      "</article>";
  }

  function renderCatalog() {
    var box = $("shop-catalog");
    if (!products.length) { box.innerHTML = '<p class="shop-loading">' + t("empty") + "</p>"; return; }
    var html = "";
    byId = {};
    for (var i = 0; i < products.length; i++) { html += cardHtml(products[i]); byId[products[i].id] = products[i]; }
    box.innerHTML = html;
    // Si la modal est ouverte (changement de langue), rafraîchis son contenu.
    if (currentProduct && byId[currentProduct.id] && !$("shop-modal").hidden) {
      fillModal(byId[currentProduct.id]);
    }
  }

  /* ===== Modal d'offre ===== */
  function fillModal(p) {
    currentProduct = p;
    $("modal-card").style.setProperty("--accent", accentOf(p));
    var badge = badgeOf(p);
    $("modal-content").innerHTML =
      (badge ? '<span class="modal__badge">' + escapeHtml(badge) + "</span>" : "") +
      buildIcon(p) +
      '<h2 class="modal__name" id="modal-name">' + nameOf(p) + "</h2>" +
      '<div class="modal__price">' + buildPrice(p) + "</div>" +
      '<p class="modal__desc">' + descOf(p) + "</p>" +
      featuresHtml(fullFeaturesOf(p), "modal__features") +
      '<div class="modal__pseudo shop-field">' +
        '<label for="modal-pseudo">' + t("pseudo_label") + "</label>" +
        '<input id="modal-pseudo" type="text" maxlength="24" autocomplete="off" spellcheck="false" placeholder="' + t("pseudo_ph") + '" />' +
      "</div>" +
      '<div class="modal__buy">' +
        '<button class="sbtn sbtn--card" data-mbuy="stripe">' + t("buy_card") + "</button>" +
        '<button class="sbtn sbtn--paypal" data-mbuy="paypal">' + t("buy_paypal") + "</button>" +
      "</div>" +
      '<span class="modal__secure">' + t("secure") + "</span>";

    var mp = $("modal-pseudo");
    mp.value = $("shop-pseudo").value.trim();
    mp.addEventListener("input", function () { this.classList.remove("is-error"); });
    $("modal-content").querySelectorAll("[data-mbuy]").forEach(function (btn) {
      btn.addEventListener("click", function () { buy(btn.getAttribute("data-mbuy"), p.id, mp); });
    });
  }

  function openModal(p) {
    fillModal(p);
    var m = $("shop-modal");
    m.hidden = false; m.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var mp = $("modal-pseudo"); if (mp && !mp.value) mp.focus();
  }

  function closeModal() {
    var m = $("shop-modal");
    m.hidden = true; m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    currentProduct = null;
  }

  function loadProducts() {
    var cols = "id,name_fr,name_en,price_cents,description_fr,description_en,features,features_full,icon,icons,featured,badge_fr,badge_en,sort_order";
    var url = cfg.SUPABASE_URL + "/rest/v1/products?select=" + cols + "&active=eq.true&order=sort_order.asc";
    return fetch(url, { headers: { apikey: cfg.SUPABASE_ANON_KEY, Authorization: "Bearer " + cfg.SUPABASE_ANON_KEY } })
      .then(function (r) { if (!r.ok) throw new Error("products " + r.status); return r.json(); });
  }

  function applyCoupon() {
    var code = $("shop-coupon").value.trim();
    var msg = $("shop-coupon-msg");
    if (!code) { activeCoupon = null; msg.textContent = ""; renderCatalog(); return; }
    if (!products.length) return;
    fetch(cfg.BACKEND_URL + "/api/check-coupon", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: products[0].id, coupon_code: code }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.valid) {
          activeCoupon = { code: code.toUpperCase(), discount_type: data.discount_type, discount_value: data.discount_value };
          msg.textContent = t("coupon_ok"); msg.style.color = "var(--gold)";
        } else {
          activeCoupon = null; msg.textContent = t("coupon_bad"); msg.style.color = "var(--sakura)";
        }
        renderCatalog();
      })
      .catch(function () { activeCoupon = null; msg.textContent = t("err_generic"); renderCatalog(); });
  }

  function buy(provider, productId, inputEl) {
    var input = inputEl || $("shop-pseudo");
    var pseudo = input.value.trim();
    if (!PSEUDO_RE.test(pseudo)) {
      input.classList.add("is-error");
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      toast(t("err_pseudo"));
      return;
    }
    $("shop-pseudo").value = pseudo; // garde le champ principal synchronisé
    var body = { pseudo: pseudo, product_id: productId, provider: provider };
    if (activeCoupon) body.coupon_code = activeCoupon.code;
    fetch(cfg.BACKEND_URL + "/api/create-checkout", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d && res.d.url) { window.location.href = res.d.url; return; }
        toast(mapError(res.d && res.d.error));
      })
      .catch(function () { toast(t("err_generic")); });
  }

  function renderAll() { renderLabels(); renderCatalog(); }

  function init() {
    if (!$("shop-catalog")) return;
    renderLabels();
    $("shop-coupon-apply").addEventListener("click", applyCoupon);
    $("shop-coupon").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } });
    $("shop-pseudo").addEventListener("input", function () { this.classList.remove("is-error"); });

    // Clic sur une carte (ou son bouton "Voir l'offre") → ouvre la modal.
    $("shop-catalog").addEventListener("click", function (e) {
      var el = e.target.closest("[data-open]");
      if (el) { var p = byId[el.getAttribute("data-open")]; if (p) openModal(p); }
    });
    // Fermeture modal : ✕, clic sur le fond, ou touche Échap.
    $("shop-modal").addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !$("shop-modal").hidden) closeModal();
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(renderAll, 0); });
    });

    loadProducts()
      .then(function (list) { products = list || []; renderCatalog(); })
      .catch(function () { $("shop-catalog").innerHTML = '<p class="shop-loading">' + t("load_err") + "</p>"; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
