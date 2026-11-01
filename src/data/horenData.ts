import { HorenPacket } from "@/types";

export const initialHorenPackets: HorenPacket[] = [
  // ==========================================
  // PAKET A (UTAMA) - 10 QUESTIONS
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
"Achtung, eine Durchsage für Fahrgäste des Intercity-Express 582 nach Hamburg-Altona über Hannover Hauptbahnhof. Wegen kurzfristiger Reparaturarbeiten an einer Weiche fährt dieser Zug heute nicht von Gleis 4 ab, sondern wird außerplanmäßig auf Gleis 9 bereitgestellt. Die Abfahrt verzögert sich voraussichtlich um 15 Minuten. Wir bitten alle Fahrgäste, die Unterführung zu Gleis 9 zu benutzen. Bitte achten Sie auf Durchsagen und die Anzeigen am Bahnsteig."

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
        instruction: "Sie hören eine Radiosendung zweimal. Wer sagt was? Wählen Sie: Moderator, Frau Dr. Sommer (Psychologin) oder Herr Krüger (Gastronom).",
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
  // PAKET B (CADANGAN 1) - FULL 10 QUESTIONS
  // ==========================================
  {
    packetId: "B",
    title: "Paket B (Reserveprüfung 1)",
    description: "Simulasi Ujian Hören B1: Flughafen, Stadtfest, Sprachreise & Ehrenamt",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Kurze Ansagen & Mitteilungen",
        instruction: "Sie hören kurze Texte je zweimal. Wählen Sie für jede Aufgabe die richtige Lösung.",
        playLimit: 2,
        audioTranscript: `Aufgabe 1 und 2:
"Achtung am Gate B24. Der Flug LH 1830 nach Berlin-Brandenburg ist nun zum Einsteigen bereit. Wir bitten zunächst Familien mit kleinen Kindern sowie Passagiere mit Hilfebedarf an Bord. Danach folgen die Reihen 20 bis 35. Halten Sie bitte Ihre Bordkarte und Ihren Lichtbildausweis griffbereit. Wir danken für Ihre Geduld."

Aufgabe 3:
"Hallo Christian, hier ist Melanie vom Sportverein. Unser Hallentraining heute Abend um 19:30 Uhr muss leider ausfallen, da die Hallendecke repariert werden muss. Stattdessen treffen wir uns um 18:45 Uhr am Waldparkplatz für einen gemeinsamen Waldlauf. Gib mir bitte kurz per WhatsApp Bescheid, ob du dabei bist!"`,
        questions: [
          {
            id: "hor-b-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Wer darf zuerst in das Flugzeug nach Berlin einsteigen?",
            options: [
              "Alle Passagiere mit Sitzplätzen in den vorderen Reihen.",
              "Familien mit Kleinkindern und Personen mit Hilfebedarf.",
              "Ausschließlich Passagiere der Business Class."
            ],
            correctAnswer: "Familien mit Kleinkindern und Personen mit Hilfebedarf.",
            explanation: "Pengumuman bandara meminta keluarga dengan anak kecil dan penumpang yang butuh bantuan masuk terlebih dahulu."
          },
          {
            id: "hor-b-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Welche Dokumente müssen Passagiere griffbereit halten?",
            options: [
              "Bordkarte und Lichtbildausweis.",
              "Nur das Flugticket auf Papier.",
              "Reisekrankenversicherung und Hotelvoucher."
            ],
            correctAnswer: "Bordkarte und Lichtbildausweis.",
            explanation: "Petugas gate meminta kartu pas naik (Bordkarte) dan kartu identitas foto (Lichtbildausweis)."
          },
          {
            id: "hor-b-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Warum fällt das Hallentraining heute aus?",
            options: [
              "Weil die Trainerin krank geworden ist.",
              "Weil Reparaturen an der Hallendecke stattfinden.",
              "Weil das Wetter zu schön ist."
            ],
            correctAnswer: "Weil Reparaturen an der Hallendecke stattfinden.",
            explanation: "Latihan indoor dibatalkan karena perbaikan atap aula ('die Hallendecke repariert werden muss')."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Monolog über ein Stadtfest",
        instruction: "Sie hören den Text einmal. Wählen Sie bei den Aufgaben A, B oder C.",
        playLimit: 1,
        audioTranscript: `"Liebe Bürgerinnen und Bürger! Am kommenden Samstag feiert unsere Stadt das 750-jährige Stadtjubiläum auf dem historischen Marktplatz. Ab 11 Uhr morgens gibt es Kunsthandwerk, regionale Spezialitäten und ein kostenloses Kinderkarussell. Auf der Hauptbühne vor dem Rathaus spielen ab 14 Uhr lokale Jazz- und Rockbands. Bitte beachten Sie, dass die Zufahrtsstraßen zum Stadtkern ab Freitagabend für den gesamten Autoverkehr gesperrt sind. Parkplätze stehen am Messegelände zur Verfügung; von dort verkehren alle zehn Minuten kostenlose Shuttlebusse direkt zum Marktplatz. Wir freuen uns auf Ihren Besuch!"`,
        questions: [
          {
            id: "hor-b-t2-q4",
            teil: 2,
            questionNumber: 4,
            questionText: "Wie sollten die Besucher zum Marktplatz anreisen?",
            options: [
              "Mit dem eigenen Auto direkt vor das Rathaus fahren.",
              "Mit den kostenlosen Shuttlebussen ab dem Messegelände.",
              "Ausschließlich zu Fuß vom Flughafen aus."
            ],
            correctAnswer: "Mit den kostenlosen Shuttlebussen ab dem Messegelände.",
            explanation: "Karena jalan pusat kota ditutup, pengunjung disarankan memarkir mobil di area pameran (Messegelände) dan naik bus shuttle gratis."
          },
          {
            id: "hor-b-t2-q5",
            teil: 2,
            questionNumber: 5,
            questionText: "Was wird speziell für Kinder kostenlos angeboten?",
            options: [
              "Kostenloses Eis und Limonade.",
              "Ein Kinderkarussell auf dem Marktplatz.",
              "Ein Malwettbewerb im Rathaus."
            ],
            correctAnswer: "Ein Kinderkarussell auf dem Marktplatz.",
            explanation: "Monolog menyebutkan 'ein kostenloses Kinderkarussell' (komidi putar gratis untuk anak-anak)."
          },
          {
            id: "hor-b-t2-q6",
            teil: 2,
            questionNumber: 6,
            questionText: "Ab wann sind die Zufahrtsstraßen für Autos gesperrt?",
            options: [
              "Erst am Samstag ab 11 Uhr.",
              "Bereits ab Freitagabend.",
              "Gar nicht, Autos dürfen überall parken."
            ],
            correctAnswer: "Bereits ab Freitagabend.",
            explanation: "Akses jalan ditutup mulai Jumat malam ('ab Freitagabend gesperrt')."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Gespräch über Sprachkurs",
        instruction: "Sie hören ein Gespräch einmal. Wählen Sie für jede Aufgabe: Richtig oder Falsch.",
        playLimit: 1,
        audioTranscript: `Dialog:
Mann: "Tina, hast du dich schon für den Deutsch-Intensivkurs an der Volkshochschule angemeldet?"
Frau: "Ja, gestern Abend online! Aber der Unterricht findet jetzt montags und mittwochs von 18 bis 21 Uhr statt, nicht mehr dienstags."
Mann: "Super, dann kollidiert das gar nicht mit unserem Fußballtraining am Dienstagabend!"
Frau: "Genau. Und die Kursleiterin hat gesagt, dass wir uns bis zur zweiten Unterrichtsstunde das neue B1-Lehrbuch besorgen müssen."`,
        questions: [
          {
            id: "hor-b-t3-q7",
            teil: 3,
            questionNumber: 7,
            questionText: "Der Sprachkurs von Tina findet an denselben Wochentagen wie das Fußballtraining statt.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Kursus bahasa diadakan hari Senin dan Rabu, sehingga tidak bertabrakan dengan latihan sepak bola di hari Selasa."
          },
          {
            id: "hor-b-t3-q8",
            teil: 3,
            questionNumber: 8,
            questionText: "Tina hat sich bereits für den Sprachkurs eingeschrieben.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Tina mendaftar kemarin malam secara daring ('Ja, gestern Abend online!')."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Podiumsdiskussion zu Social Media",
        instruction: "Wer äußert folgende Meinung? Moderator, Herr Becker (Soziologe) oder Frau Klein (Lehrerin).",
        playLimit: 2,
        audioTranscript: `Radiosendung:
Moderator: "Macht Social Media unsere Jugend einsamer oder vernetzter? Bei uns diskutieren die Gymnasiallehrerin Frau Klein und der Mediensoziologe Herr Becker."

Frau Klein: "Ich beobachte auf dem Schulhof täglich, wie Schüler nebeneinander sitzen und stumm auf ihr Smartphone starren. Viele Jugendliche entwickeln Minderwertigkeitskomplexe durch gefilterte, scheinbar perfekte Fotos anderer. Das reale soziale Miteinander verkümmert zusehends."

Herr Becker: "Das ist mir zu einseitig negativ. Zahlreiche wissenschaftliche Erhebungen zeigen, dass soziale Netzwerke gerade schüchternen Jugendlichen helfen, Gleichgesinnte für Nischeninteressen zu finden. Für viele junge Menschen bieten Online-Communities emotionalen Rückhalt, den sie im direkten Umfeld vermissen."

Moderator: "Zwei wichtige Perspektiven: Einerseits Schutz vor ungesundem Vergleichsdruck, andererseits die Chance auf weltweite Vernetzung."`,
        questions: [
          {
            id: "hor-b-t4-q9",
            teil: 4,
            questionNumber: 9,
            questionText: "Wer sieht vor allem die Gefahr, dass Jugendliche Minderwertigkeitskomplexe durch gefilterte Bilder entwickeln?",
            options: ["Moderator", "Herr Becker", "Frau Klein"],
            correctAnswer: "Frau Klein",
            explanation: "Frau Klein (guru) menyoroti risiko foto sempurna berbfilter yang memicu rasa rendah diri pada remaja."
          },
          {
            id: "hor-b-t4-q10",
            teil: 4,
            questionNumber: 10,
            questionText: "Wer betont, dass soziale Medien schüchternen Teenagern beim Finden von Gleichgesinnten helfen?",
            options: ["Moderator", "Herr Becker", "Frau Klein"],
            correctAnswer: "Herr Becker",
            explanation: "Herr Becker (sosiolog) menjelaskan bahwa media sosial menjadi ruang aman bagi remaja pemalu untuk menemukan teman sehobi."
          }
        ]
      }
    ]
  },

  // ==========================================
  // PAKET C (CADANGAN 2) - FULL 10 QUESTIONS
  // ==========================================
  {
    packetId: "C",
    title: "Paket C (Reserveprüfung 2)",
    description: "Simulasi Ujian Hören B1: Museum, Jobmesse, Nachbarschaft & Gesundheit",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Radio-Wetterbericht & Service-Meldungen",
        instruction: "Sie hören kurze Texte je zweimal. Wählen Sie die richtige Lösung.",
        playLimit: 2,
        audioTranscript: `Aufgabe 1 und 2:
"Hier ist der Verkehrsfunk für Süddeutschland. Auf der Autobahn A3 zwischen Frankfurt und Würzburg gibt es nach einem LKW-Unfall 8 Kilometer Stau. Rechnen Sie mit mindestens 45 Minuten Verzögerung. Einsatzkräfte sind vor Ort. Wir empfehlen allen Autofahrern die ausgeschilderte Umleitungsstrecke über die Bundesstraße 26."

Aufgabe 3:
"Guten Tag Frau Weber, hier spricht Meyer vom Kundenservice des Möbelhauses Ambiente. Ihr bestelltes Schlafsofa ist heute in unserem Zentrallager eingetroffen. Wir möchten mit Ihnen einen Liefertermin vereinbaren. Unsere Spedition könnte am kommenden Freitag zwischen 8 und 12 Uhr liefern. Rufen Sie uns bitte unter der Durchwahl 440 zurück."`,
        questions: [
          {
            id: "hor-c-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Autofahrern auf der Autobahn A3 wird empfohlen,...",
            options: [
              "sofort auf den nächsten Rastplatz zu fahren und zu übernachten.",
              "die Umleitungsstrecke über die B26 zu nutzen.",
              "nach Frankfurt umzukehren."
            ],
            correctAnswer: "die Umleitungsstrecke über die B26 zu nutzen.",
            explanation: "Penyiar menyarankan menggunakan jalur pengalihan B26 untuk menghindari kemacetan 45 menit."
          },
          {
            id: "hor-c-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Wie lang ist der Stau auf der A3?",
            options: ["3 Kilometer.", "8 Kilometer.", "15 Kilometer."],
            correctAnswer: "8 Kilometer.",
            explanation: "Berita lalu lintas menyebutkan '8 Kilometer Stau' akibat kecelakaan truk."
          },
          {
            id: "hor-c-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Herr Meyer vom Möbelhaus ruft an, weil...",
            options: [
              "das bestellte Möbelstück beschädigt wurde.",
              "das Sofa eingetroffen ist und ein Liefertermin vereinbart werden soll.",
              "Frau Weber die Rechnung noch nicht bezahlt hat."
            ],
            correctAnswer: "das Sofa eingetroffen ist und ein Liefertermin vereinbart werden soll.",
            explanation: "Sofa pesanan telah sampai di gudang dan toko ingin menentukan jadwal pengantaran barang."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Begrüßung bei der Jobmesse",
        instruction: "Sie hören den Text einmal. Wählen Sie bei jeder Aufgabe A, B oder C.",
        playLimit: 1,
        audioTranscript: `"Guten Morgen liebe Studierende und Absolventen! Herzlich willkommen auf der 15. Karrieremesse 'Chance 2026' im Kongresszentrum Leipzig. An über 80 Firmenständen stellen sich heute führende Unternehmen aus den Bereichen IT, Maschinenbau, Finanzwesen und Pflege vor. Nutzen Sie die einmalige Gelegenheit, direkt mit Personalchefs ins Gespräch zu kommen. In Halle B, Raum 104 bieten wir den ganzen Tag über kostenlose Bewerbungsmappen-Checks und professionelle Bewerbungsfotos an. Bitte beachten Sie auch die Fachvorträge im Hauptsaal ab 13 Uhr. Viel Erfolg für Ihre berufliche Zukunft!"`,
        questions: [
          {
            id: "hor-c-t2-q4",
            teil: 2,
            questionNumber: 4,
            questionText: "Wo können Messebesucher ihre Bewerbungsunterlagen überprüfen lassen?",
            options: [
              "Direkt an jedem Firmenstand in Halle A.",
              "In Halle B, Raum 104 kostenlos.",
              "Ausschließlich online gegen eine Gebühr von 20 Euro."
            ],
            correctAnswer: "In Halle B, Raum 104 kostenlos.",
            explanation: "Pemeriksaan berkas lamaran gratis ada di Halle B, Raum 104."
          },
          {
            id: "hor-c-t2-q5",
            teil: 2,
            questionNumber: 5,
            questionText: "Wie viele Unternehmen präsentieren sich auf der Messe?",
            options: [
              "Über 80 Firmen.",
              "Genau 15 Betriebe.",
              "Mehr als 200 Konzerne."
            ],
            correctAnswer: "Über 80 Firmen.",
            explanation: "Penyelenggara mengumumkan ada lebih dari 80 perusahaan peserta ('über 80 Firmenständen')."
          },
          {
            id: "hor-c-t2-q6",
            teil: 2,
            questionNumber: 6,
            questionText: "Wann beginnen die Fachvorträge im Hauptsaal?",
            options: [
              "Um 09:00 Uhr morgens.",
              "Ab 13:00 Uhr.",
              "Erst nach 18:00 Uhr."
            ],
            correctAnswer: "Ab 13:00 Uhr.",
            explanation: "Kuliah umum dimulai pada pukul 13:00 ('Fachvorträge im Hauptsaal ab 13 Uhr')."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Gespräch über Nachbarschaftshilfe",
        instruction: "Sie hören ein kurzes Gespräch. Wählen Sie: Richtig oder Falsch.",
        playLimit: 1,
        audioTranscript: `Dialog:
Herr Krause: "Guten Tag, Frau Meyer! Packen Sie gerade Ihr Auto? Fahren Sie in den Urlaub?"
Frau Meyer: "Ja, Herr Krause! Morgen früh geht es für zwei Wochen an den Gardasee nach Italien. Könnten Sie vielleicht alle zwei Tage meine Blumen auf dem Balkon gießen und den Briefkasten leeren?"
Herr Krause: "Aber selbstverständlich, liebe Nachbarin! Das mache ich doch sehr gern. Geben Sie mir einfach heute Abend noch Ihren Wohnungsschlüssel."
Frau Meyer: "Vielen herzlichen Dank! Ich bringe Ihnen dafür echten italienischen Parmesan mit."`,
        questions: [
          {
            id: "hor-c-t3-q7",
            teil: 3,
            questionNumber: 7,
            questionText: "Herr Krause weigert sich, Frau Meyer während ihres Urlaubs zu helfen.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Herr Krause dengan ramah dan senang hati bersedia menyiram bunga dan mengambil surat."
          },
          {
            id: "hor-c-t3-q8",
            teil: 3,
            questionNumber: 8,
            questionText: "Frau Meyer reist für zwei Wochen nach Italien.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Frau Meyer berlibur selama 2 minggu ke Danau Garda di Italia ('für zwei Wochen an den Gardasee')."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Diskussion über gesunde Ernährung an Schulen",
        instruction: "Wer vertritt welche Position? Moderator, Schulleiter Herr Weber oder Mutter Frau Schmidt.",
        playLimit: 2,
        audioTranscript: `Radiodiskussion:
Moderator: "Willkommen zu unserer Debatte: 'Sollten Verkaufsautomaten für Süßigkeiten und zuckerhaltige Limonaden an Schulen gesetzlich verboten werden?' Herr Schulleiter Weber..."

Herr Weber: "Ja, ganz entschieden! Die Schule trägt einen umfassenden Erziehungs- und Gesundheitsauftrag. Wenn Jugendliche in jeder großen Pause Schokoriegel und Energydrinks kaufen können, führt das nachweislich zu Konzentrationsabfall und langfristig zu Übergewicht. Als Schule müssen wir ein klares gesundes Signal setzen."

Frau Schmidt: "Ich bin da anderer Meinung. Reine Verbote bringen überhaupt nichts, denn dann laufen die Kinder in der Mittagspause einfach zum Kiosk an der Straßenecke und kaufen dort die doppelte Menge. Wir müssen Kinder zu eigenverantwortlichem Konsum erziehen und im Unterricht über Nährwerte aufklären, statt einfach Automaten abzuschalten."

Moderator: "Ein klassischer Konflikt: Schutz durch Reglementierung versus Aufklärung und Eigenverantwortung."`,
        questions: [
          {
            id: "hor-c-t4-q9",
            teil: 4,
            questionNumber: 9,
            questionText: "Wer argumentiert für ein striktes Verbot von Süßigkeitenautomaten an Schulen?",
            options: ["Moderator", "Herr Weber", "Frau Schmidt"],
            correctAnswer: "Herr Weber",
            explanation: "Herr Weber (kepala sekolah) mendukung pelarangan tegas demi kesehatan dan konsentrasi siswa."
          },
          {
            id: "hor-c-t4-q10",
            teil: 4,
            questionNumber: 10,
            questionText: "Wer meint, dass Verbote wirkungslos sind, weil Schüler Süßigkeiten dann außerhalb der Schule kaufen?",
            options: ["Moderator", "Herr Weber", "Frau Schmidt"],
            correctAnswer: "Frau Schmidt",
            explanation: "Frau Schmidt (orang tua) berpendapat bahwa larangan tidak efektif karena murid akan membeli di kios pinggir jalan."
          }
        ]
      }
    ]
  }
];
