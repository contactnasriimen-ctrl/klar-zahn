/* Klar Zahn – Interaktionen und Scroll-Animationen (ohne Bibliotheken) */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var DAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  /* ---------- Schwere Skripte erst nach dem Laden (schnellere erste Anzeige) ---------- */
  function loadScript(src) { var s = document.createElement("script"); s.src = src; s.async = true; document.body.appendChild(s); }
  if (document.querySelector("[data-hero-3d], [data-lab-3d]")) {
    var loaded3d = false, wake = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown", "wheel"];
    var start3d = function () {
      if (loaded3d) return;
      loaded3d = true;
      wake.forEach(function (t) { window.removeEventListener(t, start3d); });
      loadScript("assets/js/scenes3d.js");
    };
    wake.forEach(function (t) { window.addEventListener(t, start3d, { passive: true }); });
  }
  var blogTarget = document.querySelector("[data-blog], [data-latest-posts]");
  if (blogTarget) {
    if (blogTarget.hasAttribute("data-blog") || !("IntersectionObserver" in window)) loadScript("assets/js/blog.js");
    else {
      var blogIO = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { blogIO.disconnect(); loadScript("assets/js/blog.js"); } }, { rootMargin: "1400px 0px" });
      blogIO.observe(blogTarget);
    }
  }

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
  var darkSections = $$(".site-footer");
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
  function bindTilt(el) {
    if (!finePointer || reduce || el.__tilt) return;
    el.__tilt = true;
    (function () {
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
    })();
  }
  window.KZ = { bindTilt: bindTilt };
  $$("[data-tilt]").forEach(bindTilt);

  if (finePointer && !reduce) {
    /* Lichtschein folgt dem Mauszeiger */
    var cursorLight = $(".cursor-light");
    if (cursorLight) {
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy, lightOn = false;
      window.addEventListener("pointermove", function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!lightOn) { lightOn = true; cursorLight.classList.add("is-on"); (function follow() {
          cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
          cursorLight.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
          window.requestAnimationFrame(follow);
        })(); }
      }, { passive: true });
      document.addEventListener("pointerleave", function () { cursorLight.classList.remove("is-on"); lightOn = false; });
    }

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
      var p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
      labStory.style.setProperty("--p", p.toFixed(3));
      var active = Math.min(chapters.length - 1, Math.floor(p * chapters.length));
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
    var shortText = "Heute geschlossen";
    if (slot) {
      text = "Jetzt geöffnet · bis " + fmt(slot[1]) + " Uhr";
    } else {
      for (var i = 0; i < 7; i++) {
        var day = (now.day + i) % 7;
        var next = (schedule[day] || []).filter(function (s) { return i > 0 || s[0] > now.min; });
        if (next.length) {
          text = "Geschlossen · öffnet " + (i === 0 ? "heute" : i === 1 ? "morgen" : "am " + DAY_NAMES[day]) + " um " + fmt(next[0][0]) + " Uhr";
          shortText = "Öffnet " + (i === 0 ? "heute" : i === 1 ? "morgen" : DAY_NAMES[day]) + " um " + fmt(next[0][0]);
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
    $$("[data-open-short]").forEach(function (el) { el.textContent = slot ? "Jetzt geöffnet · bis " + fmt(slot[1]) : shortText; });
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

  /* ---------- Hero: Tiefenebenen folgen der Maus ---------- */
  var heroSection = $(".hero");
  if (heroSection && finePointer && !reduce) {
    var hx = 0, hy = 0, hTx = 0, hTy = 0, hRaf = null;
    var hStep = function () {
      hx += (hTx - hx) * 0.08; hy += (hTy - hy) * 0.08;
      heroSection.style.setProperty("--px", hx.toFixed(3));
      heroSection.style.setProperty("--py", hy.toFixed(3));
      hRaf = Math.abs(hTx - hx) + Math.abs(hTy - hy) > 0.002 ? window.requestAnimationFrame(hStep) : null;
    };
    window.addEventListener("pointermove", function (e) {
      if (window.scrollY > heroSection.offsetHeight) return;
      hTx = e.clientX / window.innerWidth - 0.5; hTy = e.clientY / window.innerHeight - 0.5;
      if (!hRaf) hRaf = window.requestAnimationFrame(hStep);
    }, { passive: true });
  }

  /* ---------- Glühwürmchen in dunklen Abschnitten ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    $$("canvas[data-fireflies]").forEach(function (canvas) {
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      var count = parseInt(canvas.getAttribute("data-count"), 10) || 46;
      var dots = [], w = 0, h = 0, visible = false, running = false;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      function size() {
        w = canvas.clientWidth; h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function seed() {
        dots = [];
        for (var i = 0; i < count; i++) dots.push({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.2, vx: (Math.random() - 0.5) * 0.25, vy: -0.15 - Math.random() * 0.35, p: Math.random() * 6.28, s: 0.6 + Math.random() * 1.4 });
      }
      size(); seed();
      window.addEventListener("resize", function () { size(); seed(); });
      function draw(t) {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          d.x += d.vx + Math.sin(t / 1600 + d.p) * 0.15; d.y += d.vy;
          if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
          if (d.x < -10) d.x = w + 10; if (d.x > w + 10) d.x = -10;
          var a = 0.35 + 0.65 * Math.abs(Math.sin(t / (900 * d.s) + d.p));
          var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 6);
          g.addColorStop(0, "rgba(200,255,228," + a + ")");
          g.addColorStop(0.3, "rgba(142,230,189," + (a * 0.45) + ")");
          g.addColorStop(1, "rgba(142,230,189,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 6, 0, 6.2832); ctx.fill();
        }
      }
      function loop() {
        if (running) return;
        running = true;
        (function tick(t) {
          if (!visible || document.hidden) { running = false; return; }
          draw(t || 0);
          window.requestAnimationFrame(tick);
        })();
      }
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; if (visible) loop(); }).observe(canvas);
    });
  }

  /* ---------- Parallaxe (Scrollen + Maus) ---------- */
  var parallax = $$("[data-parallax]");
  var gmx = 0, gmy = 0;
  if (parallax.length && !reduce) {
    if (finePointer) window.addEventListener("pointermove", function (e) { gmx = e.clientX / window.innerWidth - 0.5; gmy = e.clientY / window.innerHeight - 0.5; request(); }, { passive: true });
    tasks.push(function (vh) {
      parallax.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        var sp = parseFloat(el.getAttribute("data-parallax"));
        var off = (r.top + r.height / 2 - vh / 2) * sp;
        var depth = 120 * Math.abs(sp);
        el.style.translate = (gmx * depth).toFixed(1) + "px " + (off + gmy * depth).toFixed(1) + "px";
      });
    });
  }

  /* ---------- Funkenspur am Mauszeiger ---------- */
  if (finePointer && !reduce) {
    var trail = document.createElement("canvas");
    trail.className = "sparkle-trail";
    trail.setAttribute("aria-hidden", "true");
    document.body.appendChild(trail);
    var tctx = trail.getContext("2d"), tDpr = Math.min(window.devicePixelRatio || 1, 2), sparks = [], tRunning = false, lastSx = -99, lastSy = -99;
    var tSize = function () { trail.width = window.innerWidth * tDpr; trail.height = window.innerHeight * tDpr; tctx.setTransform(tDpr, 0, 0, tDpr, 0, 0); };
    tSize();
    window.addEventListener("resize", tSize);
    var tColors = ["94,181,147", "226,180,83", "47,143,106", "142,230,189"];
    var drawStar = function (x, y, r, rot) {
      tctx.save(); tctx.translate(x, y); tctx.rotate(rot); tctx.beginPath();
      for (var k = 0; k < 4; k++) { tctx.rotate(Math.PI / 2); tctx.quadraticCurveTo(r * 0.12, r * 0.12, 0, r); tctx.quadraticCurveTo(-r * 0.12, r * 0.12, 0, 0); }
      tctx.fill(); tctx.restore();
    };
    var tLoop = function () {
      tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = sparks.length - 1; i >= 0; i--) {
        var p = sparks[i];
        p.life -= 0.022; p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.rot += p.vr;
        if (p.life <= 0) { sparks.splice(i, 1); continue; }
        tctx.fillStyle = "rgba(" + p.c + "," + (p.life * 0.9).toFixed(3) + ")";
        drawStar(p.x, p.y, p.r * (0.4 + p.life * 0.6), p.rot);
      }
      if (sparks.length) window.requestAnimationFrame(tLoop); else tRunning = false;
    };
    window.addEventListener("pointermove", function (e) {
      var dx = e.clientX - lastSx, dy = e.clientY - lastSy;
      if (dx * dx + dy * dy < 140) return;
      lastSx = e.clientX; lastSy = e.clientY;
      if (sparks.length > 70) return;
      sparks.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 - 0.4, r: 4 + Math.random() * 6, rot: Math.random() * 3, vr: (Math.random() - 0.5) * 0.2, life: 1, c: tColors[Math.floor(Math.random() * tColors.length)] });
      if (!tRunning) { tRunning = true; window.requestAnimationFrame(tLoop); }
    }, { passive: true });
  }

  /* ---------- Wörter der Überschriften gleiten herein ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var splitHeads = $$(".section-head h2, .about-copy h2, .faq-intro h2, .calm-copy h2, .contact-head h2");
    var splitIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-split-in"); splitIO.unobserve(en.target); } });
    }, { threshold: 0.3 });
    splitHeads.forEach(function (h) {
      var n = 0;
      h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 1) { walk(c); return; }
          if (c.nodeType !== 3 || !c.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "wd"; w.setAttribute("aria-hidden", "true");
            var inner = document.createElement("span"); inner.textContent = part; inner.style.setProperty("--i", n++);
            w.appendChild(inner); frag.appendChild(w);
          });
          c.replaceWith(frag);
        });
      })(h);
      h.classList.add("is-split");
      splitIO.observe(h);
    });
  }

  /* ---------- Scroll-Tempo: Bänder neigen sich, Typo-Band beschleunigt ---------- */
  var skewEls = $$(".tapes, .ribbon");
  var kinRows = $$("[data-kinetic]");
  if (!reduce && (skewEls.length || kinRows.length)) {
    var lastY = window.scrollY, vel = 0, kinX = kinRows.map(function () { return 0; }), kinVisible = false;
    if ("IntersectionObserver" in window && kinRows.length) {
      new IntersectionObserver(function (en) { kinVisible = en[0].isIntersecting; if (kinVisible) kickSpeed(); }).observe(kinRows[0].parentElement);
    }
    var speedRunning = false;
    function kickSpeed() { if (!speedRunning) { speedRunning = true; window.requestAnimationFrame(speedLoop); } }
    window.addEventListener("scroll", kickSpeed, { passive: true });
    function speedLoop() {
      var y = window.scrollY;
      vel += ((y - lastY) - vel) * 0.18;
      lastY = y;
      var skew = Math.max(-7, Math.min(7, vel * 0.12));
      skewEls.forEach(function (el) { el.style.setProperty("--skew", skew.toFixed(2) + "deg"); });
      if (kinVisible) {
        kinRows.forEach(function (row, i) {
          var dir = parseFloat(row.getAttribute("data-kinetic"));
          var track = row.firstElementChild, third = track.scrollWidth / 3;
          kinX[i] -= dir * (0.6 + Math.min(14, Math.abs(vel) * 0.35));
          if (kinX[i] <= -third) kinX[i] += third;
          if (kinX[i] > 0) kinX[i] -= third;
          track.style.transform = "translateX(" + kinX[i].toFixed(1) + "px)";
        });
      }
      if (!kinVisible && Math.abs(vel) < 0.05) {
        speedRunning = false; vel = 0;
        skewEls.forEach(function (el) { el.style.setProperty("--skew", "0deg"); });
        return;
      }
      window.requestAnimationFrame(speedLoop);
    }
  }

  /* ---------- Runder Termin-Button erscheint nach dem Hero ---------- */
  var floatCta = $("[data-float-cta]"), heroEl = $(".hero"), contactEl = $("#kontakt");
  if (floatCta && heroEl) {
    tasks.push(function (vh) {
      var past = heroEl.getBoundingClientRect().bottom < vh * 0.3;
      var atContact = contactEl && contactEl.getBoundingClientRect().top < vh * 0.7;
      floatCta.classList.toggle("is-visible", past && !atContact);
    });
  }

  /* ---------- Eigener Cursor-Ring mit Beschriftung ---------- */
  if (finePointer && !reduce) {
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = "<span></span>";
    document.body.appendChild(ring);
    var ringLabel = ring.firstChild, rx = -100, ry = -100, rtx = -100, rty = -100, ringOn = false;
    var labels = [[".hero-3d", "Drehen"], [".post-card", "Lesen"], [".tile", "Entdecken"], [".map-card", "Route"], [".rb-item", ""], ["a, button, summary", ""]];
    window.addEventListener("pointermove", function (e) {
      rtx = e.clientX; rty = e.clientY;
      var label = null;
      for (var i = 0; i < labels.length; i++) { if (e.target.closest && e.target.closest(labels[i][0])) { label = labels[i][1]; break; } }
      ring.classList.toggle("is-hover", label !== null);
      ring.classList.toggle("has-label", !!label);
      if (label) ringLabel.textContent = label;
      if (!ringOn) { ringOn = true; rx = rtx; ry = rty; ring.classList.add("is-on"); (function follow() {
        rx += (rtx - rx) * 0.2; ry += (rty - ry) * 0.2;
        ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)";
        if (ringOn) window.requestAnimationFrame(follow);
      })(); }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { ringOn = false; ring.classList.remove("is-on"); });
    window.addEventListener("scroll", function () {
      if (!ringOn) return;
      var el = document.elementFromPoint(rtx, rty), label = null;
      for (var i = 0; el && i < labels.length; i++) { if (el.closest(labels[i][0])) { label = labels[i][1]; break; } }
      ring.classList.toggle("is-hover", label !== null);
      ring.classList.toggle("has-label", !!label);
      if (label) ringLabel.textContent = label;
    }, { passive: true });
    window.addEventListener("pointerdown", function () { ring.classList.add("is-down"); });
    window.addEventListener("pointerup", function () { ring.classList.remove("is-down"); });
  }

  /* ---------- Jahr ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  run();
})();
