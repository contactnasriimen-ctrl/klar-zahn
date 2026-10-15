/* Klar Zahn – Interaktionen und Scroll-Animationen (ohne Bibliotheken) */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var DAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  /* ---------- Scroll-Schleife ---------- */
  var tasks = [];
  var ticking = false;
  function run() {
    ticking = false;
    var vh = window.innerHeight;
    for (var i = 0; i < tasks.length; i++) tasks[i](vh);
  }
  function request() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(run); }
  }
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);

  /* ---------- Header (hell/dunkel je nach Abschnitt) + Fortschritt ---------- */
  var header = $("[data-header]");
  var bar = $("[data-progress]");
  var darkSections = $$(".hero, .lab, .calm, .contact, .site-footer");
  tasks.push(function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    if (!header) return;
    var probe = 44;
    var overDark = darkSections.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    header.classList.toggle("is-light", !overDark);
  });

  /* ---------- Vollbild-Menü ---------- */
  var menu = $("[data-menu]");
  var toggle = $("[data-menu-toggle]");
  var closeTimer;
  function setMenu(open) {
    if (!menu || !toggle) return;
    clearTimeout(closeTimer);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    document.body.classList.toggle("menu-open", open);
    if (open) {
      menu.hidden = false;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { menu.classList.add("is-open"); });
      });
      document.documentElement.style.overflow = "hidden";
    } else {
      menu.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      closeTimer = setTimeout(function () { menu.hidden = true; }, reduce ? 0 : 650);
    }
  }
  if (menu && toggle) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1080) setMenu(false); });
  }

  /* ---------- Aktiver Menüpunkt ---------- */
  var navLinks = $$(".main-nav a[href^='#']");
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a === byId[entry.target.id]); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    $$("[data-reveal]").forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.classList.add("rv");
      revealIO.observe(el);
    });

    var wordmark = $(".wordmark");
    if (wordmark) {
      var wmIO = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { wordmark.classList.add("is-filled"); wmIO.disconnect(); }
      }, { threshold: 0.5 });
      wmIO.observe(wordmark);
    }
  }

  /* ---------- Text färbt sich Wort für Wort ---------- */
  var statement = $("[data-words]");
  if (statement) {
    var words = statement.textContent.trim().split(/\s+/);
    statement.textContent = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "w" + (/Meisterlabor|wohlfühlen/.test(w) ? " w-accent" : "");
      span.textContent = w;
      statement.appendChild(span);
      if (i < words.length - 1) statement.appendChild(document.createTextNode(" "));
    });
    var wordEls = $$(".w", statement);
    if (reduce) {
      wordEls.forEach(function (w) { w.classList.add("is-on"); });
    } else {
      tasks.push(function (vh) {
        var r = statement.getBoundingClientRect();
        var p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.32), 0, 1);
        var n = Math.round(p * wordEls.length);
        for (var i = 0; i < wordEls.length; i++) wordEls[i].classList.toggle("is-on", i < n);
      });
    }
  }

  /* ---------- Zähler ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countIO.unobserve(entry.target);
        var el = entry.target, target = parseInt(el.getAttribute("data-count"), 10), start = null;
        (function step(ts) {
          if (start === null) start = ts;
          var t = clamp((ts - start) / 1400, 0, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) window.requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { el.textContent = "0"; countIO.observe(el); });
  }

  /* ---------- 3D-Neigung + Lichtpunkt ---------- */
  if (finePointer && !reduce) {
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointerenter", function () {
        el.style.transition = "transform .18s ease-out, box-shadow .4s ease, border-color .4s ease";
      });
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        el.style.transform = "perspective(1000px) rotateX(" + ((0.5 - y) * 7).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * 9).toFixed(2) + "deg)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transition = "transform .8s cubic-bezier(.16,1,.3,1), box-shadow .4s ease, border-color .4s ease";
        el.style.transform = "";
      });
    });

    /* Magnetische Buttons */
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.translate = (x * 0.16).toFixed(1) + "px " + (y * 0.26).toFixed(1) + "px";
      });
      el.addEventListener("pointerleave", function () { el.style.translate = ""; });
    });
  }

  /* ---------- Meisterlabor: Scroll-Geschichte ---------- */
  var labStory = $("[data-lab]");
  if (labStory) {
    var labSection = labStory.closest(".lab");
    var chapters = $$("[data-chapter]", labStory);
    var shows = $$("[data-step-show]", labStory);
    if (!reduce && labSection) labSection.classList.add("lab-js");
    tasks.push(function (vh) {
      var r = labStory.getBoundingClientRect();
      var p = clamp((vh * 0.5 - r.top) / Math.max(1, r.height - vh * 0.5), 0, 1);
      labStory.style.setProperty("--p", p.toFixed(3));
      var active = 0, best = Infinity;
      chapters.forEach(function (c, i) {
        var cr = c.getBoundingClientRect();
        var d = Math.abs(cr.top + cr.height / 2 - vh * 0.5);
        if (d < best) { best = d; active = i; }
      });
      chapters.forEach(function (c, i) { c.classList.toggle("is-active", i === active); });
      shows.forEach(function (s) { s.classList.toggle("is-show", parseInt(s.getAttribute("data-step-show"), 10) <= active); });
    });
  }

  /* ---------- Ablauf: Linie zeichnet sich ---------- */
  var stepsTrack = $("[data-steps]");
  if (stepsTrack && !reduce) {
    tasks.push(function (vh) {
      var r = stepsTrack.getBoundingClientRect();
      stepsTrack.style.setProperty("--p", clamp((vh * 0.85 - r.top) / (r.height * 0.9), 0, 1).toFixed(3));
    });
  }

  /* ---------- FAQ: weiches Auf- und Zuklappen ---------- */
  $$(".faq-item").forEach(function (item) {
    var summary = $("summary", item), body = $(".faq-body", item);
    if (!summary || !body) return;
    summary.addEventListener("click", function (e) {
      if (reduce || !body.animate) return;
      e.preventDefault();
      var ease = "cubic-bezier(.16,1,.3,1)";
      if (item.open) {
        var h = body.offsetHeight;
        var anim = body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 380, easing: ease });
        anim.onfinish = function () { item.open = false; };
      } else {
        item.open = true;
        var h2 = body.offsetHeight;
        body.animate([{ height: "0px", opacity: 0 }, { height: h2 + "px", opacity: 1 }], { duration: 520, easing: ease });
      }
    });
  });

  /* ---------- Fotos: fehlt die Datei, bleibt die Illustration ---------- */
  $$("img[data-photo]").forEach(function (img) {
    function fail() { img.remove(); }
    if (img.complete) { if (!img.naturalWidth) fail(); }
    else img.addEventListener("error", fail);
  });

  /* ---------- Sprechzeiten: geöffnet / geschlossen ---------- */
  function toMinutes(hhmm) { var p = hhmm.trim().split(":"); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function fmt(min) { var h = Math.floor(min / 60), m = min % 60; return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
  function berlinNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday), min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var table = $("[data-hours-table]");
  if (table) {
    var schedule = {};
    $$("tr[data-day]", table).forEach(function (row) {
      schedule[row.getAttribute("data-day")] = (row.getAttribute("data-hours") || "").split(",").filter(Boolean).map(function (range) {
        var r = range.split("-");
        return [toMinutes(r[0]), toMinutes(r[1])];
      });
    });
    var now = berlinNow();
    var slot = (schedule[now.day] || []).filter(function (s) { return now.min >= s[0] && now.min < s[1]; })[0];
    var text = "Geschlossen";
    if (slot) {
      text = "Jetzt geöffnet · bis " + fmt(slot[1]) + " Uhr";
    } else {
      for (var i = 0; i < 7; i++) {
        var day = (now.day + i) % 7;
        var next = (schedule[day] || []).filter(function (s) { return i > 0 || s[0] > now.min; });
        if (next.length) {
          text = "Geschlossen · öffnet " + (i === 0 ? "heute" : i === 1 ? "morgen" : "am " + DAY_NAMES[day]) + " um " + fmt(next[0][0]) + " Uhr";
          break;
        }
      }
    }
    var todayRow = $('tr[data-day="' + now.day + '"]', table);
    if (todayRow) todayRow.classList.add("is-today");
    var pill = $("[data-open-pill]");
    if (pill) {
      pill.textContent = slot ? "Jetzt geöffnet" : "Geschlossen";
      pill.classList.toggle("is-closed", !slot);
      pill.hidden = false;
    }
    $$("[data-open-status]").forEach(function (el) { el.textContent = text + ". Termine auch nach Vereinbarung."; });
  }

  /* ---------- Telefonnummer kopieren ---------- */
  var copyBtn = document.getElementById("copy-phone");
  if (copyBtn) {
    var label = $("span", copyBtn), original = label ? label.textContent : "";
    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy");
      function done(msg) {
        if (!label) return;
        label.textContent = msg;
        setTimeout(function () { label.textContent = original; }, 2200);
      }
      function select() {
        var target = $(".big-phone");
        if (!target || !window.getSelection) return;
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done("Kopiert"); }, function () { select(); done("Nummer markiert"); });
      } else { select(); done("Nummer markiert"); }
    });
  }

  /* ---------- Jahr ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  run();
})();
