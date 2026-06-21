/* =========================================================
   TRYZARIA — Boutique (catalogue dynamique + paiement)
   ---------------------------------------------------------
   - Charge les produits actifs depuis Supabase (lecture seule, clé anon).
   - Gère le pseudo, le code promo (aperçu prix), et le départ du paiement
     (Stripe / PayPal) via le backend Vercel.
   - Bilingue FR/EN : suit la langue choisie (localStorage tryz_lang) et se
     re-rend quand l'utilisateur change de langue.
   ⚠️ Aucune décision de prix ici : le serveur recalcule TOUJOURS au paiement.
   ========================================================= */
(function () {
  "use strict";

  var cfg = window.TRYZARIA_SHOP || {};

  /* ----- Textes bilingues (UI boutique) ----- */
  var L = {
    fr: {
      eyebrow: "Boutique en jeu",
      h1: "Soutiens Tryzaria",
      lead: "Choisis ton pseudo, ton article, paie — et reçois ta récompense en jeu automatiquement.",
      pseudo_label: "Ton pseudo Minecraft (celui en jeu)",
      pseudo_ph: "Pseudo exact",
      coupon_label: "Code promo (optionnel)",
      coupon_ph: "Ex : LAUNCH10",
      coupon_apply: "Appliquer",
      coupon_ok: "Code appliqué ✓",
      coupon_bad: "Code invalide ou expiré",
      buy_card: "💳 Carte",
      buy_paypal: "PayPal",
      loading: "Chargement de la boutique…",
      empty: "Aucun article disponible pour l'instant.",
      load_err: "Impossible de charger la boutique. Réessaie plus tard.",
      err_pseudo: "Entre un pseudo valide (lettres, chiffres, _ ou .).",
      err_generic: "Erreur, réessaie dans un instant.",
      err_rate: "Trop de tentatives, patiente une minute.",
      err_price_low: "Réduction trop forte pour ce produit.",
      secure: "🔒 Paiement sécurisé via Stripe & PayPal. Aucune donnée bancaire ne passe par Tryzaria.",
      delivery: "Hors-ligne au moment de l'achat ? Livraison automatique à ta prochaine connexion.",
    },
    en: {
      eyebrow: "In-game shop",
      h1: "Support Tryzaria",
      lead: "Pick your username, your item, pay — and get your reward in-game automatically.",
      pseudo_label: "Your Minecraft username (in-game)",
      pseudo_ph: "Exact username",
      coupon_label: "Promo code (optional)",
      coupon_ph: "e.g. LAUNCH10",
      coupon_apply: "Apply",
      coupon_ok: "Code applied ✓",
      coupon_bad: "Invalid or expired code",
      buy_card: "💳 Card",
      buy_paypal: "PayPal",
      loading: "Loading shop…",
      empty: "No item available right now.",
      load_err: "Couldn't load the shop. Try again later.",
      err_pseudo: "Enter a valid username (letters, digits, _ or .).",
      err_generic: "Error, please try again shortly.",
      err_rate: "Too many attempts, wait a minute.",
      err_price_low: "Discount too large for this product.",
      secure: "🔒 Secure payment via Stripe & PayPal. No card data ever passes through Tryzaria.",
      delivery: "Offline when buying? Automatic delivery on your next login.",
    },
  };

  var PSEUDO_RE = /^[A-Za-z0-9_.]{1,24}$/;

  var products = [];
  var activeCoupon = null; // { code, discount_type, discount_value }

  function lang() {
    try {
      var s = localStorage.getItem("tryz_lang");
      return s === "en" ? "en" : "fr";
    } catch (e) { return "fr"; }
  }
  function t(key) { return (L[lang()] || L.fr)[key]; }

  function euros(cents) {
    return (cents / 100).toLocaleString(lang() === "fr" ? "fr-FR" : "en-US", {
      style: "currency", currency: "EUR",
    });
  }

  /* Recalcul d'AFFICHAGE (le vrai recalcul reste côté serveur). */
  function finalCents(price) {
    if (!activeCoupon) return price;
    var d = activeCoupon.discount_type === "percent"
      ? Math.round(price * activeCoupon.discount_value / 100)
      : Math.round(activeCoupon.discount_value);
    var f = price - d;
    return f < 0 ? 0 : f;
  }

  /* ----- Toast minimal (réutilise le style .toast du site) ----- */
  function toast(msg) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function mapError(code) {
    switch (code) {
      case "rate_limited": return t("err_rate");
      case "price_too_low": return t("err_price_low");
      case "invalid_pseudo": return t("err_pseudo");
      case "coupon_not_found":
      case "coupon_inactive":
      case "coupon_expired":
      case "coupon_used_up": return t("coupon_bad");
      default: return t("err_generic");
    }
  }

  /* ----- DOM refs ----- */
  var $ = function (id) { return document.getElementById(id); };

  /* ----- Rendu des libellés statiques (re-appelé au changement de langue) ----- */
  function renderLabels() {
    $("shop-eyebrow").textContent = t("eyebrow");
    $("shop-h1").textContent = t("h1");
    $("shop-lead").textContent = t("lead");
    $("shop-pseudo-label").textContent = t("pseudo_label");
    $("shop-pseudo").placeholder = t("pseudo_ph");
    $("shop-coupon-label").textContent = t("coupon_label");
    $("shop-coupon").placeholder = t("coupon_ph");
    $("shop-coupon-apply").textContent = t("coupon_apply");
    $("shop-secure").textContent = t("secure");
    $("shop-delivery").textContent = t("delivery");
  }

  /* ----- Rendu du catalogue ----- */
  function renderCatalog() {
    var box = $("shop-catalog");
    if (!products.length) {
      box.innerHTML = '<p class="lead center">' + t("empty") + "</p>";
      return;
    }
    var html = "";
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var name = lang() === "en" ? p.name_en : p.name_fr;
      var base = p.price_cents;
      var fin = finalCents(base);
      var priceHtml = activeCoupon && fin !== base
        ? '<span class="rank__price"><s style="opacity:.5;font-size:.7em">' + euros(base) +
          "</s> " + euros(fin) + "</span>"
        : '<span class="rank__price">' + euros(base) + "</span>";

      html +=
        '<article class="rank reveal is-revealed">' +
        '<div class="rank__name">' + escapeHtml(name) + "</div>" +
        priceHtml +
        '<div class="shop-buy">' +
        '<button class="btn btn-gold btn-sm" data-buy="stripe" data-id="' + escapeHtml(p.id) + '">' + t("buy_card") + "</button>" +
        '<button class="btn btn-ghost btn-sm" data-buy="paypal" data-id="' + escapeHtml(p.id) + '">' + t("buy_paypal") + "</button>" +
        "</div>" +
        "</article>";
    }
    box.innerHTML = html;
    box.querySelectorAll("[data-buy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        buy(btn.getAttribute("data-buy"), btn.getAttribute("data-id"));
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ----- Chargement des produits (Supabase REST, lecture seule) ----- */
  function loadProducts() {
    var url = cfg.SUPABASE_URL + "/rest/v1/products" +
      "?select=id,name_fr,name_en,price_cents&active=eq.true&order=price_cents.asc";
    return fetch(url, {
      headers: { apikey: cfg.SUPABASE_ANON_KEY, Authorization: "Bearer " + cfg.SUPABASE_ANON_KEY },
    }).then(function (r) {
      if (!r.ok) throw new Error("products " + r.status);
      return r.json();
    });
  }

  /* ----- Code promo : aperçu ----- */
  function applyCoupon() {
    var code = $("shop-coupon").value.trim();
    var msg = $("shop-coupon-msg");
    if (!code) { activeCoupon = null; msg.textContent = ""; renderCatalog(); return; }
    if (!products.length) return;

    fetch(cfg.BACKEND_URL + "/api/check-coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: products[0].id, coupon_code: code }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.valid) {
          activeCoupon = {
            code: code.toUpperCase(),
            discount_type: data.discount_type,
            discount_value: data.discount_value,
          };
          msg.textContent = t("coupon_ok");
          msg.style.color = "var(--gold, #f6c94a)";
        } else {
          activeCoupon = null;
          msg.textContent = t("coupon_bad");
          msg.style.color = "var(--sakura, #ff7eb6)";
        }
        renderCatalog();
      })
      .catch(function () {
        activeCoupon = null;
        msg.textContent = t("err_generic");
        renderCatalog();
      });
  }

  /* ----- Départ du paiement ----- */
  function buy(provider, productId) {
    var pseudo = $("shop-pseudo").value.trim();
    if (!PSEUDO_RE.test(pseudo)) { toast(t("err_pseudo")); $("shop-pseudo").focus(); return; }

    var body = { pseudo: pseudo, product_id: productId, provider: provider };
    if (activeCoupon) body.coupon_code = activeCoupon.code;

    fetch(cfg.BACKEND_URL + "/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d && res.d.url) { window.location.href = res.d.url; return; }
        toast(mapError(res.d && res.d.error));
      })
      .catch(function () { toast(t("err_generic")); });
  }

  /* ----- Init ----- */
  function renderAll() { renderLabels(); renderCatalog(); }

  function init() {
    if (!$("shop-catalog")) return; // pas sur la page boutique
    renderLabels();
    $("shop-catalog").innerHTML = '<p class="lead center">' + t("loading") + "</p>";
    $("shop-coupon-apply").addEventListener("click", applyCoupon);
    $("shop-coupon").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); applyCoupon(); }
    });

    // Re-rendu au changement de langue (les boutons FR/EN existent déjà).
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(renderAll, 0); });
    });

    loadProducts()
      .then(function (list) { products = list || []; renderCatalog(); })
      .catch(function () {
        $("shop-catalog").innerHTML = '<p class="lead center">' + t("load_err") + "</p>";
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
