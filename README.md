# Site Klar Zahn – Zahnmedizin & Zahntechnik (version 8)

Site statique (HTML/CSS/JS, sans framework) pour le cabinet dentaire de Mikel Salloum,
Opelstraße 2, 64546 Mörfelden-Walldorf. En allemand.

En ligne : https://contactnasriimen-ctrl.github.io/klar-zahn/

## Pages
| Page | Fichier |
|---|---|
| Accueil | `index.html` |
| Vue d'ensemble des prestations | `leistungen/index.html` |
| 10 rubriques + 37 sous-pages (textes du client) | `leistungen/<rubrique>/…/index.html` |
| Praxislabor + 7 sous-pages | `praxislabor/…/index.html` |
| Blog (Ratgeber) | `ratgeber.html` |
| Prise de rendez-vous en ligne | `termin.html` |
| Impressum, Datenschutz, Praxis-Login | `impressum.html`, `datenschutz.html`, `admin.html` |

Les adresses suivent exactement les « URL-Slugs » du document du client (ex. `/leistungen/zahnerhalt/fuellungstherapie/`).

## Ce qu'il y a sur chaque page de prestation
- Title, meta-description et mots-clés du document du client ; H1/H2 identiques au document.
- En haut : bouton « Jetzt anrufen 06105 23604 » (un seul appui sur mobile) et « Online-Termin ».
- Contenu en cartes (listes), étapes numérotées, FAQ dépliables.
- À droite (ordinateur) : carte d'appel + navigation de la rubrique. En bas : bloc contact (téléphone, rendez-vous, e-mail, itinéraire, horaires avec statut « Jetzt geöffnet »), villes desservies, langues parlées.
- Barre mobile fixe « Jetzt anrufen | Termin | Route ».
- Données structurées : `Dentist` (avec `MedicalSpecialty`, `areaServed`, `knowsLanguage`, `isAcceptingNewPatients`), `MedicalWebPage` (auteur, dates, pages liées), `BreadcrumbList`, `FAQPage`.
- SEO : sommaire « Auf dieser Seite » avec ancres, liens internes automatiques dans le texte (liste `LINK_TERMS`
  dans `tools/pages.js`, 8 liens max. par page), bloc « Passende Themen », ligne « Stand » (date de mise à jour).
  `sitemap.xml` contient les images de partage ; `404.html` (noindex) renvoie vers les rubriques.
- Rubrique Angstpatienten : la phrase « Unser Versprechen: … » est mise en avant en haut de page, dans la carte d'appel et dans le bloc contact.

## Modifier
| Quoi | Où |
|---|---|
| Textes des 55 pages de prestations | `content/leistungen.json` (repris du PDF du client), puis `npm run pages` |
| Noms courts, icônes, image 3D, ordre des rubriques | `tools/site-data.js`, puis `npm run pages` |
| Horaires, villes desservies, langues, téléphone | `tools/site-data.js` **et** `assets/booking.js` (horaires du calendrier) + `DEFAULT_HOURS` dans `assets/main.js`, puis `npm run pages` et `npm run build` |
| Accueil (textes, sections) | `index.html` (les zones `<!--KZ:…-->` sont régénérées par `npm run pages`) |
| Couleurs, typo, mise en page | `assets/style.css`, puis `npm run build` |
| Animations et interactions | `assets/main.js`, puis `npm run build` |
| Scènes 3D, blog, Praxis-Login | `src/`, puis `npm run build` |
| Impressum / Datenschutz | `impressum.html`, `datenschutz.html` (champs en rouge à compléter) |

`npm run pages` régénère : toutes les pages de prestations, `leistungen/`, `ratgeber.html`, `termin.html`, `sitemap.xml`,
ainsi que le menu, le bento, les horaires, les villes et les données structurées de l'accueil.

## Blog et Praxis-Login
- Section « Blog » sur l'accueil (3 derniers articles) + page `ratgeber.html`.
- `admin.html` (lien « Praxis-Login » en bas de page) : le docteur écrit, publie, modifie ou supprime ses articles.
- Stockage : Firebase (gratuit). **Configuration à faire une fois : voir [FIREBASE_SETUP.md](FIREBASE_SETUP.md).**
  Tant qu'elle n'est pas faite, le blog affiche 3 articles d'exemple.

## Online-Terminanfrage
- Page `termin.html` : prestation → calendrier et créneaux → coordonnées → envoi à **Kontakt@klar-zahn.de**.
- **Activation unique obligatoire** de l'envoi : voir [TERMIN.md](TERMIN.md).

## Images
Aucune photo de stock : le site utilise uniquement des rendus 3D (`assets/img/3d/`), des icônes et le logo.
Images de partage (réseaux sociaux) : `assets/img/og-image.jpg` et une par rubrique dans `assets/img/og/`.
Vraies photos du cabinet et du docteur : à ajouter dès qu'elles sont disponibles (photo du docteur : `images/mikel-salloum.jpg`, vertical 4:5, ≥ 1000 px de large).

## Thème WordPress
- Sources PHP : `wp/klar-zahn/`. Construction : `npm run pages && npm run build && npm run wp`
  → `dist/klar-zahn-wordpress-theme.zip` (à installer via Apparence → Thèmes → Téléverser).
- À l'activation, le thème crée les 61 pages (mêmes adresses que le site statique), le blog
  (articles WordPress natifs, 3 exemples) et règle page d'accueil, page des articles et permaliens.
- Rendez-vous : envoyés par WordPress (REST `/wp-json/klarzahn/v1/termin`, `wp_mail`) à l'adresse
  définie dans Apparence → Klar Zahn. Conseillé : plugin SMTP (ex. WP Mail SMTP).
- Mode d'emploi pour le cabinet (en allemand) : `wp/klar-zahn/readme.txt`.

## Performance
- Sections hors écran rendues à la demande (`content-visibility`), animations décoratives coûteuses
  désactivées ou limitées au survol, pas de flou sur les éléments animés, 3D en direct seulement sur
  ordinateur (souris, écran ≥ 900 px), polices de secours aux mêmes dimensions (pas de saut à l'affichage),
  CSS réduit automatiquement par PurgeCSS (`npm run build`), HTML des pages générées allégé.
- Animations (bloc « Version 14 » de `assets/style.css`) : uniquement `transform`/`opacity`, désactivées si
  « réduire les animations » est activé sur l'appareil. Pas d'animation SVG en boucle (coût à chaque image) :
  l'icône téléphone sonne 2 fois après le chargement, puis au survol.

## Aperçu local
Les pages de prestations utilisent des adresses de dossier (`leistungen/zahnerhalt/`) : lancer un petit serveur local,
par exemple `npx serve .`, puis ouvrir l'adresse affichée.

## À confirmer avec le client avant la mise en ligne définitive
- Impressum : pays d'obtention du diplôme ; numéro fiscal / n° de TVA (« folgt »)
- Datenschutz : hébergeur, durée de conservation des logs, vérification FormSubmit
- Nom de domaine (puis remplacer l'adresse `SITE` dans `tools/site-data.js` et relancer `npm run pages`)

## RGPD
Polices et scripts hébergés localement, pas de cookies de suivi, pas de carte Google intégrée
(les boutons « Route » ouvrent Google Maps dans un nouvel onglet). Bannière d'information sur toutes les pages.
