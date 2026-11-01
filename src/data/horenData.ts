import { HorenPacket } from "@/types";

export const initialHorenPackets: HorenPacket[] = [
  // ==========================================
  // PAKET A (UTAMA)
  // ==========================================
  {
    packetId: "A",
    title: "Paket A (Hauptprüfung)",
    description: "Simulasi Ujian Goethe-Zertifikat B1 Hören Lengkap (Teil 1 bis 4)",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Kurze Durchsagen & Telefonansagen",
        instruction: "Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Wählen Sie für die Aufgaben die richtige Lösung.",
        playLimit: 2,
        audioTranscript: `Aufgabe 1 und 2:
"Achtung, eine Durchsage für Fahrgäste des Intercity-Express 582 nach Hamburg-Altona über Hannover Hauptbahnhof. Wegen kurzfristiger Reparaturarbeiten an einer Weile fährt dieser Zug heute nicht von Gleis 4 ab, sondern wird außerplanmäßig auf Gleis 9 bereitgestellt. Die Abfahrt verzögert sich voraussichtlich um 15 Minuten. Wir bitten alle Fahrgäste, die Unterführung zu Gleis 9 zu benutzen. Bitte achten Sie auf Durchsagen und die Anzeigen am Bahnsteig."

Aufgabe 3:
"Guten Tag, Herr Schneider. Hier ist die Praxis Dr. Bergmann. Wir möchten Sie daran erinnern, dass Ihr gebuchter Kontrolltermin für die Zahnreinigung morgen, Donnerstag, um 14:30 Uhr stattfindet. Sollten Sie den Termin nicht wahrnehmen können, bitten wir Sie, uns spätestens bis heute 17:00 Uhr telefonisch zu informieren. Vielen Dank und auf Wiederhören."`,
        audioSpeakers: [
          { name: "Bahn-Ansage", text: "Achtung, eine Durchsage für Fahrgäste des Intercity-Express 582 nach Hamburg-Altona über Hannover Hauptbahnhof. Wegen kurzfristiger Reparaturarbeiten an einer Weiche fährt dieser Zug heute nicht von Gleis 4 ab, sondern wird außerplanmäßig auf Gleis 9 bereitgestellt. Die Abfahrt verzögert sich voraussichtlich um 15 Minuten. Wir bitten alle Fahrgäste, die Unterführung zu Gleis 9 zu benutzen." },
          { name: "Praxis Bergmann", text: "Guten Tag, Herr Schneider. Hier ist die Praxis Dr. Bergmann. Wir möchten Sie daran erinnern, dass Ihr gebuchter Kontrolltermin für die Zahnreinigung morgen, Donnerstag, um 14:30 Uhr stattfindet. Sollten Sie den Termin nicht wahrnehmen können, bitten wir Sie, uns spätestens bis heute 17:00 Uhr telefonisch zu informieren. Vielen Dank und auf Wiederhören." }
        ],
        questions: [
          {
            id: "hor-a-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Der ICE 582 nach Hamburg fährt pünktlich von Gleis 4 ab.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Kereta tidak berangkat dari peron 4 melainkan dipindah ke peron 9 dan mengalami keterlambatan 15 menit.",
          },
          {
            id: "hor-a-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Was sollen die Fahrgäste tun?",
            options: [
              "Sofort zur Bushaltestelle vor dem Bahnhof gehen.",
              "Die Unterführung nutzen, um zu Gleis 9 zu gelangen.",
              "Ihre Fahrkarten im Reisezentrum umtauschen."
            ],
            correctAnswer: "Die Unterführung nutzen, um zu Gleis 9 zu gelangen.",
            explanation: "Petugas meminta penumpang memakai jalan bawah tanah menuju peron 9 ('die Unterführung zu Gleis 9 benutzen')."
          },
          {
            id: "hor-a-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Herr Schneider wird gebeten,...",
            options: [
              "am Freitag in die Praxis zu kommen.",
              "sich bis 17:00 Uhr zu melden, falls er den Termin absagen muss.",
              "seine Krankenversicherungskarte per Post zu schicken."
            ],
            correctAnswer: "sich bis 17:00 Uhr zu melden, falls er den Termin absagen muss.",
            explanation: "Klinik meminta konfirmasi pembatalan paling lambat hari ini pukul 17:00 jika tidak bisa datang.",
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Führung & Informationsmonolog",
        instruction: "Sie hören einen Text einmal. Wählen Sie bei jeder Aufgabe die richtige Lösung (A, B oder C).",
        playLimit: 1,
        audioTranscript: `"Herzlich willkommen, liebe Gäste, im Deutschen Filmmuseum Frankfurt! Mein Name ist Thomas Lindemann und ich begleite Sie heute durch unsere Dauerausstellung 'Von der Laterna Magica zum digitalen Kino'. Bevor wir in den ersten Stock gehen, möchte ich Ihnen ein paar wichtige organisatorische Hinweise geben: Fotografieren ist in allen Ausstellungsräumen gestattet, jedoch ausdrücklich ohne Blitzlicht, um die historischen Filmplakate und empfindlichen Requisiten zu schonen. Große Rucksäcke und Regenschirme deponieren Sie bitte unten in den Schließfächern. Am Ende unseres 45-minütigen Rundgangs haben Sie noch Gelegenheit, unser hauseigenes Kino zu besuchen, wo heute Stummfilmklassiker mit Live-Klavierbegleitung gezeigt werden. Folgen Sie mir nun bitte zur Treppe."`,
        questions: [
          {
            id: "hor-a-t2-q4",
            teil: 2,
            questionNumber: 4,
            questionText: "Das Fotografieren im Filmmuseum...",
            options: [
              "ist streng verboten.",
              "ist ohne Blitzlicht in den Räumen erlaubt.",
              "kostet einen Aufpreis von 5 Euro."
            ],
            correctAnswer: "ist ohne Blitzlicht in den Räumen erlaubt.",
            explanation: "Pemandu menyatakan berfoto diizinkan asalkan tanpa lampu kilat/blitz ('jedoch ausdrücklich ohne Blitzlicht')."
          },
          {
            id: "hor-a-t2-q5",
            teil: 2,
            questionNumber: 5,
            questionText: "Was sollten Besucher mit großen Taschen tun?",
            options: [
              "Sie in den Schließfächern im Erdgeschoss einschließen.",
              "Sie der Museumsleitung an der Kasse übergeben.",
              "Sie während der Führung auf dem Rücken tragen."
            ],
            correctAnswer: "Sie in den Schließfächern im Erdgeschoss einschließen.",
            explanation: "Ransel besar dan payung wajib disimpan di loker ('in den Schließfächern deponieren')."
          },
          {
            id: "hor-a-t2-q6",
            teil: 2,
            questionNumber: 6,
            questionText: "Was erwartet die Besucher nach dem Rundgang?",
            options: [
              "Ein Treffen mit berühmten Hollywood-Schauspielern.",
              "Ein Workshop über Videoschnitt am Computer.",
              "Stummfilme mit Live-Klavierbegleitung im Museumskino."
            ],
            correctAnswer: "Stummfilme mit Live-Klavierbegleitung im Museumskino.",
            explanation: "Di bioskop museum ditayangkan film bisu klasik dengan iringan piano langsung."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Alltagsgespräch zweier Personen",
        instruction: "Sie hören ein Gespräch einmal. Wählen Sie für jede Aufgabe: Richtig oder Falsch.",
        playLimit: 1,
        audioTranscript: `Dialog zwischen Lukas und Julia:
Lukas: "Hallo Julia! Schön, dich an der Bushaltestelle zu treffen. Sag mal, hast du schon für unsere B1-Prüfung nächste Woche gelernt?"
Julia: "Oh Lukas, erinner mich bloß nicht daran! Beim Leseverstehen fühle ich mich eigentlich ziemlich sicher, aber vor dem mündlichen Teil habe ich echt Bammel. Wenn ich spontan vor den Prüfern reden soll, vergesse ich oft die richtigen Vokabeln."
Lukas: "Weißt du was? Lass uns doch heute Abend in die Bibliothek gehen und zusammen üben. Wir können uns gegenseitig Rollenspiele ausdenken und Redemittel wiederholen."
Julia: "Das ist eine super Idee! Allerdings muss ich heute bis 17:30 Uhr arbeiten. Passt es dir danach um 18:00 Uhr am Haupteingang der Unibibliothek?"
Lukas: "Perfekt, machen wir so. Bring am besten deine Grammatikunterlagen mit!"`,
        questions: [
          {
            id: "hor-a-t3-q7",
            teil: 3,
            questionNumber: 7,
            questionText: "Julia macht sich vor allem Sorgen wegen des Prüfungsteils 'Sprechen'.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Julia mengatakan membaca ia percaya diri, tetapi ujian lisan (Sprechen) membuatnya sangat cemas ('vor dem mündlichen Teil habe ich echt Bammel')."
          },
          {
            id: "hor-a-t3-q8",
            teil: 3,
            questionNumber: 8,
            questionText: "Lukas und Julia treffen sich sofort am Vormittag zum Lernen.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Mereka janjian jam 18:00 sore setelah Julia selesai bekerja, bukan di pagi hari."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Radiodiskussion mit drei Teilnehmern",
        instruction: "Sie hören eine Radiosendung zweimal. Wer sagt was? Wählen Sie: Moderator, Frau Sommer (Psychologin) oder Herr Krüger (Gastronom).",
        playLimit: 2,
        audioTranscript: `Radiosendung "Treffpunkt am Abend":
Moderator: "Guten Abend, liebe Hörerinnen und Hörer. Willkommen zu unserer Diskussionsrunde. Heute fragen wir: 'Trinkgeld in Zeiten digitaler Kartenzahlung – stirbt eine Tradition aus?' Bei uns zu Gast sind die Psychologin Frau Dr. Sommer und der Restaurantbesitzer Herr Krüger. Herr Krüger, wie erleben Sie die Umstellung auf bargeldloses Bezahlen?"

Herr Krüger: "Ganz ehrlich: Viele Gäste, die mit Smartphone oder Karte zahlen, drücken am Kartenlesegerät einfach auf 'Kein Trinkgeld', weil es ihnen peinlich ist oder sie es eilig haben. Für mein Servicepersonal ist das ein spürbarer Einkommensverlust. Ein freundlicher Service sollte auch finanziell honoriert werden."

Frau Dr. Sommer: "Da muss ich einhaken. Psychologische Studien zeigen ein anderes Bild: Wenn Terminal-Systeme dem Gast vorschlagen '10 %, 15 % oder 20 %', geben viele Menschen sogar mehr als früher mit Münzen, weil sie sich unter sozialem Druck fühlen. Trinkgeld sollte jedoch eine freiwillige Geste der Wertschätzung bleiben und kein automatischer Zwang sein."

Moderator: "Ein spannender Aspekt. Wir fassen zusammen: Die Digitalisierung verändert das Trinkgeldverhalten gravierend, aber das persönliche Lächeln des Kellners bleibt unersetzbar."`,
        questions: [
          {
            id: "hor-a-t4-q9",
            teil: 4,
            questionNumber: 9,
            questionText: "Wer beklagt, dass das Restaurantpersonal durch Kartenzahlung weniger Zusatzeinnahmen erhält?",
            options: ["Moderator", "Frau Dr. Sommer", "Herr Krüger"],
            correctAnswer: "Herr Krüger",
            explanation: "Herr Krüger (pemilik restoran) mengeluhkan bahwa pelayannya kehilangan pendapatan tambahan karena tamu sering memencet tombol tanpa tip."
          },
          {
            id: "hor-a-t4-q10",
            teil: 4,
            questionNumber: 10,
            questionText: "Wer betont, dass Trinkgeld immer freiwillig sein sollte und nicht durch sozialen Druck erzwungen werden darf?",
            options: ["Moderator", "Frau Dr. Sommer", "Herr Krüger"],
            correctAnswer: "Frau Dr. Sommer",
            explanation: "Dr. Sommer menekankan bahwa tip harus tetap menjadi apresiasi sukarela tanpa paksaan psikologis."
          }
        ]
      }
    ]
  },

  // ==========================================
  // PAKET B (CADANGAN 1)
  // ==========================================
  {
    packetId: "B",
    title: "Paket B (Reserveprüfung 1)",
    description: "Simulasi Ujian Hören B1: Flughafen, Stadtfest, Sprachreise & Ehrenamt",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Kurze Ansagen",
        instruction: "Sie hören zwei kurze Texte je zweimal.",
        playLimit: 2,
        audioTranscript: `"Achtung am Gate B24. Der Flug LH 1830 nach Berlin-Brandenburg ist nun zum Einsteigen bereit. Wir bitten zunächst Familien mit kleinen Kindern sowie Passagiere mit Hilfebedarf an Bord. Halten Sie bitte Ihre Bordkarte und Ihren Lichtbildausweis bereit."`,
        questions: [
          {
            id: "hor-b-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Wer darf zuerst in das Flugzeug einsteigen?",
            options: [
              "Alle Passagiere mit Sitzplätzen in den vorderen Reihen.",
              "Familien mit Kleinkindern und Personen mit Hilfebedarf.",
              "Nur Passagiere ohne Handgepäck."
            ],
            correctAnswer: "Familien mit Kleinkindern und Personen mit Hilfebedarf.",
            explanation: "Pengumuman meminta keluarga dengan anak kecil dan penumpang yang butuh bantuan masuk terlebih dahulu."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Monolog über ein Stadtfest",
        instruction: "Sie hören den Text einmal.",
        playLimit: 1,
        audioTranscript: `"Liebe Bürgerinnen und Bürger! Am kommenden Samstag feiert unsere Stadt das 750-jährige Stadtjubiläum auf dem Marktplatz. Ab 11 Uhr morgens gibt es Kunsthandwerk, regionale Spezialitäten und ein kostenloses Kinderkarussell. Bitte beachten Sie, dass die Zufahrtsstraßen zum Stadtkern ab Freitagabend für den Autoverkehr gesperrt sind. Nutzen Sie bitte die kostenlosen Shuttlebusse vom Bahnhof."`,
        questions: [
          {
            id: "hor-b-t2-q2",
            teil: 2,
            questionNumber: 2,
            questionText: "Wie sollten die Besucher zum Marktplatz anreisen?",
            options: [
              "Mit dem eigenen Auto direkt auf den Marktplatz fahren.",
              "Mit den kostenlosen Shuttlebussen ab dem Bahnhof.",
              "Ausschließlich mit dem Taxi."
            ],
            correctAnswer: "Mit den kostenlosen Shuttlebussen ab dem Bahnhof.",
            explanation: "Karena jalanan pusat kota ditutup untuk mobil, panitia menyediakan bus jemputan gratis dari stasiun."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Gespräch über Sprachkurs",
        instruction: "Sie hören ein Gespräch einmal.",
        playLimit: 1,
        audioTranscript: `Mann: "Tina, hast du dich schon für den Deutsch-Intensivkurs angemeldet?"
Frau: "Ja, gestern! Aber der Unterricht findet jetzt montags und mittwochs von 18 bis 21 Uhr statt, nicht mehr dienstags."
Mann: "Super, dann können wir dienstags weiterhin zusammen zum Fußballtraining gehen!"`,
        questions: [
          {
            id: "hor-b-t3-q3",
            teil: 3,
            questionNumber: 3,
            questionText: "Der Sprachkurs von Tina kollidiert mit dem Fußballtraining am Dienstag.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Kursus bahasa dialihkan ke Senin dan Rabu, sehingga Selasa mereka tetap bebas latihan bola."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Podiumsdiskussion zu Social Media",
        instruction: "Wer äußert folgende Meinung? Moderator, Herr Becker oder Frau Klein.",
        playLimit: 2,
        audioTranscript: `Moderator: "Guten Tag. Macht Social Media Jugendliche einsam oder vernetzter? Frau Klein meint dazu..."
Frau Klein: "Ich sehe vor allem die Gefahr der ständigen Vergleichskultur. Viele Jugendliche entwickeln Minderwertigkeitskomplexe durch gefilterte Fotos."
Herr Becker: "Man darf aber nicht vergessen, dass soziale Netzwerke schüchternen Jugendlichen helfen, Gleichgesinnte für Hobbys und Nischenthemen zu finden."`,
        questions: [
          {
            id: "hor-b-t4-q4",
            teil: 4,
            questionNumber: 4,
            questionText: "Wer sieht Vorteile von Social Media für zurückhaltende junge Menschen?",
            options: ["Moderator", "Herr Becker", "Frau Klein"],
            correctAnswer: "Herr Becker",
            explanation: "Herr Becker menjelaskan bahwa media sosial membantu remaja pemalu mencari teman sehobi."
          }
        ]
      }
    ]
  },

  // ==========================================
  // PAKET C (CADANGAN 2)
  // ==========================================
  {
    packetId: "C",
    title: "Paket C (Reserveprüfung 2)",
    description: "Simulasi Ujian Hören B1: Museum, Jobmesse, Nachbarschaft & Gesundheit",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Radio-Wetterbericht & Verkehr",
        instruction: "Sie hören den Text zweimal.",
        playLimit: 2,
        audioTranscript: `"Hier ist der Verkehrsfunk. Auf der Autobahn A3 zwischen Frankfurt und Würzburg gibt es nach einem Unfall 8 Kilometer Stau. Rechnen Sie mit mindestens 45 Minuten Verzögerung. Wir empfehlen die Umleitung über die Bundesstraße 26."`,
        questions: [
          {
            id: "hor-c-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Autofahrern auf der A3 wird empfohlen,...",
            options: [
              "sofort auf einen Rastplatz zu fahren und zu warten.",
              "die Umleitungsstrecke über die B26 zu nutzen.",
              "nach Frankfurt umzukehren."
            ],
            correctAnswer: "die Umleitungsstrecke über die B26 zu nutzen.",
            explanation: "Penyiar menyarankan jalur alternatif B26 untuk menghindari macet 45 menit."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Begrüßung bei der Jobmesse",
        instruction: "Sie hören den Text einmal.",
        playLimit: 1,
        audioTranscript: `"Guten Morgen liebe Studierende und Absolventen! Willkommen auf der Karrieremesse 'Chance 2026'. An über 80 Ständen stellen sich heute IT-Unternehmen, Banken und Handwerksbetriebe vor. Nutzen Sie die Gelegenheit für kostenlose Bewerbungsmappen-Checks in Halle B, Raum 104."`,
        questions: [
          {
            id: "hor-c-t2-q2",
            teil: 2,
            questionNumber: 2,
            questionText: "Wo können Messebesucher ihre Bewerbungsunterlagen überprüfen lassen?",
            options: [
              "Direkt an jedem Firmenstand in Halle A.",
              "In Halle B, Raum 104 kostenlos.",
              "Nur online nach der Messe gegen Gebühr."
            ],
            correctAnswer: "In Halle B, Raum 104 kostenlos.",
            explanation: "Pemeriksaan berkas lamaran gratis ada di Halle B, Raum 104."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Gespräch über Nachbarschaftshilfe",
        instruction: "Sie hören ein kurzes Gespräch.",
        playLimit: 1,
        audioTranscript: `Herr Krause: "Guten Tag Frau Meyer! Fahren Sie nächste Woche in den Urlaub?"
Frau Meyer: "Ja, für zwei Wochen nach Italien. Könnten Sie vielleicht alle zwei Tage meine Blumen auf dem Balkon gießen?"
Herr Krause: "Aber selbstverständlich, das mache ich sehr gerne! Geben Sie mir einfach vor Ihrer Abreise den Schlüssel."`,
        questions: [
          {
            id: "hor-c-t3-q3",
            teil: 3,
            questionNumber: 3,
            questionText: "Herr Krause weigert sich, die Blumen von Frau Meyer zu gießen.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Herr Krause dengan senang hati bersedia membantu ('Aber selbstverständlich, das mache ich sehr gerne!')."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Diskussion über gesunde Ernährung an Schulen",
        instruction: "Wer vertritt welche Position?",
        playLimit: 2,
        audioTranscript: `Moderator: "Sollten Süßigkeitenautomaten an Schulen verboten werden? Schulleiter Herr Weber..."
Herr Weber: "Ja, absolut. Die Schule hat einen Erziehungsauftrag. Wenn Schüler in jeder Pause Limonade und Schokoriegel kaufen können, fördert das Übergewicht und Konzentrationsschwächen."
Frau Schmidt (Mutter): "Verbote bringen doch nichts, dann kaufen die Kinder die Schokolade einfach auf dem Heimweg im Kiosk. Wir müssen lieber über gesunde Ernährung aufklären."`,
        questions: [
          {
            id: "hor-c-t4-q4",
            teil: 4,
            questionNumber: 4,
            questionText: "Wer argumentiert für ein Verbot von Süßigkeitenautomaten an Schulen?",
            options: ["Moderator", "Herr Weber", "Frau Schmidt"],
            correctAnswer: "Herr Weber",
            explanation: "Herr Weber mendukung larangan karena sekolah bertanggung jawab mendidik pola hidup sehat."
          }
        ]
      }
    ]
  }
];
