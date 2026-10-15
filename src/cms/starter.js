/* Beispielartikel: werden angezeigt, solange Firebase noch nicht eingerichtet ist,
   und können im Praxis-Login mit einem Klick übernommen und danach bearbeitet werden. */
export const STARTER_ARTICLES = [
  {
    id: "professionelle-zahnreinigung",
    title: "Professionelle Zahnreinigung: Was passiert dabei und wie oft ist sie sinnvoll?",
    category: "Vorsorge",
    excerpt: "Zähneputzen allein erreicht nicht alle Stellen. So läuft eine professionelle Zahnreinigung ab und darum beugt sie Karies und Parodontitis vor.",
    cover: "assets/img/3d/aesthetic.webp",
    coverFit: "contain",
    tone: "mint",
    publishedAt: Date.UTC(2026, 9, 1, 9),
    author: "Praxis Klar Zahn",
    html:
      "<p>Auch wer gründlich putzt, erreicht mit Zahnbürste und Zahnseide nicht jede Stelle. In den Zahnzwischenräumen, am Zahnfleischrand und an den hinteren Backenzähnen bleiben Beläge zurück. Mit der Zeit verhärten sie zu Zahnstein, an dem sich Bakterien besonders gut festsetzen.</p>" +
      "<h2>So läuft die Reinigung ab</h2>" +
      "<ul><li>Zuerst sehen wir uns Zähne und Zahnfleisch genau an.</li>" +
      "<li>Weiche und harte Beläge entfernen wir mit feinen Instrumenten und Ultraschall, auch zwischen den Zähnen.</li>" +
      "<li>Verfärbungen, zum Beispiel durch Kaffee, Tee oder Rauchen, lösen wir schonend mit einem Pulverstrahl.</li>" +
      "<li>Danach polieren wir die Zahnoberflächen glatt, damit neue Beläge schlechter haften.</li>" +
      "<li>Zum Schluss schützt ein Fluoridlack den Zahnschmelz.</li></ul>" +
      "<h2>Wie oft ist eine PZR sinnvoll?</h2>" +
      "<p>Für die meisten Menschen sind ein bis zwei Termine im Jahr empfehlenswert. Wer zu Zahnfleischentzündungen neigt, Implantate oder viel Zahnersatz hat, profitiert oft von kürzeren Abständen. Wie oft es bei Ihnen sinnvoll ist, besprechen wir gemeinsam bei der Kontrolluntersuchung.</p>" +
      "<blockquote>Tipp: Fragen Sie bei Ihrer Reinigung nach der passenden Größe für Zahnzwischenraumbürstchen. Damit reinigen Sie die Zwischenräume im Alltag besonders gründlich.</blockquote>"
  },
  {
    id: "angstfrei-im-daemmerschlaf",
    title: "Angst vor dem Zahnarzt? So hilft die Behandlung im Dämmerschlaf",
    category: "Angstfrei",
    excerpt: "Viele Menschen schieben Zahnarztbesuche aus Angst auf. Dämmerschlaf oder Vollnarkose können helfen, wieder entspannt zur Behandlung zu kommen.",
    cover: "assets/img/3d/moon.webp",
    coverFit: "contain",
    tone: "night",
    publishedAt: Date.UTC(2026, 8, 18, 9),
    author: "Praxis Klar Zahn",
    html:
      "<p>Zahnarztangst ist weit verbreitet und nichts, wofür man sich schämen muss. Schwierig wird es, wenn Termine immer wieder verschoben werden und kleine Probleme dadurch größer werden. Es gibt Wege, die Behandlung deutlich angenehmer zu machen.</p>" +
      "<h2>Der erste Schritt: darüber sprechen</h2>" +
      "<p>Sagen Sie uns schon bei der Terminvereinbarung, dass Sie Angst haben. Wir planen dann mehr Zeit ein, erklären jeden Schritt in Ruhe und vereinbaren ein Handzeichen, mit dem Sie jederzeit eine Pause einlegen können.</p>" +
      "<h2>Dämmerschlaf und Vollnarkose</h2>" +
      "<p>Im Dämmerschlaf sind Sie tief entspannt und nehmen die Behandlung kaum wahr, atmen aber selbstständig. In Vollnarkose schlafen Sie während der gesamten Behandlung. Welches Verfahren für Sie geeignet ist, hängt von Ihrer Gesundheit und vom geplanten Eingriff ab.</p>" +
      "<ul><li>Vorher führen wir ein ausführliches Aufklärungsgespräch mit Ihnen.</li>" +
      "<li>Am Behandlungstag kommen Sie nüchtern und lassen sich abholen.</li>" +
      "<li>Für den Rest des Tages dürfen Sie nicht selbst Auto fahren.</li></ul>" +
      "<p>Oft lassen sich mehrere Behandlungen in einer Sitzung zusammenfassen. So sparen Sie Termine und können sich danach in Ruhe erholen.</p>"
  },
  {
    id: "implantat-oder-bruecke",
    title: "Implantat oder Brücke? Die wichtigsten Unterschiede",
    category: "Zahnersatz",
    excerpt: "Fehlt ein Zahn, gibt es mehrere Wege, die Lücke zu schließen. Ein Überblick über Implantat und Brücke und worauf es bei der Entscheidung ankommt.",
    cover: "assets/img/3d/implant.webp",
    coverFit: "contain",
    tone: "night",
    publishedAt: Date.UTC(2026, 8, 3, 9),
    author: "Praxis Klar Zahn",
    html:
      "<p>Eine Zahnlücke ist nicht nur eine Frage der Optik. Benachbarte Zähne können mit der Zeit in die Lücke kippen, und der Kieferknochen bildet sich an dieser Stelle zurück. Deshalb lohnt es sich, eine Lücke rechtzeitig zu versorgen.</p>" +
      "<h2>Die Brücke</h2>" +
      "<p>Bei einer Brücke werden die Nachbarzähne beschliffen und tragen den Ersatzzahn wie zwei Pfeiler. Das ist eine bewährte Lösung, besonders wenn die Nachbarzähne ohnehin Kronen oder große Füllungen brauchen.</p>" +
      "<h2>Das Implantat</h2>" +
      "<p>Ein Implantat ist eine künstliche Zahnwurzel, meist aus Titan, die in den Kieferknochen eingesetzt wird. Nach der Einheilzeit trägt es eine Krone. Die Nachbarzähne bleiben unberührt, und der Knochen wird beim Kauen weiter belastet.</p>" +
      "<h2>Was passt zu Ihnen?</h2>" +
      "<ul><li>Wie gesund sind die Nachbarzähne?</li><li>Ist genügend Kieferknochen vorhanden?</li><li>Wie viel Zeit möchten Sie für die Behandlung einplanen?</li><li>Welche Kosten kommen auf Sie zu?</li></ul>" +
      "<p>Diese Fragen klären wir gemeinsam in einem Beratungsgespräch. Kronen und Brücken fertigen wir in unserem eigenen Meisterlabor, so können wir Form und Farbe direkt mit Ihnen abstimmen.</p>"
  }
];
