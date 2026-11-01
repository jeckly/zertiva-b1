"use client";

import React, { useState, useEffect } from "react";
import { FehlerItem, ExamResultRecord } from "@/types";
import {
  getFehlerbuch,
  recordFehlerPracticeAnswer,
  clearMasteredFehler,
  getExamHistory,
} from "@/lib/storage";
import {
  AlertOctagon,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  TrendingUp,
  XCircle,
  Filter,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export const FehlerbuchView: React.FC = () => {
  const [items, setItems] = useState<FehlerItem[]>([]);
  const [history, setHistory] = useState<ExamResultRecord[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "active" | "mastered">("active");

  // Re-practice modal / quiz state
  const [practiceActive, setPracticeActive] = useState<boolean>(false);
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [userPracticeAns, setUserPracticeAns] = useState<string>("");
  const [practiceFeedback, setPracticeFeedback] = useState<boolean | null>(null);

  const loadData = () => {
    setItems(getFehlerbuch());
    setHistory(getExamHistory());
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeErrors = items.filter((i) => !i.mastered);
  const masteredErrors = items.filter((i) => i.mastered);

  const displayedItems =
    filterMode === "active"
      ? activeErrors
      : filterMode === "mastered"
      ? masteredErrors
      : items;

  // Start Practice
  const handleStartPractice = () => {
    if (activeErrors.length === 0) return;
    setPracticeIndex(0);
    setUserPracticeAns("");
    setPracticeFeedback(null);
    setPracticeActive(true);
  };

  const currentPracticeItem = activeErrors[practiceIndex];

  const handlePracticeSubmit = () => {
    if (!currentPracticeItem || !userPracticeAns.trim()) return;

    const isMatch =
      userPracticeAns.trim().toLowerCase() === currentPracticeItem.correctAnswer.trim().toLowerCase();

    const updated = recordFehlerPracticeAnswer(currentPracticeItem.id, isMatch);
    setItems(updated);
    setPracticeFeedback(isMatch);

    if (isMatch && typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleNextPracticeItem = () => {
    setUserPracticeAns("");
    setPracticeFeedback(null);
    if (practiceIndex + 1 < activeErrors.length) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      setPracticeActive(false);
      loadData();
    }
  };

  const handleClearMastered = () => {
    const updated = clearMasteredFehler();
    setItems(updated);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              Fehlerbuch & Spaced Repetition
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Kumpulan butir soal dari Game Mode, Lesen, dan Hören yang pernah Anda jawab keliru.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {activeErrors.length > 0 && (
            <button
              type="button"
              onClick={handleStartPractice}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Latih Ulang Kesalahan ({activeErrors.length})</span>
            </button>
          )}

          {masteredErrors.length > 0 && (
            <button
              type="button"
              onClick={handleClearMastered}
              className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors"
            >
              Bersihkan Soal Mastered
            </button>
          )}
        </div>
      </div>

      {/* Interactive Practice Card (Modal/Embed) */}
      {practiceActive && currentPracticeItem && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-700 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Mode Latih Ulang ({practiceIndex + 1} / {activeErrors.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPracticeActive(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Keluar Latihan
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase">
              Asal Soal: {currentPracticeItem.source.toUpperCase()}
            </span>
            <h3 className="text-lg sm:text-xl font-bold leading-snug">
              {currentPracticeItem.questionText}
            </h3>
            <p className="text-xs text-rose-300">
              Jawaban Salah Anda Sebelumnya: <strong>{currentPracticeItem.userAnswer}</strong>
            </p>
          </div>

          {practiceFeedback === null ? (
            <div className="space-y-3">
              <input
                type="text"
                value={userPracticeAns}
                onChange={(e) => setUserPracticeAns(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePracticeSubmit()}
                placeholder="Ketik jawaban yang benar di sini..."
                className="w-full p-3.5 rounded-2xl bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handlePracticeSubmit}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Kirim Jawaban
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              {practiceFeedback ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Richtig! Jawaban Benar!</div>
                    <p className="mt-0.5">
                      Progres penguasaan: {currentPracticeItem.consecutiveCorrect + 1} / 2 kali benar berturut-turut untuk Mastered.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-700 text-rose-200 text-xs flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Masih Belum Tepat!</div>
                    <p className="mt-0.5">
                      Kunci Jawaban Seharusnya: <strong>{currentPracticeItem.correctAnswer}</strong>
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">
                💡 {currentPracticeItem.explanation}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextPracticeItem}
                  className="px-5 py-2.5 rounded-xl bg-white text-zinc-900 font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  {practiceIndex + 1 < activeErrors.length ? "Soal Selanjutnya" : "Selesaikan Latihan"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs & Error List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tampilkan:</span>
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setFilterMode("active")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === "active"
                    ? "bg-rose-500 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Aktif ({activeErrors.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("mastered")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === "mastered"
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Mastered ({masteredErrors.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === "all"
                    ? "bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Semua ({items.length})
              </button>
            </div>
          </div>
        </div>

        {displayedItems.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Tidak Ada Kesalahan Pada Kategori Ini
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Hebat! Anda tidak memiliki kesalahan yang tersisa atau belum ada latihan yang dikerjakan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase">
                    {item.source}
                  </span>
                  {item.mastered ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mastered (2x Benar)
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      Progress: {item.consecutiveCorrect}/2
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                  {item.questionText}
                </p>

                <div className="text-xs space-y-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700/60">
                  <div className="text-rose-500">
                    <span className="font-semibold">Jawaban Anda:</span> {item.userAnswer}
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    <span className="font-semibold">Kunci Seharusnya:</span> {item.correctAnswer}
                  </div>
                </div>

                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 italic">
                  💡 {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Riwayat Nilai Simulasi Ujian Lengkap */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">
            Riwayat Skor Simulasi Ujian Goethe B1
          </h3>
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Belum ada simulasi ujian yang diselesaikan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  <th className="pb-2.5 font-semibold">Waktu Ujian</th>
                  <th className="pb-2.5 font-semibold">Modul</th>
                  <th className="pb-2.5 font-semibold">Paket</th>
                  <th className="pb-2.5 font-semibold">Skor Konversi</th>
                  <th className="pb-2.5 font-semibold text-right">Hasil Goethe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {history.map((record) => (
                  <tr key={record.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="py-3">
                      {new Date(record.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 font-bold uppercase">{record.module}</td>
                    <td className="py-3">Paket {record.packetId}</td>
                    <td className="py-3 font-bold text-sm">
                      {record.score} / 100
                    </td>
                    <td className="py-3 text-right">
                      {record.passed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> BESTANDEN (≥60)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3" /> NICHT BESTANDEN (&lt;60)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
