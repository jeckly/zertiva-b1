import { LesenPacket } from "@/types";

export const initialLesenPackets: LesenPacket[] = [
  // ==========================================
  // PAKET A (UTAMA)
  // ==========================================
  {
    packetId: "A",
    title: "Paket A (Hauptprüfung)",
    description: "Simulasi Ujian Goethe-Zertifikat B1 Lesen Standar Resmi (Teil 1 bis Teil 5)",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Blog & Persönlicher Erfahrungsbericht",
        instruction: "Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
        textTitle: "Mein Freiwilliges Soziales Jahr (FSJ) im Nationalpark Schwarzwald",
        readingText: `Liebe Leserinnen und Leser meines Blogs,
seit nunmehr sechs Monaten lebe ich nicht mehr bei meinen Eltern in Berlin, sondern in einem kleinen Forsthaus mitten im Schwarzwald. Nach dem Abitur wussten fast alle meine Schulfreunde sofort, was sie studieren wollten: Informatik, Betriebswirtschaft oder Medizin. Ich hingegen fühlte mich nach zwölf Schuljahren einfach erschöpft und wollte nicht direkt wieder in überfüllten Hörsälen sitzen. Deshalb entschied ich mich für ein Freiwilliges Soziales Jahr (FSJ) im Bereich Natur- und Umweltschutz.

Am Anfang war die Umstellung enorm hart. Statt morgens mit der U-Bahn zu fahren, stehe ich um 6:30 Uhr auf, ziehe wetterfeste Arbeitsstiefel an und kontrolliere Wanderwege oder helfe bei der Wiederaufforstung von Bäumen. Internet gibt es hier im Tal nur sehr unzuverlässig, und abends um neun fallen mir vor Müdigkeit die Augen zu. Doch nach wenigen Wochen merkte ich, wie gut mir diese körperliche Arbeit an der frischen Luft tut. 

Besonders spannend sind die Wochenend-Führungen für Schulklassen. Als Stadtkind hatte ich anfangs Angst, den Kindern die Natur nicht kompetent erklären zu können. Inzwischen leite ich die Gruppen jedoch völlig selbstständig und zeige ihnen, wie wichtig ein gesunder Waldboden für unser gesamtes Klima ist. 

Mein Taschengeld beträgt zwar nur 380 Euro im Monat, aber Unterkunft und Arbeitskleidung werden gestellt. Für mich ist dieses Jahr eine unbezahlbare Lebenserfahrung. Ich habe gelernt, Verantwortung zu übernehmen und weiß jetzt ganz sicher: Ich werde Forstwissenschaften an der Universität Freiburg studieren!

Euer Florian`,
        questions: [
          {
            id: "les-a-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Florian begann das FSJ, weil er nach dem Abitur keine Zulassung für sein Wunschstudium erhalten hatte.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Dalam teks dijelaskan bahwa Florian merasa lelah setelah 12 tahun sekolah dan tidak ingin langsung kuliah di ruang kuliah yang penuh, bukan karena tidak lolos seleksi universitas.",
            evidenceQuote: "Ich hingegen fühlte mich nach zwölf Schuljahren einfach erschöpft und wollte nicht direkt wieder in überfüllten Hörsälen sitzen."
          },
          {
            id: "les-a-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Die ersten Wochen im Schwarzwald waren für Florian körperlich und organisatorisch eine große Herausforderung.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Teks menyatakan 'Am Anfang war die Umstellung enorm hart' karena harus bangun pagi, kerja fisik di alam terbuka, dan minim koneksi internet.",
            evidenceQuote: "Am Anfang war die Umstellung enorm hart. Statt morgens mit der U-Bahn zu fahren, stehe ich um 6:30 Uhr auf..."
          },
          {
            id: "les-a-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Bei den Führungen für Schulklassen...",
            options: [
              "braucht Florian immer noch Unterstützung von erfahrenen Rangern.",
              "hatte Florian am Anfang Bedenken bezüglich seiner Fachkenntnisse.",
              "dürfen die Kinder keine Fragen zum Klimaschutz stellen."
            ],
            correctAnswer: "hatte Florian am Anfang Bedenken bezüglich seiner Fachkenntnisse.",
            explanation: "Florian menyebutkan: 'Als Stadtkind hatte ich anfangs Angst, den Kindern die Natur nicht kompetent erklären zu können.' (Bedenken = kekhawatiran/keraguan).",
            evidenceQuote: "Als Stadtkind hatte ich anfangs Angst, den Kindern die Natur nicht kompetent erklären zu können."
          },
          {
            id: "les-a-t1-q4",
            teil: 1,
            questionNumber: 4,
            questionText: "Florians finanzielle Situation während des FSJ...",
            options: [
              "reicht kaum aus, weil er Miete für das Forsthaus bezahlen muss.",
              "wird durch kostenlose Unterkunft und gestellte Kleidung erleichtert.",
              "ist besser als das Gehalt eines fest angestellten Forstmitarbeiters."
            ],
            correctAnswer: "wird durch kostenlose Unterkunft und gestellte Kleidung erleichtert.",
            explanation: "Florian hanya menerima uang saku 380 Euro, namun tempat tinggal dan seragam kerja disediakan secara gratis ('Unterkunft und Arbeitskleidung werden gestellt').",
            evidenceQuote: "Mein Taschengeld beträgt zwar nur 380 Euro im Monat, aber Unterkunft und Arbeitskleidung werden gestellt."
          },
          {
            id: "les-a-t1-q5",
            teil: 1,
            questionNumber: 5,
            questionText: "Durch das Freiwillige Soziale Jahr...",
            options: [
              "hat Florian seine berufliche Zukunft klar vor Augen.",
              "möchte Florian nie wieder in einer Universitätsstadt wohnen.",
              "hat Florian beschlossen, sofort eine handwerkliche Ausbildung zu machen."
            ],
            correctAnswer: "hat Florian seine berufliche Zukunft klar vor Augen.",
            explanation: "Florian mengatakan: '...weiß jetzt ganz sicher: Ich werde Forstwissenschaften an der Universität Freiburg studieren!'",
            evidenceQuote: "Ich habe gelernt, Verantwortung zu übernehmen und weiß jetzt ganz sicher: Ich werde Forstwissenschaften an der Universität Freiburg studieren!"
          },
          {
            id: "les-a-t1-q6",
            teil: 1,
            questionNumber: 6,
            questionText: "Welches Ziel verfolgt Florian mit diesem Blogbeitrag?",
            options: [
              "Er möchte sich über die schlechte Internetverbindung auf dem Land beschweren.",
              "Er will jungen Menschen Mut machen, nach der Schule auch einmal neue Wege auszuprobieren.",
              "Er sucht nach einem Nachfolger für seine Stelle im Nationalpark."
            ],
            correctAnswer: "Er will jungen Menschen Mut machen, nach der Schule auch einmal neue Wege auszuprobieren.",
            explanation: "Secara keseluruhan, tulisan Florian menceritakan manfaat pengalaman langsung di luar jalur akademis instan pasca sekolah.",
            evidenceQuote: "Für mich ist dieses Jahr eine unbezahlbare Lebenserfahrung."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Zwei Presseberichte",
        instruction: "Lesen Sie den Text und die Aufgaben 7 bis 9. Wählen Sie bei jeder Aufgabe die richtige Lösung (A, B oder C).",
        textTitle: "Carsharing und Leihräder: Revolutioniert die 'Mikromobilität' deutsche Großstädte?",
        readingText: `In vielen deutschen Großstädten wie Hamburg, Köln und München stehen immer mehr Menschen vor der Frage: Braucht man im 21. Jahrhundert eigentlich noch ein eigenes Auto? Parkplatznot, hohe Benzinpreise und teure Werkstattrechnungen belasten die Haushaltskassen der Stadtbewohner spürbar. Gleichzeitig boomen Carsharing-Modelle und E-Bike-Verleihsysteme. 

Eine aktuelle Studie des Instituts für Verkehrsforschung zeigt, dass ein einzelnes geteiltes Auto bis zu elf Privatfahrzeuge im Straßenraum ersetzen kann. Dies schafft Platz für breitere Fahrradwege, Grünflächen und Außengastronomie. Doch nicht alle Bürger sind begeistert. Ältere Menschen und Familien mit Kleinkindern beklagen oft, dass spontane Fahrten nicht verlässlich planbar sind, wenn kein freies Fahrzeug in der unmittelbaren Nachbarschaft parkt. Zudem sorgen rücksichtslos auf Gehwegen abgestellte E-Scooter regelmäßig für Unmut und Sicherheitsrisiken für sehbehinderte Fußgänger.

Die Städte reagieren nun mit strengeren Regeln: In definierten Innenstadtzonen dürfen Leihfahrzeuge nur noch auf eigens dafür markierten Sammelplätzen abgestellt werden. Wer sein Leihrad quer vor einer Hauseinfahrt abstellt, riskiert empfindliche Geldstrafen der Anbieter.`,
        questions: [
          {
            id: "les-a-t2-q7",
            teil: 2,
            questionNumber: 7,
            questionText: "Laut der erwähnten Studie trägt Carsharing dazu bei, dass...",
            options: [
              "der Autoverkehr auf Autobahnen drastisch zunimmt.",
              "öffentlicher Raum in den Innenstädten effizienter genutzt werden kann.",
              "die Reparaturkosten für Privatautos günstiger werden."
            ],
            correctAnswer: "öffentlicher Raum in den Innenstädten effizienter genutzt werden kann.",
            explanation: "Satu mobil sharing bisa menggantikan hingga 11 mobil pribadi, sehingga membuka ruang untuk jalur sepeda, taman kota, dan trotoar.",
            evidenceQuote: "...dass ein einzelnes geteiltes Auto bis zu elf Privatfahrzeuge im Straßenraum ersetzen kann. Dies schafft Platz für breitere Fahrradwege, Grünflächen..."
          },
          {
            id: "les-a-t2-q8",
            teil: 2,
            questionNumber: 8,
            questionText: "Welche Kritikpunkte an Leihsystemen werden im Text erwähnt?",
            options: [
              "Sie sind deutlich teurer als der Kauf eines eigenen Neuwagens.",
              "Fahrzeuge stehen nicht immer überall sofort zur Verfügung und falsch abgestellte Roller behindern Fußgänger.",
              "Man darf mit Carsharing-Autos nicht außerhalb der Stadtgrenzen fahren."
            ],
            correctAnswer: "Fahrzeuge stehen nicht immer überall sofort zur Verfügung und falsch abgestellte Roller behindern Fußgänger.",
            explanation: "Keluarga/orang tua mengeluhkan ketidakpastian ketersediaan mobil di dekat rumah, dan skuter listrik yang diparkir sembarangan membahayakan pejalan kaki.",
            evidenceQuote: "...dass spontane Fahrten nicht verlässlich planbar sind, wenn kein freies Fahrzeug in der unmittelbaren Nachbarschaft parkt. Zudem sorgen rücksichtslos auf Gehwegen abgestellte E-Scooter regelmäßig für Unmut..."
          },
          {
            id: "les-a-t2-q9",
            teil: 2,
            questionNumber: 9,
            questionText: "Wie versuchen die Stadtverwaltungen das Problem mit falsch abgestellten Fahrzeugen zu lösen?",
            options: [
              "Durch ein generelles Verbot von Elektro-Leihrädern in der gesamten Stadt.",
              "Indem feste Abstellzonen eingeführt und Verstöße finanziell geahndet werden.",
              "Indem jedem Bürger ein kostenloser privater Parkplatz garantiert wird."
            ],
            correctAnswer: "Indem feste Abstellzonen eingeführt und Verstöße finanziell geahndet werden.",
            explanation: "Kota menerapkan zona parkir khusus (Sammelplätze) dan denda (Geldstrafen) bagi pelanggar.",
            evidenceQuote: "In definierten Innenstadtzonen dürfen Leihfahrzeuge nur noch auf eigens dafür markierten Sammelplätzen abgestellt werden. Wer sein Leihrad quer vor einer Hauseinfahrt abstellt, riskiert empfindliche Geldstrafen..."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Anzeigen & Situationen (Zuordnung)",
        instruction: "Lesen Sie die Situationen (10-12) und die Anzeigen (A-D). Welche Anzeige passt zu welcher Situation? Wenn keine Anzeige passt, wählen Sie '0'.",
        textTitle: "Wohnungs- und Zimmersuche in München",
        readingText: "Ordnen Sie die passenden Anzeigen den Personen zu.",
        matchingAds: [
          {
            id: "ad-A",
            title: "Anzeige A: Gemütliches WG-Zimmer in Schwabing",
            text: "Suche nette/n Mitbewohner/in für 3er-WG! Großes helles Zimmer (22 qm), voll möbliert mit Schreibtisch und Balkon. U-Bahn Universität nur 3 Gehminuten entfernt. Mietdauer ab sofort, mindestens 12 Monate. Keine Haustiere, Nichtraucher bevorzugt. Miete: 580 € warm. Kontakt: wg-schwabing@web.de"
          },
          {
            id: "ad-B",
            title: "Anzeige B: Moderne 3-Zimmer-Wohnung am Stadtrand",
            text: "Ideal für junge Familien! 85 qm mit großem Garten, Einbauküche und Garagenstellplatz. Ruhige Lage in München-Pasing. Haustiere nach vorheriger Absprache herzlich willkommen. Kindergärten und Grundschule zu Fuß erreichbar. Kaltmiete: 1.250 € + NK. Kontakt: immobuero-mueller@online.de"
          },
          {
            id: "ad-C",
            title: "Anzeige C: Monteurzimmer & Kurzzeitapartment",
            text: "Möblierte 1-Zimmer-Apartments für Geschäftsreisende und Praktikanten. Wochen- oder monatsweise mietbar (maximal 3 Monate). Schnelles WLAN, wöchentlicher Reinigungsservice inklusive. Zentrale Lage nahe Hauptbahnhof. Preis pro Woche: 250 €. Info: www.muenchen-shortstay.de"
          },
          {
            id: "ad-D",
            title: "Anzeige D: Tausche Altbauwohnung in Haidhausen",
            text: "Biete schöne 2-Zimmer-Altbauwohnung (60 qm) zur Miete und suche im Gegenzug eine größere 4-Zimmer-Wohnung im gleichen Stadtteil zwecks Familienvergrößerung. Nur Wohnungstausch mit bestehendem Mietvertrag möglich! Kein Verkauf oder Neuvermietung."
          }
        ],
        matchingSituations: [
          {
            id: "sit-10",
            person: "10. Jonas (21)",
            need: "studiert ab dem kommenden Semester an der LMU München, sucht für mindestens ein Studienjahr ein bezahlbares Zimmer in Uninähe und raucht nicht.",
            correctAdId: "ad-A"
          },
          {
            id: "sit-11",
            person: "11. Familie Karimi",
            need: "sucht mit ihren beiden kleinen Kindern eine geräumige Wohnung mit Garten und möchte ihren Hund unbedingt mitbringen.",
            correctAdId: "ad-B"
          },
          {
            id: "sit-12",
            person: "12. Sabine (28)",
            need: "möchte eine möblierte Wohnung für genau 2 Jahre mieten, hat eine eigene Katze und sucht direkt im Zentrum am Viktualienmarkt.",
            correctAdId: "0"
          }
        ],
        questions: [
          {
            id: "les-a-t3-q10",
            teil: 3,
            questionNumber: 10,
            questionText: "Welche Anzeige passt zu Jonas (Student, LMU-Nähe, min. 1 Jahr, Nichtraucher)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "Anzeige D", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige A",
            explanation: "Anzeige A cocok sempurna: WG di Schwabing dekat U-Bahn Universität, kamar 22 qm, durasi minimal 12 bulan, mengutamakan bukan perokok.",
            evidenceQuote: "U-Bahn Universität nur 3 Gehminuten entfernt. Mietdauer ab sofort, mindestens 12 Monate. Nichtraucher bevorzugt."
          },
          {
            id: "les-a-t3-q11",
            teil: 3,
            questionNumber: 11,
            questionText: "Welche Anzeige passt zu Familie Karimi (2 Kinder, Garten, Hund erlaubt)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "Anzeige D", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige B",
            explanation: "Anzeige B adalah 3-Zimmer-Wohnung dengan taman besar, dekat TK dan SD, serta membolehkan hewan peliharaan (Haustiere nach Absprache).",
            evidenceQuote: "Ideal für junge Familien! 85 qm mit großem Garten... Haustiere nach vorheriger Absprache herzlich willkommen."
          },
          {
            id: "les-a-t3-q12",
            teil: 3,
            questionNumber: 12,
            questionText: "Welche Anzeige passt zu Sabine (möbliert, 2 Jahre Mietdauer, mit Katze, Viktualienmarkt)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "Anzeige D", "0 (Keine passende Anzeige)"],
            correctAnswer: "0 (Keine passende Anzeige)",
            explanation: "Tidak ada iklan yang cocok (0). Iklan C hanya untuk maksimal 3 bulan (Kurzzeit), Iklan A melarang hewan peliharaan, dan Iklan D hanya pertukaran kontrak rumah.",
            evidenceQuote: "Keine der angebotenen Anzeigen erfüllt Sabines Kriterien (Mietdauer 2 Jahre, Haustier Katze, Lage Viktualienmarkt)."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Leserbriefe & Forenbeiträge",
        instruction: "Lesen Sie die Meinungen zu dem Thema: 'Sollten Innenstädte komplett autofrei werden?'. Wählen Sie bei jeder Person: 'Dafür (Ja)' oder 'Dagegen (Nein)'.",
        textTitle: "Diskussion der Woche: Autofreie Innenstädte – Utopie oder überfällige Notwendigkeit?",
        readingText: `Thema der Woche: Sollten PKWs vollständig aus den Stadtzentren verbannt werden, um Lärm und Abgase zu stoppen?

Leserbrief 1 (Markus, 45, Einzelhändler):
"Wenn keine Kunden mehr mit dem Auto in die Innenstadt fahren dürfen, stirbt der stationäre Handel endgültig aus! Niemand kauft einen schweren Staubsauger oder drei Tüten Kleidung und schleppt sie dann bei Regen durch Bus und Bahn. Die Leute werden dann einfach alles online bestellen. Ein totales Fahrverbot wäre der wirtschaftliche Ruin für unsere Innenstädte."

Leserbrief 2 (Katja, 32, Mutter und Ärztin):
"Ich bin absolut dafür! Seitdem in unserer Nachbarstadt die Fußgängerzone ausgeweitet wurde, blüht das soziale Leben auf. Kinder können gefahrlos auf den Plätzen spielen, Straßencafés sind voll, und die Luftwerte haben sich nachweislich verbessert. Städte müssen endlich wieder für Menschen gebaut werden, nicht für parkende Blechkisten!"

Leserbrief 3 (Stefan, 58, Handwerksmeister):
"Die Idee klingt romantisch, ist in der Praxis aber ein Desaster. Wie soll ein Installateur Rohre, Schweißgeräte und schwere Ersatzteile zum Kunden transportieren? Auf dem Lastenfahrrad? Ohne Ausnahme- und Zufahrtsrechte für Handwerker und Lieferanten bricht die Versorgung unserer Gebäude in kürzester Zeit zusammen. Ein pauschales Verbot lehne ich strikt ab."`,
        questions: [
          {
            id: "les-a-t4-q13",
            teil: 4,
            questionNumber: 13,
            questionText: "Ist Markus (Einzelhändler) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dagegen (Nein)",
            explanation: "Markus menentang (Dagegen) karena ia khawatir larangan mobil akan mematikan toko fisik jika pelanggan tidak bisa membawa belanjaan berat.",
            evidenceQuote: "Ein totales Fahrverbot wäre der wirtschaftliche Ruin für unsere Innenstädte."
          },
          {
            id: "les-a-t4-q14",
            teil: 4,
            questionNumber: 14,
            questionText: "Ist Katja (Mutter und Ärztin) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dafür (Ja)",
            explanation: "Katja sangat mendukung (Dafür) karena udara lebih bersih, ramah anak-anak, dan kafe luar ruangan semakin nyaman.",
            evidenceQuote: "Ich bin absolut dafür! Seitdem in unserer Nachbarstadt die Fußgängerzone ausgeweitet wurde, blüht das soziale Leben auf."
          },
          {
            id: "les-a-t4-q15",
            teil: 4,
            questionNumber: 15,
            questionText: "Ist Stefan (Handwerksmeister) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dagegen (Nein)",
            explanation: "Stefan menentang (Dagegen) karena tukang servis dan pengantar barang tidak bisa membawa peralatan berat hanya dengan sepeda.",
            evidenceQuote: "Ein pauschales Verbot lehne ich strikt ab."
          }
        ]
      },
      {
        teil: 5,
        title: "Teil 5: Hausordnung / Richtlinien",
        instruction: "Lesen Sie die Hausordnung und die Aufgaben 16 bis 18 dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
        textTitle: "Hausordnung der Wohnanlage 'Grüne Oase' (Frankfurt am Main)",
        readingText: `§ 3 Ruhezeiten und Lärmschutz
Im Interesse eines harmonischen Zusammenlebens sind im gesamten Gebäude folgende Ruhezeiten verbindlich einzuhalten:
1. Nachtruhe: Täglich von 22:00 Uhr bis 07:00 Uhr.
2. Mittagsruhe: An Werktagen von 13:00 Uhr bis 15:00 Uhr sowie an Sonn- und Feiertagen ganztägig.
Während der Ruhezeiten sind lautes Musikhören, handwerkliche Arbeiten (z.B. Bohren, Hämmern) sowie das Betreiben von lärmintensiven Waschmaschinen in den Privatwohnungen untersagt. Zimmerlautstärke ist jederzeit zu wahren.

§ 7 Mülltrennung und Gemeinschaftsräume
Der Hausmüll ist gemäß den behördlichen Vorgaben sorgfältig nach Restmüll, Biomüll, Papier und Wertstoffen (Gelber Sack) zu trennen. Das Abstellen von Müllsäcken oder alten Möbelstücken in den Fluren oder im Treppenhaus ist aus Brandschutzgründen strengstens verboten und führt zur kostenpflichtigen Entfernung durch die Hausverwaltung. Fahrräder dürfen ausschließlich in den dafür vorgesehenen Kellerräumen oder Fahrradständern im Hof abgestellt werden.`,
        questions: [
          {
            id: "les-a-t5-q16",
            teil: 5,
            questionNumber: 16,
            questionText: "Wann dürfen Mieter Renovierungsarbeiten wie Bohren oder Hämmern durchführen?",
            options: [
              "Jederzeit zwischen 07:00 Uhr und 22:00 Uhr ohne Pause.",
              "An Werktagen zwischen 07:00–13:00 Uhr und 15:00–22:00 Uhr.",
              "Auch an Sonn- und Feiertagen, solange es vor 18:00 Uhr beendet ist."
            ],
            correctAnswer: "An Werktagen zwischen 07:00–13:00 Uhr und 15:00–22:00 Uhr.",
            explanation: "Pekerjaan renovasi dilarang saat malam (22:00-07:00), siang hari (13:00-15:00), dan dilarang seharian penuh pada hari Minggu dan hari libur nasional.",
            evidenceQuote: "Nachtruhe: Täglich von 22:00 Uhr bis 07:00 Uhr. Mittagsruhe: An Werktagen von 13:00 Uhr bis 15:00 Uhr..."
          },
          {
            id: "les-a-t5-q17",
            teil: 5,
            questionNumber: 17,
            questionText: "Gegenstände wie alte Möbel oder Kartons...",
            options: [
              "dürfen vorübergehend für 24 Stunden im Hausflur gelagert werden.",
              "dürfen wegen der Feuerwehrvorschriften keinesfalls im Treppenhaus stehen.",
              "müssen vom Hausmeister kostenlos entsorgt werden."
            ],
            correctAnswer: "dürfen wegen der Feuerwehrvorschriften keinesfalls im Treppenhaus stehen.",
            explanation: "Alasan pencegahan bahaya kebakaran (Brandschutzgründe) melarang penempatan barang/sampah di lorong atau tangga.",
            evidenceQuote: "Das Abstellen von Müllsäcken oder alten Möbelstücken in den Fluren oder im Treppenhaus ist aus Brandschutzgründen strengstens verboten..."
          },
          {
            id: "les-a-t5-q18",
            teil: 5,
            questionNumber: 18,
            questionText: "Wo dürfen Bewohner ihre Fahrräder parken?",
            options: [
              "Direkt vor der eigenen Wohnungstür im Flur.",
              "Im Treppenhaus unter der Briefkastenanlage.",
              "In den zugewiesenen Kellerräumen oder an den Fahrradständern im Hof."
            ],
            correctAnswer: "In den zugewiesenen Kellerräumen oder an den Fahrradständern im Hof.",
            explanation: "Sesuai paragraf 7, sepeda hanya boleh diparkir di ruang bawah tanah khusus atau rak sepeda di halaman.",
            evidenceQuote: "Fahrräder dürfen ausschließlich in den dafür vorgesehenen Kellerräumen oder Fahrradständern im Hof abgestellt werden."
          }
        ]
      }
    ]
  },

  // ==========================================
  // PAKET B (CADANGAN 1) - FULL 18 SOAL
  // ==========================================
  {
    packetId: "B",
    title: "Paket B (Reserveprüfung 1)",
    description: "Simulasi Ujian Alternatif B1: Ernährung, Arbeitswelt, Wohnen & Gesundheit",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Blog & Erfahrungsbericht",
        instruction: "Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie die richtige Lösung.",
        textTitle: "Drei Monate Homeoffice in den Bergen: Mein Experiment als digitale Nomadin",
        readingText: `Hallo zusammen!
Vor drei Monaten habe ich meinen Chef um ein großes Experiment gebeten: Als Grafikdesignerin in einer Kölner Werbeagentur arbeite ich ohnehin fast ausschließlich am Laptop. Statt in meiner teuren Zweizimmerwohnung in Köln zu sitzen, mietete ich mir ein kleines Holzchalet in den österreichischen Alpen.

Mein Arbeitstag beginnt wie gewohnt um 9:00 Uhr mit dem virtuellen Team-Meeting. Der größte Vorteil ist der Blick aus dem Fenster: Statt auf graue Hausfassaden blicke ich direkt auf schneebedeckte Gipfel. In den Mittagspausen mache ich keine schnellen Imbisse am Schreibtisch mehr, sondern gehe 40 Minuten im Wald spazieren. Meine Kreativität und meine Zufriedenheit haben sich dadurch spürbar gesteigert.

Natürlich gibt es auch Nachteile. Wenn die Internetverbindung bei starkem Schneefall ausfällt, bricht Panik aus. Außerdem fehlt mir manchmal das spontane Kaffeetrinken mit den Kollegen auf dem Flur. Dennoch steht für mich fest: Nach meiner Rückkehr nach Köln werde ich mit meinem Arbeitgeber ein Modell mit mindestens zwei Tagen ortsunabhängiger Telearbeit pro Woche vereinbaren.

Herzliche Grüße, eure Sarah`,
        questions: [
          {
            id: "les-b-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Sarah hat ihren bisherigen Job in Köln gekündigt, um nach Österreich auszuwandern.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Sarah tidak mengundurkan diri; pekerjaannya tetap di agensi periklanan Cologne tetapi ia melakukan percobaan bekerja remote/homeoffice.",
            evidenceQuote: "Vor drei Monaten habe ich meinen Chef um ein großes Experiment gebeten: Als Grafikdesignerin in einer Kölner Werbeagentur arbeite ich ohnehin fast ausschließlich am Laptop."
          },
          {
            id: "les-b-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Die neue Umgebung in den Bergen wirkt sich positiv auf Sarahs Wohlbefinden und Produktivität aus.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Sarah menjelaskan bahwa berjalan di hutan saat istirahat siang meningkatkan kepuasan dan kreativitasnya secara nyata.",
            evidenceQuote: "Meine Kreativität und meine Zufriedenheit haben sich dadurch spürbar gesteigert."
          },
          {
            id: "les-b-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Welches Problem hat Sarah während ihres Aufenthalts erlebt?",
            options: [
              "Sie fand keine bezahlbare Unterkunft in den Bergen.",
              "Die technische Anbindung war bei extremem Wetter manchmal gefährdet.",
              "Ihr Arbeitgeber verweigerte ihr das monatliche Gehalt."
            ],
            correctAnswer: "Die technische Anbindung war bei extremem Wetter manchmal gefährdet.",
            explanation: "Ketika salju lebat turun, koneksi internet terkadang putus ('Wenn die Internetverbindung bei starkem Schneefall ausfällt...').",
            evidenceQuote: "Wenn die Internetverbindung bei starkem Schneefall ausfällt, bricht Panik aus."
          },
          {
            id: "les-b-t1-q4",
            teil: 1,
            questionNumber: 4,
            questionText: "Was vermisst Sarah im Vergleich zur Arbeit im Büro?",
            options: [
              "Die persönlichen, informellen Gespräche mit ihren Arbeitskollegen.",
              "Die Kantine in Köln.",
              "Den Lärm der Großstadt."
            ],
            correctAnswer: "Die persönlichen, informellen Gespräche mit ihren Arbeitskollegen.",
            explanation: "Sarah merindukan momen minum kopi santai dan obrolan spontan di lorong kantor dengan rekan kerjanya.",
            evidenceQuote: "Außerdem fehlt mir manchmal das spontane Kaffeetrinken mit den Kollegen auf dem Flur."
          },
          {
            id: "les-b-t1-q5",
            teil: 1,
            questionNumber: 5,
            questionText: "Wie plant Sarah ihre berufliche Zukunft nach dem Projekt?",
            options: [
              "Sie möchte für immer als Einsiedlerin in der Berghütte bleiben.",
              "Sie will eine Kombination aus Büroarbeit und Homeoffice vereinbaren.",
              "Sie möchte sich komplett selbstständig machen und nie wieder in Teams arbeiten."
            ],
            correctAnswer: "Sie will eine Kombination aus Büroarbeit und Homeoffice vereinbaren.",
            explanation: "Sarah berencana meminta izin kerja jarak jauh minimal 2 hari seminggu (kombinasi hybrid).",
            evidenceQuote: "...werde ich mit meinem Arbeitgeber ein Modell mit mindestens zwei Tagen ortsunabhängiger Telearbeit pro Woche vereinbaren."
          },
          {
            id: "les-b-t1-q6",
            teil: 1,
            questionNumber: 6,
            questionText: "Sarahs Blog richtet sich vor allem an Leser, die...",
            options: [
              "an modernen Arbeitsformen und Work-Life-Balance interessiert sind.",
              "ein billiges Hotel für den Winterurlaub in Österreich buchen wollen.",
              "auf der Suche nach einer IT-Ausbildung in Köln sind."
            ],
            correctAnswer: "an modernen Arbeitsformen und Work-Life-Balance interessiert sind.",
            explanation: "Fokus cerita adalah digital nomad, teleworking, dan keseimbangan kerja dan kehidupan.",
            evidenceQuote: "Mein Experiment als digitale Nomadin..."
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Magazinartikel",
        instruction: "Lesen Sie den Artikel und beantworten Sie die Fragen 7 bis 9 mit A, B oder C.",
        textTitle: "Ernährungstrends im Wandel: Warum immer mehr Deutsche pflanzliche Alternativen wählen",
        readingText: `Vor zwanzig Jahren galten Vegetarier und Veganer in Deutschland oft noch als Außenseiter, für die es in traditionellen Gaststätten meist nur Beilagensalate gab. Heute zeigt sich ein völlig anderes Bild: Nahezu jeder Supermarkt bietet eigene Regalreihen mit Hafermilch, Fleischersatzprodukten auf Erbsenproteinbasis und veganem Käse.

Laut dem aktuellen Ernährungsreport des Bundesministeriums ernähren sich inzwischen über zehn Prozent der Bevölkerung überwiegend vegetarisch, während mehr als die Hälfte angibt, den Konsum von Fleisch bewusst zu reduzieren (sogenannte Flexitarier). Die Hauptgründe für diesen Sinneswandel liegen im Tierschutz, dem persönlichen Gesundheitsbewusstsein sowie dem Schutz des Weltklimas, da die industrielle Tierhaltung enorme Mengen an Wasser und Ackerflächen beansprucht.

Gleichzeitig warnen Ernährungswissenschaftler vor blindem Vertrauen in verarbeitete Ersatzprodukte: Viele fertige Fleischalternativen enthalten hohe Mengen an Salz, Geschmacksverstärkern und ungesunden Fetten. Eine gesunde pflanzliche Ernährung sollte daher primär auf frischem Gemüse, Hülsenfrüchten, Nüssen und Vollkornprodukten basieren.`,
        questions: [
          {
            id: "les-b-t2-q7",
            teil: 2,
            questionNumber: 7,
            questionText: "Wie hat sich die Situation für Vegetarier und Veganer verändert?",
            options: [
              "Sie finden heutzutage in fast jedem Geschäft eine große Auswahl an Produkten.",
              "Sie müssen ihre Lebensmittel meistens teuer aus dem Ausland importieren.",
              "Sie werden in Restaurants nach wie vor kaum berücksichtigt."
            ],
            correctAnswer: "Sie finden heutzutage in fast jedem Geschäft eine große Auswahl an Produkten.",
            explanation: "Hampir setiap supermarket kini memiliki rak khusus pengganti susu dan daging nabati.",
            evidenceQuote: "Heute zeigt sich ein völlig anderes Bild: Nahezu jeder Supermarkt bietet eigene Regalreihen..."
          },
          {
            id: "les-b-t2-q8",
            teil: 2,
            questionNumber: 8,
            questionText: "Warum schränken viele 'Flexitarier' ihren Fleischkonsum ein?",
            options: [
              "Weil Fleisch gesetzlich rationiert wurde.",
              "Aus Gründen des Tierwohls, der eigenen Gesundheit und des Klimaschutzes.",
              "Weil tierische Produkte in Deutschland nicht mehr schmecken."
            ],
            correctAnswer: "Aus Gründen des Tierwohls, der eigenen Gesundheit und des Klimaschutzes.",
            explanation: "Alasan utamanya adalah kesejahteraan hewan, kesehatan pribadi, dan dampak iklim industri peternakan.",
            evidenceQuote: "Die Hauptgründe für diesen Sinneswandel liegen im Tierschutz, dem persönlichen Gesundheitsbewusstsein sowie dem Schutz des Weltklimas..."
          },
          {
            id: "les-b-t2-q9",
            teil: 2,
            questionNumber: 9,
            questionText: "Was empfehlen Ernährungswissenschaftler laut dem Text?",
            options: [
              "Möglichst viele industriell verarbeitete Fertigprodukte zu kaufen.",
              "Täglich mindestens zwei Liter Hafermilch zu trinken.",
              "Pflanzliche Ernährung überwiegend mit frischen, unverarbeiteten Zutaten zu gestalten."
            ],
            correctAnswer: "Pflanzliche Ernährung überwiegend mit frischen, unverarbeiteten Zutaten zu gestalten.",
            explanation: "Pakar memperingatkan agar tidak cuma makan makanan olahan tinggi garam, melainkan fokus pada sayuran segar, kacang-kacangan, dan biji-bijian utuh.",
            evidenceQuote: "Eine gesunde pflanzliche Ernährung sollte daher primär auf frischem Gemüse, Hülsenfrüchten, Nüssen und Vollkornprodukten basieren."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Anzeigen & Situationen",
        instruction: "Lesen Sie die Situationen und Anzeigen. Welche Anzeige passt? Wenn keine passt, wählen Sie '0'.",
        textTitle: "Freizeitangebote und Sportkurse",
        readingText: "Finden Sie die passende Anzeige.",
        matchingAds: [
          {
            id: "ad-b-A",
            title: "Anzeige A: Abendschwimmkurs für Berufstätige",
            text: "Kraulen und Rückenschwimmen von Grund auf lernen oder Technik verbessern. Jeden Dienstag von 20:00 bis 21:30 Uhr im Hallenbad West. Vorkenntnisse nicht erforderlich. Qualifizierte Trainer. Kosten: 120 € für 10 Termine."
          },
          {
            id: "ad-b-B",
            title: "Anzeige B: Kletter-Schnupperkurs in der Halle",
            text: "Für Jugendliche ab 14 Jahren und Erwachsene. Lerne Grundlagen der Knotenkunde, Seilsicherung und Klettertechnik an unserer 15 Meter hohen Wand. Immer samstags von 10 bis 13 Uhr. Ausrüstung inklusive!"
          },
          {
            id: "ad-b-C",
            title: "Anzeige C: Yoga für Senioren am Vormittag",
            text: "Sanfte Bewegungsübungen zur Förderung von Beweglichkeit und Gleichgewicht. Speziell konzipiert für Personen ab 65 Jahren. Montags und donnerstags von 09:30 bis 10:30 Uhr im Bürgerhaus."
          }
        ],
        matchingSituations: [
          {
            id: "sit-b-10",
            person: "10. Herr Walter (70)",
            need: "sucht einen leichten Bewegungskurs morgens unter der Woche mit Gleichaltrigen zur Stärkung des Gleichgewichts.",
            correctAdId: "ad-b-C"
          },
          {
            id: "sit-b-11",
            person: "11. Tanja (29)",
            need: "arbeitet bis 18:30 Uhr und möchte dienstags abends ihre Schwimmtechnik im Hallenbad verbessern.",
            correctAdId: "ad-b-A"
          },
          {
            id: "sit-b-12",
            person: "12. Tim (9 Jahre)",
            need: "möchte sonntags mit Gleichaltrigen Fußball auf dem Sportplatz trainieren.",
            correctAdId: "0"
          }
        ],
        questions: [
          {
            id: "les-b-t3-q10",
            teil: 3,
            questionNumber: 10,
            questionText: "Welche Anzeige passt zu Herrn Walter (70 Jahre, morgens, Gleichgewicht)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige C",
            explanation: "Anzeige C pas: Yoga khusus lansia (ab 65 Jahren) setiap Senin & Kamis jam 09:30 pagi untuk fleksibilitas dan keseimbangan.",
            evidenceQuote: "Speziell konzipiert für Personen ab 65 Jahren. Montags und donnerstags von 09:30 bis 10:30 Uhr..."
          },
          {
            id: "les-b-t3-q11",
            teil: 3,
            questionNumber: 11,
            questionText: "Welche Anzeige passt zu Tanja (Schwimmkurs, dienstags abends nach 18:30)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige A",
            explanation: "Anzeige A adalah kursus renang Selasa malam jam 20:00-21:30 di Hallenbad West.",
            evidenceQuote: "Jeden Dienstag von 20:00 bis 21:30 Uhr im Hallenbad West."
          },
          {
            id: "les-b-t3-q12",
            teil: 3,
            questionNumber: 12,
            questionText: "Welche Anzeige passt zu Tim (9 Jahre, sonntags Fußball)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "0 (Keine passende Anzeige)",
            explanation: "Tidak ada iklan sepak bola untuk anak usia 9 tahun pada hari Minggu.",
            evidenceQuote: "Kein passendes Fußballangebot für Kinder am Sonntag vorhanden."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Leserbriefe zu 'Haustiere am Arbeitsplatz'",
        instruction: "Lesen Sie die Beiträge. Ist die Person DAFÜR (Ja) oder DAGEGEN (Nein)?",
        textTitle: "Bürohunde: Sollten Hunde am Arbeitsplatz erlaubt sein?",
        readingText: `Thema: Sollten Arbeitgeber das Mitbringen von Hunden ins Büro generell gestatten?

Beitrag 1 (Claudia, Marketingmanagerin):
"Studien beweisen, dass die Anwesenheit von Hunden den Cortisolspiegel der Mitarbeiter senkt und für bessere Laune im Team sorgt. Unser Bürohund 'Balu' bringt alle zum Lächeln und fördert kurze Bewegungspausen. Solange der Hund gut erzogen ist, halte ich das für einen fantastischen Schritt für jede moderne Firma."

Beitrag 2 (Mehmet, Softwareentwickler):
"Ich leide unter einer extremen Tierhaarallergie. Wenn ein Kollege einen Hund mitbringt, brennen meine Augen und ich bekomme Atemnot. Arbeitsplätze müssen neutral, hygienisch und sicher für alle Kollegen sein. Haustiere gehören nach Hause oder in den Garten, nicht in geschlossene Großraumbüros!"

Beitrag 3 (Anja, Abteilungsleiterin Personal):
"Ein Hund im Büro führt unweigerlich zu Konflikten: Wer haftet, wenn ein Hund ein teures Computerkabel durchbeißt oder einen Kunden anspringt? Außerdem haben nicht wenige Menschen panische Angst vor Hunden. Aus arbeitsrechtlichen und organisatorischen Gründen lehne ich das entschieden ab."`,
        questions: [
          {
            id: "les-b-t4-q13",
            teil: 4,
            questionNumber: 13,
            questionText: "Ist Claudia DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dafür (Ja)",
            explanation: "Claudia mendukung karena anjing di kantor dapat menurunkan stres kerja dan meningkatkan mood tim.",
            evidenceQuote: "...halte ich das für einen fantastischen Schritt."
          },
          {
            id: "les-b-t4-q14",
            teil: 4,
            questionNumber: 14,
            questionText: "Ist Mehmet DAFÜR (Ja) atau DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dagegen (Nein)",
            explanation: "Mehmet menolak karena menderita alergi bulu hewan yang parah hingga sesak napas.",
            evidenceQuote: "Arbeitsplätze müssen neutral und sicher für alle Kollegen sein. Haustiere gehören nach Hause!"
          },
          {
            id: "les-b-t4-q15",
            teil: 4,
            questionNumber: 15,
            questionText: "Ist Anja (Personal) DAFÜR (Ja) atau DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dagegen (Nein)",
            explanation: "Anja menolak secara tegas ('lehne ich entschieden ab') karena masalah tanggung jawab hukum (Haftung) dan rasa takut karyawan.",
            evidenceQuote: "Aus arbeitsrechtlichen und organisatorischen Gründen lehne ich das entschieden ab."
          }
        ]
      },
      {
        teil: 5,
        title: "Teil 5: Bibliotheksordnung",
        instruction: "Lesen Sie die Ordnung der Stadtbibliothek und die Aufgaben 16 bis 18 dazu.",
        textTitle: "Benutzungsordnung der Stadtbibliothek Heidelberg",
        readingText: `§ 4 Ausleihfristen und Verlängerungen
1. Die reguläre Leihfrist für Bücher beträgt 4 Wochen, für DVDs und Zeitschriften 2 Wochen.
2. Eine Verlängerung ist bis zu zweimal möglich, sofern keine Vormerkung durch einen anderen Leser vorliegt.
3. Bei verspäteter Rückgabe fällt ab dem ersten Tag der Fristüberschreitung eine Gebühr von 1,50 € pro Medieneinheit und Woche an.

§ 8 Verhalten in den Lesesälen
Im gesamten Lesesaalbereich herrscht absolute Stille. Das Telefonieren mit Mobiltelefonen ist strikt untersagt; Geräte sind auf lautlos zu schalten. Das Mitbringen von offenen Getränken und Speisen ist nicht gestattet; lediglich Wasser in verschließbaren Flaschen darf an die Arbeitsplätze mitgenommen werden.`,
        questions: [
          {
            id: "les-b-t5-q16",
            teil: 5,
            questionNumber: 16,
            questionText: "Wie lange darf man DVDs ausleihen?",
            options: ["4 Wochen", "2 Wochen", "Beliebig lange"],
            correctAnswer: "2 Wochen",
            explanation: "Buku boleh dipinjam 4 minggu, sedangkan DVD dan majalah hanya 2 minggu.",
            evidenceQuote: "...für DVDs und Zeitschriften 2 Wochen."
          },
          {
            id: "les-b-t5-q17",
            teil: 5,
            questionNumber: 17,
            questionText: "Wann kann ein Buch NICHT verlängert werden?",
            options: [
              "Wenn ein anderer Leser das Buch bereits reserviert/vorgemerkt hat.",
              "Wenn man mehr als 3 Bücher geliehen hat.",
              "Am Wochenende."
            ],
            correctAnswer: "Wenn ein anderer Leser das Buch bereits reserviert/vorgemerkt hat.",
            explanation: "Perpanjangan hanya diizinkan jika tidak ada reservasi (Vormerkung) dari peminjam lain.",
            evidenceQuote: "Eine Verlängerung ist bis zu zweimal möglich, sofern keine Vormerkung durch einen anderen Leser vorliegt."
          },
          {
            id: "les-b-t5-q18",
            teil: 5,
            questionNumber: 18,
            questionText: "Welche Getränke dürfen Nutzer an ihren Arbeitsplatz im Lesesaal mitbringen?",
            options: [
              "Heißer Kaffee im Becher.",
              "Ausschließlich Wasser in wiederverschließbaren Flaschen.",
              "Jede Art von Erfrischungsgetränken und Snacks."
            ],
            correctAnswer: "Ausschließlich Wasser in wiederverschließbaren Flaschen.",
            explanation: "Makanan dan minuman terbuka dilarang, hanya air dalam botol tertutup yang diizinkan.",
            evidenceQuote: "...lediglich Wasser in verschließbaren Flaschen darf an die Arbeitsplätze mitgenommen werden."
          }
        ]
      }
    ]
  },

  // ==========================================
  // PAKET C (CADANGAN 2) - FULL 18 SOAL
  // ==========================================
  {
    packetId: "C",
    title: "Paket C (Reserveprüfung 2)",
    description: "Simulasi Ujian Alternatif B1: Technologie, Reisen, Ehrenamt & Ausbildung",
    teile: [
      {
        teil: 1,
        title: "Teil 1: Reise- und Erfahrungsbericht",
        instruction: "Lesen Sie den Text und lösen Sie die Aufgaben 1 bis 6.",
        textTitle: "Mit dem Nachtzug quer durch Europa: Das Comeback des Schienenverkehrs",
        readingText: `Warum stundenlang vor Sicherheitskontrollen an Flughäfen anstehen, wenn man im Schlaf reisen kann? Im vergangenen Sommer beschlossen meine Freundin und ich, von Wien nach Rom mit dem Nachtzug zu fahren. 

Wir buchten ein privates Schlafwagenabteil mit zwei Betten und eigenem kleinen Waschbecken. Pünktlich um 19:23 Uhr rollte der Zug aus dem Wiener Hauptbahnhof. Nach einem gemütlichen Abendessen im Speisewagen und angeregten Unterhaltungen mit Reisenden aus Italien und Japan schliefen wir beim sanften Rhythmus der Schienen ein. 

Als wir am nächsten Morgen die Vorhänge öffneten, fuhren wir gerade durch die malerische Landschaft der Toskana. Eine freundliche Zugbegleiterin brachte uns heißen Kaffee und frische Croissants direkt ans Bett. Um 09:15 Uhr kamen wir ausgeruht mitten im Zentrum von Rom an – ohne Stress, ohne Transfer vom weit entfernten Flughafen und mit einem Bruchteil des CO2-Ausstoßes eines Fluges. 

Natürlich ist ein Schlafwagen kein Fünf-Sterne-Hotel: Die Gänge sind schmal, und wer einen sehr leichten Schlaf hat, sollte Ohropax einpacken. Doch das Gesamterlebnis hat uns absolut überzeugt. Für uns steht fest: Unsere nächste Europareise machen wir wieder mit der Bahn!`,
        questions: [
          {
            id: "les-c-t1-q1",
            teil: 1,
            questionNumber: 1,
            questionText: "Die Reise mit dem Nachtzug startete pünktlich in Wien.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Richtig",
            explanation: "Teks menyebutkan 'Pünktlich um 19:23 Uhr rollte der Zug aus dem Wiener Hauptbahnhof.'",
            evidenceQuote: "Pünktlich um 19:23 Uhr rollte der Zug aus dem Wiener Hauptbahnhof."
          },
          {
            id: "les-c-t1-q2",
            teil: 1,
            questionNumber: 2,
            questionText: "Die Reisenden mussten ihr Abteil mit vier fremden Personen teilen.",
            options: ["Richtig", "Falsch"],
            correctAnswer: "Falsch",
            explanation: "Mereka memesan kompartemen pribadi dengan dua tempat tidur ('privates Schlafwagenabteil mit zwei Betten').",
            evidenceQuote: "Wir buchten ein privates Schlafwagenabteil mit zwei Betten..."
          },
          {
            id: "les-c-t1-q3",
            teil: 1,
            questionNumber: 3,
            questionText: "Was hebt der Autor als großen Vorteil gegenüber dem Flugzeug hervor?",
            options: [
              "Zugfahren ist grundsätzlich immer kostenlos.",
              "Man kommt ausgeruht direkt im Stadtzentrum an und spart klimaschädliches CO2.",
              "Im Nachtzug gibt es keine Gepäckbegrenzungen."
            ],
            correctAnswer: "Man kommt ausgeruht direkt im Stadtzentrum an und spart klimaschädliches CO2.",
            explanation: "Tiba di pusat kota tanpa transfer bandara serta jauh lebih ramah lingkungan (Bruchteil des CO2-Ausstoßes).",
            evidenceQuote: "Um 09:15 Uhr kamen wir ausgeruht mitten im Zentrum von Rom an – ohne Stress, ohne Transfer vom weit entfernten Flughafen und mit einem Bruchteil des CO2-Ausstoßes..."
          },
          {
            id: "les-c-t1-q4",
            teil: 1,
            questionNumber: 4,
            questionText: "Das Frühstück im Nachtzug...",
            options: [
              "musste extra im Speisewagen gegen Barzahlung gekauft werden.",
              "wurde vom Zugpersonal direkt ins eigene Abteil gebracht.",
              "fiel wegen Personalmangels komplett aus."
            ],
            correctAnswer: "wurde vom Zugpersonal direkt ins eigene Abteil gebracht.",
            explanation: "Pramugari kereta membawakan kopi hangat dan croissant langsung ke tempat tidur mereka di kompartemen.",
            evidenceQuote: "Eine freundliche Zugbegleiterin brachte uns heißen Kaffee und frische Croissants direkt ans Bett."
          },
          {
            id: "les-c-t1-q5",
            teil: 1,
            questionNumber: 5,
            questionText: "Für wen empfiehlt der Autor besondere Vorbereitung (z.B. Ohropax)?",
            options: [
              "Für Personen, die einen sehr leichten Schlaf haben.",
              "Für Reisende ohne gültigen Reisepass.",
              "Für Fahrgäste mit Hunden."
            ],
            correctAnswer: "Für Personen, die einen sehr leichten Schlaf haben.",
            explanation: "Penulis menyarankan penyumbat telinga bagi mereka yang tidurnya sangat peka terhadap suara gerbong kereta.",
            evidenceQuote: "...wer einen sehr leichten Schlaf hat, sollte Ohropax einpacken."
          },
          {
            id: "les-c-t1-q6",
            teil: 1,
            questionNumber: 6,
            questionText: "Wie lautet das Fazit der Reise?",
            options: [
              "Sie werden nie wieder mit dem Zug durch Europa reisen.",
              "Das Gesamterlebnis war so positiv, dass sie ihre nächste Reise wieder mit der Bahn planen.",
              "Sie empfehlen ausschließlich Flüge für Strecken über 500 Kilometer."
            ],
            correctAnswer: "Das Gesamterlebnis war so positiv, dass sie ihre nächste Reise wieder mit der Bahn planen.",
            explanation: "Pengalaman menyenangkan membuat mereka mantap akan kembali berlibur dengan kereta api berikutnya.",
            evidenceQuote: "Für uns steht fest: Unsere nächste Europareise machen wir wieder mit der Bahn!"
          }
        ]
      },
      {
        teil: 2,
        title: "Teil 2: Pressebericht über Bildung & Digitalisierung",
        instruction: "Lesen Sie den Beitrag und beantworten Sie die Fragen 7 bis 9 mit A, B oder C.",
        textTitle: "Künstliche Intelligenz im Klassenzimmer: Chance oder Gefahr für das Lernen?",
        readingText: `Seit dem weltweiten Durchbruch intelligenter Sprachmodelle diskutieren Lehrerverbände, Universitäten und Eltern intensiv über deren Einsatz im Schulalltag. Auf einfachen Knopfdruck formulieren Apps fehlerfreie Aufsätze, lösen komplexe Gleichungen und übersetzen anspruchsvolle historische Texte.

Viele Lehrer befürchteten anfangs, dass Schüler das selbstständige Denken und Schreiben verlernen könnten. Doch eine bundesweite Erhebung an Gymnasien zeigt ein differenzierteres Bild: Wo KI gezielt in den Unterricht integriert wird – etwa zur Textkorrektur oder als virtueller Sparringspartner für fremdsprachige Dialoge –, steigt die Motivation der Lernenden deutlich an.

Pädagogen betonen einhellig, dass ein Verbot von KI-Werkzeugen wenig sinnvoll sei, da Schüler sie außerhalb des Klassenzimmers ohnehin nutzen werden. Stattdessen gehe es darum, Schülern Medienkompetenz und kritisches Denken zu vermitteln: Sie müssen lernen, Fakten sorgfältig zu überprüfen, KI-Halluzinationen zu erkennen und eigene Standpunkte überzeugend zu begründen.`,
        questions: [
          {
            id: "les-c-t2-q7",
            teil: 2,
            questionNumber: 7,
            questionText: "Welche anfängliche Sorge hatten viele Lehrkräfte bezüglich intelligenter Sprachmodelle?",
            options: [
              "Dass Schüler das eigenständige Nachdenken und Verfassen von Texten verlernen.",
              "Dass alle Schulen neue Großrechner anschaffen müssen.",
              "Dass keine Fremdsprachenlehrer mehr benötigt werden."
            ],
            correctAnswer: "Dass Schüler das eigenständige Nachdenken und Verfassen von Texten verlernen.",
            explanation: "Guru awalnya khawatir murid tidak lagi belajar berpikir kritis dan menulis secara mandiri.",
            evidenceQuote: "Viele Lehrer befürchteten anfangs, dass Schüler das selbstständige Denken und Schreiben verlernen könnten."
          },
          {
            id: "les-c-t2-q8",
            teil: 2,
            questionNumber: 8,
            questionText: "Was zeigt die erwähnte Erhebung an Schulen, die KI konstruktiv einbinden?",
            options: [
              "Die Noten der Schüler verschlechtern sich massiv.",
              "Die Lernmotivation der Jugendlichen nimmt spürbar zu.",
              "Schüler weigern sich, Hausaufgaben zu machen."
            ],
            correctAnswer: "Die Lernmotivation der Jugendlichen nimmt spürbar zu.",
            explanation: "Saat AI diintegrasikan sebagai rekan latihan dialog atau koreksi teks, motivasi belajar murid justru meningkat nyata.",
            evidenceQuote: "...steigt die Motivation der Lernenden deutlich an."
          },
          {
            id: "les-c-t2-q9",
            teil: 2,
            questionNumber: 9,
            questionText: "Welches Fazit ziehen Pädagogen laut dem Artikel?",
            options: [
              "Sie fordern die sofortige Abschaltung aller digitalen Geräte an Schulen.",
              "Verbote sind ineffektiv; Schüler müssen stattdessen Medienkompetenz und Quellenkritik lernen.",
              "Klassische Prüfungen sollen durch automatische KI-Tests ersetzt werden."
            ],
            correctAnswer: "Verbote sind ineffektiv; Schüler müssen stattdessen Medienkompetenz und Quellenkritik lernen.",
            explanation: "Pakar pendidikan sepakat pelarangan tidak berguna dan literasi memverifikasi fakta serta mengenali halusinasi AI jauh lebih penting.",
            evidenceQuote: "Pädagogen betonen einhellig, dass ein Verbot von KI-Werkzeugen wenig sinnvoll sei... Stattdessen gehe es darum, Schülern Medienkompetenz und kritisches Denken zu vermitteln..."
          }
        ]
      },
      {
        teil: 3,
        title: "Teil 3: Praktikumsanzeigen & Bewerber",
        instruction: "Welche Praktikumsanzeige passt zur Situation? Wählen Sie A, B, C atau 0.",
        textTitle: "Praktikumsplätze und Weiterbildung in Berlin",
        readingText: "Ordnen Sie die Angebote den Bewerbern zu.",
        matchingAds: [
          {
            id: "ad-c-A",
            title: "Anzeige A: Praktikum im Kulturmanagement",
            text: "Unterstütze unser Theaterfestival für 3 Monate ab Mai! Aufgaben: Künstlerbetreuung, Social-Media-Betreuung und Ticketing. Voraussetzung: Freude am Umgang mit Menschen, sehr gute Deutschkenntnisse in Wort und Schrift. Vergütung: 500 €/Monat."
          },
          {
            id: "ad-c-B",
            title: "Anzeige B: Praktikum Softwareentwicklung (Python)",
            text: "Spannende Aufgaben im Bereich Datenanalyse und Backend-Entwicklung für Informatik-Studenten. Mindestens 6 Monate Vollzeit. Fließendes Englisch erforderlich. Arbeitsort Berlin-Mitte."
          },
          {
            id: "ad-c-C",
            title: "Anzeige C: Teilzeit-Volontariat im Umweltschutzverband",
            text: "Mitarbeit bei Baumpflanzaktionen und Bildungskampagnen. 20 Wochenstunden, flexible Zeiteinteilung, Dauer: 4 Monate. Auch für Quereinsteiger ohne Fachstudium geeignet."
          }
        ],
        matchingSituations: [
          {
            id: "sit-c-10",
            person: "10. Lisa (22)",
            need: "studiert Germanistik und Theaterwissenschaften, sucht für die Sommermonate ein 3-monatiges bezahltes Praktikum im Event- und Kulturbereich.",
            correctAdId: "ad-c-A"
          },
          {
            id: "sit-c-11",
            person: "11. Dennis (25)",
            need: "studiert Informatik und möchte für mindestens ein halbes Jahr praktische Programmiererfahrung mit Python in Vollzeit sammeln.",
            correctAdId: "ad-c-B"
          },
          {
            id: "sit-c-12",
            person: "12. Claudia (35)",
            need: "sucht ein Vollzeit-Praktikum für genau 2 Monate im Bereich Bankwesen und Börsenhandel.",
            correctAdId: "0"
          }
        ],
        questions: [
          {
            id: "les-c-t3-q10",
            teil: 3,
            questionNumber: 10,
            questionText: "Welche Anzeige passt zu Lisa (Germanistik/Theater, 3 Monate ab Mai)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige A",
            explanation: "Anzeige A cocok persis: Theaterfestival, 3 Monate ab Mai, Künstlerbetreuung dan Social Media.",
            evidenceQuote: "Unterstütze unser Theaterfestival für 3 Monate ab Mai!"
          },
          {
            id: "les-c-t3-q11",
            teil: 3,
            questionNumber: 11,
            questionText: "Welche Anzeige passt zu Dennis (Informatik, min. 6 Monate Vollzeit, Python)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "Anzeige B",
            explanation: "Anzeige B pas: Softwareentwicklung Python, min 6 Monate Vollzeit untuk mahasiswa informatika.",
            evidenceQuote: "Spannende Aufgaben im Bereich Datenanalyse und Backend-Entwicklung für Informatik-Studenten. Mindestens 6 Monate Vollzeit."
          },
          {
            id: "les-c-t3-q12",
            teil: 3,
            questionNumber: 12,
            questionText: "Welche Anzeige passt zu Claudia (Bankwesen / Börse, 2 Monate)?",
            options: ["Anzeige A", "Anzeige B", "Anzeige C", "0 (Keine passende Anzeige)"],
            correctAnswer: "0 (Keine passende Anzeige)",
            explanation: "Tidak ada iklan yang menawarkan magang di sektor perbankan atau pasar modal.",
            evidenceQuote: "Keine passende Bank- oder Börsenanzeige vorhanden."
          }
        ]
      },
      {
        teil: 4,
        title: "Teil 4: Meinungen zur 4-Tage-Woche",
        instruction: "Lesen Sie die Meinungen zum Thema: 'Einführung der 4-Tage-Woche bei vollem Lohnausgleich'. Ist die Person DAFÜR (Ja) oder DAGEGEN (Nein)?",
        textTitle: "Debatte: 4-Tage-Woche – Zukunft der Arbeit oder Gefahr für die Wirtschaft?",
        readingText: `Thema der Woche: Sollten Unternehmen flächendeckend die 4-Tage-Woche bei gleichem Gehalt einführen?

Leserbrief 1 (Felix, Agenturinhaber):
"Wir haben die 4-Tage-Woche in unserer Agentur vor einem Jahr testweise eingeführt. Das Ergebnis übertrifft alle Erwartungen: Die Mitarbeiter sind ausgeruhter, seltener krank und schaffen in 32 Stunden qualitativ dieselbe Arbeit wie früher in 40 Stunden. Die Motivation ist riesig. Ich bin restlos begeistert!"

Leserbrief 2 (Monika, Gastronomin und Hotelchefin):
"In Büros mag das funktionieren, aber in Dienstleistungsbetrieben ist das eine Illusion! Ein Hotel oder Restaurant kann nicht einfach freitags schließen. Wenn ich für denselben Lohn weniger Stunden arbeiten lasse, muss ich teures Zusatzpersonal einstellen, das es auf dem Arbeitsmarkt gar nicht gibt. Die Preise müssten explodieren. Ich bin strikt dagegen!"

Leserbrief 3 (Dr. Krause, Arbeitspsychologe):
"Drei Tage Erholung am Stück senken das Burnout-Risiko nachweislich und geben Eltern mehr Zeit für die Erziehung und Pflege von Angehörigen. Aus gesundheitspolitischer Sicht ist die Verkürzung der Wochenarbeitszeit eine überfällige Anpassung an die moderne Leistungsgesellschaft."`,
        questions: [
          {
            id: "les-c-t4-q13",
            teil: 4,
            questionNumber: 13,
            questionText: "Ist Felix (Agenturinhaber) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dafür (Ja)",
            explanation: "Felix sangat puas ('Ich bin restlos begeistert!') karena produktivitas tetap sama dan pegawai lebih bugar.",
            evidenceQuote: "Ich bin restlos begeistert!"
          },
          {
            id: "les-c-t4-q14",
            teil: 4,
            questionNumber: 14,
            questionText: "Ist Monika (Gastronomin) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dagegen (Nein)",
            explanation: "Monika menolak secara tegas ('Ich bin strikt dagegen!') karena sektor hotel/restoran tidak bisa tutup dan biaya gaji akan membengkak.",
            evidenceQuote: "Ich bin strikt dagegen!"
          },
          {
            id: "les-c-t4-q15",
            teil: 4,
            questionNumber: 15,
            questionText: "Ist Dr. Krause (Arbeitspsychologe) DAFÜR (Ja) oder DAGEGEN (Nein)?",
            options: ["Dafür (Ja)", "Dagegen (Nein)"],
            correctAnswer: "Dafür (Ja)",
            explanation: "Dr. Krause mendukung karena 3 hari libur menurunkan risiko burnout dan meningkatkan kesehatan mental pekerja.",
            evidenceQuote: "...ist die Verkürzung der Wochenarbeitszeit eine überfällige Anpassung..."
          }
        ]
      },
      {
        teil: 5,
        title: "Teil 5: Parkplatzordnung am Bahnhof",
        instruction: "Lesen Sie die Parkplatzordnung und beantworten Sie die Aufgaben 16 bis 18 dazu.",
        textTitle: "Park & Ride Parkplatzordnung Bahnhof Kassel-Wilhelmshöhe",
        readingText: `§ 2 Parkberechtigung und Tarife
1. Die Nutzung dieses Park & Ride Parkplatzes ist ausschließlich Pendlern und Bahnreisenden mit gültigem tagesaktuellem Bahnticket oder Monatsabonnement der Deutschen Bahn bzw. des regionalen Verkehrsverbundes gestattet.
2. Der gültige Parkschein muss zusammen mit der Fahrkarte von außen gut lesbar hinter der Windschutzscheibe des Fahrzeugs platziert werden.
3. Die Höchstparkdauer beträgt 72 Stunden (3 Tage). Längeres Parken bedarf einer vorherigen schriftlichen Genehmigung der Bahnhofsverwaltung.

§ 5 Abschleppen und Verstöße
Fahrzeuge, die ohne gültigen Nachweis parken, die Rettungswege versperren oder markierte Behindertenparkplätze unberechtigt belegen, werden unverzüglich auf Kosten des Fahrzeughalters kostenpflichtig abgeschleppt.`,
        questions: [
          {
            id: "les-c-t5-q16",
            teil: 5,
            questionNumber: 16,
            questionText: "Wer darf auf dem P&R-Parkplatz parken?",
            options: [
              "Jeder Besucher der Stadt Kassel ohne Einschränkung.",
              "Nur Bahnreisende und Pendler mit einem gültigen Ticket des Verkehrsverbundes.",
              "Ausschließlich Mitarbeiter der Deutschen Bahn."
            ],
            correctAnswer: "Nur Bahnreisende und Pendler mit einem gültigen Ticket des Verkehrsverbundes.",
            explanation: "Hanya penumpang kereta api dengan tiket harian atau tiket bulanan sah yang berhak parkir.",
            evidenceQuote: "Die Nutzung dieses Parkplatzes ist ausschließlich Pendlern mit gültigem tagesaktuellem Bahnticket..."
          },
          {
            id: "les-c-t5-q17",
            teil: 5,
            questionNumber: 17,
            questionText: "Wie lange darf ein Auto regulär maximal auf dem Parkplatz stehen?",
            options: [
              "Höchstens 24 Stunden.",
              "Maximal 72 Stunden (3 Tage).",
              "Unbegrenzt lange, solange man bezahlt hat."
            ],
            correctAnswer: "Maximal 72 Stunden (3 Tage).",
            explanation: "Batas durasi parkir maksimal reguler adalah 72 jam (3 hari).",
            evidenceQuote: "Die Höchstparkdauer beträgt 72 Stunden (3 Tage)."
          },
          {
            id: "les-c-t5-q18",
            teil: 5,
            questionNumber: 18,
            questionText: "Was passiert mit Fahrzeugen, die ohne Berechtigung Behindertenparkplätze belegen?",
            options: [
              "Sie erhalten eine mündliche Verwarnung per Lautsprecher.",
              "Sie werden sofort kostenpflichtig für den Halter abgeschleppt.",
              "Sie müssen lediglich die doppelte Parkgebühr am Automaten nachzahlen."
            ],
            correctAnswer: "Sie werden sofort kostenpflichtig untuk den Halter abgeschleppt.",
            explanation: "Kendaraan tanpa hak di parkir disabilitas langsung diderek dengan biaya ditanggung pemilik mobil.",
            evidenceQuote: "...werden unverzüglich auf Kosten des Fahrzeughalters kostenpflichtig abgeschleppt."
          }
        ]
      }
    ]
  }
];
