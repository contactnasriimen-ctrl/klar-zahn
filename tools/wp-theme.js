/* Baut das WordPress-Theme aus der statischen Website (Aufruf: npm run wp, nach npm run pages und npm run build).
   Quelle der PHP-Dateien: wp/klar-zahn/. Ergebnis: dist/klar-zahn/ und dist/klar-zahn-wordpress-theme.zip
   Inhalte der Seiten kommen aus den erzeugten HTML-Dateien; Adressen werden zu Platzhaltern
   ({{home}}, {{asset}}, {{blog}}, {{login}}, {{rest}}), die das Theme beim Anzeigen ersetzt. */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");
const { SITE, CLUSTERS, LAB } = require("./site-data");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "wp", "klar-zahn");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(DIST, "klar-zahn");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const decode = (s) => String(s || "").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/* ---------- Adressen → Platzhalter ---------- */
function mapPath(u) {
  let [rest, hash] = u.split("#");
  let [p, q] = rest.split("?");
  let out;
  if (p.startsWith("assets/")) out = "{{asset}}/" + p.slice(7);
  else if (p === "images/mikel-salloum.jpg") out = "{{asset}}/img/mikel-salloum.jpg";
  else if (p === "" || p === "index.html") out = "{{home}}/";
  else if (p === "ratgeber.html") {
    const m = q && q.match(/(?:^|&)artikel=([^&]+)/);
    out = m ? "{{home}}/blog/" + decodeURIComponent(m[1]) + "/" : "{{blog}}";
    if (m) q = "";
  } else if (p === "admin.html") out = "{{login}}";
  else if (p.endsWith("/index.html")) out = "{{home}}/" + p.slice(0, -"index.html".length);
  else if (p.endsWith(".html")) out = "{{home}}/" + p.slice(0, -5) + "/";
  else out = "{{home}}/" + p;
  return out + (q ? "?" + q : "") + (hash !== undefined ? "#" + hash : "");
}
const isRel = (u) => u && !/^(?:[a-z][a-z0-9+.-]*:|#|\/|\?|\{\{)/i.test(u);
function convert(html, file) {
  const dir = path.posix.dirname(file);
  const abs = (u) => {
    if (u.startsWith(SITE)) return mapPath(u.slice(SITE.length));
    if (!isRel(u)) return u;
    const [p, ...more] = u.split(/(?=[?#])/);
    const joined = path.posix.normalize(path.posix.join(dir, p));
    return mapPath((joined === "." || joined === "./" ? "" : joined.replace(/^\.\//, "")) + more.join(""));
  };
  return html
    .replace(/(\s(?:href|src|action)=")([^"]*)"/g, (m, a, u) => a + abs(u) + '"')
    .replace(/(\s(?:srcset|imagesrcset)=")([^"]*)"/g, (m, a, v) => a + v.split(",").map((x) => {
      const [u, w] = x.trim().split(/\s+/);
      return abs(u) + (w ? " " + w : "");
    }).join(", ") + '"')
    .replace(/url\((?!["']?(?:data:|https?:|#))(["']?)([^)"']+)\1\)/g, (m, q, u) => "url(" + q + abs(u) + q + ")");
}
const ldConvert = (json) => json.replace(/https:\/\/contactnasriimen-ctrl\.github\.io\/klar-zahn\/([^"\s]*)/g, (m, p) => mapPath(p));

/* ---------- Seite auslesen ---------- */
function extract(file) {
  const html = read(file);
  const meta = (name, attr) => {
    const m = html.match(new RegExp("<meta\\s+" + (attr || "name") + '="' + name + '"\\s+content="([^"]*)"'));
    return m ? decode(m[1]) : "";
  };
  const main = html.match(/<main id="inhalt"([^>]*)>([\s\S]*?)<\/main>/);
  const og = meta("og:image", "property");
  return {
    html,
    title: decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]),
    description: meta("description"),
    keywords: meta("keywords"),
    og: og ? mapPath(og.replace(SITE, "")) : "",
    ld: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => ldConvert(JSON.stringify(JSON.parse(m[1])))),
    body: (html.match(/<body class="([^"]*)"/) || [])[1] || "",
    mainClass: main ? ((main[1].match(/class="([^"]*)"/) || [])[1] || "") : "",
    main: main ? main[2] : ""
  };
}

const pages = [];
function addPage(file, wpPath, title, order, extra) {
  const e = extract(file);
  const content = extra && extra.content !== undefined ? extra.content : convert(e.main, file);
  const meta = {
    _kz_raw: "1", _kz_title: e.title, _kz_desc: e.description, _kz_keywords: e.keywords, _kz_og: e.og,
    _kz_ld: JSON.stringify(e.ld), _kz_body: e.body, _kz_main_class: e.mainClass, _kz_layout: "page"
  };
  Object.assign(meta, (extra && extra.meta) || {});
  const i = wpPath.lastIndexOf("/");
  pages.push({ path: wpPath, slug: wpPath.slice(i + 1), parent: i > 0 ? wpPath.slice(0, i) : "", title, order, content, meta });
}

/* Startseite: Blog-Karten serverseitig aus WordPress-Beiträgen */
const home = convert(extract("index.html").main, "index.html")
  .replace(/<div class="post-grid" data-latest-posts[^>]*>\s*(?:<div class="post-skeleton"><\/div>\s*)+<\/div>/, '<div class="post-grid">{{latest_posts}}</div>');
if (!home.includes("{{latest_posts}}")) throw new Error("Blog-Bereich der Startseite nicht gefunden");
addPage("index.html", "startseite", "Startseite", 0, { content: home, meta: { _kz_layout: "front" } });
addPage("leistungen/index.html", "leistungen", "Leistungen", 1);
let order = 2;
for (const g of CLUSTERS.map((c) => ({ ...c, path: "leistungen/" + c.key })).concat([{ ...LAB, path: LAB.key }])) {
  addPage(g.path + "/index.html", g.path, g.name, order++);
  Object.keys(g.subs).forEach((k, i) => addPage(g.path + "/" + k + "/index.html", g.path + "/" + k, g.subs[k], i + 1));
}
addPage("termin.html", "termin", "Online-Termin", order++, {
  content: convert(extract("termin.html").main, "termin.html").replace("<form class=\"booking-card\" data-booking-form", '<form class="booking-card" data-endpoint="{{rest}}klarzahn/v1/termin" data-booking-form'),
  meta: { _kz_script: "booking" }
});
function legal(file) {
  const m = read(file).match(/<article class="legal">[\s\S]*?<\/article>/);
  if (!m) throw new Error("Rechtstext fehlt: " + file);
  return convert(m[0], file);
}
addPage("impressum.html", "impressum", "Impressum", order++, { content: legal("impressum.html"), meta: { _kz_layout: "legal", _kz_noindex: "1", _kz_body: "legal-page" } });
let datenschutz = legal("datenschutz.html")
  .replace(/<h2>5\. Ratgeber-Artikel[\s\S]*?<\/p>/, "<h2>5. Blog</h2>\n<p>Die Artikel unseres Blogs werden direkt von unserem Webserver ausgeliefert. Dabei werden keine Daten an Dritte übermittelt. Eine Kommentarfunktion gibt es nicht.</p>")
  .replace(/<p>Für die Übermittlung per E-Mail nutzen wir den Dienst FormSubmit[\s\S]*?<\/p>/, "<p>Ihre Anfrage wird von unserem Webserver per E-Mail an das Postfach der Praxis übermittelt und nicht in einer Datenbank gespeichert. Bitte senden Sie über das Formular keine ausführlichen Gesundheitsdaten.</p>")
  .replace("Über das Formular auf termin.html", "Über das Formular auf der Seite „Online-Termin“")
  .replace(/(oder die Website-Daten in Ihrem Browser löschen\.)/, "$1 Nur für angemeldete Redakteurinnen und Redakteure setzt WordPress technisch notwendige Anmelde-Cookies.")
  .replace("Externe Dienste (Google Maps, Ratgeber-Artikel, Online-Terminanfrage)", "Externe Dienste (Google Maps)");
if (/FormSubmit|Firebase/.test(datenschutz)) throw new Error("Datenschutz: FormSubmit/Firebase-Abschnitt nicht ersetzt");
addPage("datenschutz.html", "datenschutz", "Datenschutz", order++, { content: datenschutz, meta: { _kz_layout: "legal", _kz_noindex: "1", _kz_body: "legal-page" } });
pages.push({ path: "blog", slug: "blog", parent: "", title: "Blog", order: order++, content: "", meta: {} });

/* ---------- Kopf und Fuß ---------- */
const termin = read("termin.html");
const cut = (a, b) => { const i = termin.indexOf(a), j = termin.indexOf(b, i); if (i < 0 || j < 0) throw new Error("Nicht gefunden: " + a); return termin.slice(i, j); };
const headerPart = convert(cut("<!-- Icon-Sprite -->", '<main id="inhalt"'), "termin.html");
const footerPart = convert(cut('<footer class="site-footer">', '<script src="assets/js/firebase-config.js"'), "termin.html");

(async () => {
  /* Beispiel-Beiträge aus dem Ratgeber */
  const { STARTER_ARTICLES } = await import(pathToFileURL(path.join(ROOT, "src/cms/starter.js")).href);
  const posts = STARTER_ARTICLES.map((a) => ({
    slug: a.id, title: a.title, excerpt: a.excerpt, category: a.category, tags: a.tags,
    cover: mapPath(a.cover), html: convert(a.html, "index.html"),
    date: new Date(a.publishedAt).toISOString().slice(0, 19).replace("T", " ")
  }));

  /* ---------- Ausgabe ---------- */
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.cpSync(SRC, OUT, { recursive: true });
  fs.mkdirSync(path.join(OUT, "parts"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "data"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "parts/header.html"), headerPart);
  fs.writeFileSync(path.join(OUT, "parts/footer.html"), footerPart);
  fs.writeFileSync(path.join(OUT, "data/pages.json"), JSON.stringify({ version: 1, pages, posts }));
  const copy = (from, to) => fs.cpSync(path.join(ROOT, from), path.join(OUT, to || from), { recursive: true });
  ["assets/style.min.css", "assets/main.min.js", "assets/consent.min.js", "assets/booking.min.js", "assets/js/scenes3d.js", "assets/fonts", "assets/img/3d", "assets/img/og"].forEach((f) => copy(f));
  fs.readdirSync(path.join(ROOT, "assets/img")).filter((f) => /\.(png|webp|jpg)$/.test(f)).forEach((f) => copy("assets/img/" + f));

  const left = pages.map((p) => p.content).join("") + posts.map((p) => p.html).join("") + headerPart + footerPart;
  const bad = left.match(/(?:href|src)="(?!\{\{|https?:|mailto:|tel:|#|data:)[^"]+"/g);
  if (bad) throw new Error("Relative Adressen übrig: " + [...new Set(bad)].slice(0, 5).join(" "));

  const zip = path.join(DIST, "klar-zahn-wordpress-theme.zip");
  fs.rmSync(zip, { force: true });
  execFileSync(process.platform === "win32" ? "C:/Windows/System32/tar.exe" : "zip", process.platform === "win32" ? ["-a", "-cf", zip, "-C", DIST, "klar-zahn"] : ["-qr", zip, "klar-zahn"], { cwd: DIST });
  console.log(pages.length + " Seiten, " + posts.length + " Beiträge → " + path.relative(ROOT, zip) + " (" + Math.round(fs.statSync(zip).size / 1024) + " KB)");
})().catch((e) => { console.error(e); process.exit(1); });
