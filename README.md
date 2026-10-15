# Site Klar Zahn – Zahnmedizin & Zahntechnik (version 2)

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

## Aperçu local
Double-cliquer sur `index.html` (aucun serveur nécessaire).

## Modifier
| Quoi | Où |
|---|---|
| Textes, téléphone, adresse | `index.html` |
| Horaires (Sprechzeiten) | `index.html` : tableau `data-hours-table` (texte **et** attribut `data-hours`) + bloc JSON-LD dans `<head>` |
| Couleurs, typo, mise en page | `assets/style.css` (variables `:root` en haut) |
| Animations et interactions | `assets/main.js` |
| Scène 3D du hero | `src/3d/hero.js` et `src/3d/models.js`, puis reconstruire (voir ci-dessous) |
| Images 3D des prestations | `assets/img/3d/*.webp` |
| Impressum / Datenschutz | `impressum.html`, `datenschutz.html` (champs en rouge à compléter) |

### Reconstruire la 3D (seulement si `src/3d/` est modifié)
```
npm install
npm run build:3d
```
Cela régénère `assets/js/hero3d.js` (three.js r160 inclus, aucun appel à un CDN).

## Photo du docteur
Déposer `images/mikel-salloum.jpg` (vertical 4:5, ≥ 1000 px de large, JPG ~80 %).
Tant qu'elle manque, le cadre affiche la dent 3D et le monogramme « MS ».

## À confirmer avec le client avant la mise en ligne définitive
- Horaires d'ouverture (ceux du site sont un **exemple**)
- Adresse e-mail
- Impressum : pays d'obtention du diplôme, n° de TVA le cas échéant
- Datenschutz : hébergeur, durée de conservation des logs
- Nom de domaine
- Puis retirer la balise `<meta name="robots" content="noindex, nofollow">` de `index.html`

## RGPD
Polices et three.js hébergés localement (aucune connexion à Google ni à un CDN), pas de cookies,
pas de carte Google intégrée (le bouton « Route planen » ouvre Google Maps dans un nouvel onglet).
