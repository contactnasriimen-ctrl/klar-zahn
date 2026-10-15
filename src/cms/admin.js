/* Praxis-Login: Artikel für den Ratgeber schreiben, veröffentlichen, bearbeiten und löschen. */
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, doc, getDoc, writeBatch } from "firebase/firestore/lite";
import { configured, app, db, ARTICLES, BODIES } from "./firebase.js";
import { STARTER_ARTICLES } from "./starter.js";
import { sanitize, escapeHtml, formatDate, readMinutes, slugify, articleUrl, CATEGORIES, parseTags } from "./content.js";
import { readImage, makeCover, makeInline, kb } from "./images.js";

const $ = function (s, c) { return (c || document).querySelector(s); };
const $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
const LIMIT_KB = 920;

/* ---------- Ansichten ---------- */
function show(view) {
  $$("[data-view]").forEach(function (v) { v.hidden = v.getAttribute("data-view") !== view; });
  window.scrollTo(0, 0);
}

let toastTimer;
function toast(msg, kind) {
  const t = $("[data-toast]");
  t.textContent = msg;
  t.className = "adm-toast" + (kind ? " is-" + kind : "");
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.hidden = true; }, 3600);
}

function errorText(e) {
  const code = (e && e.code) || "";
  if (/invalid-credential|wrong-password|user-not-found|invalid-email/.test(code)) return "E-Mail oder Passwort ist falsch.";
  if (/too-many-requests/.test(code)) return "Zu viele Versuche. Bitte warten Sie einige Minuten.";
  if (/network-request-failed|unavailable/.test(code)) return "Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung.";
  if (/permission-denied/.test(code)) return "Keine Berechtigung. Ist Ihr Konto als Admin eingetragen?";
  return (e && e.message) || "Unbekannter Fehler.";
}

if (!configured) {
  show("setup");
} else {
  start();
}

