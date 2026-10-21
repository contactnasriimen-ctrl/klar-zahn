# Online-Terminanfrage (termin.html)

## Fonctionnement
1. Le patient choisit une **prestation** (12 choix ; présélection possible via le lien, ex. `termin.html?leistung=implantologie`).
2. Il choisit un **jour** dans le calendrier et un **créneau** de 30 min (calculés d'après les horaires du cabinet ;
   week-ends, jours passés et créneaux de moins de 2 h fermés), ou coche « zeitlich flexibel ».
3. Il saisit ses **coordonnées** (nom, téléphone, e-mail, assurance, message facultatif) et accepte la protection des données.
4. Il vérifie le récapitulatif et envoie. La demande arrive **par e-mail à Kontakt@klar-zahn.de**, sous forme de tableau,
   avec l'adresse du patient en « répondre à ».

Ce n'est pas une réservation définitive : le cabinet confirme le rendez-vous par téléphone ou e-mail.

## ⚠️ Activation unique (obligatoire)
L'envoi passe par **FormSubmit** (gratuit, sans compte). À la **toute première** demande envoyée depuis le site,
FormSubmit envoie un e-mail **« Action Required: Activate FormSubmit »** à Kontakt@klar-zahn.de.
➡️ Il faut cliquer sur **« Activate Form »** dans cet e-mail. Ensuite, toutes les demandes arrivent normalement.

Conseil : faire une demande de test vous-même après la mise en ligne, puis activer depuis la boîte Kontakt@klar-zahn.de.
Tant que ce n'est pas activé (ou si le service est indisponible), le formulaire propose au patient d'appeler
ou d'envoyer la demande par e-mail (message déjà prérempli).

## Modifier
| Quoi | Où |
|---|---|
| Horaires / durée des créneaux / délai minimum | `assets/booking.js` (`HOURS`, `SLOT`, `LEAD_MIN`, `DAYS_AHEAD`), puis `npm run build` |
| Adresse e-mail de réception | `assets/booking.js` (`ENDPOINT`, `MAIL`), puis `npm run build` |
| Liste des prestations, textes | `tools/pages.js` (tableau `SERVICES`), puis `npm run pages` |
| Styles | `assets/style.css` (section « Online-Terminanfrage »), puis `npm run build` |

## Protection des données
- Case de consentement obligatoire + mention dans la Datenschutzerklärung (section 6).
- FormSubmit est un service hors UE : à valider avec le client. Alternative possible plus tard :
  un service de formulaires européen ou un envoi via le propre serveur mail du cabinet.
