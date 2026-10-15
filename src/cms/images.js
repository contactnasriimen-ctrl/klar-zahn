/* Bilder im Browser verkleinern und komprimieren (kein Firebase Storage nötig). */

export function readImage(file) {
  return new Promise(function (resolve, reject) {
    if (!file || !/^image\//.test(file.type)) { reject(new Error("Bitte eine Bilddatei wählen (JPG, PNG oder WebP).")); return; }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Das Bild konnte nicht gelesen werden.")); };
    img.src = url;
  });
}

function encode(canvas, quality) {
  let data = canvas.toDataURL("image/webp", quality);
  if (data.indexOf("data:image/webp") !== 0) data = canvas.toDataURL("image/jpeg", quality);
  return data;
}

/** Titelbild im Format 16:9, groß und als Vorschaubild. */
export function makeCover(img) {
  const ratio = 16 / 9;
  let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
  if (sw / sh > ratio) { const nw = sh * ratio; sx = (sw - nw) / 2; sw = nw; }
  else { const nh = sw / ratio; sy = (sh - nh) / 2; sh = nh; }
  function make(width, quality) {
    const c = document.createElement("canvas");
    c.width = Math.round(Math.min(width, sw));
    c.height = Math.round(c.width / ratio);
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
    return encode(c, quality);
  }
  return { cover: make(1600, 0.8), thumb: make(720, 0.74) };
}

/** Bild im Text: maximal 1200 px breit. */
export function makeInline(img) {
  const scale = Math.min(1, 1200 / img.naturalWidth);
  const c = document.createElement("canvas");
  c.width = Math.round(img.naturalWidth * scale);
  c.height = Math.round(img.naturalHeight * scale);
  const ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, c.width, c.height);
  return encode(c, 0.78);
}

export function kb(str) { return Math.round((str || "").length / 1024); }
