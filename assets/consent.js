/* Klar Zahn – Cookie-/Datenschutz-Hinweis (alle Seiten).
   Die Website setzt keine Tracking-Cookies. Gespeichert wird nur die Auswahl selbst (localStorage). */
(function () {
  "use strict";
  var KEY = "kz-consent-v1";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* privater Modus */ } }

  function open() {
    if (document.querySelector(".cookie-banner")) return;
    var box = document.createElement("div");
    box.className = "cookie-banner";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-live", "polite");
    box.setAttribute("aria-label", "Cookie- und Datenschutzhinweis");
    box.innerHTML =
      '<div class="cookie-icon" aria-hidden="true">🍪</div>' +
      '<div class="cookie-text"><strong>Ihre Privatsphäre ist uns wichtig</strong>' +
      '<p>Wir verwenden keine Tracking- oder Werbe-Cookies. Technisch notwendig gespeichert wird nur Ihre Auswahl in diesem Hinweis. ' +
      'Externe Dienste (Google Maps, Ratgeber-Artikel, Online-Terminanfrage) werden erst genutzt, wenn Sie die jeweilige Funktion aufrufen. ' +
      'Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a> und im <a href="impressum.html">Impressum</a>.</p></div>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-line" data-c="necessary">Nur notwendige</button>' +
      '<button type="button" class="btn btn-glow" data-c="all">Alle akzeptieren</button></div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add("is-on"); });
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]");
      if (!b) return;
      set(b.getAttribute("data-c"));
      box.classList.remove("is-on");
      setTimeout(function () { box.remove(); }, 450);
    });
  }

  document.addEventListener("click", function (e) {
    var l = e.target.closest("[data-cookie-settings]");
    if (!l) return;
    e.preventDefault();
    open();
  });
  if (!get()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(open, 600); });
    else setTimeout(open, 600);
  }
})();
