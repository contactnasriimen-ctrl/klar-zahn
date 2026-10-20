# SEO – Klar Zahn (Zahnarzt Mörfelden-Walldorf)

## Déjà fait dans le site
**Technique**
- Indexation activée (`index, follow`, grandes images autorisées dans Google).
- Titre (63 caractères) et description (147 caractères) optimisés pour « Zahnarzt Mörfelden-Walldorf ».
- URL canonique, Open Graph + Twitter Card avec **image de partage** `assets/img/og-image.jpg` (1200×630) pour WhatsApp, Facebook, Google.
- Données structurées (schema.org) :
  - `Dentist` : nom, adresse, téléphone, **coordonnées GPS** (49.9675673, 8.5666833), horaires, 13 prestations, villes desservies, logo, images, lien carte.
  - `WebSite`, `FAQPage` (6 questions), et pour chaque article du Ratgeber : `Article` + `BreadcrumbList` + URL canonique.
- `sitemap.xml` (avec images), `robots.txt`, `site.webmanifest`, balises géo (Hessen / Mörfelden-Walldorf).
- Un seul `<h1>` par page, textes alternatifs sur toutes les images, liens internes (hashtags du pied de page).

**Vitesse**
- CSS et JS minifiés (`style.min.css`, `main.min.js`).
- La 3D (three.js) se charge **après** l'affichage de la page ; le Ratgeber (Firebase) seulement quand on approche de la section.
- Photo du hero en 2 tailles (600 px mobile / 1000 px), préchargée en priorité ; images WebP, chargement différé.
- Polices hébergées localement et préchargées ; intro raccourcie et sautée au 2ᵉ chargement.

## À faire (par vous ou le client) – c'est ce qui compte le plus pour le local
1. **Google Business Profile** (le plus important pour « Zahnarzt Mörfelden-Walldorf ») : https://business.google.com
   - Nom : *Klar Zahn – Zahnmedizin & Zahntechnik* · Catégorie principale : **Zahnarzt** · Adresse : Opelstraße 2, 64546 Mörfelden-Walldorf
   - Téléphone 06105 / 23604, horaires (identiques au site), site web, **photos réelles** du cabinet, de l'équipe et du labo.
   - Publier régulièrement des posts (voir HASHTAGS.md) et **demander des avis Google** aux patients satisfaits.
2. **Google Search Console** : https://search.google.com/search-console
   - Ajouter la propriété « préfixe d'URL » `https://contactnasriimen-ctrl.github.io/klar-zahn/` (validation par balise HTML : m'envoyer la balise, je l'ajoute).
   - Envoyer le sitemap : `sitemap.xml`.
3. **Mêmes coordonnées partout (NAP)** : exactement « Klar Zahn – Zahnmedizin & Zahntechnik, Opelstraße 2, 64546 Mörfelden-Walldorf, 06105 23604 » sur Google, Jameda, Doctolib, Gelbe Seiten, etc.
4. **Nom de domaine propre** (ex. `klar-zahn.de`) : meilleur pour la confiance et le référencement. Ensuite mettre à jour `canonical`, `og:url`, `sitemap.xml` et `robots.txt` (il ne fonctionne qu'à la racine d'un domaine).
5. **Compléter l'Impressum et la Datenschutz** (champs en rouge) : obligatoire en Allemagne, maintenant que le site est indexé.
6. **Articles réguliers** dans le Ratgeber (1 à 2 par mois) avec les hashtags proposés.
7. **Vraies photos** du cabinet (remplacer les photos Unsplash, même nom de fichier).
