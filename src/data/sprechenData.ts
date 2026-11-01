import { SprechenPacket } from "@/types";

export const initialSprechenPackets: SprechenPacket[] = [
  // ==========================================
  // PAKET A (UTAMA)
  // ==========================================
  {
    packetId: "A",
    title: "Paket A (Hauptprüfung)",
    teil1: {
      title: "Teil 1: Gemeinsam etwas planen (~3 Minuten)",
      scenario: "Ein gemeinsamer Freund hat Geburtstag. Sie und Ihr Gesprächspartner möchten für ihn eine Überraschungsfeier organisieren.",
      taskPoints: [
        "Wann und wo soll die Feier stattfinden? (Datum, Uhrzeit, Ort: Park, Restaurant oder zu Hause)",
        "Wen laden wir ein und wie informieren wir die Gäste? (Gästeliste, WhatsApp-Gruppe, Einladungskarte)",
        "Was gibt es zu essen und zu trinken? (Buffet, Grillen, wer bringt was mit?)",
        "Welches Geburtstagsgeschenk besorgen wir gemeinsam? (Gutschein, Konzertticket, Geld sammeln)"
      ],
      partnerDialogues: [
        {
          prompt: "Partner eröffnet das Gespräch:",
          partnerVoiceText: "Hallo! Unser Freund David hat doch nächsten Samstag Geburtstag. Wollen wir eine Überraschungsparty für ihn planen? Was hältst du davon?",
          suggestedResponsePoints: ["Idee bejahen", "Wochenende vorschlagen", "Einen Ort wie den Stadtpark oder die eigene Wohnung vorschlagen"]
        },
        {
          prompt: "Partner fragt nach dem Essen:",
          partnerVoiceText: "Super! Wie machen wir das mit dem Essen und den Getränken? Sollen wir Pizza bestellen oder jeder bringt etwas mit?",
          suggestedResponsePoints: ["Vorschlag für Mitbring-Buffet (jeder bringt Salat oder Kuchen mit)", "Getränke gemeinsam im Supermarkt einkaufen"]
        },
        {
          prompt: "Partner fragt nach dem Geschenk:",
          partnerVoiceText: "David wünscht sich doch schon lange neue Kopfhörer. Sollen wir von allen Gästen je 10 Euro einsammeln und sie ihm schenken?",
          suggestedResponsePoints: ["Zustimmen oder Alternative vorschlagen", "Festlegen, wer das Geschenk besorgt und einpackt"]
        }
      ],
      redemittel: [
        "Ich schlage vor, dass wir...",
        "Was hältst du davon, wenn wir...",
        "Das ist eine hervorragende Idee!",
        "Da bin ich ganz deiner Meinung.",
        "Ich bin mir nicht sicher. Vielleicht wäre es besser, wenn...",
        "Wer kümmert sich um...?"
      ]
    },
    teil2Topics: [
      {
        id: "sprechen-a-t2-top1",
        topicTitle: "Thema 1: Braucht jeder Mensch ein Smartphone?",
        slides: [
          {
            slideNumber: 1,
            slideTitle: "Folie 1: Thema & Persönliche Erfahrung",
            guidePoints: [
              "Thema vorstellen und Struktur der Präsentation kurz skizzieren.",
              "Berichten: Wie oft und wofür nutzen Sie persönlich Ihr Smartphone im Alltag? (Kommunikation, Navigation, Arbeit)."
            ]
          },
          {
            slideNumber: 2,
            slideTitle: "Folie 2: Situation im Heimatland",
            guidePoints: [
              "Welche Rolle spielen Smartphones in Ihrem Heimatland?",
              "Haben auch Kinder und ältere Menschen ein eigenes Gerät? Wie verbreitet ist mobiles Internet?"
            ]
          },
          {
            slideNumber: 3,
            slideTitle: "Folie 3: Vor- und Nachteile",
            guidePoints: [
              "Vorteile: Ständige Erreichbarkeit, Fahrplanauskunft in Echtzeit, mobile Bankgeschäfte, schnelles Lernen.",
              "Nachteile: Ablenkung, Suchtpotenzial, weniger reale soziale Kontakte, Bewegungsmangel."
            ]
          },
          {
            slideNumber: 4,
            slideTitle: "Folie 4: Eigene Meinung",
            guidePoints: [
              "Ihre persönliche Schlussfolgerung begründen.",
              "z.B.: Smartphones sind nützliche Werkzeuge, aber feste medienfreie Zeiten sind wichtig."
            ]
          },
          {
            slideNumber: 5,
            slideTitle: "Folie 5: Abschluss & Dank",
            guidePoints: [
              "Zuhörer für die Aufmerksamkeit danken.",
              "Das Publikum einladen, Fragen zu stellen."
            ]
          }
        ],
        musterVortrag: `Guten Tag meine Damen und Herren! Ich möchte Ihnen heute mein Thema "Braucht jeder Mensch ein Smartphone?" präsentieren. Mein Vortrag besteht aus folgenden Teilen: Zuerst berichte ich von meinen eigenen Erfahrungen. Danach stelle ich die Situation in meinem Heimatland dar. Anschließend nenne ich Vor- und Nachteile und äußere meine eigene Meinung. Zum Schluss freue ich mich auf Ihre Fragen.

Ich persönlich besitze seit etwa zehn Jahren ein Smartphone und nutze es täglich für fast alles: als Wecker, Fahrkarte, Wörterbuch und um mit meiner Familie in Kontakt zu bleiben. Ohne Smartphone wäre mein Alltag viel komplizierter.

In meinem Heimatland Indonesien ist das Smartphone für fast die gesamte Bevölkerung das wichtigste Tor zur digitalen Welt. Da viele Menschen keinen Desktop-Computer besitzen, werden alle Behördengänge, Einkäufe und Schularbeiten direkt mobil erledigt.

Die Vorteile liegen auf der Hand: Enorme Zeitersparnis, weltweiter Wissenszugang und spontane Kommunikation. Auf der anderen Seite gibt es erhebliche Nachteile: Viele Jugendliche verbringen stundenlang Zeit vor TikTok oder Instagram, was zu Schlafproblemen und Bewegungsmangel führt.

Meiner Ansicht nach ist das Smartphone in unserer modernen Gesellschaft unverzichtbar. Entscheidend ist jedoch, dass wir lernen, das Gerät bewusst auszuschalten.

Ich bedanke mich ganz herzlich für Ihre Aufmerksamkeit. Haben Sie noch Fragen?`,
        redemittel: [
          {
            slide: "Einleitung",
            phrases: [
              "Das Thema meiner Präsentation lautet...",
              "Ich habe dieses Thema gewählt, weil...",
              "Mein Vortrag gliedert sich in folgende Punkte..."
            ]
          },
          {
            slide: "Persönliche Erfahrung & Heimatland",
            phrases: [
              "Aus eigener Erfahrung kann ich sagen, dass...",
              "In meinem Heimatland ist die Situation so, dass...",
              "Im Vergleich zu Deutschland gibt es dort..."
            ]
          },
          {
            slide: "Vor- und Nachteile & Meinung",
            phrases: [
              "Ein wesentlicher Vorteil ist, dass...",
              "Ein nicht zu vernachlässigender Nachteil besteht darin, dass...",
              "Meiner festen Überzeugung nach...",
              "Zusammenfassend möchte ich festhalten, dass..."
            ]
          },
          {
            slide: "Abschluss",
            phrases: [
              "Damit bin ich am Ende meines Vortrags.",
              "Vielen Dank für Ihre Aufmerksamkeit.",
              "Jetzt beantworte ich gern Ihre Fragen."
            ]
          }
        ]
      },
      {
        id: "sprechen-a-t2-top2",
        topicTitle: "Thema 2: Sollte man Fremdsprachen schon im Kindergarten lernen?",
        slides: [
          { slideNumber: 1, slideTitle: "Folie 1: Thema & Persönliche Erfahrung", guidePoints: ["Eigene Erfahrungen beim Sprachenlernen in der Kindheit"] },
          { slideNumber: 2, slideTitle: "Folie 2: Situation im Heimatland", guidePoints: ["Fremdsprachenunterricht in Vorschulen"] },
          { slideNumber: 3, slideTitle: "Folie 3: Vor- und Nachteile", guidePoints: ["Spielerischer Spracherwerb vs. Überforderung des Kindes"] },
          { slideNumber: 4, slideTitle: "Folie 4: Eigene Meinung", guidePoints: ["Begründete Haltung"] },
          { slideNumber: 5, slideTitle: "Folie 5: Abschluss & Dank", guidePoints: ["Dank & Fragen"] }
        ],
        musterVortrag: `Guten Tag! Mein Thema lautet: "Sollte man Fremdsprachen schon im Kindergarten lernen?"...`,
        redemittel: [
          { slide: "Allgemein", phrases: ["Kinder lernen Sprachen besonders intuitiv und spielerisch.", "Wichtig ist, dass kein Notendruck entsteht."] }
        ]
      }
    ],
    teil3: {
      title: "Teil 3: Über ein Thema sprechen / Feedback & Fragen (~1,5 Minuten)",
      instruction: "Geben Sie Ihrem Partner eine Rückmeldung zu seiner Präsentation, stellen Sie eine passende Frage und beantworten Sie die Fragen des Prüfers.",
      partnerPresentationsSummary: "Ihr Partner hat soeben über das Thema 'Gesunde Ernährung im stressigen Berufsalltag' referiert.",
      feedbackTemplates: [
        "Ich fand deine Präsentation sehr interessant und strukturiert vorgetragen.",
        "Besonders der Punkt über die Vorbereitung von gesunden Snacks für das Büro hat mir gut gefallen.",
        "Eine Sache würde mich noch interessieren: ..."
      ],
      examinerQuestions: [
        {
          questionText: "Herr/Frau Prüfer fragt: 'Glauben Sie, dass Smartphones in der Zukunft durch KI-Brillen oder andere Geräte vollständig ersetzt werden?'",
          audioText: "Glauben Sie, dass Smartphones in der Zukunft durch künstliche Intelligenz, Sprachassistenten oder Brillen vollständig ersetzt werden?",
          sampleAnswer: "Das ist eine sehr interessante Frage. Ich denke, dass intelligente Brillen oder Uhren zwar viele Funktionen übernehmen werden, aber für das bequeme Lesen von langen Texten oder das Anschauen von Videos bleibt ein Bildschirm in der Hand noch für viele Jahre die praktischste Lösung."
        },
        {
          questionText: "Partner fragt: 'Wie oft machen Sie persönlich einen Smartphone-freien Tag (Digital Detox)?'",
          audioText: "Wie oft machst du persönlich eigentlich einen Smartphone-freien Tag, also einen sogenannten Digital Detox?",
          sampleAnswer: "Ehrlich gesagt schaffe ich einen ganzen Tag ohne Smartphone nur selten. Aber am Sonntag versuche ich, das Handy ab 18 Uhr in der Schublade zu lassen, um in Ruhe ein Buch zu lesen oder Zeit mit Freunden zu verbringen."
        }
      ]
    }
  },

  // ==========================================
  // PAKET B (CADANGAN 1)
  // ==========================================
  {
    packetId: "B",
    title: "Paket B (Reserveprüfung 1)",
    teil1: {
      title: "Teil 1: Gemeinsam einen Ausflug planen",
      scenario: "Sie möchten mit Ihrem Sprachkurs am Wochenende einen gemeinsamen Tagesausflug machen.",
      taskPoints: [
        "Wohin soll der Ausflug gehen? (Museum, See, historische Altstadt)",
        "Wie reisen wir an? (Gruppenticket der Bahn, Fahrräder)",
        "Welche Aktivitäten unternehmen wir vor Ort?",
        "Wie verpflegen wir uns?"
      ],
      partnerDialogues: [
        {
          prompt: "Partner schlägt vor:",
          partnerVoiceText: "Hallo! Am Samstag soll das Wetter herrlich werden. Wollen wir mit dem ganzen Deutschkurs an den Wannsee fahren?",
          suggestedResponsePoints: ["Begeistert zustimmen", "Bahnverbindung ansprechen"]
        }
      ],
      redemittel: ["Ich würde gern vorschlagen...", "Lass uns ein Quer-durchs-Land-Ticket kaufen."]
    },
    teil2Topics: [
      {
        id: "sprechen-b-t2-top1",
        topicTitle: "Thema 1: Brauchen wir noch gedruckte Bücher oder nur noch E-Books?",
        slides: [
          { slideNumber: 1, slideTitle: "Folie 1: Thema & Eigene Erfahrung", guidePoints: ["E-Reader oder Papierbuch?"] },
          { slideNumber: 2, slideTitle: "Folie 2: Heimatland", guidePoints: ["Lesegewohnheiten"] },
          { slideNumber: 3, slideTitle: "Folie 3: Pro & Contra", guidePoints: ["Gewicht, Platz, Akku vs. Haptik und Gemütlichkeit"] },
          { slideNumber: 4, slideTitle: "Folie 4: Meine Meinung", guidePoints: ["Kombination beider Medien"] },
          { slideNumber: 5, slideTitle: "Folie 5: Dank", guidePoints: ["Fragenrunde"] }
        ],
        musterVortrag: `Ich lese auf Reisen sehr gern auf dem E-Reader, weil er leicht ist. Zu Hause liebe ich aber das Gefühl eines echten Buches...`,
        redemittel: [{ slide: "E-Books", phrases: ["Ein E-Reader spart auf Reisen enorm viel Gepäckgewicht."] }]
      }
    ],
    teil3: {
      title: "Teil 3: Feedback und Prüferfragen",
      instruction: "Feedback geben und Fragen beantworten.",
      partnerPresentationsSummary: "Thema des Partners: 'Öffentlicher Nahverkehr kostenlos für alle'.",
      feedbackTemplates: ["Vielen Dank für deine spannende Präsentation."],
      examinerQuestions: [
        {
          questionText: "Prüfer fragt: 'Glauben Sie, dass traditionelle Bibliotheken in 20 Jahren noch existieren werden?'",
          audioText: "Glauben Sie, dass traditionelle Bibliotheken in 20 Jahren noch existieren werden?",
          sampleAnswer: "Ja, davon bin ich überzeugt! Bibliotheken sind heute nicht nur Bücherspeicher, sondern beliebte Orte zum Lernen, Arbeiten und für kulturelle Begegnungen."
        }
      ]
    }
  },

  // ==========================================
  // PAKET C (CADANGAN 2)
  // ==========================================
  {
    packetId: "C",
    title: "Paket C (Reserveprüfung 2)",
    teil1: {
      title: "Teil 1: Eine Informationsveranstaltung vorbereiten",
      scenario: "Sie und Ihr Partner organisieren einen Infoabend für neue internationale Studenten.",
      taskPoints: ["Raum reservieren & Technik prüfen", "Flyer erstellen", "Snacks und Getränke besorgen", "Programmablauf festlegen"],
      partnerDialogues: [
        {
          prompt: "Partner fragt nach der Präsentationstechnik:",
          partnerVoiceText: "Hi! Ich habe bereits den Hörsaal 3 gebucht. Wer kümmert sich um Beamer und Mikrofone?",
          suggestedResponsePoints: ["Übernahme der Technikprüfung anbieten", "Verbindungskabel mitbringen"]
        }
      ],
      redemittel: ["Kein Problem, das übernehme ich.", "Wir sollten unbedingt auch kleine Willkommensgeschenke verteilen."]
    },
    teil2Topics: [
      {
        id: "sprechen-c-t2-top1",
        topicTitle: "Thema 1: Haustiere in der Mietwohnung – Ja oder Nein?",
        slides: [
          { slideNumber: 1, slideTitle: "Folie 1: Thema & Erfahrung", guidePoints: ["Eigene Haustiere in der Kindheit"] },
          { slideNumber: 2, slideTitle: "Folie 2: Heimatland", guidePoints: ["Tiere in städtischen Wohnungen"] },
          { slideNumber: 3, slideTitle: "Folie 3: Vor- und Nachteile", guidePoints: ["Einsamkeit verringern vs. Lärm, Dreck, Nachbarschaftsstreit"] },
          { slideNumber: 4, slideTitle: "Folie 4: Eigene Meinung", guidePoints: ["Artgerechte Haltung berücksichtigen"] },
          { slideNumber: 5, slideTitle: "Folie 5: Dank", guidePoints: ["Fragen"] }
        ],
        musterVortrag: `Tiere schenken ihren Haltern viel Liebe, aber eine kleine 1-Zimmer-Wohnung ohne Garten ist für große Hunde oft eine Quälerei...`,
        redemittel: [{ slide: "Tiere", phrases: ["Man muss Verantwortung für das Tierwohl übernehmen."] }]
      }
    ],
    teil3: {
      title: "Teil 3: Feedback & Prüferfrage",
      instruction: "Feedback geben und Fragen beantworten.",
      partnerPresentationsSummary: "Thema des Partners: 'Fahrrad statt Auto im Stadtverkehr'.",
      feedbackTemplates: ["Dein Vortrag war sehr anschaulich und überzeugend."],
      examinerQuestions: [
        {
          questionText: "Prüfer: 'Hatten Sie selbst schon einmal Probleme mit Haustieren von Nachbarn?'",
          audioText: "Hatten Sie selbst schon einmal Probleme mit Haustieren von Ihren Nachbarn?",
          sampleAnswer: "Bisher zum Glück kaum. Nur einmal hat der Hund des Nachbarn nachts lange gebellt, aber nach einem freundlichen Gespräch hat sich das Problem schnell geklärt."
        }
      ]
    }
  }
];