function start() {
  const auth = getAuth(app);
  let articles = [];
  let current = null;
  let dirty = false;
  let cover = { cover: "", thumb: "", fit: "cover" };

  /* ---------- Anmeldung ---------- */
  const loginForm = $("[data-login-form]");
  const loginError = $("[data-login-error]");
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    loginError.hidden = true;
    const btn = $("button[type=submit]", loginForm);
    btn.disabled = true;
    try {
      await signInWithEmailAndPassword(auth, $("#login-email").value.trim(), $("#login-password").value);
    } catch (err) {
      loginError.textContent = errorText(err);
      loginError.hidden = false;
    } finally {
      btn.disabled = false;
    }
  });
  $("[data-reset]").addEventListener("click", async function () {
    const email = $("#login-email").value.trim();
    loginError.hidden = true;
    if (!email) { loginError.textContent = "Bitte zuerst Ihre E-Mail-Adresse eingeben."; loginError.hidden = false; return; }
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Wir haben Ihnen eine E-Mail zum Zurücksetzen des Passworts geschickt.", "ok");
    } catch (err) {
      loginError.textContent = errorText(err);
      loginError.hidden = false;
    }
  });
  $$("[data-logout]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (dirty && !confirmLeave()) return;
      dirty = false;
      signOut(auth);
    });
  });

  onAuthStateChanged(auth, async function (user) {
    const userBox = $("[data-user]");
    if (!user) {
      userBox.hidden = true;
      show("login");
      return;
    }
    $("[data-user-email]").textContent = user.email || "";
    userBox.hidden = false;
    let isAdmin = false;
    try { isAdmin = (await getDoc(doc(db, "admins", user.uid))).exists(); } catch (e) { isAdmin = false; }
    if (!isAdmin) {
      $("[data-uid]").textContent = user.uid;
      show("noaccess");
      return;
    }
    await loadList();
  });

  /* ---------- Übersicht ---------- */
  async function loadList() {
    show("list");
    const box = $("[data-list]");
    box.innerHTML = '<p class="adm-muted">Artikel werden geladen …</p>';
    try {
      const snap = await getDocs(collection(db, ARTICLES));
      articles = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
        .sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    } catch (e) {
      box.innerHTML = '<p class="adm-error">' + escapeHtml(errorText(e)) + "</p>";
      return;
    }
    renderList();
  }

  function renderList() {
    const box = $("[data-list]");
    const pub = articles.filter(function (a) { return a.status === "published"; }).length;
    $("[data-stat-pub]").textContent = pub;
    $("[data-stat-draft]").textContent = articles.length - pub;
    $("[data-stat-last]").textContent = articles[0] ? formatDate(articles[0].updatedAt) : "–";
    $("[data-empty]").hidden = articles.length > 0;
    box.hidden = articles.length === 0;
    box.innerHTML = articles.map(function (a) {
      const thumb = a.coverThumb || a.cover || "";
      return '<div class="adm-row" data-id="' + escapeHtml(a.id) + '">' +
        '<div class="adm-thumb tone-' + escapeHtml(a.tone || "night") + '">' + (thumb ? '<img class="' + (a.coverFit === "contain" ? "fit-contain" : "fit-cover") + '" src="' + escapeHtml(thumb) + '" alt="">' : "") + "</div>" +
        '<div class="adm-row-main"><strong>' + escapeHtml(a.title || "Ohne Titel") + "</strong>" +
        "<span>" + escapeHtml(a.category || "") + " · " + escapeHtml(formatDate(a.publishedAt)) + "</span></div>" +
        '<span class="adm-pill ' + (a.status === "published" ? "is-pub" : "is-draft") + '">' + (a.status === "published" ? "Veröffentlicht" : "Entwurf") + "</span>" +
        '<div class="adm-row-actions">' +
          '<button class="adm-btn adm-btn-soft" type="button" data-edit>Bearbeiten</button>' +
          (a.status === "published" ? '<a class="adm-btn adm-btn-ghost" href="' + articleUrl(a.id) + '" target="_blank" rel="noopener">Ansehen</a>' : "") +
          '<button class="adm-btn adm-btn-ghost adm-danger" type="button" data-delete>Löschen</button>' +
        "</div>" +
        '<div class="adm-confirm" hidden><span>Diesen Artikel endgültig löschen?</span>' +
          '<button class="adm-btn adm-btn-danger" type="button" data-delete-yes>Ja, löschen</button>' +
          '<button class="adm-btn adm-btn-ghost" type="button" data-delete-no>Abbrechen</button></div>' +
      "</div>";
    }).join("");
  }

  $("[data-list]").addEventListener("click", async function (e) {
    const row = e.target.closest(".adm-row");
    if (!row) return;
    const id = row.getAttribute("data-id");
    if (e.target.closest("[data-edit]")) { openEditor(articles.filter(function (a) { return a.id === id; })[0]); return; }
    if (e.target.closest("[data-delete]")) { $(".adm-confirm", row).hidden = false; return; }
    if (e.target.closest("[data-delete-no]")) { $(".adm-confirm", row).hidden = true; return; }
    if (e.target.closest("[data-delete-yes]")) {
      try {
        const batch = writeBatch(db);
        batch.delete(doc(db, ARTICLES, id));
        batch.delete(doc(db, BODIES, id));
        await batch.commit();
        articles = articles.filter(function (a) { return a.id !== id; });
        renderList();
        toast("Artikel gelöscht.", "ok");
      } catch (err) { toast(errorText(err), "error"); }
    }
  });

  $$("[data-new]").forEach(function (b) { b.addEventListener("click", function () { openEditor(null); }); });

  $("[data-import]").addEventListener("click", async function () {
    const btn = this;
    btn.disabled = true;
    try {
      const batch = writeBatch(db);
      const now = Date.now();
      STARTER_ARTICLES.forEach(function (a) {
        batch.set(doc(db, ARTICLES, a.id), {
          title: a.title, category: a.category, excerpt: a.excerpt, coverThumb: a.cover, coverFit: a.coverFit, tone: a.tone,
          status: "published", publishedAt: a.publishedAt, updatedAt: now, author: a.author, tags: a.tags || []
        });
        batch.set(doc(db, BODIES, a.id), { status: "published", html: a.html, cover: a.cover });
      });
      await batch.commit();
      toast("Beispielartikel übernommen. Sie können sie jetzt bearbeiten.", "ok");
      await loadList();
    } catch (err) { toast(errorText(err), "error"); }
    btn.disabled = false;
  });

  /* ---------- Editor ---------- */
  const editor = $("[data-editor]");
  const titleIn = $("#post-title");
  const excerptIn = $("#post-excerpt");
  const catIn = $("#post-category");
  const dateIn = $("#post-date");
  const authorIn = $("#post-author");
  const tagsIn = $("#post-tags");
  catIn.innerHTML = CATEGORIES.map(function (c) { return "<option>" + escapeHtml(c) + "</option>"; }).join("");
  try { document.execCommand("defaultParagraphSeparator", false, "p"); } catch (e) { /* ältere Browser */ }

  function toDateInput(ms) {
    const d = new Date(ms || Date.now());
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  async function openEditor(meta) {
    if (dirty && !confirmLeave()) return;
    current = meta ? Object.assign({}, meta) : null;
    titleIn.value = meta ? meta.title || "" : "";
    excerptIn.value = meta ? meta.excerpt || "" : "";
    catIn.value = meta && meta.category ? meta.category : CATEGORIES[0];
    dateIn.value = toDateInput(meta ? meta.publishedAt : Date.now());
    authorIn.value = meta && meta.author ? meta.author : "Mikel Salloum";
    tagsIn.value = meta && meta.tags ? meta.tags.map(function (t) { return "#" + t; }).join(" ") : "#ZahnarztMörfeldenWalldorf";
    cover = { cover: "", thumb: meta ? meta.coverThumb || "" : "", fit: meta && meta.coverFit === "contain" ? "contain" : "cover" };
    editor.innerHTML = meta ? "<p>Inhalt wird geladen …</p>" : "<p></p>";
    $("[data-editor-title]").textContent = meta ? "Artikel bearbeiten" : "Neuer Artikel";
    show("editor");
    if (meta) {
      try {
        const body = await getDoc(doc(db, BODIES, meta.id));
        const data = body.exists() ? body.data() : {};
        editor.innerHTML = sanitize(data.html || "") || "<p></p>";
        cover.cover = data.cover || "";
      } catch (err) { toast(errorText(err), "error"); }
    }
    dirty = false;
    refreshEditorState();
  }

  function refreshEditorState() {
    const status = current ? current.status : "new";
    const pill = $("[data-editor-status]");
    pill.textContent = status === "published" ? "Veröffentlicht" : status === "draft" ? "Entwurf" : "Noch nicht gespeichert";
    pill.className = "adm-pill " + (status === "published" ? "is-pub" : "is-draft");
    $("[data-publish]").textContent = status === "published" ? "Änderungen veröffentlichen" : "Veröffentlichen";
    $("[data-unpublish]").hidden = status !== "published";
    $("[data-view-live]").hidden = status !== "published";
    if (current) $("[data-view-live]").href = articleUrl(current.id);
    const prev = $("[data-cover-preview]");
    const src = cover.cover || cover.thumb;
    prev.innerHTML = src ? '<img class="' + (cover.fit === "contain" ? "fit-contain" : "fit-cover") + '" src="' + escapeHtml(src) + '" alt="">' : '<span>Noch kein Titelbild</span>';
    $("[data-cover-remove]").hidden = !src;
    $("[data-excerpt-count]").textContent = excerptIn.value.length + " / 220";
    updateSize();
  }

  function updateSize() {
    const size = kb(editor.innerHTML) + kb(cover.cover) + 2;
    const meter = $("[data-size]");
    meter.querySelector("span").style.width = Math.min(100, (size / LIMIT_KB) * 100) + "%";
    meter.classList.toggle("is-full", size > LIMIT_KB);
    $("[data-size-label]").textContent = size + " KB von " + LIMIT_KB + " KB (Text und Bilder)";
    return size;
  }

  [titleIn, excerptIn, catIn, dateIn, authorIn, tagsIn].forEach(function (el) {
    el.addEventListener("input", function () { dirty = true; if (el === excerptIn) $("[data-excerpt-count]").textContent = excerptIn.value.length + " / 220"; });
  });
  editor.addEventListener("input", function () { dirty = true; updateSize(); });

  /* Formatierungsleiste */
  let savedRange = null;
  function saveRange() {
    const sel = window.getSelection();
    if (sel.rangeCount && editor.contains(sel.anchorNode)) savedRange = sel.getRangeAt(0).cloneRange();
  }
  function restoreRange() {
    editor.focus();
    if (!savedRange) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange);
  }
  editor.addEventListener("keyup", saveRange);
  editor.addEventListener("mouseup", saveRange);
  editor.addEventListener("blur", saveRange);

  $("[data-toolbar]").addEventListener("mousedown", function (e) { if (e.target.closest("button")) e.preventDefault(); });
  $("[data-toolbar]").addEventListener("click", function (e) {
    const b = e.target.closest("button[data-cmd]");
    if (!b) return;
    const cmd = b.getAttribute("data-cmd"), val = b.getAttribute("data-val");
    restoreRange();
    if (cmd === "link") { openLinkBar(); return; }
    if (cmd === "image") { $("#inline-image").click(); return; }
    if (cmd === "formatBlock") document.execCommand("formatBlock", false, val);
    else document.execCommand(cmd, false, null);
    dirty = true;
    saveRange();
  });

  const linkBar = $("[data-linkbar]");
  function openLinkBar() {
    linkBar.hidden = false;
    $("#link-url").value = "https://";
    $("#link-url").focus();
  }
  $("[data-link-apply]").addEventListener("click", function () {
    const url = $("#link-url").value.trim();
    linkBar.hidden = true;
    restoreRange();
    if (url && url !== "https://") { document.execCommand("createLink", false, url); dirty = true; }
  });
  $("[data-link-cancel]").addEventListener("click", function () { linkBar.hidden = true; restoreRange(); });

  $("#inline-image").addEventListener("change", async function () {
    const file = this.files[0];
    this.value = "";
    if (!file) return;
    try {
      const img = await readImage(file);
      const data = makeInline(img);
      restoreRange();
      document.execCommand("insertHTML", false, '<p><img src="' + data + '" alt=""></p>');
      dirty = true;
      if (updateSize() > LIMIT_KB) toast("Der Artikel ist jetzt zu groß. Bitte ein Bild entfernen oder kleinere Bilder verwenden.", "error");
    } catch (err) { toast(err.message, "error"); }
  });

  editor.addEventListener("paste", function (e) {
    const data = e.clipboardData;
    if (!data) return;
    e.preventDefault();
    const html = data.getData("text/html");
    if (html) {
      document.execCommand("insertHTML", false, sanitize(html));
    } else {
      const text = data.getData("text/plain");
      const parts = text.split(/\n{2,}/).map(function (p) { return "<p>" + escapeHtml(p).replace(/\n/g, "<br>") + "</p>"; });
      document.execCommand("insertHTML", false, parts.join(""));
    }
    dirty = true;
    updateSize();
  });

  /* Titelbild */
  const drop = $("[data-cover-drop]");
  async function takeCover(file) {
    try {
      const img = await readImage(file);
      const res = makeCover(img);
      cover = { cover: res.cover, thumb: res.thumb, fit: "cover" };
      dirty = true;
      refreshEditorState();
    } catch (err) { toast(err.message, "error"); }
  }
  $("#cover-file").addEventListener("change", function () { if (this.files[0]) takeCover(this.files[0]); this.value = ""; });
  ["dragenter", "dragover"].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add("is-over"); }); });
  ["dragleave", "drop"].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove("is-over"); }); });
  drop.addEventListener("drop", function (e) { const f = e.dataTransfer.files[0]; if (f) takeCover(f); });
  $("[data-cover-remove]").addEventListener("click", function () { cover = { cover: "", thumb: "", fit: "cover" }; dirty = true; refreshEditorState(); });

  /* Speichern */
  async function uniqueId(base) {
    let id = base, n = 2;
    while ((await getDoc(doc(db, ARTICLES, id))).exists()) { id = base + "-" + n; n++; }
    return id;
  }

  async function save(mode) {
    const title = titleIn.value.trim();
    if (!title) { toast("Bitte geben Sie einen Titel ein.", "error"); titleIn.focus(); return; }
    const html = sanitize(editor.innerHTML);
    if (!html.replace(/<[^>]+>/g, "").trim() && html.indexOf("<img") === -1) { toast("Bitte schreiben Sie zuerst einen Text.", "error"); editor.focus(); return; }
    if (updateSize() > LIMIT_KB) { toast("Der Artikel ist zu groß. Bitte weniger oder kleinere Bilder verwenden.", "error"); return; }
    const buttons = $$("[data-publish], [data-save-draft], [data-unpublish]");
    buttons.forEach(function (b) { b.disabled = true; });
    try {
      const id = current ? current.id : await uniqueId(slugify(title));
      const status = mode === "publish" ? "published" : "draft";
      const dateMs = dateIn.value ? new Date(dateIn.value + "T09:00:00").getTime() : Date.now();
      const meta = {
        title: title,
        category: catIn.value,
        excerpt: excerptIn.value.trim().slice(0, 220),
        coverThumb: cover.thumb || cover.cover || "",
        coverFit: cover.fit,
        tone: current && current.tone ? current.tone : "night",
        status: status,
        publishedAt: dateMs,
        updatedAt: Date.now(),
        author: authorIn.value.trim() || "Mikel Salloum",
        tags: parseTags(tagsIn.value),
        readMinutes: readMinutes(html)
      };
      const batch = writeBatch(db);
      batch.set(doc(db, ARTICLES, id), meta);
      batch.set(doc(db, BODIES, id), { status: status, html: html, cover: cover.cover || cover.thumb || "" });
      await batch.commit();
      current = Object.assign({ id: id }, meta);
      const idx = articles.findIndex(function (a) { return a.id === id; });
      if (idx >= 0) articles[idx] = current; else articles.unshift(current);
      articles.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
      dirty = false;
      refreshEditorState();
      toast(status === "published" ? "Veröffentlicht. Der Artikel ist jetzt auf der Website sichtbar." : "Als Entwurf gespeichert.", "ok");
    } catch (err) {
      toast(errorText(err), "error");
    }
    buttons.forEach(function (b) { b.disabled = false; });
  }
  $("[data-publish]").addEventListener("click", function () { save("publish"); });
  $("[data-save-draft]").addEventListener("click", function () { save("draft"); });
  $("[data-unpublish]").addEventListener("click", function () { save("draft"); });

  function confirmLeave() {
    return window.confirm("Ihre Änderungen sind noch nicht gespeichert. Trotzdem verlassen?");
  }
  $$("[data-back]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (dirty && !confirmLeave()) return;
      dirty = false;
      renderList();
      show("list");
    });
  });
  window.addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

  /* Vorschau */
  const modal = $("[data-preview]");
  $("[data-preview-open]").addEventListener("click", function () {
    const html = sanitize(editor.innerHTML);
    const src = cover.cover || cover.thumb;
    $("[data-preview-body]").innerHTML =
      '<div class="post-meta"><span class="post-cat">' + escapeHtml(catIn.value) + "</span><time>" +
      escapeHtml(formatDate(dateIn.value ? new Date(dateIn.value + "T09:00:00").getTime() : Date.now())) + "</time><span>" + readMinutes(html) + " Min. Lesezeit</span></div>" +
      "<h1>" + escapeHtml(titleIn.value || "Ohne Titel") + "</h1>" +
      (excerptIn.value ? '<p class="post-lead">' + escapeHtml(excerptIn.value) + "</p>" : "") +
      (src ? '<div class="post-hero tone-night"><img class="' + (cover.fit === "contain" ? "fit-contain" : "fit-cover") + '" src="' + escapeHtml(src) + '" alt=""></div>' : "") +
      '<div class="prose">' + html + "</div>" +
      (parseTags(tagsIn.value).length ? '<div class="post-tags">' + parseTags(tagsIn.value).map(function (t) { return "<a>#" + escapeHtml(t) + "</a>"; }).join("") + "</div>" : "");
    modal.hidden = false;
    document.documentElement.style.overflow = "hidden";
  });
  $$("[data-preview-close]").forEach(function (b) {
    b.addEventListener("click", function () { modal.hidden = true; document.documentElement.style.overflow = ""; });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) { modal.hidden = true; document.documentElement.style.overflow = ""; } });
}
