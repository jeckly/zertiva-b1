"use client";

import React, { useState } from "react";
import { UserStats } from "@/types";
import {
  importCustomQuestions,
  exportAllData,
  importAllData,
  getCustomGameQuestions,
} from "@/lib/storage";
import {
  FileJson,
  Upload,
  Download,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Database,
  PlusCircle,
} from "lucide-react";

interface JsonManagerViewProps {
  stats: UserStats;
  onRefresh: () => void;
}

const SAMPLE_JSON_TEMPLATE = `{
  "questions": [
    {
      "id": "custom-easy-1",
      "packet": "C",
      "difficulty": "easy",
      "category": "artikel",
      "question": "Welcher Artikel passt zu 'Erfahrung'?",
      "promptIndo": "Kata berakhiran '-ung' selalu bergender...",
      "options": ["die", "der", "das", "den"],
      "correctAnswer": "die",
      "explanation": "Kata dengan akhiran -ung selalu feminin (die).",
      "ruleTip": "die Erfahrung, die Ausbildung."
    }
  ]
}`;

export const JsonManagerView: React.FC<JsonManagerViewProps> = ({
  stats,
  onRefresh,
}) => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [customQuestionsCount, setCustomQuestionsCount] = useState<number>(() => {
    return getCustomGameQuestions().length;
  });

  const handleCopyTemplate = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(SAMPLE_JSON_TEMPLATE);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  const handleImportJsonQuestions = () => {
    setMessage(null);
    if (!jsonInput.trim()) {
      setMessage({ type: "error", text: "Silakan tempel (paste) kode JSON terlebih dahulu." });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const list = Array.isArray(parsed) ? parsed : parsed.questions;

      if (!Array.isArray(list) || list.length === 0) {
        setMessage({
          type: "error",
          text: "Format JSON tidak valid: Harus berupa array objek soal atau objek dengan properti 'questions'.",
        });
        return;
      }

      const count = importCustomQuestions(list);
      setCustomQuestionsCount(getCustomGameQuestions().length);
      setMessage({
        type: "success",
        text: `Berhasil menambahkan ${count} butir soal baru ke Bank Soal Kustom LocalStorage!`,
      });
      setJsonInput("");
      onRefresh();
    } catch {
      setMessage({
        type: "error",
        text: "Gagal memproses JSON: Pastikan sintaks kurung kurawal, tanda petik dua, dan koma sudah benar.",
      });
    }
  };

  // Quick 1-click import bonus pack from public/bank-soal-cadangan-b1.json
  const handleImportBonusPack = async () => {
    setMessage(null);
    try {
      const res = await fetch("/bank-soal-cadangan-b1.json");
      if (!res.ok) throw new Error("Gagal mengunduh file cadangan");
      const data = await res.json();
      const count = importCustomQuestions(data.questions);
      setCustomQuestionsCount(getCustomGameQuestions().length);
      setMessage({
        type: "success",
        text: `Berhasil mengimpor Paket Cadangan Ekstra (Paket D) sejumlah ${count} soal baru!`,
      });
      onRefresh();
    } catch {
      setMessage({
        type: "error",
        text: "Gagal mengimpor file bonus. Pastikan file /bank-soal-cadangan-b1.json tersedia di folder public.",
      });
    }
  };

  // Export full backup
  const handleExportBackup = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zertiva-b1-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import full backup file
  const handleFileBackupUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importAllData(content);
        if (ok) {
          setMessage({
            type: "success",
            text: "Seluruh progres belajar, streak, skor, dan bank soal kustom berhasil dipulihkan!",
          });
          setCustomQuestionsCount(getCustomGameQuestions().length);
          onRefresh();
        } else {
          setMessage({
            type: "error",
            text: "Gagal memulihkan file backup: Format data tidak sesuai.",
          });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600">
              <FileJson className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              JSON Manager & Backup Data
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Kelola bank soal cadangan mandiri dan ekspor/impor seluruh progres latihan Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          <Database className="w-4 h-4 text-indigo-500" />
          <span>{customQuestionsCount} Soal Kustom Tersimpan</span>
        </div>
      </div>

      {/* Message alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-fade-in ${
            message.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Quick 1-Click Import Bonus Pack */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-zinc-900 text-white border border-indigo-700/50 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">
              Paket Cadangan Ekstra B1 (Bonus Pack Bawaan)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleImportBonusPack}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Impor Paket Cadangan Sekarang</span>
          </button>
        </div>
        <p className="text-xs text-indigo-200 leading-relaxed">
          Kami telah menyertakan 1 paket file JSON bank soal tambahan (Wortschatz, Konnektoren, Passiv & Konjunktiv II) yang langsung siap dimasukkan ke dalam LocalStorage hanya dengan sekali klik!
        </p>
      </div>

      {/* Custom Question Injector (Paste JSON) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-indigo-500" />
              Tambah Soal Sendiri (JSON Injector)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Tempelkan (paste) array JSON soal kustom Anda di bawah ini:
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyTemplate}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
          >
            {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTemplate ? "Template Disalin!" : "Salin Format Template JSON"}</span>
          </button>
        </div>

        <textarea
          rows={6}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`Tempelkan JSON di sini, contoh:\n${SAMPLE_JSON_TEMPLATE}`}
          className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 font-mono text-xs text-zinc-900 dark:text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleImportJsonQuestions}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            Simpan Soal ke Bank Cadangan LocalStorage
          </button>
        </div>
      </div>

      {/* Full Backup Export & Import */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Export Data */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Export Progres Belajar</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Unduh seluruh streak harian, skor simulasi Goethe, data Fehlerbuch, dan soal kustom ke dalam file <code>.json</code>.
          </p>
          <button
            type="button"
            onClick={handleExportBackup}
            className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File Cadangan (.json)</span>
          </button>
        </div>

        {/* Import Backup */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
            <Upload className="w-4 h-4 text-indigo-500" />
            <span>Pulihkan Progres dari File</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pilih file backup <code>.json</code> yang pernah Anda unduh untuk melanjutkan belajar di perangkat atau browser baru.
          </p>
          <label className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Pilih File Backup (.json)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileBackupUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
