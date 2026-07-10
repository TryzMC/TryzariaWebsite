/* =========================================================
   TRYZARIA SURVIVAL — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ----- Copie de l'IP ----- */
  const IP = "play.tryzaria.fr";
  function showToast(msg) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.innerHTML = '<span aria-hidden="true">✅</span>' + msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2400);
  }
  function copyIP() {
    const done = () => showToast("IP copiée — à toi de jouer&nbsp;!");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(IP).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = IP;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }
  document.querySelectorAll("[data-copy-ip]").forEach((b) =>
    b.addEventListener("click", copyIP)
  );

  /* ----- Menu mobile ----- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const tools = document.querySelector(".nav-tools");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("is-open", open);
      if (tools) tools.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.classList.remove("is-open");
      })
    );
  }

  /* ----- Pétales de cerisier ----- */
  function initPetals() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = document.querySelector(".petals");
    if (!box) return;
    const N = window.innerWidth < 720 ? 14 : 26;
    const tones = ["#ffb7d5", "#ff9ec8", "#ffd2e3", "#ffc4a0"];
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      const s = 8 + Math.random() * 12;
      p.style.left = Math.random() * 100 + "%";
      p.style.width = p.style.height = s + "px";
      p.style.background =
        "radial-gradient(circle at 35% 30%, #fff, " +
        tones[(Math.random() * tones.length) | 0] + " 72%)";
      p.style.animationDuration = 7 + Math.random() * 9 + "s";
      p.style.animationDelay = -Math.random() * 12 + "s";
      p.style.opacity = 0.45 + Math.random() * 0.45;
      box.appendChild(p);
    }
  }
  initPetals();

  /* ----- Reveal au scroll ----- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }

  /* ----- Trailer (clic pour charger) ----- */
  const facade = document.querySelector("[data-trailer]");
  if (facade) {
    facade.addEventListener("click", () => {
      const id = facade.getAttribute("data-trailer");
      const f = document.createElement("iframe");
      f.src =
        "https://www.youtube-nocookie.com/embed/" +
        id +
        "?autoplay=1&rel=0";
      f.title = "Trailer Tryzaria Survival";
      f.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      facade.innerHTML = "";
      facade.appendChild(f);
    });
  }

  /* ----- Wiki : onglets ----- */
  const wikiBtns = document.querySelectorAll(".wiki-nav button");
  const wikiPanels = document.querySelectorAll(".wiki-panel");
  if (wikiBtns.length) {
    wikiBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        const id = btn.dataset.panel;
        wikiBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        wikiPanels.forEach((p) =>
          p.classList.toggle("is-active", p.id === id)
        );
        document
          .querySelector(".wiki")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
    // Liens internes (ex: mot "boss" dans le texte) qui ouvrent un onglet.
    // Délégation : marche même si le lien est (re)créé par l'i18n après coup.
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-goto]");
      if (!el) return;
      e.preventDefault();
      const target = document.querySelector(
        '.wiki-nav button[data-panel="' + el.dataset.goto + '"]'
      );
      if (target) target.click();
    });
  }

  /* ----- Année footer ----- */
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
