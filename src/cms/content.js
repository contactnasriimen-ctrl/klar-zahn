/* Hilfsfunktionen für Artikel: HTML bereinigen, Datum, Lesedauer, Karten. */

const ALLOWED = {
  P: [], H2: [], H3: [], STRONG: [], EM: [], U: [], UL: [], OL: [], LI: [], BLOCKQUOTE: [],
  A: ["href"], IMG: ["src", "alt"], BR: [], FIGURE: [], FIGCAPTION: []
};
const RENAME = { DIV: "P", H1: "H2", H4: "H3", H5: "H3", H6: "H3", B: "STRONG", I: "EM" };
const DROP = { SCRIPT: 1, STYLE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, FORM: 1, INPUT: 1, BUTTON: 1, META: 1, LINK: 1, SVG: 1, VIDEO: 1, AUDIO: 1 };

/** Erlaubt nur einfache Textformatierung, Links und Bilder. */
export function sanitize(html) {
  const docu = new DOMParser().parseFromString("<div>" + (html || "") + "</div>", "text/html");
  const root = docu.body.firstChild;
  (function clean(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 3) return;
      if (child.nodeType !== 1) { child.remove(); return; }
      let el = child;
      const tag = el.tagName;
      if (DROP[tag]) { el.remove(); return; }
      if (RENAME[tag]) {
        const repl = docu.createElement(RENAME[tag]);
        while (el.firstChild) repl.appendChild(el.firstChild);
        el.replaceWith(repl);
        el = repl;
      }
      if (!ALLOWED[el.tagName]) {
        clean(el);
        while (el.firstChild) node.insertBefore(el.firstChild, el);
        el.remove();
        return;
      }
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        if (ALLOWED[el.tagName].indexOf(a.name) === -1) el.removeAttribute(a.name);
      });
      if (el.tagName === "A") {
        const href = el.getAttribute("href") || "";
        if (!/^(https?:|mailto:|tel:|#|[a-z0-9_-]+\.html)/i.test(href)) el.removeAttribute("href");
        else if (/^https?:/i.test(href)) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      }
      if (el.tagName === "IMG") {
        const src = el.getAttribute("src") || "";
        if (!/^(data:image\/(png|jpe?g|webp|gif);base64,|assets\/|https:\/\/)/i.test(src)) { el.remove(); return; }
        el.setAttribute("loading", "lazy");
        if (!el.getAttribute("alt")) el.setAttribute("alt", "");
      }
      clean(el);
    });
  })(root);
  // leere Absätze entfernen
  Array.prototype.slice.call(root.querySelectorAll("p")).forEach(function (p) {
    if (!p.textContent.trim() && !p.querySelector("img")) p.remove();
  });
  return root.innerHTML;
}

export function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

export function formatDate(ms) {
  if (!ms) return "";
  try { return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(ms)); }
  catch (e) { return new Date(ms).toLocaleDateString(); }
}

export function readMinutes(html) {
  const text = String(html || "").replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(title) {
  return String(title || "").toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "artikel";
}

export function articleUrl(id) { return "ratgeber.html?artikel=" + encodeURIComponent(id); }

/** Karte für die Artikelübersicht. */
export function cardHtml(a) {
  const cover = a.coverThumb || a.cover || "";
  const fit = a.coverFit === "contain" ? "fit-contain" : "fit-cover";
  return '<article class="post-card" data-tilt>' +
    '<a class="post-link" href="' + articleUrl(a.id) + '">' +
      '<div class="post-cover tone-' + escapeHtml(a.tone || "night") + '">' +
        (cover ? '<img class="' + fit + '" src="' + escapeHtml(cover) + '" alt="" loading="lazy">' : "") +
        '<span class="post-glare" aria-hidden="true"></span>' +
      "</div>" +
      '<div class="post-body">' +
        '<div class="post-meta"><span class="post-cat">' + escapeHtml(a.category || "Ratgeber") + "</span>" +
        "<time>" + escapeHtml(formatDate(a.publishedAt)) + "</time></div>" +
        "<h3>" + escapeHtml(a.title) + "</h3>" +
        "<p>" + escapeHtml(a.excerpt || "") + "</p>" +
        '<span class="post-more">Weiterlesen<svg class="ico"><use href="#i-arrow"/></svg></span>' +
      "</div>" +
    "</a></article>";
}

export const CATEGORIES = ["Vorsorge", "Zahnersatz", "Implantologie", "Angstfrei", "Kinder", "Ästhetik", "Praxis-News"];
