/* Erzeugt ratgeber.html und termin.html aus Kopf, Menü und Footer von index.html.
   Aufruf: npm run pages   (nach Änderungen an Menü, Footer oder Sprite in index.html) */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..") + path.sep;
const SITE = "https://contactnasriimen-ctrl.github.io/klar-zahn/";
const html = fs.readFileSync(ROOT + "index.html", "utf8");
const between = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error("Nicht gefunden: " + a); return html.slice(i, j); };

const sprite = between("<!-- Icon-Sprite -->", "<!-- Intro");
const header = between('<div class="progress"', '<main id="inhalt">');
const footer = between('<footer class="site-footer">', "<!--KZ:CONTENT-END-->");
const fontsInline = html.match(/<style>@font-face[\s\S]*?<\/style>/)[0];
/* Nur Links in <a>-Tags anpassen – SVG-<use>-Verweise auf das Sprite bleiben unverändert */
const fixLinks = (s) => s
  .replace(/(<a\b[^>]*?\shref=")#start"/g, '$1index.html"')
  .replace(/(<a\b[^>]*?\shref=")#ratgeber"/g, '$1ratgeber.html"')
  .replace(/(<a\b[^>]*?\shref=")#(?!inhalt")([a-z][a-z0-9-]*)"/g, '$1index.html#$2"');
const img3d = (s) => s.replace(/src="assets\/img\/3d\/(tooth|aesthetic|kids|implant|bridge)\.webp"/g, (m, n) =>
  'src="assets/img/3d/' + n + '-400.webp" srcset="assets/img/3d/' + n + '-400.webp 400w, assets/img/3d/' + n + '.webp 720w" sizes="(max-width: 900px) 45vw, 320px"');

function head(o) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${o.title}</title>
  <meta name="description" content="${o.description}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${SITE}${o.file}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Klar Zahn">
  <meta property="og:locale" content="de_DE">
  <meta property="og:title" content="${o.title}">
  <meta property="og:description" content="${o.description}">
  <meta property="og:url" content="${SITE}${o.file}">
  <meta property="og:image" content="${SITE}assets/img/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="geo.region" content="DE-HE">
  <meta name="geo.placename" content="Mörfelden-Walldorf">
  <meta name="geo.position" content="49.9675673;8.5666833">
  <meta name="ICBM" content="49.9675673, 8.5666833">
  <meta name="theme-color" content="#035444">
  <link rel="icon" type="image/png" sizes="48x48" href="assets/img/favicon-48.png">
  <link rel="icon" type="image/png" sizes="192x192" href="assets/img/favicon-192.png">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="preload" href="assets/fonts/lexend-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
  ${fontsInline}
  <link rel="stylesheet" href="assets/style.min.css">${o.extraHead || ""}
</head>
<body class="${o.bodyClass || ""}">
<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>

${sprite}
${fixLinks(header)}`;
}
function foot(scripts) {
  return `
${fixLinks(footer)}
<script src="assets/js/firebase-config.js" defer></script>
<script src="assets/main.min.js" defer></script>${scripts || ""}
</body>
</html>
`;
}

/* ---------------- ratgeber.html ---------------- */
const ratgeber = head({
  file: "ratgeber.html",
  title: "Ratgeber Zahngesundheit | Klar Zahn Mörfelden-Walldorf",
  description: "Ratgeber der Zahnarztpraxis Klar Zahn in Mörfelden-Walldorf: Tipps zu Vorsorge, Zahnersatz, Implantaten und angstfreier Behandlung."
}) + `
<main id="inhalt" data-blog>
  <section class="page-hero">
    <div class="hero-bg" aria-hidden="true">
      <span class="aurora a1"></span>
      <span class="aurora a2"></span>
      <span class="beams"></span>
      <div class="hero-floor"></div>
      <span class="grain"></span>
    </div>
    <div class="container page-hero-inner">
      <div>
        <p class="badge"><span class="badge-dot"></span>Ratgeber der Praxis Klar Zahn</p>
        <h1>Wissen für Ihr <em>Lächeln</em></h1>
        <p class="hero-lead">Tipps und Antworten aus unserer Praxis: verständlich erklärt, damit Sie gut informiert in Ihre Behandlung gehen.</p>
      </div>
      <img class="page-hero-3d" src="assets/img/3d/kids.webp" alt="" aria-hidden="true" width="720" height="720">
    </div>
  </section>

  <section class="blog-body">
    <div class="container">
      <div data-blog-list>
        <div class="chip-filters" data-blog-filters></div>
        <div class="post-grid" data-blog-grid aria-busy="true">
          <div class="post-skeleton"></div><div class="post-skeleton"></div><div class="post-skeleton"></div>
        </div>
        <p class="blog-empty" data-blog-empty hidden>Bald finden Sie hier Artikel aus unserer Praxis.</p>
      </div>
      <article class="post-full" data-blog-article hidden></article>
    </div>
  </section>
</main>
` + foot();
fs.writeFileSync(ROOT + "ratgeber.html", img3d(ratgeber));
console.log("ratgeber.html geschrieben");

/* ---------------- termin.html ---------------- */
const T = (d) => '<svg class="ico" viewBox="0 0 24 24"><use href="#tooth"/>' + (d || "") + "</svg>";
const SERVICES = [
  ["kontrolle", "Kontrolle & Beratung", '<svg class="ico"><use href="#i-tooth-check"/></svg>'],
  ["pzr", "Professionelle Zahnreinigung", '<svg class="ico" viewBox="0 0 24 24"><path d="M2.5 17.5h10"/><rect x="12.5" y="15.2" width="9" height="4.6" rx="1.4"/><path d="M14 15.2v-3.4M16.5 15.2v-3.4M19 15.2v-3.4M21 15.2v-3.4"/><path d="M6.5 4.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8L4 7l1.8-.7z"/></svg>'],
  ["schmerzen", "Zahnschmerzen", T('<path d="M12.8 6.6l-2 3.2h2.6l-2 3.4"/>')],
  ["fuellung", "Füllung & Zahnerhaltung", T('<circle cx="12" cy="9.4" r="2.2" class="ico-fill"/>')],
  ["wurzelkanal", "Wurzelkanalbehandlung", T('<path d="M10.4 8.2l-.8 9.6M13.6 8.2l.8 9.6"/>')],
  ["zahnersatz", "Zahnersatz: Krone, Brücke, Prothese", T('<path d="M4.4 10c2.4 1.1 5 1.7 7.6 1.7s5.2-.6 7.6-1.7"/>')],
  ["implantologie", "Implantologie", '<svg class="ico" viewBox="0 0 24 24"><path d="M7.5 3C5.6 3 4.5 4.3 4.5 5.8c0 1.7 1.2 3 3 3h9c1.8 0 3-1.3 3-3C19.5 4.3 18.4 3 16.5 3c-1.6 0-2.5.8-4.5.8S9.1 3 7.5 3z"/><path d="M9 11h6l-1.6 10h-2.8z"/><path d="M9.4 13.6h5.2M9.9 16.2h4.2M10.3 18.7h3.4"/></svg>'],
  ["chirurgie", "Chirurgie & Zahnentfernung", '<svg class="ico" viewBox="0 0 24 24"><path d="M3.5 20.5l6.3-6.3"/><path d="M9.8 14.2l8.4-8.4c.9-.9 2.3-.9 2.8.1.5 1-.1 2.5-1.1 3.5l-6.6 6.6z"/><path d="M12.4 16.8l-2.6-2.6"/></svg>'],
  ["kinder", "Kinderzahnheilkunde", T('<path d="M9.7 9.2h.01M14.3 9.2h.01" style="stroke-width:2.6"/><path d="M9.8 11.6c.6.8 1.3 1.1 2.2 1.1s1.6-.3 2.2-1.1"/>')],
  ["narkose", "Dämmerschlaf & Vollnarkose", '<svg class="ico"><use href="#i-smile"/></svg>'],
  ["aesthetik", "Ästhetik", T('<path d="M14.4 6.6l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/>')],
  ["schiene", "Schienentherapie", '<svg class="ico" viewBox="0 0 24 24"><path d="M4.5 5.5c0 7.6 3.3 13 7.5 13s7.5-5.4 7.5-13"/><path d="M8.3 5.5c0 5.3 1.7 9 3.7 9s3.7-3.7 3.7-9"/><path d="M4.5 5.5h3.8M15.7 5.5h3.8"/></svg>']
];
const serviceCards = SERVICES.map((s, i) => `
              <label class="svc-option" style="--d:${i * 35}ms">
                <input type="radio" name="leistung" value="${s[0]}" data-label="${s[1].replace(/&/g, "&amp;")}">
                <span class="svc-option-card"><span class="svc-option-icon">${s[2]}</span><span class="svc-option-name">${s[1].replace(/&/g, "&amp;")}</span><span class="svc-option-check" aria-hidden="true"><svg class="ico"><use href="#i-check"/></svg></span></span>
              </label>`).join("");

const termin = head({
  file: "termin.html",
  title: "Online-Terminanfrage | Zahnarzt Klar Zahn Mörfelden-Walldorf",
  description: "Termin beim Zahnarzt in Mörfelden-Walldorf online anfragen: Leistung wählen, Wunschtermin im Kalender auswählen, Anfrage senden. Klar Zahn, Opelstraße 2.",
  bodyClass: "booking-page"
}) + `
<main id="inhalt">
  <section class="page-hero booking-hero">
    <div class="hero-bg" aria-hidden="true">
      <span class="aurora a1"></span>
      <span class="aurora a2"></span>
      <span class="beams"></span>
      <div class="hero-floor"></div>
      <span class="grain"></span>
    </div>
    <div class="container page-hero-inner">
      <div>
        <p class="badge"><span class="badge-dot"></span>Online-Terminanfrage</p>
        <h1>Ihr Wunschtermin in <em>vier Schritten</em></h1>
        <p class="hero-lead">Wählen Sie Leistung, Tag und Uhrzeit. Wir melden uns bei Ihnen, um den Termin zu bestätigen.</p>
        <ul class="hero-trust booking-trust">
          <li><svg class="ico"><use href="#i-clock"/></svg>Dauert etwa 1 Minute</li>
          <li><svg class="ico"><use href="#i-phone"/></svg>Bestätigung per Telefon oder E-Mail</li>
        </ul>
      </div>
      <img class="page-hero-3d" src="assets/img/3d/tooth.webp" alt="" aria-hidden="true" width="720" height="720">
    </div>
  </section>

  <section class="booking">
    <div class="container booking-grid">
      <form class="booking-card" data-booking-form novalidate>
        <ol class="booking-progress" aria-label="Fortschritt">
          <li data-progress-step="1"><span>1</span>Leistung</li>
          <li data-progress-step="2"><span>2</span>Termin</li>
          <li data-progress-step="3"><span>3</span>Ihre Daten</li>
          <li data-progress-step="4"><span>4</span>Senden</li>
          <span class="booking-progress-bar" aria-hidden="true"></span>
        </ol>

        <p class="booking-error" data-form-error role="alert" hidden></p>

        <fieldset class="bstep" data-step="1">
          <legend class="sr-only">Leistung wählen</legend>
          <h2>Wofür möchten Sie einen Termin?</h2>
          <div class="patient-toggle" role="radiogroup" aria-label="Patient">
            <label><input type="radio" name="patient" value="Neupatient" checked><span>Ich bin neu in der Praxis</span></label>
            <label><input type="radio" name="patient" value="Bestandspatient"><span>Ich war schon bei Ihnen</span></label>
          </div>
          <div class="svc-grid">${serviceCards}
          </div>
        </fieldset>

        <fieldset class="bstep" data-step="2" hidden>
          <legend class="sr-only">Datum und Uhrzeit wählen</legend>
          <h2>Wann passt es Ihnen?</h2>
          <div class="when-grid">
            <div class="calendar" data-calendar>
              <div class="cal-head">
                <button type="button" class="cal-nav" data-cal-prev aria-label="Vorheriger Monat"><svg class="ico"><use href="#i-arrow"/></svg></button>
                <strong data-cal-title aria-live="polite"></strong>
                <button type="button" class="cal-nav cal-next" data-cal-next aria-label="Nächster Monat"><svg class="ico"><use href="#i-arrow"/></svg></button>
              </div>
              <div class="cal-week" aria-hidden="true"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div>
              <div class="cal-grid" data-cal-grid></div>
              <div class="cal-legend"><span class="lg-open">frei wählbar</span><span class="lg-closed">geschlossen</span></div>
            </div>
            <div class="slot-panel">
              <p class="slot-hint" data-slot-hint>Wählen Sie zuerst einen Tag im Kalender.</p>
              <div class="slots" data-slots aria-live="polite"></div>
              <label class="check-row"><input type="checkbox" id="b-flexibel"><span>Ich bin zeitlich flexibel. Bitte schlagen Sie mir einen Termin vor.</span></label>
              <p class="booking-note">Die angezeigten Zeiten richten sich nach unseren Sprechzeiten. Ihr Wunschtermin wird erst mit unserer Bestätigung verbindlich.</p>
            </div>
          </div>
        </fieldset>

        <fieldset class="bstep" data-step="3" hidden>
          <legend class="sr-only">Kontaktdaten</legend>
          <h2>Wie erreichen wir Sie?</h2>
          <div class="field-grid">
            <label class="field"><span>Vorname *</span><input id="b-vorname" type="text" autocomplete="given-name" required></label>
            <label class="field"><span>Nachname *</span><input id="b-nachname" type="text" autocomplete="family-name" required></label>
            <label class="field"><span>Telefon *</span><input id="b-telefon" type="tel" autocomplete="tel" inputmode="tel" required></label>
            <label class="field"><span>E-Mail *</span><input id="b-email" type="email" autocomplete="email" required></label>
            <label class="field field-wide"><span>Versicherung</span>
              <select id="b-versicherung"><option>Gesetzlich versichert</option><option>Privat versichert</option><option>Selbstzahler</option><option>Keine Angabe</option></select>
            </label>
            <label class="field field-wide"><span>Nachricht (optional)</span><textarea id="b-nachricht" rows="3" maxlength="600" placeholder="z. B. bevorzugte Tageszeit oder kurze Info zu Ihrem Anliegen"></textarea></label>
          </div>
          <p class="booking-note">Bitte schreiben Sie keine ausführlichen Gesundheitsdaten in das Formular. Details besprechen wir gerne persönlich.</p>
          <label class="check-row"><input type="checkbox" id="b-datenschutz" required><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verarbeitet werden. Mehr dazu in der <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>. *</span></label>
          <label class="hp" aria-hidden="true">Website<input id="b-website" type="text" tabindex="-1" autocomplete="off"></label>
        </fieldset>

        <fieldset class="bstep" data-step="4" hidden>
          <legend class="sr-only">Angaben prüfen</legend>
          <h2>Alles korrekt?</h2>
          <dl class="review" data-review></dl>
          <p class="booking-note">Mit dem Absenden geht Ihre Anfrage per E-Mail an unsere Praxis (Kontakt@klar-zahn.de).</p>
        </fieldset>

        <div class="booking-nav">
          <button class="btn btn-line" type="button" data-back hidden><svg class="ico back-ico"><use href="#i-arrow"/></svg>Zurück</button>
          <button class="btn btn-glow btn-lg" type="button" data-next>Weiter<svg class="ico"><use href="#i-arrow"/></svg></button>
          <button class="btn btn-glow btn-lg" type="submit" data-send hidden><span class="send-label">Terminanfrage senden</span><span class="send-spinner" aria-hidden="true"></span></button>
        </div>

        <div class="booking-success" data-success tabindex="-1" hidden>
          <svg class="success-check" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><path d="M38 62l15 15 30-32"/></svg>
          <h2>Vielen Dank<span data-success-name></span>!</h2>
          <p>Ihre Anfrage für <strong data-success-service></strong> (<strong data-success-when></strong>) ist bei uns eingegangen. Wir melden uns, um Ihren Termin zu bestätigen.</p>
          <p class="booking-note">Dringend? Rufen Sie uns an: <a href="tel:+49610523604">06105 / 23604</a></p>
          <div class="booking-nav">
            <a class="btn btn-line" href="index.html">Zur Startseite</a>
            <button class="btn btn-glow" type="button" data-again>Weitere Anfrage</button>
          </div>
        </div>
      </form>

      <aside class="booking-summary">
        <div class="sum-card">
          <img class="sum-3d" src="assets/img/3d/kids.webp" alt="" aria-hidden="true" width="720" height="720">
          <h2>Ihre Anfrage</h2>
          <div class="sum-row"><span>Leistung</span><strong data-sum="leistung">–</strong></div>
          <div class="sum-row"><span>Wunschtermin</span><strong data-sum="termin">–</strong></div>
          <div class="sum-row"><span>Patient</span><strong data-sum="patient">–</strong></div>
        </div>
        <div class="sum-card sum-practice">
          <h3>Klar Zahn</h3>
          <p>Opelstraße 2<br>64546 Mörfelden-Walldorf</p>
          <a class="sum-phone" href="tel:+49610523604"><svg class="ico"><use href="#i-phone"/></svg>06105 / 23604</a>
          <ul class="sum-hours">
            <li><span>Mo, Do</span><span>09–13 · 14–18 Uhr</span></li>
            <li><span>Di</span><span>09–13 · 14–19 Uhr</span></li>
            <li><span>Mi</span><span>13:30–19:30 Uhr</span></li>
            <li><span>Fr</span><span>09–13 Uhr</span></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</main>
` + foot('\n<script src="assets/booking.min.js" defer></script>');
fs.writeFileSync(ROOT + "termin.html", img3d(termin));
console.log("termin.html geschrieben");
