export interface DictionaryEntry {
  german: string;
  indonesian: string;
  article?: "der" | "die" | "das";
  contextTip?: string;
}

export const b1Dictionary: DictionaryEntry[] = [
  // A
  { german: "Abitur", article: "das", indonesian: "ujian akhir kelulusan SMA di Jerman", contextTip: "das Abitur machen = menempuh ujian SMA" },
  { german: "Abschluss", article: "der", indonesian: "kelulusan / penutupan", contextTip: "der Studienabschluss = gelar sarjana" },
  { german: "Anmeldung", article: "die", indonesian: "pendaftaran / registrasi", contextTip: "sich anmelden für = mendaftar" },
  { german: "Anzeige", article: "die", indonesian: "iklan / pengumuman", contextTip: "eine Anzeige aufgeben = memasang iklan" },
  { german: "Arbeitskleidung", article: "die", indonesian: "pakaian kerja seragam" },
  { german: "Aufenthalt", article: "der", indonesian: "masa tinggal / persinggahan" },
  { german: "Aufforstung", article: "die", indonesian: "penghijauan / reboisasi hutan" },
  { german: "Ausrüstung", article: "die", indonesian: "peralatan / perlengkapan" },
  { german: "Außengastronomie", article: "die", indonesian: "kafe/restoran area luar ruangan" },

  // B
  { german: "Bedarf", article: "der", indonesian: "kebutuhan / keperluan", contextTip: "Hilfebedarf = butuh bantuan" },
  { german: "Befürchtung", article: "die", indonesian: "kekhawatiran / kecemasan" },
  { german: "Begründung", article: "die", indonesian: "alasan / argumentasi pendukung" },
  { german: "Benutzerordnung", article: "die", indonesian: "tata tertib penggunaan" },
  { german: "Berufstätige", article: "der", indonesian: "orang yang bekerja / profesional" },
  { german: "Bescheid", article: "der", indonesian: "kabar / keputusan resmi", contextTip: "Bescheid sagen = memberi kabar" },
  { german: "Beschwerde", article: "die", indonesian: "keluhan / komplain resmi" },
  { german: "Bestätigung", article: "die", indonesian: "surat konfirmasi / penegasan" },
  { german: "Bewerbung", article: "die", indonesian: "surat lamaran kerja", contextTip: "sich bewerben um = melamar" },
  { german: "Bordkarte", article: "die", indonesian: "boarding pass pesawat" },
  { german: "Brandschutz", article: "der", indonesian: "pencegahan bahaya kebakaran" },

  // C - D
  { german: "Carsharing", article: "das", indonesian: "layanan peminjaman mobil bersama" },
  { german: "Dauerausstellung", article: "die", indonesian: "pameran permanen di museum" },
  { german: "Deponieren", indonesian: "menitipkan / menyimpan barang" },
  { german: "Durchsage", article: "die", indonesian: "pengumuman suara melalui speaker" },

  // E
  { german: "Einkaufserfahrung", article: "die", indonesian: "pengalaman berbelanja" },
  { german: "Einweihungsparty", article: "die", indonesian: "pesta syukuran rumah baru (housewarming)" },
  { german: "Einzelhandel", article: "der", indonesian: "perdagangan eceran / toko ritel" },
  { german: "Entscheidung", article: "die", indonesian: "keputusan", contextTip: "eine Entscheidung treffen = memutuskan" },
  { german: "Entschuldigung", article: "die", indonesian: "permohonan maaf" },
  { german: "Erfahrung", article: "die", indonesian: "pengalaman hidup / kerja" },
  { german: "Ergebnis", article: "das", indonesian: "hasil / kesimpulan" },
  { german: "Erlaubnis", article: "die", indonesian: "izin resmi", contextTip: "die Genehmigung" },
  { german: "Ernährung", article: "die", indonesian: "pola makan / gizi nutrisi" },
  { german: "Ersatzteil", article: "das", indonesian: "suku cadang / spare part" },

  // F
  { german: "Fahrradständer", article: "der", indonesian: "rak parkir sepeda" },
  { german: "Fehlerbuch", article: "das", indonesian: "buku catatan / bank evaluasi kesalahan" },
  { german: "Flexitarier", article: "der", indonesian: "orang yang membatasi konsumsi daging" },
  { german: "Forsthaus", article: "das", indonesian: "rumah penjaga hutan" },
  { german: "Freiwilliges", article: "das", indonesian: "kegiatan sukarela / kerelawanan", contextTip: "FSJ = Freiwilliges Soziales Jahr" },
  { german: "Fußgängerzone", article: "die", indonesian: "area khusus pejalan kaki (bebas kendaraan)" },

  // G
  { german: "Gastronomie", article: "die", indonesian: "usaha restoran & kuliner" },
  { german: "Gehalt", article: "das", indonesian: "gaji bulanan pegawai" },
  { german: "Genehmigung", article: "die", indonesian: "persetujuan / izin resmi" },
  { german: "Gleichgewicht", article: "das", indonesian: "keseimbangan tubuh" },
  { german: "Gutschein", article: "der", indonesian: "kupon voucher belanja" },

  // H
  { german: "Hallenbad", article: "das", indonesian: "kolam renang dalam ruangan (indoor)" },
  { german: "Hausordnung", article: "die", indonesian: "tata tertib apartemen / gedung" },
  { german: "Heimatland", article: "das", indonesian: "tanah air / negara asal" },
  { german: "Heizungsausfall", article: "der", indonesian: "kerusakan sistem pemanas ruangan" },
  { german: "Herunterladen", indonesian: "mengunduh (download)", contextTip: "Gegenteil: hochladen (unggah)" },
  { german: "Homeoffice", article: "das", indonesian: "bekerja dari rumah (telework)" },
  { german: "Hülsenfrüchte", article: "die", indonesian: "kacang-kacangan nabati" },

  // I - K
  { german: "Informatik", article: "die", indonesian: "ilmu teknik informatika / IT" },
  { german: "Innenstadt", article: "die", indonesian: "pusat kota / kota madya" },
  { german: "Klimaschutz", article: "der", indonesian: "perlindungan iklim bumi" },
  { german: "Knotenkunde", article: "die", indonesian: "ilmu mengikat simpul tali (panjat tebing)" },
  { german: "Kompetent", indonesian: "cakap, ahli, dan berpengalaman" },
  { german: "Konnektoren", article: "die", indonesian: "kata sambung penghubung kalimat" },
  { german: "Kündigen", indonesian: "mengundurkan diri / memutus kontrak kerja", contextTip: "die Kündigung = surat resign" },

  // L - M
  { german: "Leihfrist", article: "die", indonesian: "batas waktu peminjaman buku/DVD" },
  { german: "Leserbrief", article: "der", indonesian: "surat tanggapan pembaca di koran/forum" },
  { german: "Mängelanzeige", article: "die", indonesian: "laporan kerusakan pada properti sewa" },
  { german: "Mikromobilität", article: "die", indonesian: "transportasi jarak pendek (skuter, sepeda)" },
  { german: "Mitbewohner", article: "der", indonesian: "teman sekamar / teman satu flat (WG)" },
  { german: "Monteurzimmer", article: "das", indonesian: "kamar sewa jangka pendek untuk pekerja" },
  { german: "Musterlösung", article: "die", indonesian: "contoh jawaban ideal / sempurna (skor 100)" },

  // N - P
  { german: "Nachhaltigkeit", article: "die", indonesian: "keberlanjutan lingkungan hidup" },
  { german: "Nachtruhe", article: "die", indonesian: "jam istirahat malam yang tenang (22:00-07:00)" },
  { german: "Nationalpark", article: "der", indonesian: "taman nasional cagar alam" },
  { german: "Pauschal", indonesian: "secara borongan / menyeluruh tanpa pengecualian" },
  { german: "Praktikum", article: "das", indonesian: "program magang kerja mahasiswa" },
  { german: "Prüfungsfalle", article: "die", indonesian: "jebakan soal dalam ujian resmi" },
  { german: "Pünktlich", indonesian: "tepat waktu / disiplin jadwal" },

  // R - S
  { german: "Ratschlag", article: "der", indonesian: "nasihat / anjuran", contextTip: "einen Ratschlag geben" },
  { german: "Redemittel", article: "das", indonesian: "kumpulan frasa standar bahasa Jerman" },
  { german: "Ruhezeit", article: "die", indonesian: "waktu hening/istirahat bebas kebisingan" },
  { german: "Schlafwagen", article: "der", indonesian: "gerbong kereta api berpemberat tempat tidur" },
  { german: "Schließfach", article: "das", indonesian: "loker penitipan barang terkunci" },
  { german: "Sinneswandel", article: "der", indonesian: "perubahan cara pandang / pola pikir" },
  { german: "Spontane", indonesian: "tanpa rencana / berlangsung seketika" },
  { german: "Sprachkenntnisse", article: "die", indonesian: "kemahiran berbahasa" },

  // T - Z
  { german: "Teilnahme", article: "die", indonesian: "keikutsertaan / partisipasi", contextTip: "teilnehmen an + Dat" },
  { german: "Trinkgeld", article: "das", indonesian: "uang tip untuk pelayan restoran" },
  { german: "Umleitung", article: "die", indonesian: "jalur jalan pengalihan karena macet/proyek" },
  { german: "Umstellung", article: "die", indonesian: "proses adaptasi / penyesuaian baru" },
  { german: "Umweltschutz", article: "der", indonesian: "pelestarian lingkungan hidup" },
  { german: "Unbezahlbar", indonesian: "tak ternilai harganya (sangat berharga)" },
  { german: "Unterkunft", article: "die", indonesian: "tempat menginap / akomodasi" },
  { german: "Verantwortung", article: "die", indonesian: "tanggung jawab moral / kerja" },
  { german: "Verkehrsfunk", article: "der", indonesian: "siaran radio informasi lalu lintas" },
  { german: "Verlängerung", article: "die", indonesian: "perpanjangan masa berlaku pinjaman" },
  { german: "Verzögerung", article: "die", indonesian: "penundaan / keterlambatan jadwal" },
  { german: "Vollkornprodukt", article: "das", indonesian: "produk makanan gandum utuh sehat" },
  { german: "Vormerkung", article: "die", indonesian: "antrean reservasi peminjaman buku" },
  { german: "Voraussetzung", article: "die", indonesian: "prasyarat wajib yang harus dipenuhi" },
  { german: "Wiederaufforstung", article: "die", indonesian: "reboisasi penanaman kembali pohon" },
  { german: "Wissenschaft", article: "die", indonesian: "ilmu pengetahuan sains" },
  { german: "Zimmerlautstärke", article: "die", indonesian: "tingkat volume suara di dalam kamar" },
  { german: "Zuverlässig", indonesian: "dapat dipercaya / amanah (reliable)" },
];

export const findB1Word = (word: string): DictionaryEntry | undefined => {
  const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, "").trim();
  if (!clean || clean.length < 3) return undefined;

  const lowerClean = clean.toLowerCase();

  // 1. Exact match (case-insensitive)
  const exact = b1Dictionary.find(
    (entry) => entry.german.toLowerCase() === lowerClean
  );
  if (exact) return exact;

  // 2. Inflected forms (plurals, case endings, e.g. "Erfahrungen" -> "Erfahrung", "Abiturs" -> "Abitur")
  // Only match if the dictionary root is at least 4 characters and the word starts with that root
  return b1Dictionary.find((entry) => {
    const entryLower = entry.german.toLowerCase();
    return entryLower.length >= 4 && lowerClean.startsWith(entryLower);
  });
};
