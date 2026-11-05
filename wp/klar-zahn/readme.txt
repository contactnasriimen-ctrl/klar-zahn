=== Klar Zahn ===
Theme für die Zahnarztpraxis Klar Zahn – Zahnmedizin & Zahntechnik, Mörfelden-Walldorf
Version: 1.0.0 · Erstellt von OverTech (https://over-tech.de/)
Benötigt: WordPress 6.3 oder neuer, PHP 7.4 oder neuer

== Installation ==
1. WordPress → Design → Themes → Theme hinzufügen → Theme hochladen.
2. Die Datei klar-zahn-wordpress-theme.zip auswählen, „Jetzt installieren“, dann „Aktivieren“.
3. Fertig. Beim Aktivieren legt das Theme automatisch an:
   - Startseite (wird als Startseite eingestellt)
   - Leistungen mit 10 Bereichen und 37 Unterseiten, Praxislabor mit 7 Unterseiten
   - Online-Termin, Impressum, Datenschutz
   - Blog (Beitragsseite) mit 3 Beispiel-Artikeln
   - Permalinks: Seiten unter /leistungen/…/, Beiträge unter /blog/…/
   Vorhandene Seiten werden nie überschrieben. Unveränderte Beispielinhalte einer
   frischen WordPress-Installation („Hallo Welt!“, „Beispiel-Seite“) landen im Papierkorb.

== Nach der Installation ==
- Design → Klar Zahn: E-Mail-Adresse für Online-Terminanfragen (Standard: Kontakt@klar-zahn.de).
- E-Mail-Versand: Damit Terminanfragen zuverlässig ankommen, ein SMTP-Plugin
  (z. B. „WP Mail SMTP“) mit dem Postfach der Praxis einrichten und eine Test-Anfrage senden.
- Impressum und Datenschutz: rot markierte Angaben ergänzen (Seiten → Impressum / Datenschutz).
- Einstellungen → Allgemein: Sprache „Deutsch“ und Zeitzone „Berlin“ wählen.

== Inhalte bearbeiten ==
- Blog: Beiträge → Erstellen. Kategorie und Schlagwörter wählen, Beitragsbild setzen.
  Neue Artikel erscheinen automatisch im Blog und auf der Startseite.
- Seiten: Die Texte stehen in einem HTML-Block. Platzhalter wie {{home}} (Adresse der Website)
  und {{asset}} (Bilder des Themes) bitte stehen lassen.
- Kopf und Fuß der Website (Menü, Telefon, Sprechzeiten im Footer): Dateien parts/header.html
  und parts/footer.html im Theme-Ordner.
- Eigene neue Seiten erhalten automatisch das Seitenlayout des Themes.

== SEO ==
Titel, Beschreibungen, Open-Graph-Bilder und strukturierte Daten (Dentist, MedicalSpecialty,
FAQPage, MedicalWebPage, BreadcrumbList, Article) sind eingebaut. Mit einem SEO-Plugin
(Yoast, Rank Math, SEOPress, AIOSEO) übernimmt dieses Titel und Beschreibungen; die
strukturierten Daten der Praxis bleiben erhalten. Sitemap: /wp-sitemap.xml

== Geschwindigkeit ==
Keine Block-Styles auf den Praxisseiten, keine Emoji-Skripte, alle Skripte verzögert geladen,
Schriften lokal mit Ersatzschriften gleicher Größe, 3D-Zahn nur auf Geräten mit Maus.
Empfehlung: ein Cache-Plugin (z. B. WP Super Cache) und Komprimierung beim Hosting aktivieren.

== Datenschutz ==
Keine Tracking-Cookies, keine externen Schriften oder Skripte, keine Kommentare.
Terminanfragen werden nur per E-Mail an die Praxis gesendet, nicht in der Datenbank gespeichert.
