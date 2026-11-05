/* Stammdaten der Praxis und Aufbau der Leistungsseiten.
   Texte der Seiten: content/leistungen.json (aus dem Kunden-PDF übernommen). */
const SITE = "https://contactnasriimen-ctrl.github.io/klar-zahn/";

const PRAXIS = {
  name: "Klar Zahn – Zahnmedizin & Zahntechnik",
  phone: "06105 23604",
  tel: "+49610523604",
  phoneLd: "+49 6105 23604",
  mail: "Kontakt@klar-zahn.de",
  street: "Opelstraße 2",
  zip: "64546",
  city: "Mörfelden-Walldorf",
  lat: 49.9675673,
  lng: 8.5666833,
  route: "https://www.google.com/maps/dir/?api=1&destination=Opelstra%C3%9Fe+2%2C+64546+M%C3%B6rfelden-Walldorf"
};

/* Sprechzeiten: [Tag (0 = Sonntag), Bereiche] – gleiche Werte in index.html (data-hours) und assets/booking.js */
const HOURS = [
  [1, "Montag", ["09:00-13:00", "14:00-18:00"]],
  [2, "Dienstag", ["09:00-13:00", "14:00-18:00"]],
  [3, "Mittwoch", ["12:00-19:00"]],
  [4, "Donnerstag", ["09:00-13:00", "14:00-18:00"]],
  [5, "Freitag", ["09:00-13:00"]],
  [6, "Samstag", []],
  [0, "Sonntag", []]
];

/* Einzugsgebiet (Wunsch des Kunden) */
const CITIES = [
  ["Groß-Gerau", "https://de.wikipedia.org/wiki/Gro%C3%9F-Gerau"],
  ["Langen (Hessen)", "https://de.wikipedia.org/wiki/Langen_(Hessen)"],
  ["Dreieich", "https://de.wikipedia.org/wiki/Dreieich"],
  ["Weiterstadt", "https://de.wikipedia.org/wiki/Weiterstadt"],
  ["Büttelborn", "https://de.wikipedia.org/wiki/B%C3%BCttelborn"]
];
const LANGS = [["de", "Deutsch"], ["en", "Englisch"], ["es", "Spanisch"], ["ar", "Arabisch"]];

