/* Klar Zahn – Online-Terminanfrage (termin.html)
   Schritte: Leistung → Datum & Uhrzeit → Kontaktdaten → Prüfen & Senden.
   Versand per FormSubmit an Kontakt@klar-zahn.de (siehe TERMIN.md). */
(function () {
  "use strict";

  var ENDPOINT = "https://formsubmit.co/ajax/Kontakt@klar-zahn.de";
  var MAIL = "Kontakt@klar-zahn.de";
  /* Sprechzeiten in Minuten (wie auf der Startseite): Tag 0 = Sonntag */
  var HOURS = {
    1: [[540, 780], [840, 1080]],
    2: [[540, 780], [840, 1140]],
    3: [[810, 1170]],
    4: [[540, 780], [840, 1080]],
    5: [[540, 780]]
  };
  var SLOT = 30, LEAD_MIN = 120, DAYS_AHEAD = 70;
  var MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  var form = document.querySelector("[data-booking-form]");
  if (!form) return;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Zustand ---------- */
  var state = { step: 1, service: "", serviceLabel: "", patient: "Neupatient", date: null, time: "", flexible: false };

  /* ---------- Berliner Zeit ---------- */
  function berlinNow() {
    try {
      var p = {};
      new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      return { y: +p.year, m: +p.month - 1, d: +p.day, min: +p.hour * 60 + +p.minute };
    } catch (e) {
      var n = new Date();
      return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), min: n.getHours() * 60 + n.getMinutes() };
    }
  }
  var now = berlinNow();
  var today = new Date(now.y, now.m, now.d);
  var lastDay = new Date(now.y, now.m, now.d + DAYS_AHEAD);
  function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function fmtTime(min) { var h = Math.floor(min / 60), m = min % 60; return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
  function fmtDate(d) { return d ? DAYS[d.getDay()] + ", " + d.getDate() + ". " + MONTHS[d.getMonth()] + " " + d.getFullYear() : ""; }

  function slotsFor(d) {
    var ranges = HOURS[d.getDay()] || [], out = [];
    var minStart = sameDay(d, today) ? now.min + LEAD_MIN : 0;
    ranges.forEach(function (r) {
      for (var t = r[0]; t + SLOT <= r[1]; t += SLOT) if (t >= minStart) out.push(t);
    });
    return out;
  }
  function dayOpen(d) { return d >= today && d <= lastDay && slotsFor(d).length > 0; }

  /* ---------- Schritte ---------- */
  var steps = $$("[data-step]", form);
  var progress = $$("[data-progress-step]");
  var btnBack = $("[data-back]", form), btnNext = $("[data-next]", form), btnSend = $("[data-send]", form);
  var errorBox = $("[data-form-error]", form);

  function showStep(n, dir) {
    state.step = n;
    steps.forEach(function (s) {
      var k = +s.getAttribute("data-step");
      s.hidden = k !== n;
      s.classList.remove("enter-next", "enter-prev");
      if (k === n && !reduce) { void s.offsetWidth; s.classList.add(dir < 0 ? "enter-prev" : "enter-next"); }
    });
    progress.forEach(function (p) {
      var k = +p.getAttribute("data-progress-step");
      p.classList.toggle("is-done", k < n);
      p.classList.toggle("is-current", k === n);
      if (k === n) p.setAttribute("aria-current", "step"); else p.removeAttribute("aria-current");
    });
    form.style.setProperty("--progress", ((n - 1) / (steps.length - 1)).toFixed(3));
    btnBack.hidden = n === 1;
    btnNext.hidden = n === steps.length;
    btnSend.hidden = n !== steps.length;
    errorBox.hidden = true;
    if (n === 4) renderReview();
    var head = $("[data-step='" + n + "'] h2", form);
    if (head && dir) { head.setAttribute("tabindex", "-1"); head.focus({ preventScroll: true }); }
    if (dir) { var top = form.getBoundingClientRect().top + window.scrollY - 110; if (window.scrollY > top) window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" }); }
  }

  function fail(msg, field) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
    if (!reduce) { form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake"); }
    return false;
  }

  function validate(n) {
    $$("[aria-invalid]", form).forEach(function (el) { el.removeAttribute("aria-invalid"); });
    if (n === 1 && !state.service) return fail("Bitte wählen Sie eine Leistung aus.", $("input[name=leistung]", form));
    if (n === 2 && !state.flexible && (!state.date || !state.time)) return fail(state.date ? "Bitte wählen Sie eine Uhrzeit." : "Bitte wählen Sie einen Tag im Kalender.");
    if (n === 3) {
      var first = $("#b-vorname"), last = $("#b-nachname"), phone = $("#b-telefon"), mail = $("#b-email"), ok = $("#b-datenschutz");
      if (!first.value.trim()) return fail("Bitte geben Sie Ihren Vornamen ein.", first);
      if (!last.value.trim()) return fail("Bitte geben Sie Ihren Nachnamen ein.", last);
      if ((phone.value.match(/\d/g) || []).length < 6) return fail("Bitte geben Sie eine Telefonnummer ein, unter der wir Sie erreichen.", phone);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) return fail("Bitte geben Sie eine gültige E-Mail-Adresse ein.", mail);
      if (!ok.checked) return fail("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.", ok);
    }
    return true;
  }

  btnNext.addEventListener("click", function () { if (validate(state.step)) showStep(state.step + 1, 1); });
  btnBack.addEventListener("click", function () { showStep(state.step - 1, -1); });
  $$("[data-goto]", form).forEach(function (b) { b.addEventListener("click", function () { showStep(+b.getAttribute("data-goto"), -1); }); });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid")) e.target.removeAttribute("aria-invalid");
    if (!errorBox.hidden && !errorBox.querySelector("a")) errorBox.hidden = true;
  });

  /* ---------- Schritt 1: Leistung ---------- */
  function pickService(input) {
    state.service = input.value;
    state.serviceLabel = input.getAttribute("data-label");
    updateSummary();
  }
  $$("input[name=leistung]", form).forEach(function (i) { i.addEventListener("change", function () { pickService(i); }); });
  $$("input[name=patient]", form).forEach(function (i) { i.addEventListener("change", function () { state.patient = i.value; updateSummary(); }); });
  var pre = new URLSearchParams(location.search).get("leistung");
  if (pre) { var preInput = $("input[name=leistung][value='" + pre.replace(/[^a-z-]/g, "") + "']", form); if (preInput) { preInput.checked = true; pickService(preInput); } }

  /* ---------- Schritt 2: Kalender ---------- */
  var cal = $("[data-calendar]", form), calTitle = $("[data-cal-title]", form), calGrid = $("[data-cal-grid]", form);
  var slotBox = $("[data-slots]", form), slotHint = $("[data-slot-hint]", form);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);

  function renderCalendar() {
    calTitle.textContent = MONTHS[view.getMonth()] + " " + view.getFullYear();
    var first = new Date(view.getFullYear(), view.getMonth(), 1);
    var lead = (first.getDay() + 6) % 7;
    var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var html = "";
    for (var i = 0; i < lead; i++) html += '<span class="cal-empty" aria-hidden="true"></span>';
    for (var d = 1; d <= days; d++) {
      var date = new Date(view.getFullYear(), view.getMonth(), d);
      var open = dayOpen(date);
      var cls = "cal-day" + (sameDay(date, today) ? " is-today" : "") + (sameDay(date, state.date) ? " is-selected" : "");
      html += '<button type="button" class="' + cls + '" data-day="' + d + '" style="--d:' + (d * 12) + 'ms"' +
        (open ? "" : " disabled") + ' aria-label="' + fmtDate(date) + (open ? "" : " – nicht verfügbar") + '"' +
        (sameDay(date, state.date) ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">" + d + "</button>";
    }
    calGrid.innerHTML = html;
    $("[data-cal-prev]", cal).disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    $("[data-cal-next]", cal).disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > lastDay;
    cal.classList.remove("is-animating"); void cal.offsetWidth; cal.classList.add("is-animating");
  }
  calGrid.addEventListener("click", function (e) {
    var b = e.target.closest(".cal-day");
    if (!b || b.disabled) return;
    state.date = new Date(view.getFullYear(), view.getMonth(), +b.getAttribute("data-day"));
    state.time = "";
    renderCalendar();
    renderSlots();
    updateSummary();
  });
  $("[data-cal-prev]", cal).addEventListener("click", function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
  $("[data-cal-next]", cal).addEventListener("click", function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });

  function renderSlots() {
    if (!state.date) { slotBox.innerHTML = ""; slotHint.hidden = false; return; }
    slotHint.hidden = true;
    var slots = slotsFor(state.date);
    var groups = [["Vormittag", slots.filter(function (t) { return t < 780; })], ["Nachmittag", slots.filter(function (t) { return t >= 780; })]];
    slotBox.innerHTML = '<p class="slot-day">' + fmtDate(state.date) + "</p>" + groups.filter(function (g) { return g[1].length; }).map(function (g) {
      return '<div class="slot-group"><span class="slot-label">' + g[0] + '</span><div class="slot-list">' + g[1].map(function (t, i) {
        var v = fmtTime(t);
        return '<button type="button" class="slot' + (state.time === v ? " is-selected" : "") + '" data-time="' + v + '" style="--d:' + (i * 30) + 'ms" aria-pressed="' + (state.time === v) + '">' + v + "</button>";
      }).join("") + "</div></div>";
    }).join("");
  }
  slotBox.addEventListener("click", function (e) {
    var b = e.target.closest(".slot");
    if (!b) return;
    state.time = b.getAttribute("data-time");
    $$(".slot", slotBox).forEach(function (s) { var on = s === b; s.classList.toggle("is-selected", on); s.setAttribute("aria-pressed", String(on)); });
    updateSummary();
  });
  $("#b-flexibel").addEventListener("change", function () { state.flexible = this.checked; updateSummary(); });

  /* ---------- Zusammenfassung ---------- */
  function whenText() {
    if (state.date && state.time) return fmtDate(state.date) + ", " + state.time + " Uhr";
    if (state.date) return fmtDate(state.date);
    return state.flexible ? "Zeitlich flexibel" : "";
  }
  function updateSummary() {
    var set = function (key, val) {
      var el = $("[data-sum='" + key + "']");
      if (!el) return;
      el.textContent = val || "–";
      var row = el.closest(".sum-row");
      if (row) { row.classList.toggle("is-filled", !!val); if (val) { row.classList.remove("pop"); void row.offsetWidth; row.classList.add("pop"); } }
    };
    set("leistung", state.serviceLabel);
    set("termin", whenText() + (state.flexible && state.date ? " (flexibel)" : ""));
    set("patient", state.patient);
  }

  function renderReview() {
    var v = function (id) { return $(id).value.trim(); };
    var rows = [
      ["Leistung", state.serviceLabel, 1],
      ["Patient", state.patient, 1],
      ["Wunschtermin", whenText() || "–", 2],
      ["Zeitlich flexibel", state.flexible ? "Ja" : "Nein", 2],
      ["Name", v("#b-vorname") + " " + v("#b-nachname"), 3],
      ["Telefon", v("#b-telefon"), 3],
      ["E-Mail", v("#b-email"), 3],
      ["Versicherung", $("#b-versicherung").value, 3],
      ["Nachricht", v("#b-nachricht") || "–", 3]
    ];
    $("[data-review]", form).innerHTML = rows.map(function (r, i) {
      return '<div class="rev-row" style="--d:' + (i * 50) + 'ms"><dt>' + r[0] + "</dt><dd>" + escapeHtml(r[1]) + '</dd><button type="button" class="rev-edit" data-goto="' + r[2] + '">Ändern</button></div>';
    }).join("");
    $$("[data-review] [data-goto]", form).forEach(function (b) { b.addEventListener("click", function () { showStep(+b.getAttribute("data-goto"), -1); }); });
  }
  function escapeHtml(s) { return String(s || "").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Senden ---------- */
  function payload() {
    var v = function (id) { return $(id).value.trim(); };
    return {
      _subject: "Neue Terminanfrage: " + state.serviceLabel + " – " + (whenText() || "ohne Wunschtermin"),
      _template: "table",
      _captcha: "false",
      _replyto: v("#b-email"),
      "Leistung": state.serviceLabel,
      "Patient": state.patient,
      "Wunschtermin": whenText() || "–",
      "Zeitlich flexibel": state.flexible ? "Ja" : "Nein",
      "Name": v("#b-vorname") + " " + v("#b-nachname"),
      "Telefon": v("#b-telefon"),
      "E-Mail": v("#b-email"),
      "Versicherung": $("#b-versicherung").value,
      "Nachricht": v("#b-nachricht") || "–",
      "Datenschutz": "Einwilligung erteilt",
      "Gesendet über": "Website – Online-Terminanfrage"
    };
  }
  function mailtoLink(data) {
    var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
    return "mailto:" + MAIL + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (state.step !== steps.length) { btnNext.click(); return; }
    if (!validate(3)) { showStep(3, -1); return; }
    var data = payload();
    if ($("#b-website").value) { success(); return; }
    btnSend.disabled = true;
    btnSend.classList.add("is-loading");
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (res) {
        if (String(res.success) === "true") success();
        else sendFailed(data);
      })
      .catch(function () { sendFailed(data); })
      .then(function () { btnSend.disabled = false; btnSend.classList.remove("is-loading"); });
  });

  function sendFailed(data) {
    errorBox.innerHTML = "Die Anfrage konnte gerade nicht automatisch gesendet werden. Bitte rufen Sie uns an unter <a href=\"tel:+49610523604\">06105 / 23604</a> " +
      'oder <a href="' + mailtoLink(data) + '">senden Sie die Anfrage per E-Mail</a> (Ihre Angaben sind bereits eingetragen).';
    errorBox.hidden = false;
  }

  function success() {
    var first = $("#b-vorname").value.trim();
    $("[data-success-name]").textContent = first ? ", " + first : "";
    $("[data-success-when]").textContent = whenText() || "Ihr Wunschtermin";
    $("[data-success-service]").textContent = state.serviceLabel;
    form.classList.add("is-sent");
    $("[data-success]").hidden = false;
    $("[data-success]").focus();
    if (!reduce) confetti();
    window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 110, behavior: reduce ? "auto" : "smooth" });
  }
  $("[data-again]").addEventListener("click", function () { location.href = "termin.html"; });

  /* ---------- Konfetti aus Funkelsternen ---------- */
  function confetti() {
    var c = document.createElement("canvas");
    c.className = "confetti";
    document.body.appendChild(c);
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = window.innerWidth, H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    var ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    var colors = ["#5eb593", "#8ee6bd", "#e2b453", "#035444", "#ffffff"];
    var parts = [];
    for (var i = 0; i < 160; i++) {
      var a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
      parts.push({ x: W / 2, y: H * 0.42, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, r: 4 + Math.random() * 7, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: colors[i % colors.length], star: Math.random() > 0.45 });
    }
    var t0 = performance.now();
    (function tick(t) {
      var k = (t - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += 0.28; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, 1 - k / 2.6); ctx.fillStyle = p.c;
        if (p.star) { ctx.beginPath(); for (var q = 0; q < 4; q++) { ctx.rotate(Math.PI / 2); ctx.quadraticCurveTo(p.r * 0.15, p.r * 0.15, 0, p.r); ctx.quadraticCurveTo(-p.r * 0.15, p.r * 0.15, 0, 0); } ctx.fill(); }
        else ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      });
      if (k < 2.8) requestAnimationFrame(tick); else c.remove();
    })(t0);
  }

  renderCalendar();
  renderSlots();
  updateSummary();
  showStep(1, 0);
})();
