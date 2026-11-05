/* Bündelt die Skripte der Website (Aufruf: npm run build).
   - assets/js/scenes3d.js : 3D-Zahn im Hero und 3D-Implantat im Labor (three.js)
   - assets/js/blog.js     : Ratgeber auf Startseite und ratgeber.html (Firebase Firestore Lite)
   - assets/js/admin.js    : Praxis-Login zum Schreiben der Artikel (Firebase Auth + Firestore Lite) */
const path = require("path");
let esbuild;
try { esbuild = require("esbuild"); } catch (e) { console.error("esbuild fehlt: bitte zuerst `npm install` ausführen."); process.exit(1); }

const root = path.join(__dirname, "..");
const bundles = [
  ["src/3d/scenes.js", "assets/js/scenes3d.js"],
  ["src/cms/blog.js", "assets/js/blog.js"],
  ["src/cms/admin.js", "assets/js/admin.js"]
];

const minified = [
  ["assets/style.css", "assets/style.min.css"],
  ["assets/main.js", "assets/main.min.js"],
  ["assets/booking.js", "assets/booking.min.js"],
  ["assets/consent.js", "assets/consent.min.js"]
];

/* Nicht verwendete CSS-Regeln entfernen (Klassen aus allen Seiten, Skripten und WordPress-Vorlagen bleiben erhalten) */
async function purgeCss() {
  const fs = require("fs");
  const { PurgeCSS } = require("purgecss");
  const file = path.join(root, "assets/style.min.css");
  const before = fs.statSync(file).size;
  const g = (p) => path.join(root, p).replace(/\\/g, "/");
  const [result] = await new PurgeCSS().purge({
    content: [g("*.html"), g("leistungen/**/*.html"), g("praxislabor/**/*.html"), g("assets/main.js"), g("assets/booking.js"), g("assets/consent.js"), g("src/**/*.js"), g("wp/**/*.php")],
    css: [file],
    safelist: {
      standard: [/^is-/, /^has-/, /^tone-/, /^fit-/, /^kz-/, /^no-3d$/, /^rv$/, /^lab-js$/, /^enter-/, /^menu-open$/, /^w$/, /^w-/, /^post-/],
      greedy: [/view-transition/]
    },
    keyframes: false, fontFace: false, variables: false
  });
  fs.writeFileSync(file, result.css);
  console.log("  style.min.css: " + Math.round(before / 1024) + " KB → " + Math.round(result.css.length / 1024) + " KB (ungenutzte Regeln entfernt)");
}

Promise.all(bundles.map(function (b) {
  return esbuild.build({
    entryPoints: [path.join(root, b[0])],
    outfile: path.join(root, b[1]),
    bundle: true, format: "iife", minify: true, target: ["es2018"], legalComments: "eof", logLevel: "info"
  });
}).concat(minified.map(function (f) {
  return esbuild.build({ entryPoints: [path.join(root, f[0])], outfile: path.join(root, f[1]), bundle: false, minify: true, logLevel: "info" });
}))).then(purgeCss).catch(function (e) { console.error(e); process.exit(1); });