/* key = Pfad ohne "leistungen/"; book = Wert für termin.html?leistung= */
const CLUSTERS = [
  { key: "zahnerhalt", name: "Zahnerhalt", icon: "i-tooth-check", img: "tooth", book: "fuellung",
    teaser: "Füllungen, Inlays, Parodontitis-Therapie und Nervschutz: Wir reparieren punktgenau und erhalten Ihre eigenen Zähne.",
    subs: { "fuellungstherapie": "Füllungstherapie", "inlays-onlays": "Inlays & Onlays", "parodontose-behandlung": "Parodontitis-Therapie", "nervschutz-caries-profunda": "Nervschutz bei tiefer Karies", "minimalinvasive-zahnmedizin": "Minimalinvasive Zahnmedizin" } },
  { key: "zahnreinigung-bleaching", name: "Zahnreinigung & Bleaching", icon: "i-sparkle", img: "aesthetic", book: "pzr",
    teaser: "Professionelle Zahnreinigung und schonendes Bleaching für gesunde, sichtbar hellere Zähne.",
    subs: { "professionelle-zahnreinigung": "Professionelle Zahnreinigung", "bleaching": "Bleaching" } },
  { key: "endodontie", name: "Wurzelbehandlung", icon: "i-root", img: "tooth", book: "wurzelkanal",
    teaser: "Moderne Endodontie mit digitalem Röntgen und 3D-DVT: Wir retten entzündete Zähne, auch nach Zahnunfällen.",
    subs: { "primaere-wurzelkanalbehandlung": "Primäre Wurzelkanalbehandlung", "revisionsbehandlung": "Revisionsbehandlung", "zahnunfall-trauma": "Zahnunfall & Trauma" } },
  { key: "kinderzahnmedizin", name: "Kinder- & Jugendzahnmedizin", short: "Kinderzahnmedizin", icon: "i-kid", img: "kids", book: "kinder",
    teaser: "Spielerisch, geduldig und mehrsprachig: Vorsorge, Kreidezähne, Lückenhalter und Behandlung in Vollnarkose.",
    subs: { "kinderprophylaxe": "Kinderprophylaxe", "mih-kreidezaehne": "MIH / Kreidezähne", "kindernarkose": "Vollnarkose bei Kindern", "lueckenhalter": "Lückenhalter" } },
  { key: "aesthetische-zahnmedizin", name: "Ästhetische Zahnmedizin", icon: "i-sparkle", img: "aesthetic", book: "aesthetik",
    teaser: "Veneers, Bleaching und unsichtbare Füllungen, abgestimmt mit unserer Zahntechnikermeisterin.",
    subs: { "veneers": "Veneers", "in-office-home-bleaching": "In-Office- & Home-Bleaching", "internes-bleaching": "Internes Bleaching", "aesthetische-kompositfuellungen": "Ästhetische Kompositfüllungen", "individualisierter-zahnersatz": "Individualisierter Zahnersatz" } },
  { key: "zahnersatz", name: "Zahnersatz & 4-Jahre-Garantie", short: "Zahnersatz", icon: "i-crown", img: "bridge", book: "zahnersatz",
    teaser: "Kronen, Brücken und Prothesen aus dem eigenen Meisterlabor, abgesichert mit 4 Jahren Garantie.",
    subs: { "kronen-bruecken": "Kronen & Brücken", "inlays-onlays-labor": "Laborgefertigte Inlays", "zahnprothesen": "Teil- & Vollprothesen", "zahnersatz-aus-einer-hand": "Zahnersatz aus einer Hand", "4-jahre-garantie": "4-Jahre-Garantie" } },
  { key: "implantologie", name: "Implantologie", icon: "i-implant", img: "implant", book: "implantologie",
    teaser: "Feste Zähne auf Implantaten: 3D-geplant, schonend gesetzt und mit Kronen aus dem Meisterlabor.",
    subs: { "navigierte-implantologie": "Navigierte Implantologie", "3d-roentgen-dvt": "3D-Röntgen (DVT)", "zahnersatz-auf-implantaten": "Zahnersatz auf Implantaten", "knochenaufbau": "Knochenaufbau" } },
  { key: "schienentherapie", name: "Schienentherapie", icon: "i-splint", img: "tooth", book: "schiene",
    teaser: "Knirscherschiene, CMD-Therapie, Schnarcherschiene und Aligner aus dem eigenen Labor.",
    subs: { "knirscherschiene": "Knirscherschiene", "cmd-kiefergelenk": "CMD & Kiefergelenk", "schnarcherschiene": "Schnarcherschiene", "bleachingschiene": "Bleachingschiene", "aligner": "Aligner" } },
  { key: "sportzahnmedizin", name: "Sportzahnmedizin", icon: "i-shield", img: "tooth", book: "sport",
    teaser: "Individueller Sportmundschutz aus dem Meisterlabor und schnelle Hilfe bei Zahnverletzungen im Sport.",
    subs: { "individueller-sportschutz": "Individueller Sportmundschutz", "behandlung-sportunfaelle": "Sportunfälle" } },
  { key: "angstpatienten", name: "Angstpatienten", icon: "i-heart", img: "kids", book: "angst",
    teaser: "Ohne Wertung, auf Augenhöhe: Der erste Termin ist ein reines Beratungsgespräch. Auf Wunsch Dämmerschlaf oder Vollnarkose.",
    subs: { "daemmerschlaf-sedierung": "Dämmerschlaf (Sedierung)", "vollnarkose": "Vollnarkose" } }
];
const LAB = { key: "praxislabor", name: "Praxislabor", icon: "i-lab", img: "bridge", book: "zahnersatz",
  teaser: "Deutsche Meisterzahntechnik unter unserem Dach: Farbnahme am Behandlungsstuhl, Reparatur am selben Tag, 4 Jahre Garantie.",
  subs: { "kronen-bruecken": "Kronen & Brücken", "inlays-onlays": "Inlays & Onlays", "implantat-zahnersatz": "Implantat-Zahnersatz", "prothesen-aller-art": "Prothesen aller Art", "biovertraegliche-werkstoffe": "Bioverträgliche Werkstoffe", "vor-ort-service": "Vor-Ort-Service", "4-jahre-qualitaetsgarantie": "4 Jahre Qualitätsgarantie" } };

const PROMISE = "Unser Versprechen: Ihr erster Termin ist ein reines Beratungsgespräch im Besprechungszimmer. Vollkommen ohne Bohrer, ohne Wertung, auf Augenhöhe.";

module.exports = { SITE, PRAXIS, HOURS, CITIES, LANGS, CLUSTERS, LAB, PROMISE };
