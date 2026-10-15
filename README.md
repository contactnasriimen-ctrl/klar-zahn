# Site Klar Zahn – Zahnmedizin & Zahntechnik (version 3)

Site vitrine statique (HTML/CSS/JS, sans framework) pour le cabinet dentaire de Mikel Salloum,
Opelstraße 2, 64546 Mörfelden-Walldorf. Page d'accueil + Impressum + Datenschutz, en allemand.

En ligne : https://contactnasriimen-ctrl.github.io/klar-zahn/

## Ce qu'il y a dans la page
- **Hero sombre avec dent 3D en temps réel** (WebGL / three.js) : elle suit la souris et s'ouvre en deux au défilement.
  Sans WebGL, une image 3D fixe la remplace automatiquement.
- Bandeaux défilants des prestations, texte qui se colore mot à mot, compteurs animés.
- Prestations en grille « bento » avec objets 3D (implant, bridge, dent-personnage, lune, dent esthétique),
  cartes qui s'inclinent en 3D et suivent la lumière de la souris.
- Meisterlabor en défilement scénarisé (l'implant tourne, les puces apparaissent étape par étape).
- Étapes reliées par une ligne qui se dessine, section « Angstfrei » étoilée, FAQ animée,
  carte d'accès en perspective, horaires avec statut « Jetzt geöffnet / Geschlossen » (heure de Berlin).
- Toutes les animations sont coupées si le visiteur a activé « réduire les animations ».

## Ratgeber et Praxis-Login (nouveau)
- Section « Ratgeber » sur l'accueil (3 derniers articles) + page `ratgeber.html` (liste, filtres, lecture d'un article).
- `admin.html` (lien « Praxis-Login » en bas de page) : le docteur se connecte et écrit, publie, modifie ou supprime ses articles.
- Stockage : Firebase (gratuit). **Configuration à faire une fois : voir [FIREBASE_SETUP.md](FIREBASE_SETUP.md).**
  Tant qu'elle n'est pas faite, le site affiche 3 articles d'exemple.

## Aperçu local
Double-cliquer sur `index.html` (aucun serveur nécessaire).

## Modifier
| Quoi | Où |
|---|---|
| Textes, téléphone, adresse | `index.html` |
| Horaires (Sprechzeiten) | `index.html` : tableau `data-hours-table` (texte **et** attribut `data-hours`) + bloc JSON-LD dans `<head>` |
| Couleurs, typo, mise en page | `assets/style.css` (variables `:root` en haut) |
| Animations et interactions | `assets/main.js` |
| Scènes 3D (hero, implant du labo) | `src/3d/`, puis reconstruire (voir ci-dessous) |
| Ratgeber / Praxis-Login | `src/cms/`, puis reconstruire ; config Firebase dans `assets/js/firebase-config.js` |
| Styles du Praxis-Login | `assets/admin.css` |
| Images 3D des prestations | `assets/img/3d/*.webp` |
| Impressum / Datenschutz | `impressum.html`, `datenschutz.html` (champs en rouge à compléter) |

### Reconstruire les scripts (seulement si `src/` est modifié)
```
npm install
npm run build
```
Cela régénère `assets/js/scenes3d.js`, `assets/js/blog.js` et `assets/js/admin.js`.

## Photo du docteur
Déposer `images/mikel-salloum.jpg` (vertical 4:5, ≥ 1000 px de large, JPG ~80 %).
Tant qu'elle manque, le cadre affiche la dent 3D et le monogramme « MS ».

## À confirmer avec le client avant la mise en ligne définitive
- Adresse e-mail
- Impressum : pays d'obtention du diplôme, n° de TVA le cas échéant
- Datenschutz : hébergeur, durée de conservation des logs
- Nom de domaine
- Puis retirer la balise `<meta name="robots" content="noindex, nofollow">` de `index.html`

## RGPD
Polices et three.js hébergés localement (aucune connexion à Google ni à un CDN), pas de cookies,
pas de carte Google intégrée (le bouton « Route planen » ouvre Google Maps dans un nouvel onglet).
