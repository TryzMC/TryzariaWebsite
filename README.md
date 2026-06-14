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
- 4 boss d'exemple : **Colosse Sylvestre, Le Veilleur, Drake Ardent, Légion Décharnée**.
- Noms / éléments / difficulté / descriptions : clés `boss_*` dans `i18n.js`.
- Pour changer une image : remplace le fichier dans `assets/img/boss/`
  (PNG transparent recommandé ; les cartes 1 et 4 sont détourées, 2 et 3 en portrait fondu).
- La couleur du halo de chaque boss = `style="--el:#xxxxxx"` sur la carte dans `index.html`.

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
