# GoetheMeister B1 Studio (GMB1)

**GoetheMeister B1 Studio** adalah platform persiapan dan simulator ujian resmi **Goethe-Zertifikat B1** modern berbasis Next.js (App Router), Tailwind CSS, dan TypeScript yang siap di-deploy langsung ke Vercel tanpa database eksternal (100% Client-Side LocalStorage dengan Auto-Save & State Persistence).

---

## 🚀 Fitur Unggulan

1. **Dashboard Kesiapan Goethe B1:**
   - Ringkasan 4 Modul Ujian: **Lesen**, **Hören**, **Schreiben**, dan **Sprechen**.
   - Indikator kelulusan standar resmi: **Minimal 60 / 100 Poin (60%) = BESTANDEN**.
   - Pemilih Paket Soal Aktif: Paket A (Utama), Paket B (Cadangan 1), Paket C (Cadangan 2), Mode Acak (Shuffle Pool), dan Bank Kustom.
   - Pelacak Streak Harian, Akumulasi XP, dan Akurasi Jawaban.

2. **Game Arena Bahasa Jerman B1 (3 Tingkat Kesulitan):**
   - **Level EASY:** Wortschatz & Artikel (*der/die/das*), pasangan kata kerja B1.
   - **Level MEDIUM:** Grammatik & Konnektoren (*obwohl*, *trotzdem*, *weil*, *deshalb*, *falls*, *indem*, *statt...zu*, *um...zu*), Verben mit Präpositionen.
   - **Level HARD:** Prüfungsfallen & Satzbau (Nebensatz di awal kalimat, posisi kata kerja, Vorgangspassiv, Konjunktiv II, Relativsätze).
   - Mode 3 Nyawa (Hearts) atau Zen Mode (tanpa batas nyawa), timer 25 detik per soal, dan pembahasan instan Bahasa Indonesia.

3. **Simulasi Lesen (Membaca):**
   - Mode Real Exam (Timer 65 menit) dan Study Mode (latihan santai).
   - Antarmuka Split-Screen di desktop & Tab Toggle ("Baca Teks" ↔ "Jawab Soal") di mobile.
   - Fitur Tandai Ragu-ragu (Flag), konversi skor ke 100 poin, pembahasan, dan kutipan bukti teks (*evidence quotes*).
   - Teks bacaan interaktif: ketuk kata penting untuk melihat terjemahan dan simpan ke kamus pribadi.

4. **Simulasi Hören (Smart German Audio Player):**
   - Didukung oleh mesin **Web Speech API (`de-DE`)** tahan banting (*bulletproof speech player*) dengan mekanisme *sentence chunking* & *heartbeat* anti-jeda.
   - Kecepatan bicara fleksibel (0.85x, 1.0x, 1.1x).
   - Pembatasan putar audio resmi (1x atau 2x sesuai Teil) dan transkrip interaktif yang dapat dibuka setelah submit.

5. **Simulasi Schreiben (Menulis):**
   - Timer 60 menit dengan 3 Aufgabe resmi Goethe B1.
   - *Live Word Counter* dengan target dinamis (Aufgabe 1 & 2: ~80 kata; Aufgabe 3: ~40 kata).
   - Smart Live Evaluator: deteksi otomatis variasi konnektor B1 (min. 3 jenis), format sapaan dan penutup.
   - Perbandingan berdampingan (*side-by-side*) dengan *Musterlösung* skor 100.

6. **Simulasi Sprechen (Berbicara):**
   - Dual Timer: Persiapan 15 Menit & Timer Bicara.
   - Teil 1 (Gemeinsam planen) dengan Simulasi Dialog Partner Virtual bersuara asli Jerman.
   - Teil 2 (Präsentation) dengan panduan 5 Folien standar dan skrip *Muster-Vortrag*.
   - Voice Recording Studio (`MediaRecorder` API) dengan animasi gelombang suara (*waveform*) dan tombol unduh rekaman `.webm`.

7. **Meine Vokabeln (Kamus Kosakata Pribadi):**
   - Simpan kata-kata penting langsung dari bacaan dan audio.
   - Pelafalan suara instan, pencarian kata, filter status hafalan, dan mode latihan Flashcard.

8. **Fehlerbuch (Bank Kesalahan & Spaced Repetition):**
   - Mengumpulkan seluruh jawaban salah dari Game Mode, Lesen, dan Hören.
   - Mode Latih Ulang: menjawab benar 2 kali berturut-turut mengubah status menjadi *Mastered*.

9. **Report Card & Digitales Zertifikat B1:**
   - Lembar hasil ujian resmi dengan rincian 4 modul, predikat kelulusan (*Sehr gut, Gut, Befriedigend, Ausreichend, Nicht bestanden*), dan tombol Cetak / Simpan PDF (*print-ready*).

10. **JSON Manager & Backup Data:**
    - Tambah soal cadangan mandiri dengan JSON Injector.
    - 1-Klik Impor Paket Cadangan Ekstra (Paket D).
    - Backup & Restore seluruh progres belajar via file `.json`.

---

## 🛠️ Menjalankan Proyek Secara Lokal

```bash
# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Uji kompilasi build produksi
npm run build
```

Buka peramban di `http://localhost:3000`.
