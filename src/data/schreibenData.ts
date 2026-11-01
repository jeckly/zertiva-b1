import { SchreibenPacket } from "@/types";

export const initialSchreibenPackets: SchreibenPacket[] = [
  // ==========================================
  // PAKET A (UTAMA)
  // ==========================================
  {
    packetId: "A",
    title: "Paket A (Hauptprüfung)",
    aufgaben: [
      {
        aufgabeNumber: 1,
        type: "informell",
        title: "Aufgabe 1: Informelle E-Mail an einen Freund (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Sie haben am vergangenen Wochenende eine neue Wohnung in einer anderen Stadt bezogen und eine kleine Einweihungsparty gefeiert. Ihr Freund Michael konnte leider nicht kommen.

Schreiben Sie eine E-Mail an Michael:
- Beschreiben Sie: Wie ist Ihre neue Wohnung und wie war die Einweihungsparty?
- Begründen Sie: Warum war dieser Umzug für Sie besonders wichtig?
- Schlagen Sie einen Termin vor, an dem Michael Sie besuchen kann.

Schreiben Sie ca. 80 Wörter. Achten Sie auf den passenden Textaufbau (Anrede, Einleitung, Reihenfolge der Inhaltspunkte, Schluss, Grußformel).`,
        guidelines: [
          "Inhaltspunkt 1: Beschreibung der neuen Wohnung und der Party (Größe, Lage, Gäste, Stimmung)",
          "Inhaltspunkt 2: Begründung für den Umzug (z.B. neue Arbeitsstelle, mehr Platz, ruhigere Umgebung)",
          "Inhaltspunkt 3: Terminvorschlag für einen persönlichen Besuch von Michael"
        ],
        redemittel: [
          {
            category: "Anrede & Einleitung",
            phrases: [
              "Lieber Michael, / Hallo Michael,",
              "wie geht es dir? Ich hoffe, dir geht es gut.",
              "Schade, dass du am Samstag nicht zu meiner Einweihungsparty kommen konntest!"
            ]
          },
          {
            category: "Konnektoren & Begründungen",
            phrases: [
              "Meine neue Wohnung ist wirklich super, weil sie viel heller und größer ist.",
              "Obwohl der Umzug sehr anstrengend war, hat sich die Mühe gelohnt.",
              "Ich musste umziehen, da meine neue Arbeitsstelle viel näher an der Innenstadt liegt.",
              "Deshalb habe ich mich für dieses schöne Viertel entschieden."
            ]
          },
          {
            category: "Terminvorschlag & Schluss",
            phrases: [
              "Wie sieht es bei dir am nächsten Wochenende aus?",
              "Hättest du Lust, mich am kommenden Samstag zu besuchen?",
              "Sag mir bald Bescheid, ob das klappt.",
              "Herzliche Grüße / Viele Grüße"
            ]
          }
        ],
        musterloesung: `Lieber Michael,

wie geht es dir? Schade, dass du am Samstag nicht bei meiner Einweihungsparty dabei sein konntest! 

Meine neue Dreizimmerwohnung ist wirklich wunderschön. Sie hat einen großen Südbalkon und liegt direkt an einem ruhigen Park. Die Party war ein voller Erfolg, denn fast alle Kollegen und Nachbarn sind gekommen und wir haben bis spät in die Nacht Musik gehört und gelacht.

Ich musste unbedingt umziehen, weil mein alter Arbeitsweg über eine Stunde gedauert hat. Jetzt brauche ich mit dem Fahrrad nur noch zehn Minuten ins Büro. 

Hättest du nicht Lust, mich am kommenden Samstag zu besuchen? Wir könnten gemütlich grillen und quatschen. 

Ich freue mich auf deine Antwort!

Herzliche Grüße
Dein Stefan`
      },
      {
        aufgabeNumber: 2,
        type: "meinung",
        title: "Aufgabe 2: Diskussionsbeitrag in einem Online-Forum (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Sie haben im Fernsehen eine Diskussionssendung zum Thema "Online-Shopping oder Einkaufen in der Innenstadt?" gesehen. Im Online-Gästebuch der Sendung lesen Sie folgenden Beitrag:

"Gästebuch-Kommentar von Laura (26):
Ich kaufe fast alles im Internet. Es ist viel bequemer, spart Zeit und die Auswahl ist riesig. Warum sollte ich mich samstags durch überfüllte Fußgängerzonen quälen?"

Schreiben Sie nun Ihren eigenen Beitrag für das Gästebuch:
- Äußern Sie Ihre Meinung zu Lauras Standpunkt.
- Nennen Sie Gründe für Ihre Haltung und vergleichen Sie Vor- und Nachteile.
- Berichten Sie kurz von eigenen Einkaufserfahrungen.

Schreiben Sie ca. 80 Wörter.`,
        guidelines: [
          "Bezug auf den Kommentar von Laura herstellen",
          "Eigene Meinung deutlich formulieren mit Argumenten (Vorteile/Nachteile)",
          "Eigene persönliche Erfahrung oder Situation im Heimatland erwähnen"
        ],
        redemittel: [
          {
            category: "Meinungsäußerung & Bezugnahme",
            phrases: [
              "Ich bin der festen Ansicht, dass...",
              "Zu Lauras Beitrag möchte ich betonen, dass...",
              "Einerseits hat Laura recht, andererseits..."
            ]
          },
          {
            category: "Argumentation & Abwägung",
            phrases: [
              "Zwar spart Online-Shopping Zeit, aber die vielen Retouren belasten unsere Umwelt enorm.",
              "Im stationären Geschäft kann man Kleidung direkt anprobieren und wird persönlich beraten.",
              "Außerdem veröden unsere Innenstädte, wenn alle nur noch im Internet bestellen."
            ]
          },
          {
            category: "Eigene Erfahrung & Fazit",
            phrases: [
              "Aus eigener Erfahrung weiß ich, dass...",
              "Ich persönlich ziehe es vor, lokale Händler zu unterstützen.",
              "Zusammenfassend lässt sich sagen, dass eine gesunde Mischung ideal ist."
            ]
          }
        ],
        musterloesung: `Hallo zusammen,

zu diesem spannenden Thema möchte ich auch meine Meinung äußern. Einerseits verstehe ich Lauras Argument, dass Online-Shopping sehr bequem und zeiteffizient ist. Andererseits sehe ich dadurch große Gefahren für unsere Städte. 

Wenn alle nur noch per Mausklick bestellen, müssen immer mehr traditionelle Fachgeschäfte schließen. Zudem führen die zahllosen Lieferfahrzeuge zu Stau und Umweltbelastungen. 

Ich persönlich kaufe Bücher oder Elektronik zwar gelegentlich im Netz, aber Kleidung probiere ich lieber direkt vor Ort im Geschäft an. Die persönliche Beratung durch geschultes Personal kann keine Internetseite ersetzen. 

Deshalb sollten wir den lokalen Einzelhandel bewusst unterstützen!

Viele Grüße
Florian`
      },
      {
        aufgabeNumber: 3,
        type: "formell",
        title: "Aufgabe 3: Formelle Entschuldigung / Termiverschiebung (~40 Wörter)",
        targetWords: 40,
        minWords: 35,
        maxWords: 60,
        promptText: `Sie besuchen einen Deutschkurs am Sprachinstitut. Morgen um 10:00 Uhr haben Sie einen wichtigen Beratungstermin bei Ihrer Kursleiterin, Frau Dr. Weber. Wegen einer akuten Autopanne können Sie diesen Termin leider nicht wahrnehmen.

Schreiben Sie an Frau Dr. Weber:
- Entschuldigen Sie sich höflich für das Nichterscheinen.
- Nennen Sie den Grund für Ihre Absage.
- Schlagen Sie einen neuen Termin vor.

Schreiben Sie ca. 40 Wörter. Achten Sie auf die formelle Höflichkeitsform (Sie/Ihnen).`,
        guidelines: [
          "Formelle Anrede (Sehr geehrte Frau Dr. Weber,)",
          "Höfliche Entschuldigung und nachvollziehbare Begründung",
          "Konkreter Alternativtermin",
          "Formelle Grußformel (Mit freundlichen Grüßen)"
        ],
        redemittel: [
          {
            category: "Formelle Anrede & Entschuldigung",
            phrases: [
              "Sehr geehrte Frau Dr. Weber,",
              "ich schreibe Ihnen, weil ich unseren morgigen Termin leider absagen muss.",
              "Bitte entschuldigen Sie die kurzfristige Benachrichtigung."
            ]
          },
          {
            category: "Begründung & Ausweichtermin",
            phrases: [
              "Aufgrund einer plötzlichen Autopanne kann ich morgen um 10 Uhr nicht pünktlich erscheinen.",
              "Wäre es möglich, das Gespräch auf Donnerstag um 14:00 Uhr zu verschieben?",
              "Ich hoffe sehr auf Ihr Verständnis."
            ]
          },
          {
            category: "Grußformel",
            phrases: [
              "Mit freundlichen Grüßen",
              "[Ihr Vor- und Nachname]"
            ]
          }
        ],
        musterloesung: `Sehr geehrte Frau Dr. Weber,

ich muss unseren morgigen Besprechungstermin um 10:00 Uhr leider kurzfristig absagen, da mein Auto heute Morgen einen schweren Motorschaden hatte und in die Werkstatt muss. 

Wäre es möglich, unseren Termin auf Donnerstag um 14:30 Uhr zu verlegen? 

Ich bitte um Entschuldigung für die Unannehmlichkeiten.

Mit freundlichen Grüßen
Stefan Becker`
      }
    ]
  },

  // ==========================================
  // PAKET B (CADANGAN 1)
  // ==========================================
  {
    packetId: "B",
    title: "Paket B (Reserveprüfung 1)",
    aufgaben: [
      {
        aufgabeNumber: 1,
        type: "informell",
        title: "Aufgabe 1: E-Mail an eine Freundin über eine Reise (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Sie waren letzte Woche auf einer Städtereise in Berlin. Ihre Freundin Anna wollte eigentlich mitkommen, war aber krank.

Schreiben Sie an Anna:
- Berichten Sie: Was haben Sie in Berlin besichtigt und erlebt?
- Begründen Sie: Warum hat Ihnen die Reise so gut gefallen?
- Schlagen Sie ein Treffen vor, um ihr die Reisefotos zu zeigen.`,
        guidelines: [
          "Erlebnisse & Sehenswürdigkeiten in Berlin",
          "Begründung für die Begeisterung",
          "Treffen zur Fotopräsentation vorschlagen"
        ],
        redemittel: [
          {
            category: "Einleitung & Reisebericht",
            phrases: [
              "Liebe Anna, schade, dass du krank im Bett bleiben musstest!",
              "Berlin war einfach atemberaubend.",
              "Wir haben das Brandenburger Tor und die Museumsinsel besucht."
            ]
          }
        ],
        musterloesung: `Liebe Anna,

wie geht es dir? Ich hoffe, dass du deine Erkältung mittlerweile gut überstanden hast! Es war wirklich sehr schade, dass du nicht mit nach Berlin kommen konntest.

Die Reise war fantastisch! Wir haben das Brandenburger Tor, das Reichstagsgebäude und viele spannende Museen besucht. Besonders beeindruckt hat mich die lebendige Atmosphäre in den Cafés von Berlin-Mitte. 

Obwohl das Wetter an zwei Tagen regnerisch war, hatten wir jede Menge Spaß und haben leckeres internationales Essen probiert. 

Hast du diesen Sonntag Zeit? Dann komme ich mit meinem Laptop vorbei und zeige dir alle Urlaubsfotos!

Liebe Grüße
Deine Sarah`
      },
      {
        aufgabeNumber: 2,
        type: "meinung",
        title: "Aufgabe 2: Meinungsbeitrag zu 'Homeoffice' (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Diskutieren Sie im Forum: "Homeoffice – Fluch oder Segen für die Arbeitswelt?" Beziehen Sie Stellung zu den Vor- und Nachteilen für Arbeitnehmer und Familien.`,
        guidelines: [
          "Vorzüge (Zeitersparnis beim Pendeln, Flexibilität)",
          "Nachteile (Verschwimmen von Freizeit und Arbeit, fehlender persönlicher Kontakt)",
          "Eigenes Fazit"
        ],
        redemittel: [
          {
            category: "Argumente für und wider Homeoffice",
            phrases: [
              "Ein großer Vorteil des Homeoffice ist der Wegfall des täglichen Arbeitswegs.",
              "Allerdings fällt es vielen schwer, nach Feierabend abzuschalten.",
              "Meiner Ansicht nach ist ein hybrides Modell am besten."
            ]
          }
        ],
        musterloesung: `Hallo zusammen,

das Thema Homeoffice betrifft heutzutage fast jeden Berufstätigen. Meiner Meinung nach bietet das Arbeiten von zu Hause viele Vorteile, besonders für Pendler. Man spart täglich viel Fahrzeit und kann Familie und Beruf oft flexibler organisieren.

Andererseits darf man die Nachteile nicht ignorieren: Der soziale Austausch mit den Kollegen im Büro fehlt spürbar, und manche Menschen arbeiten im Heimbüro bis spät in den Abend, weil die Grenze zwischen Arbeit und Freizeit verschwimmt.

Ich plädiere daher für eine ausgewogene Mischung aus drei Tagen Präsenz und zwei Tagen Telearbeit.

Viele Grüße
Markus`
      },
      {
        aufgabeNumber: 3,
        type: "formell",
        title: "Aufgabe 3: Nachricht an den Vermieter (~40 Wörter)",
        targetWords: 40,
        minWords: 35,
        maxWords: 60,
        promptText: `In Ihrer Mietwohnung ist die Heizung im Wohnzimmer ausgefallen. Schreiben Sie eine formelle Mitteilung an Ihren Vermieter, Herrn Lehmann:
- Informieren Sie ihn über das Problem.
- Bitten Sie um eine zügige Reparatur.
- Nennen Sie Zeiten, wann Handwerker Zugang zur Wohnung haben.`,
        guidelines: [
          "Mängelanzeige: Heizungsausfall",
          "Dringlichkeit & Bitte um Reparatur",
          "Erreichbarkeit für den Handwerkertermin"
        ],
        redemittel: [
          {
            category: "Mängelanzeige Vermieter",
            phrases: [
              "Sehr geehrter Herr Lehmann,",
              "hiermit möchte ich Ihnen mitteilen, dass...",
              "Da die Temperaturen draußen sinken, bitte ich um eine rasche Reparatur."
            ]
          }
        ],
        musterloesung: `Sehr geehrter Herr Lehmann,

in meiner Wohnung funktioniert seit gestern die Heizung im Wohnzimmer nicht mehr und es wird empfindlich kalt. 

Ich bitte Sie daher höflich, baldmöglichst einen Handwerker mit der Reparatur zu beauftragen. Morgen ab 14:00 Uhr bin ich zu Hause erreichbar.

Mit freundlichen Grüßen
Julia Walter`
      }
    ]
  },

  // ==========================================
  // PAKET C (CADANGAN 2)
  // ==========================================
  {
    packetId: "C",
    title: "Paket C (Reserveprüfung 2)",
    aufgaben: [
      {
        aufgabeNumber: 1,
        type: "informell",
        title: "Aufgabe 1: E-Mail an einen Kollegen über ein Seminar (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Sie haben an einer interessanten beruflichen Fortbildung teilgenommen. Ihr Kollege David konnte aus Termingründen nicht teilnehmen. Schreiben Sie an David.`,
        guidelines: ["Thema des Seminars schildern", "Nutzen für die gemeinsame Arbeit erklären", "Unterlagen zum Durchsehen anbieten"],
        redemittel: [{ category: "Seminarbericht", phrases: ["Lieber David, das Seminar war äußerst lehrreich.", "Ich habe viele neue Methoden gelernt."] }],
        musterloesung: `Lieber David,

das Seminar über modernes Projektmanagement war wirklich ein großer Erfolg! Der Trainer hat uns praxisnahe Werkzeuge gezeigt, wie wir Teamaufgaben digital und transparent koordinieren können.

Ich denke, diese Methoden könnten unsere tägliche Zusammenarbeit im Marketing-Team deutlich beschleunigen. 

Ich habe alle Schulungsunterlagen und Präsentationen auf unserem Firmenserver gespeichert. Lass uns doch morgen beim Mittagessen darüber sprechen, wie wir das am besten umsetzen können!

Beste Grüße
Felix`
      },
      {
        aufgabeNumber: 2,
        type: "meinung",
        title: "Aufgabe 2: Forumbeitrag zu 'Klimafreundlich Reisen' (~80 Wörter)",
        targetWords: 80,
        minWords: 70,
        maxWords: 110,
        promptText: `Äußern Sie Ihre Meinung im Reiseforum: Sollte man auf Billigflüge für Wochenendtrips verzichten und stattdessen mit dem Zug reisen?`,
        guidelines: ["Klimaauswirkungen von Kurzstreckenflügen", "Attraktivität des Bahnfahrens", "Eigene Reisegewohnheiten"],
        redemittel: [{ category: "Klimareisen", phrases: ["Kurzstreckenflüge belasten die Umwelt enorm.", "Bahnreisen sind oft entspannter."] }],
        musterloesung: `Hallo zusammen,

ich finde es sehr bedenklich, dass viele Menschen für ein kurzes Wochenende nach Barcelona oder London fliegen. Kurzstreckenflüge verursachen pro Kopf die höchsten Emissionen.

Züge mögen manchmal länger brauchen, bieten aber viel mehr Reisekomfort und bringen einen direkt ins Zentrum. 

Wenn wir unseren Planeten für zukünftige Generationen schützen wollen, müssen wir unser Reiseverhalten überdenken und dem Zug den Vorrang geben.

Viele Grüße
Elena`
      },
      {
        aufgabeNumber: 3,
        type: "formell",
        title: "Aufgabe 3: Reklamation / Bitte um Rückruf (~40 Wörter)",
        targetWords: 40,
        minWords: 35,
        maxWords: 60,
        promptText: `Sie haben ein elektronisches Gerät online bestellt, das beschädigt geliefert wurde. Schreiben Sie an den Kundenservice.`,
        guidelines: ["Bestellnummer angeben", "Schaden kurz beschreiben", "Um Ersatzlieferung oder Rückerstattung bitten"],
        redemittel: [{ category: "Reklamation", phrases: ["Sehr geehrte Damen und Herren,", "das Gerät weist schwere Beschädigungen auf.", "Ich bitte um Umtausch."] }],
        musterloesung: `Sehr geehrte Damen und Herren,

gestern erhielt ich meine Bestellung (Nr. 84920). Leider ist das Display des gelieferten Tablets zerbrochen. 

Ich bitte Sie daher höflich, mir umgehend ein intaktes Ersatzgerät zuzusenden oder den Kaufpreis zu erstatten. 

Mit freundlichen Grüßen
Thomas Wagner`
      }
    ]
  }
];
