/* Klar Zahn – kleine Helfer für Navigation, Sprechzeiten und Fotos */
(function () {
  "use strict";

  var DAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  /* ---------- Header: Schatten beim Scrollen ---------- */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Navigation ---------- */
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) setNav(false);
    });
  }

  /* ---------- Aktiver Menüpunkt ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".main-nav ul a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a === link); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Fotos: fehlt die Datei, bleibt die Illustration sichtbar ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("img[data-photo]"), function (img) {
    function fail() { img.remove(); }
    function ok() { var frame = img.closest(".photo"); if (frame) frame.classList.add("has-photo"); }
    if (img.complete) {
      if (img.naturalWidth > 0) ok(); else fail();
    } else {
      img.addEventListener("load", ok);
      img.addEventListener("error", fail);
    }
  });

  /* ---------- Sprechzeiten: "Jetzt geöffnet" / "Geschlossen" ---------- */
  function toMinutes(hhmm) {
    var p = hhmm.trim().split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
  }
  function berlinNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
      return { day: day, min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  var table = document.querySelector("[data-hours-table]");
  if (table) {
    var schedule = {};
    Array.prototype.forEach.call(table.querySelectorAll("tr[data-day]"), function (row) {
      var raw = row.getAttribute("data-hours") || "";
      schedule[row.getAttribute("data-day")] = raw.split(",").filter(Boolean).map(function (range) {
        var r = range.split("-");
        return [toMinutes(r[0]), toMinutes(r[1])];
      });
    });

    var now = berlinNow();
    var today = schedule[now.day] || [];
    var openSlot = today.filter(function (s) { return now.min >= s[0] && now.min < s[1]; })[0];
    var text, open = !!openSlot;

    if (open) {
      text = "Jetzt geöffnet · bis " + fmt(openSlot[1]) + " Uhr";
    } else {
      text = "Geschlossen";
      for (var i = 0; i < 7; i++) {
        var day = (now.day + i) % 7;
        var slots = (schedule[day] || []).filter(function (s) { return i > 0 || s[0] > now.min; });
        if (slots.length) {
          var when = i === 0 ? "heute" : i === 1 ? "morgen" : "am " + DAY_NAMES[day];
          text = "Geschlossen · öffnet " + when + " um " + fmt(slots[0][0]) + " Uhr";
          break;
        }
      }
    }

    var todayRow = table.querySelector('tr[data-day="' + now.day + '"]');
    if (todayRow) todayRow.classList.add("is-today");

    var pill = document.querySelector("[data-open-pill]");
    if (pill) {
      pill.textContent = open ? "Jetzt geöffnet" : "Geschlossen";
      pill.classList.toggle("is-closed", !open);
      pill.hidden = false;
    }
    Array.prototype.forEach.call(document.querySelectorAll("[data-open-status]"), function (el) {
      el.textContent = text;
    });
  }

  /* ---------- Telefonnummer kopieren ---------- */
  var copyBtn = document.getElementById("copy-phone");
  if (copyBtn) {
    var label = copyBtn.querySelector("span");
    var original = label ? label.textContent : "";
    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy");
      function done(msg) {
        if (!label) return;
        label.textContent = msg;
        setTimeout(function () { label.textContent = original; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done("Kopiert"); }, function () { selectNumber(); done("Nummer markiert"); });
      } else {
        selectNumber();
        done("Nummer markiert");
      }
    });
  }
  function selectNumber() {
    var number = document.querySelector(".cc-number");
    if (!number || !window.getSelection) return;
    var range = document.createRange();
    range.selectNodeContents(number);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /* ---------- Jahr im Footer ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
