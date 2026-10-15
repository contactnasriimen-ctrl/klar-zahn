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

Promise.all(bundles.map(function (b) {
  return esbuild.build({
    entryPoints: [path.join(root, b[0])],
    outfile: path.join(root, b[1]),
    bundle: true, format: "iife", minify: true, target: ["es2018"], legalComments: "eof", logLevel: "info"
  });
})).catch(function () { process.exit(1); });
