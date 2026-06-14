/* =========================================================
   TRYZARIA — Traduction FR / EN
   Le HTML contient le FR par défaut ; le JS remplace selon la langue.
   ========================================================= */
(function () {
  "use strict";

  const T = {
    fr: {
      /* nav + header */
      nav_home: "Accueil", nav_boss: "Boss", nav_votes: "Votes",
      nav_shop: "Boutique", nav_wiki: "Wiki",
      btn_discord: "Discord", btn_copy: "Copier",

      /* titres d'onglet */
      title_home: "Tryzaria Survival — Survie révolutionnaire 1.21.4+",
      title_votes: "Voter pour Tryzaria — Survie révolutionnaire",
      title_shop: "Boutique — Tryzaria Survival",
      title_wiki: "Wiki — Tryzaria Survival",

      /* hero */
      hero_eyebrow: "Survie révolutionnaire · Java & Cracked · 1.21.4+",
      hero_title: 'La survie qui casse la <span class="g">routine vanilla</span>.',
      hero_sub: "Boss custom, monde sur-mesure, armes uniques et caisses à ouvrir. Tryzaria, c'est la survie 2.0 — pensée pour ceux qui veulent plus que du vanilla.",
      hero_copy: "⧉ Copier l'IP", hero_trailer: "▶ Voir le trailer",
      badge_boss: "⚔️ Boss custom", badge_world: "🌸 Monde custom",
      badge_weapons: "💎 Armes custom", badge_crates: "🎁 Caisses",

      /* piliers */
      pillars_eyebrow: "Ce qui t'attend",
      pillars_title: "Une survie qui sort de l'ordinaire",
      p_boss_t: "Boss custom",
      p_boss_d: "Des affrontements scénarisés, des mécaniques uniques et du loot rare à la clé.",
      p_world_t: "Monde custom",
      p_world_d: "Un monde sur-mesure, pensé pour l'exploration et le build longue durée.",
      p_weapons_t: "Armes custom",
      p_weapons_d: "Un arsenal exclusif avec des capacités spéciales pour réinventer le combat.",
      p_crates_t: "Caisses",
      p_crates_d: "Ouvre des caisses et tente ta chance : cosmétiques, kits et items rares.",

      /* boss */
      boss_eyebrow: "Le cœur du serveur",
      boss_title: "Affronte des boss légendaires",
      boss_sub: "Des combats faits maison qui n'existent nulle part ailleurs. Prépare ton stuff, viens en groupe, et tente de les terrasser.",
      boss_forest_name: "Colosse Sylvestre", boss_forest_el: "Forêt",
      boss_forest_diff: "Boss d'élite",
      boss_forest_desc: "Un titan de bois et de pierre qui garde les profondeurs de la forêt. Ses bras-troncs écrasent tout sur leur passage.",
      boss_warden_name: "Le Veilleur", boss_warden_el: "Abysses",
      boss_warden_diff: "Boss final",
      boss_warden_desc: "Réveillé dans les ténèbres, il te traque au moindre bruit. Le combat le plus intense du serveur.",
      boss_dragon_name: "Drake Ardent", boss_dragon_el: "Feu",
      boss_dragon_diff: "Boss",
      boss_dragon_desc: "Un dragon cracheur de flammes terré au fond des donjons. Esquive ses boules de feu… ou finis en cendres.",
      boss_skeleton_name: "Légion Décharnée", boss_skeleton_el: "Mort-vivant",
      boss_skeleton_diff: "Mini-boss",
      boss_skeleton_desc: "Ils surgissent en nombre des cryptes oubliées. Seuls, faciles. En meute, mortels.",
      boss_note: "Noms d'exemple — à adapter à tes vrais boss.",

      /* trailer */
      trailer_eyebrow: "En action",
      trailer_title: "Le trailer Tryzaria",
      trailer_sub: "Un aperçu du monde, des boss et de l'ambiance avant de te lancer.",

      /* rejoindre */
      join_eyebrow: "3 étapes", join_title: "Comment rejoindre",
      join_sub: "Java officiel ou Cracked, c'est la même IP.",
      join1_t: "Lance Minecraft",
      join1_d: "Version <code>1.21.4+</code> en Java. Comptes officiels <strong>et</strong> Cracked acceptés.",
      join2_t: "Ajoute le serveur",
      join2_d: "Multijoueur → Ajouter un serveur → colle l'adresse <code>91.197.6.177:25325</code>.",
      join3_t: "Rejoins l'aventure",
      join3_d: "Connecte-toi et commence ta survie révolutionnaire.",

      /* bandeaux */
      cta_votes_t: "Soutiens le serveur en votant",
      cta_votes_d: "Quelques clics par jour, des récompenses en jeu, et plus de joueurs sur Tryzaria.",
      cta_votes_b: "🗳️ Voter maintenant",
      cta_discord_t: "Rejoins la communauté",
      cta_discord_d: "Annonces, events, entraide et vocaux — tout se passe sur le Discord.",
      cta_discord_b: "Rejoindre le Discord",

      /* footer */
      ftr_tagline: "Serveur Minecraft survie 2.0 — boss, monde et armes custom. Casse la routine vanilla.",
      ftr_nav: "Navigation", ftr_com: "Communauté",
      ftr_trailer: "Trailer YouTube", ftr_votes: "Sites de vote",
      ftr_rights: "© 2026 Tryzaria Survival. Non affilié à Mojang / Microsoft.",

      /* votes */
      votes_eyebrow: "Soutiens le serveur", votes_title: "Vote pour Tryzaria",
      votes_sub: "Vote chaque jour sur les 3 sites ci-dessous. Chaque vote fait grimper le serveur dans les classements et te rapporte des récompenses en jeu.",
      vote_btn: "🗳️ Voter ici",
      vote1_d: "Le top des serveurs FR. Un vote quotidien rapide, gros impact sur le classement.",
      vote2_d: "Page de vote dédiée à Tryzaria. Connecte-toi, vote, récupère ta récompense.",
      vote3_d: "Encore un vote, encore de la visibilité. À faire tous les jours pour aider au max.",
      rewards_eyebrow: "Pourquoi voter",
      rewards_title: "Des récompenses à chaque vote",
      rewards_sub: "À personnaliser selon ton système de récompenses en jeu.",
      rw1_t: "Monnaie en jeu", rw1_d: "De la monnaie pour la boutique du serveur.",
      rw2_t: "Clés de caisses", rw2_d: "Des clés pour ouvrir les caisses et tenter ta chance.",
      rw3_t: "Récompense fidélité", rw3_d: "Vote plusieurs jours d'affilée pour des bonus en plus.",
      votes_cta_t: "Pas encore en jeu ?",
      votes_cta_d: "Copie l'IP et rejoins-nous avant de voter.",

      /* boutique */
      shop_soon: "🌸 Bientôt disponible", shop_title: "La boutique Tryzaria",
      shop_sub: "On prépare quelque chose de propre. Voici un aperçu des grades à venir — les vrais détails et prix arrivent bientôt.",
      shop_price: "à venir", shop_btn: "Bientôt disponible",
      rank1_n: "Voyageur",
      rank1_1: "Préfixe coloré en jeu", rank1_2: "Homes supplémentaires",
      rank1_3: "Kit de départ exclusif", rank1_4: "Accès cosmétiques de base",
      rank2_n: "Samouraï",
      rank2_1: "Tous les avantages Voyageur", rank2_2: "Plus de homes & téléportations",
      rank2_3: "Kit Samouraï hebdomadaire", rank2_4: "Clés de caisses bonus",
      rank2_5: "Cosmétiques exclusifs",
      rank3_n: "Légende",
      rank3_1: "Tous les avantages Samouraï", rank3_2: "Préfixe & effets légendaires",
      rank3_3: "Kit Légende complet", rank3_4: "Accès anticipé aux nouveautés",
      rank3_5: "Le max de cosmétiques",
      shop_cta_t: "En attendant la boutique",
      shop_cta_d: "Le meilleur moyen de soutenir le serveur dès maintenant : voter chaque jour.",
      shop_cta_b: "🗳️ Voter pour Tryzaria",

      /* wiki */
      wiki_eyebrow: "Guide du serveur", wiki_title: "Wiki Tryzaria",
      wiki_sub: "Tout pour bien démarrer et maîtriser la survie 2.0. Contenu à compléter au fil des mises à jour.",
      wk_start: "🌱 Bien démarrer", wk_boss: "⚔️ Boss custom",
      wk_weapons: "💎 Armes custom", wk_crates: "🎁 Caisses",
      wk_world: "🌸 Monde custom", wk_rules: "📜 Règles & FAQ",
      wk_start_h: "Bien démarrer",
      wk_start_p: "Bienvenue sur Tryzaria Survival ! Voici les bases pour lancer ton aventure.",
      wk_connect: "Se connecter",
      wk_connect1: "Minecraft Java <strong>1.21.4+</strong>, comptes officiels et Cracked acceptés.",
      wk_connect2: "IP du serveur :",
      wk_tip_start: "💡 Astuce : pense à voter dès ton arrivée pour récupérer tes premières récompenses.",
      wk_firststeps: "Tes premiers pas",
      wk_firststeps_p: "À compléter : commandes utiles (/spawn, /home, /tpa…), comment claim/protéger sa base, l'économie de départ, etc.",
      wk_boss_h: "Boss custom",
      wk_boss_p: "Des affrontements uniques avec mécaniques maison et butin rare.",
      wk_boss_list: "Liste des boss",
      wk_boss_pl: "À compléter : nom de chaque boss, où le trouver / comment l'invoquer, ses attaques, sa difficulté et son loot.",
      wk_boss_tip: "⚔️ Conseil : prépare ton stuff et viens en groupe — certains boss ne se battent pas en solo.",
      wk_weapons_h: "Armes custom",
      wk_weapons_p: "Un arsenal exclusif avec des capacités spéciales pour varier ton style de jeu.",
      wk_weapons_cat: "Catalogue",
      wk_weapons_pl: "À compléter : nom de chaque arme, sa capacité spéciale, comment l'obtenir (craft / boss / caisse) et sa rareté.",
      wk_crates_h: "Caisses",
      wk_crates_p: "Ouvre des caisses et tente ta chance pour des récompenses exclusives.",
      wk_crates_sub: "Types de caisses & récompenses",
      wk_crates_pl: "À compléter : les différentes caisses, comment obtenir les clés (vote, boutique, events…) et la table de loot de chacune.",
      wk_crates_tip: "🎁 Les clés de vote s'obtiennent en votant sur les 3 sites depuis la page Votes.",
      wk_world_h: "Monde custom",
      wk_world_p: "Des biomes et structures faits maison, pensés pour l'exploration et le build.",
      wk_world_sub: "Régions & structures",
      wk_world_pl: "À compléter : les zones notables, structures custom, donjons, points d'intérêt et lieux secrets.",
      wk_rules_h: "Règles & FAQ", wk_rules_sub: "Règles du serveur",
      wk_rule1: "Respecte les autres joueurs et le staff.",
      wk_rule2: "Pas de triche, de hacks ni de comportements abusifs.",
      wk_rule3: "Pas de grief / vol hors zones prévues.",
      wk_rule4: "À compléter selon tes règles précises.",
      wk_faq: "FAQ",
      wk_faq1_q: "Le serveur est-il accessible en Cracked ?",
      wk_faq1_a: "Oui — Java officiel et Cracked sont acceptés, même IP : 91.197.6.177:25325.",
      wk_faq2_q: "Quelle version utiliser ?",
      wk_faq2_a: "Minecraft Java 1.21.4 ou plus récent.",
      wk_faq3_q: "Comment signaler un bug ou un joueur ?",
      wk_faq3_a: "À compléter : via le Discord, un ticket, une commande en jeu…",
    },

    en: {
      nav_home: "Home", nav_boss: "Boss", nav_votes: "Vote",
      nav_shop: "Shop", nav_wiki: "Wiki",
      btn_discord: "Discord", btn_copy: "Copy",

      title_home: "Tryzaria Survival — Revolutionary survival 1.21.4+",
      title_votes: "Vote for Tryzaria — Revolutionary survival",
      title_shop: "Shop — Tryzaria Survival",
      title_wiki: "Wiki — Tryzaria Survival",

      hero_eyebrow: "Revolutionary survival · Java & Cracked · 1.21.4+",
      hero_title: 'Survival that breaks the <span class="g">vanilla routine</span>.',
      hero_sub: "Custom bosses, a handcrafted world, unique weapons and crates to open. Tryzaria is survival 2.0 — built for players who want more than vanilla.",
      hero_copy: "⧉ Copy the IP", hero_trailer: "▶ Watch the trailer",
      badge_boss: "⚔️ Custom bosses", badge_world: "🌸 Custom world",
      badge_weapons: "💎 Custom weapons", badge_crates: "🎁 Crates",

      pillars_eyebrow: "What awaits you",
      pillars_title: "A survival unlike any other",
      p_boss_t: "Custom bosses",
      p_boss_d: "Scripted fights, unique mechanics and rare loot on the line.",
      p_world_t: "Custom world",
      p_world_d: "A handcrafted world built for exploration and long-term building.",
      p_weapons_t: "Custom weapons",
      p_weapons_d: "An exclusive arsenal with special abilities that reinvent combat.",
      p_crates_t: "Crates",
      p_crates_d: "Open crates and try your luck: cosmetics, kits and rare items.",

      boss_eyebrow: "The heart of the server",
      boss_title: "Face legendary bosses",
      boss_sub: "Handcrafted fights you won't find anywhere else. Gear up, bring your squad, and try to take them down.",
      boss_forest_name: "Forest Colossus", boss_forest_el: "Forest",
      boss_forest_diff: "Elite boss",
      boss_forest_desc: "A titan of wood and stone guarding the deep forest. Its log-arms crush anything in their path.",
      boss_warden_name: "The Watcher", boss_warden_el: "Abyss",
      boss_warden_diff: "Final boss",
      boss_warden_desc: "Awakened in the dark, it hunts you by the faintest sound. The most intense fight on the server.",
      boss_dragon_name: "Ember Drake", boss_dragon_el: "Fire",
      boss_dragon_diff: "Boss",
      boss_dragon_desc: "A fire-breathing dragon lurking deep in the dungeons. Dodge its fireballs… or burn to ashes.",
      boss_skeleton_name: "Bone Legion", boss_skeleton_el: "Undead",
      boss_skeleton_diff: "Mini-boss",
      boss_skeleton_desc: "They swarm out of forgotten crypts. Alone, easy. In a pack, deadly.",
      boss_note: "Example names — swap in your real bosses.",

      trailer_eyebrow: "In action",
      trailer_title: "The Tryzaria trailer",
      trailer_sub: "A look at the world, the bosses and the vibe before you dive in.",

      join_eyebrow: "3 steps", join_title: "How to join",
      join_sub: "Official Java or Cracked, same IP.",
      join1_t: "Launch Minecraft",
      join1_d: "Java <code>1.21.4+</code>. Official <strong>and</strong> cracked accounts welcome.",
      join2_t: "Add the server",
      join2_d: "Multiplayer → Add server → paste <code>91.197.6.177:25325</code>.",
      join3_t: "Jump in",
      join3_d: "Connect and start your revolutionary survival.",

      cta_votes_t: "Support the server by voting",
      cta_votes_d: "A few clicks a day, in-game rewards, and more players on Tryzaria.",
      cta_votes_b: "🗳️ Vote now",
      cta_discord_t: "Join the community",
      cta_discord_d: "Announcements, events, help and voice chats — it all happens on Discord.",
      cta_discord_b: "Join the Discord",

      ftr_tagline: "Minecraft survival 2.0 server — custom bosses, world and weapons. Break the vanilla routine.",
      ftr_nav: "Navigation", ftr_com: "Community",
      ftr_trailer: "YouTube trailer", ftr_votes: "Vote sites",
      ftr_rights: "© 2026 Tryzaria Survival. Not affiliated with Mojang / Microsoft.",

      votes_eyebrow: "Support the server", votes_title: "Vote for Tryzaria",
      votes_sub: "Vote every day on the 3 sites below. Each vote pushes the server up the rankings and earns you in-game rewards.",
      vote_btn: "🗳️ Vote here",
      vote1_d: "Top FR server list. A quick daily vote with big ranking impact.",
      vote2_d: "Vote page dedicated to Tryzaria. Log in, vote, claim your reward.",
      vote3_d: "One more vote, more visibility. Do it every day to help the most.",
      rewards_eyebrow: "Why vote",
      rewards_title: "Rewards for every vote",
      rewards_sub: "Customize to match your in-game reward system.",
      rw1_t: "In-game currency", rw1_d: "Currency for the server shop.",
      rw2_t: "Crate keys", rw2_d: "Keys to open crates and try your luck.",
      rw3_t: "Loyalty reward", rw3_d: "Vote several days in a row for extra bonuses.",
      votes_cta_t: "Not in-game yet?",
      votes_cta_d: "Copy the IP and join us before you vote.",

      shop_soon: "🌸 Coming soon", shop_title: "The Tryzaria shop",
      shop_sub: "We're cooking something clean. Here's a preview of upcoming ranks — real details and prices coming soon.",
      shop_price: "coming", shop_btn: "Coming soon",
      rank1_n: "Voyager",
      rank1_1: "Colored in-game prefix", rank1_2: "Extra homes",
      rank1_3: "Exclusive starter kit", rank1_4: "Basic cosmetics access",
      rank2_n: "Samurai",
      rank2_1: "All Voyager perks", rank2_2: "More homes & teleports",
      rank2_3: "Weekly Samurai kit", rank2_4: "Bonus crate keys",
      rank2_5: "Exclusive cosmetics",
      rank3_n: "Legend",
      rank3_1: "All Samurai perks", rank3_2: "Legendary prefix & effects",
      rank3_3: "Full Legend kit", rank3_4: "Early access to new content",
      rank3_5: "Maximum cosmetics",
      shop_cta_t: "While you wait",
      shop_cta_d: "The best way to support the server right now: vote every day.",
      shop_cta_b: "🗳️ Vote for Tryzaria",

      wiki_eyebrow: "Server guide", wiki_title: "Tryzaria Wiki",
      wiki_sub: "Everything to get started and master survival 2.0. Content to be completed over updates.",
      wk_start: "🌱 Getting started", wk_boss: "⚔️ Custom bosses",
      wk_weapons: "💎 Custom weapons", wk_crates: "🎁 Crates",
      wk_world: "🌸 Custom world", wk_rules: "📜 Rules & FAQ",
      wk_start_h: "Getting started",
      wk_start_p: "Welcome to Tryzaria Survival! Here are the basics to begin your adventure.",
      wk_connect: "Connect",
      wk_connect1: "Minecraft Java <strong>1.21.4+</strong>, official and cracked accounts welcome.",
      wk_connect2: "Server IP:",
      wk_tip_start: "💡 Tip: vote as soon as you arrive to grab your first rewards.",
      wk_firststeps: "Your first steps",
      wk_firststeps_p: "To complete: useful commands (/spawn, /home, /tpa…), how to claim/protect a base, the starting economy, etc.",
      wk_boss_h: "Custom bosses",
      wk_boss_p: "Unique fights with homemade mechanics and rare loot.",
      wk_boss_list: "Boss list",
      wk_boss_pl: "To complete: each boss's name, where to find / how to summon it, its attacks, difficulty and loot.",
      wk_boss_tip: "⚔️ Tip: gear up and bring a group — some bosses can't be soloed.",
      wk_weapons_h: "Custom weapons",
      wk_weapons_p: "An exclusive arsenal with special abilities to vary your playstyle.",
      wk_weapons_cat: "Catalogue",
      wk_weapons_pl: "To complete: each weapon's name, special ability, how to get it (craft / boss / crate) and rarity.",
      wk_crates_h: "Crates",
      wk_crates_p: "Open crates and try your luck for exclusive rewards.",
      wk_crates_sub: "Crate types & rewards",
      wk_crates_pl: "To complete: the different crates, how to get keys (vote, shop, events…) and each loot table.",
      wk_crates_tip: "🎁 Vote keys are earned by voting on the 3 sites from the Vote page.",
      wk_world_h: "Custom world",
      wk_world_p: "Homemade biomes and structures, built for exploration and building.",
      wk_world_sub: "Regions & structures",
      wk_world_pl: "To complete: notable areas, custom structures, dungeons, points of interest and secret spots.",
      wk_rules_h: "Rules & FAQ", wk_rules_sub: "Server rules",
      wk_rule1: "Respect other players and the staff.",
      wk_rule2: "No cheating, hacks or abusive behavior.",
      wk_rule3: "No griefing / stealing outside designated areas.",
      wk_rule4: "To complete with your exact rules.",
      wk_faq: "FAQ",
      wk_faq1_q: "Is the server accessible in Cracked?",
      wk_faq1_a: "Yes — official Java and Cracked are both accepted, same IP: 91.197.6.177:25325.",
      wk_faq2_q: "Which version should I use?",
      wk_faq2_a: "Minecraft Java 1.21.4 or newer.",
      wk_faq3_q: "How do I report a bug or a player?",
      wk_faq3_a: "To complete: via Discord, a ticket, an in-game command…",
    },
  };

  const HTML_KEYS = new Set([
    "hero_title", "join1_d", "join2_d", "wk_connect1",
  ]);

  function getLang() {
    try {
      const s = localStorage.getItem("tryz_lang");
      if (s === "fr" || s === "en") return s;
    } catch (e) {}
    return "fr"; // FR par défaut ; l'utilisateur peut choisir EN
  }
  function setLang(lang) {
    try { localStorage.setItem("tryz_lang", lang); } catch (e) {}
  }

  function apply(lang) {
    const dict = T[lang] || T.fr;
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      const v = dict[k];
      if (v == null) return;
      if (HTML_KEYS.has(k) || el.hasAttribute("data-i18n-html")) el.innerHTML = v;
      else el.textContent = v;
    });
    document.querySelectorAll(".lang-toggle button").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang)
    );
  }

  function init() {
    const lang = getLang();
    apply(lang);
    document.querySelectorAll(".lang-toggle button").forEach((b) =>
      b.addEventListener("click", () => {
        const l = b.dataset.lang;
        setLang(l);
        apply(l);
      })
    );
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();

  window.TryzariaI18n = { apply, T };
})();
