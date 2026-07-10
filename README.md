# Tryzaria Survival — Site web

Site vitrine du serveur Minecraft **Tryzaria Survival** (survie 2.0, Java & Cracked, 1.21.4+).
HTML / CSS / JS pur, aucune dépendance, **bilingue FR/EN**, prêt pour GitHub Pages.

## Pages
- `index.html` — Accueil (hero, piliers, **section Boss**, trailer, comment rejoindre)
- `votes.html` — Les 3 sites de vote + récompenses
- `boutique.html` — Vitrine « bientôt disponible »
- `wiki.html` — Guide à onglets (démarrer, boss, armes, caisses, monde, règles/FAQ)

## Structure
```
├── index.html  votes.html  boutique.html  wiki.html
└── assets/
    ├── css/style.css      → design (variables couleurs en haut)
    ├── js/i18n.js         → traduction FR/EN (dictionnaire)
    ├── js/main.js         → copie IP, menu, pétales, trailer, wiki
    └── img/
        ├── banner.jpg  logo.png  favicon.png
        └── boss/  forest.png  warden.png  dragon.png  skeleton.png
```

## Traduction FR / EN
- Bouton **FR / EN** en haut à droite. Le français est la langue par défaut.
- Tous les textes sont dans `assets/js/i18n.js` (objet `T` avec `fr` et `en`).
  Pour modifier un texte : cherche sa clé dans les deux langues et change la valeur.
- Le choix de langue est mémorisé dans le navigateur.

## Section Boss (à personnaliser)
- Une **image de groupe (5 boss)** : `assets/img/boss/roster.jpg` (remplace-la par la tienne si tu veux).
- Le **texte d'accroche** et les **noms** sont dans `i18n.js` :
  accroche = clé `boss_sub` ; noms = clés `boss_*_name` ; éléments = clés `boss_*_el`.
- La couleur de chaque pastille de boss = `style="--el:#xxxxxx"` dans `index.html`.

## Section Mondes custom (Overworld / Nether / End)
- 3 cartes avec les images `assets/img/worlds/overworld.jpg`, `nether.jpg`, `end.jpg` (remplaçables).
- Noms et accroches dans `i18n.js` : clés `worlds_*` et `world_*_name` / `world_*_desc`.
- Couleur d'ambiance de chaque carte = `style="--w:#xxxxxx"` dans `index.html`.

## Autres choses à compléter
- **Lien Discord** : remplace les `href="#"` des boutons « Discord ».
- **Récompenses de vote** : section dans `votes.html` (+ clés `rw*` dans `i18n.js`).
- **Grades boutique** : `boutique.html` + clés `rank*` quand la boutique sera prête.
- **Wiki** : remplace les textes `.placeholder` (clés `wk_*_pl`).

## Déployer sur GitHub Pages
1. Crée un repo, pousse **le contenu de ce dossier à la racine** (index.html à la racine).
2. Settings → Pages → Branch `main` / `/ (root)` → Save.
3. Le site sort sur `https://<ton-pseudo>.github.io/<repo>/`.

> Non affilié à Mojang / Microsoft.
