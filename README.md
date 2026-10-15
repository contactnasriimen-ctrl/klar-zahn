# Site Klar Zahn – Zahnmedizin & Zahntechnik

Site vitrine statique (HTML/CSS/JS, sans framework ni build) pour le cabinet dentaire de Mikel Salloum,
Opelstraße 2, 64546 Mörfelden-Walldorf. Une page d'accueil + Impressum + Datenschutz, en allemand.
Couleurs tirées du logo : vert foncé `#035444` et vert menthe `#5EB593` sur blanc.

## Aperçu
Double-cliquer sur `index.html` : le site s'ouvre directement dans le navigateur.

## Modifier
| Quoi | Où |
|---|---|
| Textes, téléphone, adresse | `index.html` |
| Horaires (Sprechzeiten) | `index.html` : tableau `data-hours-table` (texte **et** attribut `data-hours`) + bloc JSON-LD dans `<head>` |
| Couleurs, typo, formes de fond | `assets/style.css` (variables `:root` en haut du fichier) |
| Menu mobile, statut « Jetzt geöffnet », copie du numéro | `assets/main.js` |
| Impressum / Datenschutz | `impressum.html`, `datenschutz.html` (champs en rouge à compléter) |
| Logo | `assets/img/` (logo d'origine : `assets/brand/`) |

## Photos
Tant qu'une photo manque, son emplacement affiche une illustration aux couleurs du logo.
Il suffit de déposer le fichier dans `images/` avec le bon nom :

| Fichier | Contenu | Format |
|---|---|---|
| `images/hero.jpg` | patient(e) souriant(e) ou le docteur au cabinet | carré, ≥ 1200 px |
| `images/mikel-salloum.jpg` | portrait de Mikel Salloum | vertical 4:5, ≥ 1000 px de large |
| `images/labor.jpg` | le Meisterlabor (technicien au travail, couronnes…) | vertical 4:5, ≥ 1000 px de large |

Compresser en JPG qualité ~80 (moins de 300 Ko par photo).

## À confirmer avec le client avant la mise en ligne
- Horaires d'ouverture (ceux du site sont un **exemple**)
- Adresse e-mail
- Impressum : pays d'obtention du diplôme, n° de TVA (USt-IdNr) le cas échéant
- Datenschutz : nom de l'hébergeur, durée de conservation des logs
- Nom de domaine (pour ajouter `canonical` et `og:url`)

## Mise en ligne
Envoyer tout le dossier sur l'hébergement (le dossier `assets/brand/` n'est pas nécessaire).
- Polices hébergées localement : aucune connexion à Google (exigence RGPD en Allemagne).
- Pas de cookies ni de tracking : pas besoin de bannière cookies.
- Pas de carte Google intégrée : le bouton « Route planen » ouvre Google Maps dans un nouvel onglet.
