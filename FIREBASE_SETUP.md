# Configuration Firebase — Ratgeber Klar Zahn

Le Praxis-Login (`admin.html`) permet au docteur d'écrire et de publier des articles.
Les articles sont stockés dans **Firebase** (Auth + Firestore, plan gratuit « Spark », sans carte bancaire).
Les photos sont compressées dans le navigateur et enregistrées avec l'article : **pas besoin de Firebase Storage**.

Tant que la configuration n'est pas faite, le site affiche 3 articles d'exemple et `admin.html` affiche un écran « pas encore connecté ».

## 1. Créer le projet
1. https://console.firebase.google.com → « Ajouter un projet » → nom : `klar-zahn` (Google Analytics : désactiver).

## 2. Activer les services
- **Authentication** → « Commencer » → onglet « Sign-in method » → activer **E-mail/Mot de passe**.
- **Firestore Database** → « Créer une base de données » → mode **production** → région **europe-west3 (Frankfurt)** (important pour le RGPD en Allemagne).

## 3. Récupérer la config Web
⚙️ Paramètres du projet → « Vos applications » → icône Web `</>` → nom `klar-zahn-web` (pas de Hosting) → copier l'objet `firebaseConfig`.

## 4. Coller la config dans le site
Ouvrir `assets/js/firebase-config.js` et remplacer les valeurs `REPLACE_ME` par celles copiées.
(Ces valeurs ne sont pas secrètes : la sécurité est assurée par les règles de l'étape 5.)

## 5. Publier les règles de sécurité
Firestore → onglet « Règles » → coller tout le contenu de `firestore.rules` → « Publier ».

## 6. Créer le compte du docteur
1. Authentication → onglet « Users » → « Ajouter un utilisateur » → e-mail + mot de passe du docteur.
2. Copier l'**UID** affiché pour cet utilisateur.
3. Firestore → « Commencer une collection » → ID de collection : `admins` → ID du document : **l'UID copié** → ajouter un champ `name` (string) = `Mikel Salloum` → Enregistrer.

## 7. Mettre en ligne et tester
1. `git add -A && git commit -m "Firebase verbunden" && git push` (GitHub Pages se met à jour en 1–2 minutes).
2. Ouvrir `https://contactnasriimen-ctrl.github.io/klar-zahn/admin.html` → se connecter avec le compte du docteur.
3. Cliquer « 3 Beispielartikel übernehmen » (ou écrire un premier article) → ils apparaissent dans la section Ratgeber.

## Utilisation par le docteur
- **Neuer Artikel** : titre, courte description, photo de couverture (recadrée en 16:9 automatiquement), texte avec mise en forme (titres, gras, listes, encadré, liens, images).
- **Veröffentlichen** : visible tout de suite sur le site. **Als Entwurf speichern** : invisible pour les visiteurs.
- **Von der Website nehmen** : repasse un article en brouillon. **Löschen** : supprime définitivement (avec confirmation).
- Limite : environ 900 Ko par article (texte + images) ; la jauge dans l'éditeur l'indique.
- Mot de passe oublié : bouton « Passwort vergessen? » sur la page de connexion.

## Notes
- Si une règle change dans `firestore.rules`, il faut la recoller dans la console (pas de déploiement CLI ici).
- Le docteur peut donner accès à une autre personne : créer l'utilisateur (étape 6.1) puis ajouter son UID dans `admins`.
