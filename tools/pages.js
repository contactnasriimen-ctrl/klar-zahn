/* Erzeugt alle Unterseiten aus Kopf, Menü und Footer von index.html:
   ratgeber.html (Blog), termin.html, leistungen/ (Übersicht), alle Leistungs- und Praxislabor-Seiten
   aus content/leistungen.json, sitemap.xml sowie die erzeugten Bereiche in index.html.
   Aufruf: npm run pages   (nach Änderungen an Texten, Menü, Footer oder Sprechzeiten) */
const fs = require("fs");
const path = require("path");
const D = require("./site-data");
const { SITE, PRAXIS, HOURS, CITIES, LANGS, CLUSTERS, LAB, PROMISE } = D;
const ROOT = path.join(__dirname, "..") + path.sep;
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (h) => String(h).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const ico = (id, cls) => `<svg class="ico${cls ? " " + cls : ""}"><use href="#${id}"/></svg>`;

/* ---------------- Inhalte ---------------- */
const PAGES = JSON.parse(fs.readFileSync(ROOT + "content/leistungen.json", "utf8"));
const bySlug = {};
PAGES.forEach((p) => { p.path = p.meta.slug.replace(/^\//, ""); bySlug[p.path] = p; });
const GROUPS = CLUSTERS.map((c) => ({ ...c, path: "leistungen/" + c.key + "/" })).concat([{ ...LAB, path: LAB.key + "/" }]);
GROUPS.forEach((g) => {
  g.page = bySlug[g.path];
  if (!g.page) throw new Error("Seite fehlt: " + g.path);
  g.children = Object.keys(g.subs).map((k) => {
    const p = bySlug[g.path + k + "/"];
    if (!p) throw new Error("Unterseite fehlt: " + g.path + k + "/");
    return { key: k, name: g.subs[k], path: g.path + k + "/", page: p };
  });
});
const used = new Set(GROUPS.flatMap((g) => [g.path, ...g.children.map((c) => c.path)]));
PAGES.forEach((p) => { if (!used.has(p.path)) throw new Error("Seite ohne Zuordnung: " + p.path); });
const MEGA_TAGS = {
  "zahnerhalt": "Füllungen · Inlays · Parodontitis", "zahnreinigung-bleaching": "PZR · Bleaching",
  "endodontie": "Endodontie · Revision · Zahnunfall", "kinderzahnmedizin": "Prophylaxe · MIH · Lückenhalter",
  "aesthetische-zahnmedizin": "Veneers · Bleaching · Komposit", "zahnersatz": "Kronen · Prothesen · Garantie",
  "implantologie": "3D-Planung · DVT · Knochenaufbau", "schienentherapie": "Knirschen · CMD · Aligner",
  "sportzahnmedizin": "Mundschutz · Sportunfälle", "angstpatienten": "Dämmerschlaf · Vollnarkose", "praxislabor": "Kronen · Prothesen · Vor-Ort-Service"
};

/* ---------------- Gemeinsame Bausteine aus index.html ---------------- */
let index = fs.readFileSync(ROOT + "index.html", "utf8");
function fill(name, content) {
  const re = new RegExp("(<!--KZ:" + name + "-START-->)[\\s\\S]*?(<!--KZ:" + name + "-END-->)");
  if (!re.test(index)) throw new Error("Marker fehlt: " + name);
  index = index.replace(re, (m, a, b) => a + content + b);
}
const routeFrom = (city) => "https://www.google.com/maps/dir/?api=1&amp;origin=" + encodeURIComponent(city.replace(/ \(.*\)/, "")) + "&amp;destination=Opelstra%C3%9Fe+2%2C+64546+M%C3%B6rfelden-Walldorf";
const ROUTE = PRAXIS.route.replace(/&/g, "&amp;");
const cityName = (c) => c.replace(/ \(.*\)/, "");

function hoursRows() {
  return HOURS.map(([d, name, r]) => `
              <tr data-day="${d}" data-hours="${r.join(",")}"><th scope="row">${name}</th><td>${r.length ? r.map((x) => x.replace("-", " – ")).join(" · ") : "geschlossen"}</td></tr>`).join("") + "\n";
}
fill("HOURS", hoursRows());
fill("MEGA", GROUPS.slice(0, 10).map((g) => `
              <a class="mega-item" href="${g.path}"><span class="mega-ico">${ico(g.icon)}</span><span class="mega-txt"><strong>${esc(g.short || g.name)}</strong><small>${MEGA_TAGS[g.key]}</small></span></a>`).join("") + "\n            ");
fill("MSUB", GROUPS.map((g) => `<li><a href="${g.path}">${ico(g.icon)}${esc(g.short || g.name)}</a></li>`).join(""));
fill("FLIST", GROUPS.slice(0, 10).map((g) => `<li><a href="${g.path}">${esc(g.short || g.name)}</a></li>`).join(""));
fill("CITIES", CITIES.map(([c]) => `<li><a href="${routeFrom(c)}" target="_blank" rel="noopener">${ico("i-route")}<span><strong>${esc(cityName(c))}</strong><small>Route planen</small></span></a></li>`).join(""));

/* Bento der Startseite */
const TILES = [
  ["implantologie", "t-impl tile-dark has-3d", "Fest &amp; dauerhaft", "implant"],
  ["zahnersatz", "t-ersatz tile-mint has-3d", "Mit 4 Jahren Garantie", "bridge"],
  ["zahnerhalt", "t-erhalt", "", ""],
  ["endodontie", "t-wurzel", "", ""],
  ["kinderzahnmedizin", "t-kinder tile-light has-3d", "Spielerisch &amp; mehrsprachig", "kids"],
  ["praxislabor", "t-labor tile-night", "Meisterlabor im Haus", ""],
  ["zahnreinigung-bleaching", "t-pzr", "", ""],
  ["aesthetische-zahnmedizin", "t-aesth tile-fresh has-3d", "Natürlich schön", "aesthetic"],
  ["schienentherapie", "t-schiene", "", ""],
  ["sportzahnmedizin", "t-sport", "", ""],
  ["angstpatienten", "t-angst tile-night", "Ohne Wertung", ""]
];
const img3d = (n, sizes, extra) => `<img decoding="async" ${extra || ""}src="assets/img/3d/${n}-400.webp" srcset="assets/img/3d/${n}-400.webp 400w, assets/img/3d/${n}.webp 720w" sizes="${sizes || "(max-width: 900px) 45vw, 320px"}" alt="" width="720" height="720" loading="lazy">`;
fill("BENTO", TILES.map(([key, cls, tag, img], i) => {
  const g = GROUPS.find((x) => x.key === key);
  const subs = g.children.slice(0, cls.includes("t-impl") || cls.includes("t-labor") || cls.includes("t-kinder") || cls.includes("t-ersatz") ? 4 : 2);
  return `
        <article class="tile ${cls}" data-tilt data-reveal${i % 3 ? ` style="--d:.${(i % 3) * 5}s"` : ""}>
          ${img ? "" : `<span class="tile-icon">${ico(g.icon)}</span>`}
          <div class="tile-body">
            ${tag ? `<span class="tile-tag">${tag}</span>` : ""}
            <h3><a class="tile-main" href="${g.path}">${esc(g.short || g.name)}</a></h3>
            <p>${esc(key === "angstpatienten" ? "Ihr erster Termin ist ein reines Beratungsgespräch im Besprechungszimmer: ohne Bohrer, ohne Wertung, auf Augenhöhe." : g.teaser)}</p>
            <ul class="tile-subs">${subs.map((c) => `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join("")}</ul>
            <span class="tile-link" aria-hidden="true">Mehr erfahren${ico("i-arrow")}</span>
          </div>
          ${img ? img3d(img, null, 'class="tile-3d" ') : ""}
        </article>`;
}).join("") + `
        <a class="tile t-all tile-fresh" href="leistungen/" data-tilt data-reveal style="--d:.1s">
          <span class="tile-icon">${ico("i-grid")}</span>
          <h3>Alle Leistungen</h3>
          <p>55 Themenseiten mit Ablauf, Kosten und Antworten auf häufige Fragen.</p>
          <span class="tile-link">Zur Übersicht${ico("i-arrow")}</span>
        </a>
      `);

/* JSON-LD der Praxis (Startseite und jede Unterseite) */
function dentistLd() {
  const spec = (id, name) => ({ "@type": "MedicalSpecialty", "@id": "https://schema.org/" + id, "name": name });
  const days = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };
  const slots = {};
  HOURS.forEach(([d, , r]) => r.forEach((x) => { (slots[x] = slots[x] || []).push(days[d]); }));
  return {
    "@type": "Dentist",
    "@id": SITE + "#praxis",
    "name": PRAXIS.name,
    "alternateName": "Klar Zahn",
    "url": SITE,
    "telephone": PRAXIS.phoneLd,
    "email": PRAXIS.mail,
    "image": SITE + "assets/img/og-image.jpg",
    "logo": SITE + "assets/img/logo-klar-zahn.png",
    "description": "Zahnarztpraxis in Mörfelden-Walldorf mit eigenem Meisterlabor: Zahnerhalt, Implantologie, Zahnersatz mit 4 Jahren Garantie, Kinderzahnmedizin, Behandlung von Angstpatienten in Dämmerschlaf und Vollnarkose.",
    "address": { "@type": "PostalAddress", "streetAddress": PRAXIS.street, "postalCode": PRAXIS.zip, "addressLocality": PRAXIS.city, "addressRegion": "Hessen", "addressCountry": "DE" },
    "geo": { "@type": "GeoCoordinates", "latitude": PRAXIS.lat, "longitude": PRAXIS.lng },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Opelstra%C3%9Fe+2%2C+64546+M%C3%B6rfelden-Walldorf",
    "employee": { "@type": "Person", "name": "Mikel Salloum", "jobTitle": "Zahnarzt" },
    "medicalSpecialty": [spec("Dentistry", "Zahnmedizin"), spec("Pediatric", "Kinderzahnmedizin"), spec("Anesthesia", "Behandlung in Sedierung und Vollnarkose")],
    "areaServed": [{ "@type": "City", "name": "Mörfelden-Walldorf", "sameAs": "https://de.wikipedia.org/wiki/M%C3%B6rfelden-Walldorf" }]
      .concat(CITIES.map(([n, w]) => ({ "@type": "City", "name": n, "sameAs": w })))
      .concat([{ "@type": "AdministrativeArea", "name": "Kreis Groß-Gerau" }]),
    "knowsLanguage": LANGS.map((l) => l[0]),
    "availableService": GROUPS.map((g) => ({ "@type": "MedicalProcedure", "name": g.name, "url": SITE + g.path })),
    "openingHoursSpecification": Object.keys(slots).map((r) => ({ "@type": "OpeningHoursSpecification", "dayOfWeek": slots[r], "opens": r.split("-")[0], "closes": r.split("-")[1] })),
    "potentialAction": { "@type": "ReserveAction", "name": "Online-Terminanfrage", "target": { "@type": "EntryPoint", "urlTemplate": SITE + "termin.html", "inLanguage": "de-DE", "actionPlatform": ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] } }
  };
}
const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
fill("LD", "\n  " + ldScript({ "@context": "https://schema.org", "@graph": [dentistLd(), { "@type": "WebSite", "@id": SITE + "#website", "url": SITE, "name": PRAXIS.name, "inLanguage": "de-DE", "publisher": { "@id": SITE + "#praxis" } }] }) + "\n  ");
fs.writeFileSync(ROOT + "index.html", index);
console.log("index.html aktualisiert");

const html = index;
const between = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error("Nicht gefunden: " + a); return html.slice(i, j); };
const sprite = between("<!-- Icon-Sprite -->", "<!-- Intro");
const header = between('<div class="progress"', '<main id="inhalt">');
const footer = between('<footer class="site-footer">', "<!--KZ:CONTENT-END-->");
const fontsInline = html.match(/<style>@font-face[\s\S]*?<\/style>/)[0];
/* Nur Links in <a>-Tags anpassen – SVG-<use>-Verweise auf das Sprite bleiben unverändert */
const fixLinks = (s) => s
  .replace(/(<a\b[^>]*?\shref=")#start"/g, '$1index.html"')
  .replace(/(<a\b[^>]*?\shref=")#(?!inhalt")([a-z][a-z0-9-]*)"/g, '$1index.html#$2"');
const img3dPage = (s) => s.replace(/src="assets\/img\/3d\/(tooth|aesthetic|kids|implant|bridge)\.webp"/g, (m, n) =>
  'src="assets/img/3d/' + n + '-400.webp" srcset="assets/img/3d/' + n + '-400.webp 400w, assets/img/3d/' + n + '.webp 720w" sizes="(max-width: 900px) 45vw, 320px"');

/* Relative Pfade für Seiten in Unterordnern anpassen */
function relocate(s, pre) {
  if (!pre) return s;
  const rel = (u) => u && !/^(?:[a-z][a-z0-9+.-]*:|#|\/|\?)/i.test(u);
  return s
    .replace(/(\s(?:href|src)=")([^"]*)"/g, (m, a, u) => a + (rel(u) ? pre + u : u) + '"')
    .replace(/(\s(?:srcset|imagesrcset)=")([^"]*)"/g, (m, a, v) => a + v.split(",").map((x) => { const t = x.trim(); return rel(t) ? pre + t : t; }).join(", ") + '"')
    .replace(/url\((?!["']?(?:data:|https?:|#))(["']?)([^)"']+)\1\)/g, (m, q, u) => "url(" + q + pre + u + q + ")");
}

function head(o) {
  const url = SITE + o.file;
  const og = SITE + (o.og || "assets/img/og-image.jpg");
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(o.title)}</title>
  <meta name="description" content="${esc(o.description)}">${o.keywords ? `\n  <meta name="keywords" content="${esc(o.keywords)}">` : ""}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="${o.ogType || "website"}">
  <meta property="og:site_name" content="Klar Zahn">
  <meta property="og:locale" content="de_DE">
  <meta property="og:title" content="${esc(o.title)}">
  <meta property="og:description" content="${esc(o.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${og}">
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
  <link rel="stylesheet" href="assets/style.min.css">${o.ld ? "\n  " + ldScript(o.ld) : ""}${o.extraHead || ""}
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
<script src="assets/main.min.js" defer></script>
<script src="assets/consent.min.js" defer></script>${scripts || ""}
</body>
</html>
`;
}
function write(file, s) {
  const depth = file.split("/").length - 1;
  const out = ROOT + (file.endsWith("/") ? file + "index.html" : file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  /* Einrückungen entfernen: kleinere HTML-Dateien */
  fs.writeFileSync(out, relocate(img3dPage(s), "../".repeat(depth)).replace(/\n[ \t]+/g, "\n").replace(/\n{2,}/g, "\n"));
}
const heroBg = `
    <div class="hero-bg" aria-hidden="true">
      <span class="aurora a1"></span>
      <span class="aurora a2"></span>
      <span class="beams"></span>
      <div class="hero-floor"></div>
      <span class="grain"></span>
    </div>`;

/* ---------------- Leistungsseiten ---------------- */
function itemParts(it, numbered) {
  const h = numbered ? it.html.replace(/^(<strong>)?\s*(?:\d+|[a-z])\.\s+/, "$1") : it.html;
  const m = h.match(/^<strong>([\s\S]*?)<\/strong>\s*([\s\S]*)$/);
  if (m && /:$/.test(m[1].trim())) return { title: m[1].trim().replace(/:$/, ""), body: [m[2], it.desc].filter(Boolean).join(" ") };
  if (m && !m[2] && !it.desc) return { title: m[1].trim(), body: "", highlight: true };
  return { title: "", body: [h, it.desc].filter(Boolean).join(" ") };
}
function renderList(list, nested) {
  if (list.type === "ol" || list.type === "ol-a") {
    return `<ol class="${nested ? "sub-steps" : "step-list"}">` + list.items.map((it, i) => {
      const p = itemParts(it, true);
      return `<li class="stp"><span class="stp-num" aria-hidden="true">${list.type === "ol-a" ? String.fromCharCode(97 + i) : i + 1}</span><div class="stp-text">${p.title ? `<p class="feat-title">${p.title}</p>` : ""}${p.body ? `<p>${p.body}</p>` : ""}${it.sub ? renderList(it.sub, true) : ""}</div></li>`;
    }).join("") + "</ol>";
  }
  const parts = list.items.map(itemParts);
  if (nested) return `<ul class="sub-list">` + list.items.map((it, i) => `<li>${parts[i].title ? `<strong>${parts[i].title}:</strong> ` : ""}${parts[i].body}</li>`).join("") + "</ul>";
  if (!parts.some((p) => p.title)) return `<ul class="check-list">` + parts.map((p) => `<li>${ico("i-check")}<span>${p.body}</span></li>`).join("") + "</ul>";
  const normal = parts.map((p, i) => (p.highlight ? -1 : i)).filter((i) => i >= 0);
  const wide = normal.length % 2 ? normal[normal.length - 1] : -1;
  return `<ul class="feat-list${list.items.length === 1 ? " is-single" : ""}">` + list.items.map((it, i) => {
    const p = parts[i];
    return `<li class="feat${p.highlight ? " is-highlight" : ""}${i === wide ? " is-wide" : ""}"><span class="feat-ico" aria-hidden="true">${ico(p.highlight ? "i-globe" : "i-check")}</span><div class="feat-text">${p.title ? `<p class="feat-title">${p.title}</p>` : ""}${p.body ? `<p>${p.body}</p>` : ""}${it.sub ? renderList(it.sub, true) : ""}</div></li>`;
  }).join("") + "</ul>";
}
const renderBlocks = (blocks, leadFirst) => blocks.map((b, i) => b.type === "p" ? `<p${leadFirst && i === 0 ? ' class="svc-lead"' : ""}>${b.html}</p>` : renderList(b)).join("\n          ");
const blocksText = (blocks) => blocks.map((b) => b.type === "p" ? strip(b.html) : b.items.map((it) => strip(it.html + " " + (it.desc || "")) + (it.sub ? " " + it.sub.items.map((s) => strip(s.html)).join(" ") : "")).join(" ")).join(" ");

function h1Html(t) {
  const i = t.indexOf(": ");
  return i > 0 && i < 90 ? `<span class="h1-kicker">${esc(t.slice(0, i + 1))}</span> ${esc(t.slice(i + 2))}` : esc(t);
}
function chipsFor(g) {
  const k = g.key;
  if (k === "angstpatienten") return [["i-heart", "Ohne Wertung", "Erstgespräch ohne Bohrer"], ["i-phone", "", PRAXIS.phone]];
  if (k === "kinderzahnmedizin") return [["i-globe", "Wir sprechen Ihre Sprache", "DE · EN · ES · AR"], ["i-phone", "", PRAXIS.phone]];
  if (k === "zahnersatz" || k === "praxislabor") return [["i-shield", "4 Jahre Garantie", "auf Zahnersatz aus dem Meisterlabor"], ["i-phone", "", PRAXIS.phone]];
  return [["i-lab", "Meisterlabor im Haus", "Zahnersatz aus einer Hand"], ["i-phone", "", PRAXIS.phone]];
}

function servicePage(g, child) {
  const p = child ? child.page : g.page;
  const file = child ? child.path : g.path;
  const name = child ? child.name : (g.short || g.name);
  const url = SITE + file;
  const isAngst = g.key === "angstpatienten";
  const book = "termin.html?leistung=" + g.book;
  const crumbs = [["Startseite", ""]].concat(g.key === "praxislabor" ? [] : [["Leistungen", "leistungen/"]], [[g.short || g.name, g.path]], child ? [[child.name, child.path]] : []);
  const faqTitle = p.faqTitle || "Häufige Fragen";
  const specialty = [{ "@type": "MedicalSpecialty", "@id": "https://schema.org/Dentistry", "name": "Zahnmedizin" }];
  if (g.key === "kinderzahnmedizin") specialty.push({ "@type": "MedicalSpecialty", "@id": "https://schema.org/Pediatric", "name": "Kinderzahnmedizin" });
  if (/narkose|sedierung|daemmerschlaf/.test(file)) specialty.push({ "@type": "MedicalSpecialty", "@id": "https://schema.org/Anesthesia", "name": "Anästhesie" });
  const graph = [
    dentistLd(),
    {
      "@type": "MedicalWebPage", "@id": url + "#webpage", "url": url, "name": p.meta.title, "headline": p.h1,
      "description": p.meta.description, "inLanguage": "de-DE", "isPartOf": { "@id": SITE + "#website" },
      "about": /garantie|aus-einer-hand|vor-ort|werkstoffe/.test(file) || file === "praxislabor/" ? { "@id": SITE + "#praxis" } : { "@type": "MedicalProcedure", "name": name },
      "specialty": specialty, "audience": { "@type": "PeopleAudience", "geographicArea": { "@type": "AdministrativeArea", "name": "Kreis Groß-Gerau" } },
      "provider": { "@id": SITE + "#praxis" }, "breadcrumb": { "@id": url + "#breadcrumb" }, "dateModified": TODAY
    },
    { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": crumbs.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c[0], "item": SITE + c[1] })) }
  ];
  if (p.faq.length) graph.push({ "@type": "FAQPage", "@id": url + "#faq", "name": faqTitle, "mainEntity": p.faq.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": blocksText(f.a) } })) });

  const siblings = [{ name: "Überblick", path: g.path }].concat(g.children);
  const promise = isAngst ? `
        <div class="promise promise-hero">
          <span class="promise-ico" aria-hidden="true">${ico("i-heart")}</span>
          <p><strong>Unser Versprechen:</strong> ${esc(PROMISE.replace(/^Unser Versprechen:\s*/, ""))}</p>
        </div>` : "";
  const chips = chipsFor(g);
  const subCards = !child && g.children.length ? `
          <nav class="svc-topics" aria-label="Themen: ${esc(g.short || g.name)}">
            <p class="eyebrow"><svg viewBox="0 0 24 24"><use href="#tooth"/></svg>Themen in diesem Bereich</p>
            <div class="topic-grid">${g.children.map((c, i) => `
              <a class="topic-card" href="${c.path}" style="--d:${i * 60}ms"><span class="topic-ico">${ico(g.icon)}</span><span class="topic-txt"><strong>${esc(c.name)}</strong><small>${esc(c.page.meta.description)}</small></span>${ico("i-arrow", "topic-go")}</a>`).join("")}
            </div>
          </nav>` : "";
  const sections = p.sections.map((s) => `
          <section class="svc-sec">
            <h2>${esc(s.h2)}</h2>
          ${renderBlocks(s.blocks)}
          </section>`).join("");
  const faq = p.faq.length ? `
          <section class="svc-faq" id="faq" aria-labelledby="faq-title">
            <p class="eyebrow"><svg viewBox="0 0 24 24"><use href="#tooth"/></svg>FAQ · zum Aufklappen</p>
            <h2 id="faq-title">${esc(faqTitle)}</h2>
            <div class="faq-list" data-faq>${p.faq.map((f, i) => `
              <details class="faq-item"${i === 0 ? " open" : ""}>
                <summary><span>${esc(f.q)}</span>${ico("i-plus", "faq-plus")}</summary>
                <div class="faq-body">${renderBlocks(f.a)}</div>
              </details>`).join("")}
            </div>
          </section>` : "";
  const others = GROUPS.filter((x) => x.key !== g.key);

  const body = `
<main id="inhalt" class="svc-page">
  <section class="page-hero svc-hero">${heroBg}
    <div class="container svc-hero-inner">
      <div class="svc-hero-copy">
        <nav class="crumbs" aria-label="Brotkrumen">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${c[1] || "index.html"}">${esc(c[0])}</a><span aria-hidden="true">/</span>` : `<span aria-current="page">${esc(c[0])}</span>`).join("")}</nav>
        <p class="badge"><span class="badge-dot"></span>${esc(g.short || g.name)}${child ? " · " + esc(child.name) : ""}</p>
        <h1>${h1Html(p.h1)}</h1>
        <p class="hero-lead">${esc(p.meta.description)}</p>${promise}
        <div class="svc-actions">
          <a class="btn btn-glow btn-lg svc-call" href="tel:${PRAXIS.tel}">${ico("i-phone")}<span>Jetzt anrufen <b>${PRAXIS.phone}</b></span></a>
          <a class="btn btn-line btn-lg" href="${book}">${ico("i-calendar")}Online-Termin anfragen</a>
        </div>
        <ul class="hero-trust">
          <li>${ico("i-lab")}Eigenes Meisterlabor</li>
          <li>${ico("i-shield")}4 Jahre Garantie auf Zahnersatz</li>
          <li>${ico("i-globe")}DE · EN · ES · AR</li>
        </ul>
      </div>
      <div class="svc-visual" aria-hidden="true">
        <span class="sv-halo"></span><span class="stage-ring sr-1"></span><span class="stage-ring sr-2"></span>
        <img class="sv-3d" src="assets/img/3d/${g.img}.webp" alt="" width="720" height="720" fetchpriority="high">
        <span class="sv-icon">${ico(g.icon)}</span>
        <span class="glass-card sv-chip c1"><span class="gc-icon">${ico(chips[0][0])}</span><span><strong>${esc(chips[0][1])}</strong><small>${esc(chips[0][2])}</small></span></span>
        <span class="glass-card sv-chip c2"><span class="gc-icon">${ico(chips[1][0])}</span><span><strong data-open-short>Sprechzeiten</strong><small>${esc(chips[1][2])}</small></span></span>
      </div>
    </div>
  </section>

  <section class="svc-body">
    <div class="container svc-grid">
      <article class="svc-article">
        <div class="svc-intro">
          ${renderBlocks(p.intro, true)}
        </div>${subCards}${sections}${faq}
      </article>
      <aside class="svc-aside">
        <div class="aside-card aside-call">
          <span class="status-pill" data-open-pill hidden></span>
          <p class="aside-kicker">Termin &amp; Beratung</p>
          <a class="aside-phone" href="tel:${PRAXIS.tel}">${PRAXIS.phone}</a>
          ${isAngst ? `<p class="aside-promise">${ico("i-heart")}<span><strong>Unser Versprechen:</strong> ${esc(PROMISE.replace(/^Unser Versprechen:\s*/, ""))}</span></p>` : ""}
          <a class="btn btn-glow" href="tel:${PRAXIS.tel}">${ico("i-phone")}Jetzt anrufen</a>
          <a class="btn btn-line" href="${book}">${ico("i-calendar")}Online-Termin</a>
          <a class="aside-mail" href="mailto:${PRAXIS.mail}">${ico("i-mail")}${PRAXIS.mail}</a>
          <p class="aside-addr">${ico("i-pin")}<span>${PRAXIS.street} · ${PRAXIS.zip} ${PRAXIS.city}</span></p>
        </div>
        <nav class="aside-card aside-nav" aria-label="${esc(g.short || g.name)}: alle Themen">
          <p class="aside-kicker">${ico(g.icon)}${esc(g.short || g.name)}</p>
          <ul>${siblings.map((c) => `<li><a href="${c.path}"${c.path === file ? ' aria-current="page"' : ""}>${esc(c.name)}${ico("i-arrow")}</a></li>`).join("")}</ul>
        </nav>
      </aside>
    </div>
  </section>

  <section class="svc-contact" aria-labelledby="kontakt-title">
    <div class="container">
      <div class="sc-card">
        <div class="sc-main">
          <p class="eyebrow"><svg viewBox="0 0 24 24"><use href="#tooth"/></svg>Kontakt &amp; Termin</p>
          <h2 id="kontakt-title">Ihr Termin: <em>${esc(name)}</em></h2>
          <p class="sc-lead">${isAngst ? esc(PROMISE) : "Rufen Sie uns an oder fragen Sie Ihren Wunschtermin online an. Wir nehmen uns Zeit, beraten Sie verständlich und transparent."}</p>
          <a class="sc-phone" href="tel:${PRAXIS.tel}">${ico("i-phone")}${PRAXIS.phone}</a>
          <div class="sc-actions">
            <a class="btn btn-glow btn-lg" href="tel:${PRAXIS.tel}">${ico("i-phone")}Jetzt anrufen</a>
            <a class="btn btn-line btn-lg" href="${book}">${ico("i-calendar")}Online-Termin</a>
            <a class="btn btn-line btn-lg" href="mailto:${PRAXIS.mail}">${ico("i-mail")}E-Mail</a>
            <a class="btn btn-line btn-lg" href="${ROUTE}" target="_blank" rel="noopener">${ico("i-route")}Route</a>
          </div>
          <p class="sc-langs">${ico("i-globe")}Wir sprechen Deutsch, Englisch, Spanisch und Arabisch.</p>
        </div>
        <div class="sc-hours">
          <div class="hc-head"><span class="hc-title">${ico("i-clock")}Sprechzeiten</span><span class="status-pill" data-open-pill hidden></span></div>
          <table class="hours" data-hours-table>
            <tbody>${hoursRows()}            </tbody>
          </table>
          <p class="hc-note"><span data-open-status>Termine auch nach Vereinbarung.</span></p>
        </div>
      </div>
      <div class="sc-area">
        <p>${ico("i-pin")}<span><strong>${PRAXIS.street}, ${PRAXIS.zip} ${PRAXIS.city}</strong> · für Patientinnen und Patienten aus</span></p>
        <ul>${CITIES.map(([c]) => `<li><a href="${routeFrom(c)}" target="_blank" rel="noopener">${esc(cityName(c))}</a></li>`).join("")}</ul>
      </div>
    </div>
  </section>

  <section class="svc-more" aria-label="Weitere Leistungen">
    <div class="container">
      <p class="eyebrow"><svg viewBox="0 0 24 24"><use href="#tooth"/></svg>Weitere Leistungen</p>
      <div class="more-chips">${others.map((x) => `<a href="${x.path}">${ico(x.icon)}${esc(x.short || x.name)}</a>`).join("")}<a href="leistungen/">${ico("i-grid")}Alle Leistungen</a></div>
    </div>
  </section>
</main>
`;
  return head({
    file, title: p.meta.title, description: p.meta.description, keywords: p.meta.keywords,
    og: "assets/img/og/" + g.key + ".jpg", bodyClass: "svc" + (isAngst ? " svc-angst" : ""), ld: { "@context": "https://schema.org", "@graph": graph }
  }) + body + foot();
}

let count = 0;
for (const g of GROUPS) {
  write(g.path, servicePage(g, null)); count++;
  for (const c of g.children) { write(c.path, servicePage(g, c)); count++; }
}
console.log(count + " Leistungsseiten geschrieben");

/* ---------------- leistungen/ (Übersicht) ---------------- */
const overview = head({
  file: "leistungen/",
  title: "Leistungen | Zahnarzt Klar Zahn Mörfelden-Walldorf",
  description: "Alle Leistungen der Zahnarztpraxis Klar Zahn in Mörfelden-Walldorf: Zahnerhalt, Zahnreinigung, Wurzelbehandlung, Kinderzahnmedizin, Ästhetik, Zahnersatz, Implantologie, Schienen, Sport und Angstpatienten.",
  bodyClass: "svc svc-overview",
  ld: { "@context": "https://schema.org", "@graph": [dentistLd(), { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Startseite", "item": SITE }, { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": SITE + "leistungen/" }] }] }
}) + `
<main id="inhalt" class="svc-page">
  <section class="page-hero svc-hero">${heroBg}
    <div class="container svc-hero-inner">
      <div class="svc-hero-copy">
        <nav class="crumbs" aria-label="Brotkrumen"><a href="index.html">Startseite</a><span aria-hidden="true">/</span><span aria-current="page">Leistungen</span></nav>
        <p class="badge"><span class="badge-dot"></span>Klar Zahn · Mörfelden-Walldorf</p>
        <h1><span class="h1-kicker">Unsere Leistungen:</span> Alles für Ihr Lächeln unter einem Dach</h1>
        <p class="hero-lead">Zehn Leistungsbereiche und ein eigenes Meisterlabor. Wählen Sie ein Thema: Auf jeder Seite finden Sie Ablauf, Kosten und Antworten auf häufige Fragen.</p>
        <div class="svc-actions">
          <a class="btn btn-glow btn-lg svc-call" href="tel:${PRAXIS.tel}">${ico("i-phone")}<span>Jetzt anrufen <b>${PRAXIS.phone}</b></span></a>
          <a class="btn btn-line btn-lg" href="termin.html">${ico("i-calendar")}Online-Termin anfragen</a>
        </div>
      </div>
      <div class="svc-visual" aria-hidden="true">
        <span class="sv-halo"></span><span class="stage-ring sr-1"></span><span class="stage-ring sr-2"></span>
        <img class="sv-3d" src="assets/img/3d/implant.webp" alt="" width="720" height="720" fetchpriority="high">
        <span class="sv-icon">${ico("i-grid")}</span>
        <span class="glass-card sv-chip c1"><span class="gc-icon">${ico("i-lab")}</span><span><strong>Meisterlabor im Haus</strong><small>4 Jahre Garantie</small></span></span>
        <span class="glass-card sv-chip c2"><span class="gc-icon">${ico("i-phone")}</span><span><strong data-open-short>Sprechzeiten</strong><small>${PRAXIS.phone}</small></span></span>
      </div>
    </div>
  </section>
  <section class="svc-body">
    <div class="container">
      <div class="ov-grid">${GROUPS.map((g, i) => `
        <article class="ov-card${g.key === "praxislabor" ? " is-lab" : ""}" style="--d:${(i % 3) * 60}ms">
          <div class="ov-head"><span class="topic-ico">${ico(g.icon)}</span><h2><a href="${g.path}">${esc(g.name).replace(/4-Jahre-Garantie/g, "4‑Jahre‑Garantie")}</a></h2></div>
          <p>${esc(g.teaser)}</p>
          <ul>${g.children.map((c) => `<li><a href="${c.path}">${esc(c.name)}${ico("i-arrow")}</a></li>`).join("")}</ul>
          <a class="ov-more" href="${g.path}">Zum Überblick${ico("i-arrow")}</a>
        </article>`).join("")}
      </div>
    </div>
  </section>
</main>
` + foot();
write("leistungen/", overview);
console.log("leistungen/ geschrieben");

/* ---------------- ratgeber.html (Blog) ---------------- */
const ratgeber = head({
  file: "ratgeber.html",
  title: "Blog & Ratgeber Zahngesundheit | Klar Zahn Mörfelden-Walldorf",
  description: "Blog der Zahnarztpraxis Klar Zahn in Mörfelden-Walldorf: Tipps zu Vorsorge, Zahnersatz, Implantaten und angstfreier Behandlung."
}) + `
<main id="inhalt" data-blog>
  <section class="page-hero">${heroBg}
    <div class="container page-hero-inner">
      <div>
        <p class="badge"><span class="badge-dot"></span>Blog der Praxis Klar Zahn</p>
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
write("ratgeber.html", ratgeber);
console.log("ratgeber.html geschrieben");

/* ---------------- termin.html ---------------- */
const T = (d) => '<svg class="ico" viewBox="0 0 24 24"><use href="#tooth"/>' + (d || "") + "</svg>";
const SERVICES = [
  ["kontrolle", "Kontrolle & Beratung", ico("i-tooth-check")],
  ["pzr", "Professionelle Zahnreinigung", '<svg class="ico" viewBox="0 0 24 24"><path d="M2.5 17.5h10"/><rect x="12.5" y="15.2" width="9" height="4.6" rx="1.4"/><path d="M14 15.2v-3.4M16.5 15.2v-3.4M19 15.2v-3.4M21 15.2v-3.4"/><path d="M6.5 4.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8L4 7l1.8-.7z"/></svg>'],
  ["schmerzen", "Zahnschmerzen", T('<path d="M12.8 6.6l-2 3.2h2.6l-2 3.4"/>')],
  ["fuellung", "Füllung & Zahnerhaltung", T('<circle cx="12" cy="9.4" r="2.2" class="ico-fill"/>')],
  ["wurzelkanal", "Wurzelkanalbehandlung", ico("i-root")],
  ["zahnersatz", "Zahnersatz: Krone, Brücke, Prothese", ico("i-crown")],
  ["implantologie", "Implantologie", ico("i-implant")],
  ["chirurgie", "Chirurgie & Zahnentfernung", '<svg class="ico" viewBox="0 0 24 24"><path d="M3.5 20.5l6.3-6.3"/><path d="M9.8 14.2l8.4-8.4c.9-.9 2.3-.9 2.8.1.5 1-.1 2.5-1.1 3.5l-6.6 6.6z"/><path d="M12.4 16.8l-2.6-2.6"/></svg>'],
  ["kinder", "Kinderzahnmedizin", ico("i-kid")],
  ["angst", "Erstgespräch für Angstpatienten", ico("i-heart")],
  ["narkose", "Dämmerschlaf & Vollnarkose", ico("i-smile")],
  ["aesthetik", "Ästhetik & Bleaching", ico("i-sparkle")],
  ["schiene", "Schienentherapie", ico("i-splint")],
  ["sport", "Sportmundschutz & Sportunfall", ico("i-shield")]
];
const serviceCards = SERVICES.map((s, i) => `
              <label class="svc-option" style="--d:${i * 35}ms">
                <input type="radio" name="leistung" value="${s[0]}" data-label="${esc(s[1])}">
                <span class="svc-option-card"><span class="svc-option-icon">${s[2]}</span><span class="svc-option-name">${esc(s[1])}</span><span class="svc-option-check" aria-hidden="true">${ico("i-check")}</span></span>
              </label>`).join("");
const sumHours = HOURS.filter((h) => h[2].length).reduce((acc, [d, name, r]) => {
  const key = r.join(" · ");
  const same = acc.find((x) => x.key === key);
  if (same) same.days.push(name.slice(0, 2)); else acc.push({ key, days: [name.slice(0, 2)] });
  return acc;
}, []).map((x) => `
            <li><span>${x.days.join(", ")}</span><span>${x.key.replace(/:00/g, "").replace(/-/g, "–")} Uhr</span></li>`).join("");

const termin = head({
  file: "termin.html",
  title: "Online-Terminanfrage | Zahnarzt Klar Zahn Mörfelden-Walldorf",
  description: "Termin beim Zahnarzt in Mörfelden-Walldorf online anfragen: Leistung wählen, Wunschtermin im Kalender auswählen, Anfrage senden. Klar Zahn, Opelstraße 2.",
  bodyClass: "booking-page"
}) + `
<main id="inhalt">
  <section class="page-hero booking-hero">${heroBg}
    <div class="container page-hero-inner">
      <div>
        <p class="badge"><span class="badge-dot"></span>Online-Terminanfrage</p>
        <h1>Ihr Wunschtermin in <em>vier Schritten</em></h1>
        <p class="hero-lead">Wählen Sie Leistung, Tag und Uhrzeit. Wir melden uns bei Ihnen, um den Termin zu bestätigen.</p>
        <ul class="hero-trust booking-trust">
          <li>${ico("i-clock")}Dauert etwa 1 Minute</li>
          <li>${ico("i-phone")}Lieber telefonisch? <a href="tel:${PRAXIS.tel}">${PRAXIS.phone}</a></li>
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
                <button type="button" class="cal-nav" data-cal-prev aria-label="Vorheriger Monat">${ico("i-arrow")}</button>
                <strong data-cal-title aria-live="polite"></strong>
                <button type="button" class="cal-nav cal-next" data-cal-next aria-label="Nächster Monat">${ico("i-arrow")}</button>
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
            <label class="field field-wide"><span>Nachricht (optional)</span><textarea id="b-nachricht" rows="3" maxlength="600" placeholder="z. B. bevorzugte Tageszeit, Sprache (Deutsch, Englisch, Spanisch, Arabisch) oder kurze Info zu Ihrem Anliegen"></textarea></label>
          </div>
          <p class="booking-note">Bitte schreiben Sie keine ausführlichen Gesundheitsdaten in das Formular. Details besprechen wir gerne persönlich.</p>
          <label class="check-row"><input type="checkbox" id="b-datenschutz" required><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verarbeitet werden. Mehr dazu in der <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>. *</span></label>
          <label class="hp" aria-hidden="true">Website<input id="b-website" type="text" tabindex="-1" autocomplete="off"></label>
        </fieldset>

        <fieldset class="bstep" data-step="4" hidden>
          <legend class="sr-only">Angaben prüfen</legend>
          <h2>Alles korrekt?</h2>
          <dl class="review" data-review></dl>
          <p class="booking-note">Mit dem Absenden geht Ihre Anfrage per E-Mail an unsere Praxis (${PRAXIS.mail}).</p>
        </fieldset>

        <div class="booking-nav">
          <button class="btn btn-line" type="button" data-back hidden>${ico("i-arrow", "back-ico")}Zurück</button>
          <button class="btn btn-glow btn-lg" type="button" data-next>Weiter${ico("i-arrow")}</button>
          <button class="btn btn-glow btn-lg" type="submit" data-send hidden><span class="send-label">Terminanfrage senden</span><span class="send-spinner" aria-hidden="true"></span></button>
        </div>

        <div class="booking-success" data-success tabindex="-1" hidden>
          <svg class="success-check" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><path d="M38 62l15 15 30-32"/></svg>
          <h2>Vielen Dank<span data-success-name></span>!</h2>
          <p>Ihre Anfrage für <strong data-success-service></strong> (<strong data-success-when></strong>) ist bei uns eingegangen. Wir melden uns, um Ihren Termin zu bestätigen.</p>
          <p class="booking-note">Dringend? Rufen Sie uns an: <a href="tel:${PRAXIS.tel}">${PRAXIS.phone}</a></p>
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
          <p>${PRAXIS.street}<br>${PRAXIS.zip} ${PRAXIS.city}</p>
          <a class="sum-phone" href="tel:${PRAXIS.tel}">${ico("i-phone")}${PRAXIS.phone}</a>
          <ul class="sum-hours">${sumHours}
          </ul>
        </div>
      </aside>
    </div>
  </section>
</main>
` + foot('\n<script src="assets/booking.min.js" defer></script>');
write("termin.html", termin);
console.log("termin.html geschrieben");

/* ---------------- sitemap.xml ---------------- */
const urls = [["", "1.0", "weekly"], ["leistungen/", "0.9", "monthly"]]
  .concat(GROUPS.map((g) => [g.path, "0.9", "monthly"]))
  .concat(GROUPS.flatMap((g) => g.children.map((c) => [c.path, "0.8", "monthly"])))
  .concat([["termin.html", "0.8", "monthly"], ["ratgeber.html", "0.7", "weekly"],
    ["ratgeber.html?artikel=professionelle-zahnreinigung", "0.6", "monthly"], ["ratgeber.html?artikel=angstfrei-im-daemmerschlaf", "0.6", "monthly"], ["ratgeber.html?artikel=implantat-oder-bruecke", "0.6", "monthly"]]);
fs.writeFileSync(ROOT + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr, f]) => `  <url><loc>${SITE}${u.replace(/&/g, "&amp;")}</loc><lastmod>${TODAY}</lastmod><changefreq>${f}</changefreq><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`);
console.log("sitemap.xml: " + urls.length + " Adressen");
module.exports = { GROUPS };
