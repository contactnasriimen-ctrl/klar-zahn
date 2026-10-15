/* Ratgeber auf der Website: neueste Artikel auf der Startseite, Übersicht und Artikelansicht auf ratgeber.html. */
import { configured, listPublished, getPublished } from "./firebase.js";
import { STARTER_ARTICLES } from "./starter.js";
import { sanitize, escapeHtml, formatDate, readMinutes, cardHtml, tagsHtml } from "./content.js";

const SITE = "https://contactnasriimen-ctrl.github.io/klar-zahn/";

function setMeta(name, content) {
  let m = document.querySelector('meta[name="' + name + '"]');
  if (!m) { m = document.createElement("meta"); m.setAttribute("name", name); document.head.appendChild(m); }
  m.setAttribute("content", content);
}

function addArticleLd(a, cover) {
  const ld = {
    "@context": "https://schema.org", "@type": "Article",
    headline: a.title, description: a.excerpt || "",
    datePublished: new Date(a.publishedAt || Date.now()).toISOString(),
    author: { "@type": "Person", name: a.author || "Mikel Salloum" },
    publisher: { "@type": "Dentist", name: "Klar Zahn – Zahnmedizin & Zahntechnik", telephone: "+49 6105 23604" },
    keywords: (a.tags || []).join(", "),
    mainEntityOfPage: SITE + "ratgeber.html?artikel=" + encodeURIComponent(a.id)
  };
  if (cover && cover.indexOf("data:") !== 0) ld.image = SITE + cover;
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

function bindTilt(root) {
  if (window.KZ && window.KZ.bindTilt) root.querySelectorAll("[data-tilt]").forEach(window.KZ.bindTilt);
}

async function loadList() {
  if (!configured) return STARTER_ARTICLES.slice();
  try { return await listPublished(); }
  catch (e) { console.warn("Ratgeber konnte nicht geladen werden", e); return null; }
}

async function loadArticle(id) {
  if (!configured) return STARTER_ARTICLES.filter(function (a) { return a.id === id; })[0] || null;
  return getPublished(id);
}

/* ---------- Startseite: neueste drei Artikel ---------- */
async function initLatest() {
  const grid = document.querySelector("[data-latest-posts]");
  if (!grid) return;
  const list = await loadList();
  const section = grid.closest("section");
  if (!list || !list.length) {
    if (section) section.hidden = true;
    document.querySelectorAll('a[href="#ratgeber"]').forEach(function (a) { a.setAttribute("href", "ratgeber.html"); });
    return;
  }
  grid.innerHTML = list.slice(0, 3).map(cardHtml).join("");
  grid.setAttribute("aria-busy", "false");
  bindTilt(grid);
}

/* ---------- ratgeber.html ---------- */
async function initPage() {
  const page = document.querySelector("[data-blog]");
  if (!page) return;
  const listView = page.querySelector("[data-blog-list]");
  const articleView = page.querySelector("[data-blog-article]");
  const grid = page.querySelector("[data-blog-grid]");
  const filters = page.querySelector("[data-blog-filters]");
  const empty = page.querySelector("[data-blog-empty]");
  const params = new URLSearchParams(location.search);
  const id = params.get("artikel");

  if (id) {
    listView.hidden = true;
    articleView.hidden = false;
    const a = await loadArticle(id);
    if (!a) {
      articleView.innerHTML = '<div class="post-missing"><h1>Artikel nicht gefunden</h1><p>Dieser Artikel ist nicht (mehr) verfügbar.</p><a class="btn btn-glow" href="ratgeber.html">Zur Übersicht</a></div>';
      return;
    }
    document.title = a.title + " | Ratgeber | Klar Zahn Mörfelden-Walldorf";
    if (a.excerpt) setMeta("description", a.excerpt);
    if (a.tags && a.tags.length) setMeta("keywords", a.tags.join(", "));
    addArticleLd(a, a.cover || a.coverThumb || "");
    const html = sanitize(a.html || "");
    const cover = a.cover || a.coverThumb || "";
    articleView.innerHTML =
      '<a class="post-back" href="ratgeber.html"><svg class="ico"><use href="#i-arrow"/></svg>Alle Artikel</a>' +
      '<header class="post-head">' +
        '<div class="post-meta"><span class="post-cat">' + escapeHtml(a.category || "Ratgeber") + "</span>" +
        "<time>" + escapeHtml(formatDate(a.publishedAt)) + "</time>" +
        "<span>" + readMinutes(html) + " Min. Lesezeit</span></div>" +
        "<h1>" + escapeHtml(a.title) + "</h1>" +
        (a.excerpt ? '<p class="post-lead">' + escapeHtml(a.excerpt) + "</p>" : "") +
      "</header>" +
      (cover ? '<div class="post-hero tone-' + escapeHtml(a.tone || "night") + '"><img class="' + (a.coverFit === "contain" ? "fit-contain" : "fit-cover") + '" src="' + escapeHtml(cover) + '" alt=""></div>' : "") +
      '<div class="prose">' + html + "</div>" +
      tagsHtml(a.tags) +
      '<aside class="post-cta"><div><strong>Fragen zu diesem Thema?</strong><span>Wir beraten Sie gerne persönlich in unserer Praxis.</span></div>' +
      '<a class="btn btn-glow" href="tel:+49610523604"><svg class="ico"><use href="#i-phone"/></svg>06105 / 23604</a></aside>' +
      '<p class="post-author">Veröffentlicht von ' + escapeHtml(a.author || "Praxis Klar Zahn") + "</p>";
    return;
  }

  let list = await loadList();
  grid.setAttribute("aria-busy", "false");
  const tag = params.get("tag");
  if (tag && list) {
    list = list.filter(function (a) { return (a.tags || []).some(function (t) { return t.toLowerCase() === tag.toLowerCase(); }); });
    const head = document.createElement("div");
    head.className = "post-tags tag-head";
    head.innerHTML = '<span class="tag-current">#' + escapeHtml(tag) + '</span><a href="ratgeber.html">Alle Artikel anzeigen</a>';
    grid.parentNode.insertBefore(head, grid);
  }
  if (!list || !list.length) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  const cats = [];
  list.forEach(function (a) { if (a.category && cats.indexOf(a.category) === -1) cats.push(a.category); });
  let active = "Alle";
  function render() {
    const shown = active === "Alle" ? list : list.filter(function (a) { return a.category === active; });
    grid.innerHTML = shown.map(cardHtml).join("");
    bindTilt(grid);
  }
  if (filters && cats.length > 1) {
    filters.innerHTML = ["Alle"].concat(cats).map(function (c) {
      return '<button type="button" class="chip-filter' + (c === active ? " is-active" : "") + '" data-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      active = b.getAttribute("data-cat");
      filters.querySelectorAll("[data-cat]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      render();
    });
  }
  render();
}

initLatest();
initPage();
