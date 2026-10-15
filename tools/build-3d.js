/* Bündelt den 3D-Hero (src/3d/hero.js + three.js) zu assets/js/hero3d.js.
   Aufruf: npm run build:3d  (vorher einmalig: npm install) */
const path = require("path");
let esbuild;
try {
  esbuild = require("esbuild");
} catch (e) {
  console.error("esbuild fehlt: bitte zuerst `npm install` ausführen.");
  process.exit(1);
}

esbuild.build({
  entryPoints: [path.join(__dirname, "..", "src", "3d", "hero.js")],
  outfile: path.join(__dirname, "..", "assets", "js", "hero3d.js"),
  bundle: true,
  format: "iife",
  minify: true,
  target: ["es2018"],
  legalComments: "eof",
  logLevel: "info"
}).catch(() => process.exit(1));
