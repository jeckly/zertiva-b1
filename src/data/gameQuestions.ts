import { GameQuestion } from "@/types";

export const initialGameQuestions: GameQuestion[] = [
  // ==========================================
  // LEVEL EASY: B1 Basis (Wortschatz & Artikel)
  // ==========================================
  // --- PAKET A (EASY: 1 - 5) ---
  {
    id: "easy-a-1",
    packet: "A",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel passt? '___ Bewerbung muss bis Freitag eingereicht werden.'",
    promptIndo: "Pilihlah artikel yang tepat untuk kata benda berakhiran '-ung'.",
    options: ["Der", "Die", "Das", "Den"],
    correctAnswer: "Die",
    explanation: "Kata benda dalam bahasa Jerman yang berakhiran '-ung' selalu bergender feminin (die). Contoh lain: die Wohnung, die Zeitung, die Hoffnung.",
    ruleTip: "Akhiran feminin: -ung, -heit, -keit, -schaft, -tät, -ion."
  },
  {
    id: "easy-a-2",
    packet: "A",
    difficulty: "easy",
    category: "wortschatz",
    question: "Was bedeutet das Wort 'kündigen' im Arbeitskontext?",
    promptIndo: "Apa arti kata kerja 'kündigen' dalam konteks dunia kerja?",
    options: ["Mengundurkan diri / memutus kontrak", "Mendapatkan promosi", "Memulai masa percobaan", "Mendaftar wawancara"],
    correctAnswer: "Mengundurkan diri / memutus kontrak",
    explanation: "'Kündigen' berarti memutus hubungan kerja atau kontrak, baik dari pihak pekerja (mengundurkan diri) maupun dari pihak perusahaan (PHK).",
    ruleTip: "die Kündigung = pemutusan kontrak / surat resign."
  },
  {
    id: "easy-a-3",
    packet: "A",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel gehört zu 'Ergebnis' (hasil)?",
    promptIndo: "Tentukan artikel yang benar untuk 'Ergebnis'.",
    options: ["der", "die", "das", "den"],
    correctAnswer: "das",
    explanation: "Mayoritas kata berakhiran '-nis' bergender netral (das), seperti das Ergebnis, das Zeugnis, das Geheimnis (kecuali sedikit pengecualian seperti die Erlaubnis).",
    ruleTip: "das Ergebnis = hasil; das Zeugnis = ijazah/rapor."
  },
  {
    id: "easy-a-4",
    packet: "A",
    difficulty: "easy",
    category: "wortschatz",
    question: "Welches Verb passt zur festen Verbindung: 'eine Entscheidung ___' (mengambil keputusan)?",
    promptIndo: "Pasangan kata kerja yang tepat (Nomen-Verb-Verbindung) untuk 'eine Entscheidung' adalah...",
    options: ["treffen", "machen", "tun", "geben"],
    correctAnswer: "treffen",
    explanation: "Dalam bahasa Jerman baku tingkat B1, padanan untuk 'mengambil keputusan' adalah 'eine Entscheidung treffen' (bukan 'eine Entscheidung machen').",
    ruleTip: "Nomen-Verb-Verbindung: eine Entscheidung treffen = entscheiden."
  },
  {
    id: "easy-a-5",
    packet: "A",
    difficulty: "easy",
    category: "wortschatz",
    question: "Was ist das Gegenteil von 'pünktlich' (tepat waktu)?",
    promptIndo: "Apa lawan kata dari 'pünktlich'?",
    options: ["unpünktlich", "missverstanden", "enttäuscht", "unvollständig"],
    correctAnswer: "unpünktlich",
    explanation: "Prefiks negasi untuk kata sifat 'pünktlich' adalah 'un-', sehingga menjadi 'unpünktlich' (terlambat / tidak tepat waktu).",
    ruleTip: "un- digunakan untuk membentuk antonim kata sifat: unpünktlich, unhöflich, unzufrieden."
  },

  // --- PAKET B (EASY: 6 - 10) ---
  {
    id: "easy-b-1",
    packet: "B",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel passt? 'Ich habe ___ Praktikum bei einer Softwarefirma gemacht.'",
    promptIndo: "Kata benda berakhiran '-um' (seperti Praktikum, Museum, Zentrum) memiliki artikel apa?",
    options: ["ein", "eine", "einen", "einer"],
    correctAnswer: "ein",
    explanation: "Kata serapan berakhiran '-um' selalu bergender netral (das Praktikum). Dalam posisi Akkusativ netral, artikel tak tentu tetap 'ein'.",
    ruleTip: "Akhiran netral: -um, -ment, -tum, -chen, -lein."
  },
  {
    id: "easy-b-2",
    packet: "B",
    difficulty: "easy",
    category: "wortschatz",
    question: "Welches Wort ist ein Synonym für 'Erlaubnis' (izin)?",
    promptIndo: "Kata mana yang merupakan sinonim dari 'die Erlaubnis'?",
    options: ["die Genehmigung", "das Verbot", "die Beschwerde", "die Pflicht"],
    correctAnswer: "die Genehmigung",
    explanation: "'Die Genehmigung' dan 'die Erlaubnis' sama-sama berarti persetujuan atau izin resmi. 'Das Verbot' adalah larangan.",
    ruleTip: "erlauben = genehmigen (mengizinkan); verbieten (melarang)."
  },
  {
    id: "easy-b-3",
    packet: "B",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel ist richtig für 'Möglichkeit' (kemungkinan)?",
    promptIndo: "Tentukan artikel untuk kata benda 'Möglichkeit'.",
    options: ["die", "der", "das", "dem"],
    correctAnswer: "die",
    explanation: "Kata dengan akhiran '-keit' selalu bergender feminin (die Möglichkeit, die Einsamkeit, die Sauberkeit).",
    ruleTip: "Akhiran -keit membentuk Nomen feminin dari Adjektiv."
  },
  {
    id: "easy-b-4",
    packet: "B",
    difficulty: "easy",
    category: "wortschatz",
    question: "Ergänzen Sie das Nomen-Verb-Gefüge: 'Ich möchte Ihnen Bescheid ___' (memberi kabar).",
    promptIndo: "Lengkapi kalimat: 'Ich möchte Ihnen Bescheid ___'.",
    options: ["sagen / geben", "nehmen", "warten", "bitten"],
    correctAnswer: "sagen / geben",
    explanation: "Ungkapan B1 'jemandem Bescheid sagen / geben' berarti memberi tahu / memberi konfirmasi kabar kepada seseorang.",
    ruleTip: "Bescheid geben/sagen = informieren."
  },
  {
    id: "easy-b-5",
    packet: "B",
    difficulty: "easy",
    category: "wortschatz",
    question: "Was bedeutet das Wort 'zuverlässig'?",
    promptIndo: "Apa arti dari sifat 'zuverlässig' yang sering muncul di surat lamaran kerja B1?",
    options: ["Dapat diandalkan / amanah", "Mudah tersinggung", "Suka bepergian", "Kurang berpengalaman"],
    correctAnswer: "Dapat diandalkan / amanah",
    explanation: "'Zuverlässig' menggambarkan orang atau sistem yang bisa dipercaya dan selalu menepati janji/jadwal (reliable).",
    ruleTip: "sich verlassen auf + Akk = mengandalkan seseorang."
  },

  // --- PAKET C (EASY: 11 - 15) ---
  {
    id: "easy-c-1",
    packet: "C",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel gehört zu 'Gehalt' (gaji bulanan)?",
    promptIndo: "Pilih artikel yang tepat untuk kata 'Gehalt' dalam arti gaji kotor/bersih.",
    options: ["das", "der", "die", "den"],
    correctAnswer: "das",
    explanation: "Untuk arti gaji/upah bulanan pegawai, katanya adalah 'das Gehalt' (plural: die Gehälter).",
    ruleTip: "das Monatsgehalt, das Einkommen, der Lohn (upah buruh)."
  },
  {
    id: "easy-c-2",
    packet: "C",
    difficulty: "easy",
    category: "wortschatz",
    question: "Was bedeutet 'herunterladen' im Computer- und Internetkontext?",
    promptIndo: "Apa arti kata kerja yang bisa dipisah 'herunterladen'?",
    options: ["Mengunduh (download)", "Mengunggah (upload)", "Menghapus file", "Mematikan layar"],
    correctAnswer: "Mengunduh (download)",
    explanation: "'Herunterladen' (atau 'downloaden') berarti mengunduh data dari internet ke perangkat lokal. Lawan katanya adalah 'hochladen' (upload).",
    ruleTip: "trennbares Verb: Ich lade die Datei herunter."
  },
  {
    id: "easy-c-3",
    packet: "C",
    difficulty: "easy",
    category: "artikel",
    question: "Welcher Artikel gehört zu 'Wissenschaft' (ilmu pengetahuan)?",
    promptIndo: "Perhatikan akhiran '-schaft'. Apa artikel kata ini?",
    options: ["die", "der", "das", "den"],
    correctAnswer: "die",
    explanation: "Semua kata berakhiran '-schaft' bergender feminin (die Wissenschaft, die Landschaft, die Freundschaft, die Mannschaft).",
    ruleTip: "Akhiran -schaft -> selalu die."
  },
  {
    id: "easy-c-4",
    packet: "C",
    difficulty: "easy",
    category: "wortschatz",
    question: "Welches Verb gehört zu: 'zur Verfügung ___' (tersedia / siap dipakai)?",
    promptIndo: "Lengkapi ungkapan: 'Die Dokumente stehen Ihnen zur Verfügung ___'.",
    options: ["stehen", "haben", "nehmen", "suchen"],
    correctAnswer: "stehen",
    explanation: "'Zur Verfügung stehen' berarti sesuatu tersedia untuk digunakan. Jika kita yang menyediakan untuk orang lain: 'zur Verfügung stellen'.",
    ruleTip: "etwas steht zur Verfügung = tersedia; jemandem etwas zur Verfügung stellen = menyediakan."
  },
  {
    id: "easy-c-5",
    packet: "C",
    difficulty: "easy",
    category: "wortschatz",
    question: "Was bedeutet die Abkürzung 'bzw.' in Texten?",
    promptIndo: "Singkatan 'bzw.' sering ditemukan di teks B1. Apa kepanjangannya?",
    options: ["beziehungsweise (atau / secara berturut-turut)", "besonders wichtig", "beispielsweise", "bezüglich"],
    correctAnswer: "beziehungsweise (atau / secara berturut-turut)",
    explanation: "'bzw.' adalah singkatan dari 'beziehungsweise', yang berarti 'atau lebih tepatnya' atau 'masing-masing'.",
    ruleTip: "z.B. = zum Beispiel, d.h. = das heißt, bzw. = beziehungsweise."
  },

  // ==========================================
  // LEVEL MEDIUM: B1 Grammatik & Konnektoren
  // ==========================================
  // --- PAKET A (MEDIUM: 1 - 5) ---
  {
    id: "med-a-1",
    packet: "A",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Er geht joggen, ___ es in Strömen regnet.'",
    promptIndo: "Pilih konjungsi konsesif yang menempatkan kata kerja di akhir klausa (Nebensatz).",
    options: ["obwohl", "trotzdem", "weil", "deshalb"],
    correctAnswer: "obwohl",
    explanation: "'Obwohl' (meskipun) adalah subordinating conjunction (Subjunktion) yang memicu anak kalimat (Nebensatz), sehingga kata kerja 'regnet' berada di posisi paling akhir.",
    ruleTip: "'Obwohl' + Nebensatz (Verb am Ende). 'Trotzdem' + Hauptsatz (Inversion: Trotzdem geht er joggen)."
  },
  {
    id: "med-a-2",
    packet: "A",
    difficulty: "medium",
    category: "praepositionen",
    question: "Welche Präposition und welcher Kasus? 'Er wartet seit einer Stunde ___ ___ Bus.'",
    promptIndo: "Kata kerja 'warten' berpasangan dengan preposisi apa dan kasus apa?",
    options: ["auf den (Akkusativ)", "auf dem (Dativ)", "an den (Akkusativ)", "für den (Akkusativ)"],
    correctAnswer: "auf den (Akkusativ)",
    explanation: "Feste Verbindung: 'warten auf + Akkusativ'. Karena 'der Bus' bergender maskulin, dalam Akkusativ berubah menjadi 'den Bus'.",
    ruleTip: "warten auf + Akk (Ich warte auf dich)."
  },
  {
    id: "med-a-3",
    packet: "A",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Er hatte starke Kopfschmerzen. ___, ging er zur Arbeit.'",
    promptIndo: "Pilih kata sambung antar-kalimat (Konjunktionaladverb) yang memicu inversi (kata kerja langsung setelahnya).",
    options: ["Trotzdem", "Obwohl", "Weil", "Dass"],
    correctAnswer: "Trotzdem",
    explanation: "'Trotzdem' menghubungkan dua kalimat utama (Hauptsatz). Struktur setelah 'Trotzdem' adalah kata kerja (Posisi 2): 'Trotzdem ging er zur Arbeit.'",
    ruleTip: "Trotzdem = meskipun begitu (Hauptsatz, Verb auf Position 2)."
  },
  {
    id: "med-a-4",
    packet: "A",
    difficulty: "medium",
    category: "praepositionen",
    question: "Ergänzen Sie: 'Wir freuen uns schon sehr ___ die bevorstehende Urlaubsreise.'",
    promptIndo: "Jika merasa gembira menyambut peristiwa di MASA DEPAN, preposisi apa yang digunakan untuk 'sich freuen'?",
    options: ["auf", "über", "an", "für"],
    correctAnswer: "auf",
    explanation: "'sich freuen auf + Akk' digunakan untuk menantikan sesuatu yang akan datang di masa depan. 'sich freuen über + Akk' digunakan untuk hal yang sedang terjadi atau sudah terjadi.",
    ruleTip: "Zukunft = auf + Akk; Gegenwart/Vergangenheit = über + Akk."
  },
  {
    id: "med-a-5",
    packet: "A",
    difficulty: "medium",
    category: "konnektoren",
    question: "Welcher Infinitivsatz passt? 'Sie lernt fleißig Deutsch, ___ in Deutschland zu studieren.'",
    promptIndo: "Ungkapan tujuan (Finalsatz) dengan subjek yang sama menggunakan konstruksi apa?",
    options: ["um", "ohne", "statt", "damit"],
    correctAnswer: "um",
    explanation: "'um... zu + Infinitiv' menyatakan tujuan (in order to). Karena subjek kedua kalimat sama ('sie'), kita menggunakan 'um... zu'.",
    ruleTip: "um ... zu + Infinitiv = bertujuan untuk; damit + Nebensatz (jika subjek berbeda)."
  },

  // --- PAKET B (MEDIUM: 6 - 10) ---
  {
    id: "med-b-1",
    packet: "B",
    difficulty: "medium",
    category: "praepositionen",
    question: "Ergänzen Sie: 'Viele Mitarbeiter nehmen gern ___ dem Sprachkurs teil.'",
    promptIndo: "Kata kerja 'teilnehmen' (berpartisipasi/ikut serta) menuntut preposisi dan kasus apa?",
    options: ["an (+ Dativ)", "in (+ Dativ)", "bei (+ Dativ)", "auf (+ Akkusativ)"],
    correctAnswer: "an (+ Dativ)",
    explanation: "Feste Verb-Präposition-Verbindung: 'teilnehmen an + Dativ'. Dem Kurs (der Kurs -> Dativ: dem Kurs).",
    ruleTip: "teilnehmen an + Dat = ikut serta dalam."
  },
  {
    id: "med-b-2",
    packet: "B",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: '___ Sie Fragen haben, rufen Sie mich bitte an.'",
    promptIndo: "Konnektor bersyarat (Konditionalsatz) yang bermakna 'seandainya/jika' selain 'wenn' adalah...",
    options: ["Falls", "Obwohl", "Weil", "Damit"],
    correctAnswer: "Falls",
    explanation: "'Falls' bersinonim dengan 'wenn' untuk mengindikasikan syarat/kondisi (Nebensatz, kata kerja 'haben' di akhir).",
    ruleTip: "falls = jikalau / in case."
  },
  {
    id: "med-b-3",
    packet: "B",
    difficulty: "medium",
    category: "praepositionen",
    question: "Welche Präposition passt zu 'sich interessieren'?",
    promptIndo: "Ich interessiere mich sehr ___ moderne Architektur.",
    options: ["für (+ Akkusativ)", "an (+ Dativ)", "über (+ Akkusativ)", "mit (+ Dativ)"],
    correctAnswer: "für (+ Akkusativ)",
    explanation: "'sich interessieren für + Akkusativ'. Bandingkan dengan 'interessiert sein an + Dativ'.",
    ruleTip: "sich interessieren für + Akk; Interesse haben an + Dat."
  },
  {
    id: "med-b-4",
    packet: "B",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Er ging aus dem Haus, ___ seinen Regenschirm mitzunehmen.'",
    promptIndo: "Menyatakan tindakan yang tidak dilakukan padahal lazimnya dilakukan (tanpa membawa payung).",
    options: ["ohne", "statt", "um", "außer"],
    correctAnswer: "ohne",
    explanation: "'ohne ... zu + Infinitiv' berarti 'tanpa melakukan...'. Dalam kalimat ini: 'ohne seinen Regenschirm mitzunehmen' (tanpa membawa payungnya).",
    ruleTip: "ohne...zu = tanpa; statt...zu = alih-alih."
  },
  {
    id: "med-b-5",
    packet: "B",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Man kann Energie sparen, ___ man das Licht beim Verlassen des Zimmers ausschaltet.'",
    promptIndo: "Konnektor yang menyatakan cara/metode (Modalsatz = dengan cara) adalah...",
    options: ["indem", "damit", "sodass", "obwohl"],
    correctAnswer: "indem",
    explanation: "'Indem' digunakan untuk menjawab pertanyaan 'Wie?' (dengan cara bagaimana?). Kata kerja berada di akhir anak kalimat.",
    ruleTip: "indem = dengan cara (cara/metode pencapaian tujuan)."
  },

  // --- PAKET C (MEDIUM: 11 - 15) ---
  {
    id: "med-c-1",
    packet: "C",
    difficulty: "medium",
    category: "praepositionen",
    question: "Ergänzen Sie: 'Ich bedanke mich herzlich bei Ihnen ___ Ihre großartige Unterstützung.'",
    promptIndo: "Kata kerja 'sich bedanken' berpasangan dengan: bei + Dat (orang) dan ___ + Akk (alasan terima kasih).",
    options: ["für", "über", "an", "um"],
    correctAnswer: "für",
    explanation: "Rumus lengkap: 'sich bedanken bei jemandem (Dat) für etwas (Akk)'. Contoh: Ich bedanke mich bei Ihnen für die Hilfe.",
    ruleTip: "danken / sich bedanken für + Akk."
  },
  {
    id: "med-c-2",
    packet: "C",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Der Zug hatte Verspätung, ___ verpasste sie das wichtige Vorstellungsgespräch.'",
    promptIndo: "Konnektor sebab-akibat (karena itu / oleh sebab itu) yang menempati posisi 1 di Hauptsatz kedua:",
    options: ["deshalb", "weil", "obwohl", "da"],
    correctAnswer: "deshalb",
    explanation: "'Deshalb' (atau 'deswegen/daher') adalah Konjunktionaladverb yang menunjukkan akibat dan memicu posisi kata kerja tepat setelahnya (Posisi 2: deshalb verpasste sie...).",
    ruleTip: "deshalb / deswegen / darum + Verb + Subjekt."
  },
  {
    id: "med-c-3",
    packet: "C",
    difficulty: "medium",
    category: "praepositionen",
    question: "Ergänzen Sie: 'Die Bürger protestieren lautstark ___ die geplante Steuererhöhung.'",
    promptIndo: "Kata kerja 'protestieren' (menentang/memprotes sesuatu) memakai preposisi apa?",
    options: ["gegen (+ Akkusativ)", "für (+ Akkusativ)", "über (+ Akkusativ)", "an (+ Dativ)"],
    correctAnswer: "gegen (+ Akkusativ)",
    explanation: "'Protestieren gegen + Akkusativ'. Lawan katanya adalah 'demonstrieren für + Akkusativ' (mendukung).",
    ruleTip: "protestieren gegen + Akk."
  },
  {
    id: "med-c-4",
    packet: "C",
    difficulty: "medium",
    category: "konnektoren",
    question: "Ergänzen Sie: 'Er kauft sich lieber ein altes Fahrrad, ___ ein teures Auto zu finanzieren.'",
    promptIndo: "Konnektor yang berarti 'alih-alih / daripada melakukan hal lain' adalah...",
    options: ["anstatt / statt", "ohne", "um", "während"],
    correctAnswer: "anstatt / statt",
    explanation: "'(an)statt ... zu + Infinitiv' menyatakan pilihan alternatif pengganti (alih-alih mencicil mobil mahal).",
    ruleTip: "statt ... zu + Infinitiv = alih-alih."
  },
  {
    id: "med-c-5",
    packet: "C",
    difficulty: "medium",
    category: "praepositionen",
    question: "Ergänzen Sie: 'Ich erinnere mich noch sehr genau ___ unseren ersten Schultag.'",
    promptIndo: "Kata kerja 'sich erinnern' (mengingat) membutuhkan preposisi dan kasus apa?",
    options: ["an (+ Akkusativ)", "auf (+ Akkusativ)", "über (+ Akkusativ)", "zu (+ Dativ)"],
    correctAnswer: "an (+ Akkusativ)",
    explanation: "'sich erinnern an + Akkusativ'. Unseren ersten Schultag (maskulin Akkusativ: den / unseren).",
    ruleTip: "sich erinnern an + Akk."
  },

  // ==========================================
  // LEVEL HARD: B1 Prüfungsfallen & Satzbau
  // ==========================================
  // --- PAKET A (HARD: 1 - 5) ---
  {
    id: "hard-a-1",
    packet: "A",
    difficulty: "hard",
    category: "satzbau",
    question: "Welcher Satz ist grammatikalisch VOLLKOMMEN KORREKT (Nebensatz am Anfang)?",
    promptIndo: "Perhatikan aturan: jika Nebensatz diletakkan di depan, maka Hauptsatz harus langsung dimulai dengan KATA KERJA (Komma + Verb).",
    options: [
      "Weil er krank war, blieb er den ganzen Tag im Bett.",
      "Weil er krank war, er blieb den ganzen Tag im Bett.",
      "Weil er war krank, blieb er den ganzen Tag im Bett.",
      "Weil er krank war, er im Bett blieb."
    ],
    correctAnswer: "Weil er krank war, blieb er den ganzen Tag im Bett.",
    explanation: "Aturan emas B1: Ketika Nebensatz berada di awal kalimat, seluruh klausa tersebut dihitung sebagai Posisi 1. Akibatnya, Hauptsatz wajib diawali dengan kata kerja di Posisi 2 ('blieb er...').",
    ruleTip: "Nebensatz am Satzanfang: [Nebensatz, Verb + Subjekt ...]."
  },
  {
    id: "hard-a-2",
    packet: "A",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Bilden Sie das Vorgangspassiv Präsens: 'Der Mechaniker repariert das Auto.'",
    promptIndo: "Ubah ke kalimat pasif (Vorgangspassiv) kala kini (Präsens).",
    options: [
      "Das Auto wird vom Mechaniker repariert.",
      "Das Auto ist vom Mechaniker repariert worden.",
      "Das Auto wurde vom Mechaniker repariert.",
      "Das Auto hat vom Mechaniker repariert."
    ],
    correctAnswer: "Das Auto wird vom Mechaniker repariert.",
    explanation: "Rumus Vorgangspassiv Präsens: werden (konjugasi) + Partizip II. Karena subjeknya 'das Auto' (tunggal), maka 'wird repariert'. Pelaku orang diawali 'von + Dativ' (vom Mechaniker).",
    ruleTip: "Passiv Präsens = werden + Partizip II."
  },
  {
    id: "hard-a-3",
    packet: "A",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Konjunktiv II (Wunsch / Höfliche Bitte): 'Wenn ich doch mehr Zeit ___!'",
    promptIndo: "Bentuk Konjunktiv II lampau/angan-angan untuk kata kerja 'haben' (ich) adalah...",
    options: ["hätte", "habe", "hatte", "würde haben"],
    correctAnswer: "hätte",
    explanation: "Untuk 'haben', bentuk Konjunktiv II yang baku dan alami di ujian B1 adalah 'hätte' (bukan 'würde haben'). Untuk 'sein' adalah 'wäre'.",
    ruleTip: "haben -> hätte; sein -> wäre; werden -> würde."
  },
  {
    id: "hard-a-4",
    packet: "A",
    difficulty: "hard",
    category: "praepositionen",
    question: "Relativsatz mit Präposition: 'Das ist der Kollege, ___ ___ ich gestern gesprochen habe.'",
    promptIndo: "Preposisi: sprechen mit + Dativ. Kollege = der Kollege. Bentuk Dativ maskulin pada Relativpronomen adalah...",
    options: ["mit dem", "mit den", "mit dessen", "über den"],
    correctAnswer: "mit dem",
    explanation: "Kata kerja 'sprechen mit' membutuhkan Dativ. 'Der Kollege' adalah maskulin, maka Relativpronomen dalam Dativ maskulin adalah 'dem'. Sehingga menjadi 'mit dem'.",
    ruleTip: "Relativpronomen Dativ: dem (mask/neutr), der (fem), denen (plur)."
  },
  {
    id: "hard-a-5",
    packet: "A",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Passiv im Präteritum: 'Die Brücke ___ im Jahr 1995 ___.'",
    promptIndo: "Lengkapi kalimat pasif bentuk lampau (Präteritum Passiv):",
    options: [
      "wurde ... gebaut",
      "wird ... gebaut",
      "ist ... gebaut worden",
      "war ... gebaut"
    ],
    correctAnswer: "wurde ... gebaut",
    explanation: "Rumus Passiv Präteritum adalah 'wurde / wurden + Partizip II'. Karena 'die Brücke' tunggal, bentuk yang tepat adalah 'wurde gebaut'.",
    ruleTip: "Präteritum Passiv = wurde / wurden + Partizip II."
  },

  // --- PAKET B (HARD: 6 - 10) ---
  {
    id: "hard-b-1",
    packet: "B",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Höfliche Bitte mit Konjunktiv II: '___ Sie mir bitte das Salz reichen?'",
    promptIndo: "Bentuk sopan formal menggunakan kata kerja bantu Konjunktiv II:",
    options: ["Könnten / Würden", "Können", "Werden", "Sollten"],
    correctAnswer: "Könnten / Würden",
    explanation: "'Könnten Sie...' atau 'Würden Sie...' adalah ekspresi kesopanan standar tingkat B1 saat meminta bantuan secara santun.",
    ruleTip: "Höflichkeit: Könnten Sie bitte...? / Würden Sie bitte...?"
  },
  {
    id: "hard-b-2",
    packet: "B",
    difficulty: "hard",
    category: "satzbau",
    question: "Welcher Satz mit 'obwohl' und 'Relativsatz' ist grammatikalisch fehlerfrei?",
    promptIndo: "Perhatikan peletakan kata kerja pada anak kalimat majemuk:",
    options: [
      "Obwohl er den Mann, der neben ihm wohnte, kaum kannte, half er ihm sofort.",
      "Obwohl er den Mann kaum kannte, der neben ihm wohnte, er half ihm sofort.",
      "Obwohl er kannte den Mann kaum, der neben ihm wohnte, half er ihm sofort.",
      "Obwohl er den Mann kaum kannte der neben ihm wohnte half er sofort ihm."
    ],
    correctAnswer: "Obwohl er den Mann, der neben ihm wohnte, kaum kannte, half er ihm sofort.",
    explanation: "Dalam anak kalimat 'obwohl', kata kerja 'kannte' berada di ujung. Di sela-sela terdapat Relativsatz 'der neben ihm wohnte'. Setelah tanda koma pemisah klausa utama, langsung diikuti kata kerja 'half er ihm'.",
    ruleTip: "Perhatikan koma dan letak verba dalam Verschachtelte Sätze."
  },
  {
    id: "hard-b-3",
    packet: "B",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Passiv mit Modalverb im Präsens: 'Die Rechnung ___ sofort ___.'",
    promptIndo: "Rumus Pasif dengan Modalverb di posisi kalimat utama: Modalverb + Partizip II + werden.",
    options: [
      "muss ... bezahlt werden",
      "wird ... bezahlt müssen",
      "ist ... bezahlt zu werden",
      "muss ... bezahlen werden"
    ],
    correctAnswer: "muss ... bezahlt werden",
    explanation: "Rumus: [Modalverb konjugiert] + ... + [Partizip II] + [werden im Infinitiv]. Contoh: Die Rechnung muss sofort bezahlt werden.",
    ruleTip: "Passiv mit Modalverb: Modalverb + Partizip II + werden."
  },
  {
    id: "hard-b-4",
    packet: "B",
    difficulty: "hard",
    category: "praepositionen",
    question: "Relativsatz im Genitiv: 'Frau Müller, ___ Sohn Medizin studiert, ist unsere neue Nachbarin.'",
    promptIndo: "Anak kalimat relatif penunjuk kepemilikan (Genitiv feminin): 'anak laki-lakinya Bu Müller...'",
    options: ["deren", "dessen", "denen", "die"],
    correctAnswer: "deren",
    explanation: "Kata benda yang dirujuk adalah 'Frau Müller' (feminin). Bentuk kepemilikan Genitiv Relativpronomen untuk feminin adalah 'deren' (sedangkan maskulin/netral adalah 'dessen').",
    ruleTip: "Genitiv Relativpronomen: dessen (mask/neutr), deren (fem/plur)."
  },
  {
    id: "hard-b-5",
    packet: "B",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Irrealer Bedingungssatz (Vergangenheit): 'Wenn ich das gewusst ___, ___ ich dir geholfen.'",
    promptIndo: "Pengandaian peristiwa di masa lampau yang tidak terwujud (hätte/wäre + Partizip II):",
    options: [
      "hätte ... hätte",
      "hätte ... würde",
      "wäre ... hätte",
      "habe ... werde"
    ],
    correctAnswer: "hätte ... hätte",
    explanation: "Pengandaian lampau: 'Wenn ich das gewusst hätte, hätte ich dir geholfen' (Seandainya dulu aku tahu, aku pasti sudah membantumu).",
    ruleTip: "Irrealer Konditionalsatz der Vergangenheit = hätte/wäre + Partizip II."
  },

  // --- PAKET C (HARD: 11 - 15) ---
  {
    id: "hard-c-1",
    packet: "C",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Passiv Perfekt: 'Das alte Rathaus ___ vor kurzem komplett ___.'",
    promptIndo: "Rumus Pasif kala Perfekt: sein (ist/sind) + Partizip II + worden.",
    options: [
      "ist ... renoviert worden",
      "wurde ... renoviert geworden",
      "hat ... renoviert worden",
      "ist ... renoviert geworden"
    ],
    correctAnswer: "ist ... renoviert worden",
    explanation: "Dalam Pasif Perfekt, kata bantu yang dipakai selalu 'sein' dan bentuk ketiga dari 'werden' adalah 'worden' (tanpa awalan ge-). Jadi: 'ist renoviert worden'.",
    ruleTip: "Perfekt Passiv = sein + Partizip II + worden (bukan geworden!)."
  },
  {
    id: "hard-c-2",
    packet: "C",
    difficulty: "hard",
    category: "satzbau",
    question: "Zweiteilige Konnektoren: 'Er spricht ___ fließend Deutsch, ___ er hat auch sehr gute Französischkenntnisse.'",
    promptIndo: "Pasangan konnektor berpasangan: tidak hanya... tetapi juga...",
    options: [
      "nicht nur ... sondern",
      "entweder ... oder",
      "weder ... noch",
      "sowohl ... als auch"
    ],
    correctAnswer: "nicht nur ... sondern",
    explanation: "'nicht nur ... sondern (auch)' berarti 'tidak hanya ... melainkan juga'. Catatan: 'sondern' menghubungkan dua klausa yang bertentangan atau menambahkan penguatan.",
    ruleTip: "nicht nur ..., sondern auch = bukan hanya ..., melainkan juga."
  },
  {
    id: "hard-c-3",
    packet: "C",
    difficulty: "hard",
    category: "passiv_konjunktiv",
    question: "Ratschlag im Konjunktiv II: 'An deiner Stelle ___ ich mich sofort bei der Universität bewerben.'",
    promptIndo: "Memberikan nasihat: 'Jika aku jadi kamu, aku akan...'",
    options: ["würde", "werde", "wollte", "sollte"],
    correctAnswer: "würde",
    explanation: "Frasa standar B1 untuk memberi nasihat: 'An deiner Stelle würde ich...' (Di posisimu, aku akan...).",
    ruleTip: "Ratschlag geben: An deiner Stelle würde ich... / Du solltest..."
  },
  {
    id: "hard-c-4",
    packet: "C",
    difficulty: "hard",
    category: "praepositionen",
    question: "Relativsatz mit Dativ Plural: 'Die Freunde, ___ ___ wir am Wochenende verreist sind, wohnen in Hamburg.'",
    promptIndo: "Preposisi: verreisen mit + Dativ. Antecedens: Die Freunde (Plural). Dativ Plural Relativpronomen adalah...",
    options: ["mit denen", "mit dem", "mit der", "mit die"],
    correctAnswer: "mit denen",
    explanation: "Relativpronomen untuk jamak (Plural) dalam kasus Dativ adalah 'denen'. Jadi: 'mit denen' (dengan siapa kami bepergian).",
    ruleTip: "Relativpronomen Dativ Plural selalu 'denen'."
  },
  {
    id: "hard-c-5",
    packet: "C",
    difficulty: "hard",
    category: "satzbau",
    question: "Welche Satzstellung ist nach dem zweiteiligen Konnektor 'je ... desto' KORREKT?",
    promptIndo: "'Je' memicu Nebensatz (kata kerja di akhir), sedangkan 'desto/umso' memicu Komparativ + kata kerja langsung (Inversion).",
    options: [
      "Je mehr man lernt, desto sicherer fühlt man sich in der Prüfung.",
      "Je man mehr lernt, desto man fühlt sich sicherer.",
      "Je mehr man lernt, desto man sich sicherer fühlt.",
      "Je man lernt mehr, desto sicherer man fühlt sich."
    ],
    correctAnswer: "Je mehr man lernt, desto sicherer fühlt man sich in der Prüfung.",
    explanation: "Aturan: 'Je' + Komparativ + Subjekt + ... + Verb am Ende, 'desto/umso' + Komparativ + Verb + Subjekt (contoh: Je mehr man übt, desto besser wird man).",
    ruleTip: "Je + [Komparativ] ... [Verb am Ende], desto + [Komparativ] + [Verb] + [Subjekt]."
  }
];
