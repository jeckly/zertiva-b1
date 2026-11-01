"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserStats, SchreibenAufgabe } from "@/types";
import { initialSchreibenPackets } from "@/data/schreibenData";
import { saveExamResult } from "@/lib/storage";
import { UmlautHelperBar } from "./UmlautHelperBar";
import {
  Timer,
  CheckSquare,
  Square,
  BookOpen,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import confetti from "canvas-confetti";

interface SchreibenViewProps {
  stats: UserStats;
}

const B1_CONNECTORS = [
  "weil",
  "da",
  "obwohl",
  "trotzdem",
  "deshalb",
  "deswegen",
  "daher",
  "falls",
  "wenn",
  "damit",
  "um zu",
  "um...zu",
  "indem",
  "sodass",
  "außerdem",
  "darüber hinaus",
  "nicht nur",
  "sondern auch",
  "einerseits",
  "andererseits",
];

export const SchreibenView: React.FC<SchreibenViewProps> = ({ stats }) => {
  const [activePacketId, setActivePacketId] = useState<"A" | "B" | "C">("A");
  const [activeAufgabeNum, setActiveAufgabeNum] = useState<1 | 2 | 3>(1);
  const [userTexts, setUserTexts] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  });
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});
  const [showRedemittel, setShowRedemittel] = useState<boolean>(false);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); // 60 minutes
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (stats.activePacket === "A" || stats.activePacket === "B" || stats.activePacket === "C") {
      setActivePacketId(stats.activePacket);
    }
  }, [stats.activePacket]);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || isEvaluated) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEvaluate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isEvaluated]);

  const packet = initialSchreibenPackets.find((p) => p.packetId === activePacketId) || initialSchreibenPackets[0];
  const currentAufgabe = packet.aufgaben.find((a) => a.aufgabeNumber === activeAufgabeNum) || packet.aufgaben[0];

  const currentText = userTexts[activeAufgabeNum] || "";

  // Live Word Count
  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = countWords(currentText);

  // Word count color badge
  const getWordCountColor = () => {
    if (wordCount === 0) return "text-zinc-600 dark:text-zinc-400";
    if (wordCount < currentAufgabe.minWords) return "text-rose-500 font-bold";
    if (wordCount <= currentAufgabe.maxWords) return "text-emerald-500 font-bold";
    return "text-amber-500 font-bold";
  };

  // Cursor-based Umlaut insertion
  const handleInsertChar = (char: string) => {
    const el = textareaRef.current;
    if (!el) {
      setUserTexts((prev) => ({
        ...prev,
        [activeAufgabeNum]: prev[activeAufgabeNum] + char,
      }));
      return;
    }

    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const oldText = el.value;
    const newText = oldText.substring(0, start) + char + oldText.substring(end);

    setUserTexts((prev) => ({
      ...prev,
      [activeAufgabeNum]: newText,
    }));

    // Restore focus and cursor position
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  // Heuristic analysis
  const textLower = currentText.toLowerCase();
  const detectedConnectors = B1_CONNECTORS.filter((c) => textLower.includes(c));

  const hasGreeting =
    currentAufgabe.type === "informell"
      ? /liebe|lieber|hallo/i.test(currentText)
      : currentAufgabe.type === "formell"
      ? /sehr geehrte/i.test(currentText)
      : true; // Meinungsbeitrag doesn't mandate formal salutation

  const hasClosing =
    currentAufgabe.type === "informell"
      ? /viele grüße|herzliche grüße|dein|deine|liebe grüße/i.test(currentText)
      : currentAufgabe.type === "formell"
      ? /mit freundlichen grüßen/i.test(currentText)
      : true;

  const pointsCheckedCount = currentAufgabe.guidelines.filter(
    (_, i) => checkedPoints[`${activeAufgabeNum}_${i}`]
  ).length;

  const handleEvaluate = () => {
    setIsEvaluated(true);
    setTimerRunning(false);

    // Calculate heuristic score (0-100)
    let score = 40; // baseline
    if (wordCount >= currentAufgabe.minWords && wordCount <= currentAufgabe.maxWords) {
      score += 25;
    } else if (wordCount >= currentAufgabe.minWords - 10) {
      score += 15;
    }

    // Connectors score (up to 20 pts)
    score += Math.min(20, detectedConnectors.length * 5);

    // Salutation & closing (up to 15 pts)
    if (hasGreeting) score += 7;
    if (hasClosing) score += 8;

    const finalScore = Math.min(100, Math.max(30, score));
    const passed = finalScore >= 60;

    saveExamResult({
      module: "schreiben",
      packetId: activePacketId,
      score: finalScore,
      totalQuestions: 3,
      correctCount: passed ? 3 : 1,
      passed,
    });

    if (passed && typeof confetti === "function") {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Navigation */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Packet tabs & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            {(["A", "B", "C"] as const).map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  setActivePacketId(pid);
                  setIsEvaluated(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePacketId === pid
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Paket {pid}
              </button>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              {packet.title} - Goethe B1 Schreiben
            </h2>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              3 Aufgaben • Total 60 Menit • Rubrik Penilaian Mandiri
            </p>
          </div>
        </div>

        {/* Timer & Evaluasi Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200">
            <Timer className="w-4 h-4 text-emerald-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            type="button"
            onClick={handleEvaluate}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
          >
            Evaluasi Tulisan (Rubrik B1)
          </button>
        </div>
      </div>

      {/* Aufgabe Selector Tabs */}
      <div className="flex items-center gap-2">
        {packet.aufgaben.map((a) => (
          <button
            key={a.aufgabeNumber}
            type="button"
            onClick={() => setActiveAufgabeNum(a.aufgabeNumber)}
            className={`flex-1 py-3 px-4 rounded-2xl border text-left transition-all ${
              activeAufgabeNum === a.aufgabeNumber
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-xs"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
              Aufgabe {a.aufgabeNumber}
            </div>
            <div className="text-xs font-bold truncate mt-0.5">{a.title}</div>
          </button>
        ))}
      </div>

      {/* Main Workspace Grid (Left: Prompt & Redemittel, Right: Text Editor & Evaluator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Prompt & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Instruksi Tugas
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                {currentAufgabe.title}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-serif">
              {currentAufgabe.promptText}
            </div>

            {/* Content Points Checklist (Selbstevaluation) */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Checklist Poin Isi (Wajib Dijawab):
              </span>
              <div className="space-y-1.5">
                {currentAufgabe.guidelines.map((point, idx) => {
                  const key = `${activeAufgabeNum}_${idx}`;
                  const isChecked = !!checkedPoints[key];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCheckedPoints((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      )}
                      <span className={isChecked ? "line-through opacity-70" : ""}>{point}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Redemittel Drawer Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowRedemittel(!showRedemittel)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs font-bold"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Koleksi Redemittel B1 ({currentAufgabe.redemittel.length} Kategori)</span>
                </div>
                {showRedemittel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showRedemittel && (
                <div className="mt-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 space-y-3 text-xs animate-fade-in max-h-60 overflow-y-auto">
                  {currentAufgabe.redemittel.map((grp, i) => (
                    <div key={i} className="space-y-1">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{grp.category}:</span>
                      <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-0.5 font-serif">
                        {grp.phrases.map((p, j) => (
                          <li key={j}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Writing Editor & Evaluator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
            {/* Header with Word Counter & Umlaut Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Jumlah Kata:
                </span>
                <span className={`text-sm ${getWordCountColor()}`}>
                  {wordCount} / ~{currentAufgabe.targetWords} kata
                </span>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                  (min {currentAufgabe.minWords} - max {currentAufgabe.maxWords})
                </span>
              </div>

              {/* Umlaut Helper Bar */}
              <UmlautHelperBar onInsert={handleInsertChar} />
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={currentText}
              onChange={(e) =>
                setUserTexts((prev) => ({
                  ...prev,
                  [activeAufgabeNum]: e.target.value,
                }))
              }
              placeholder={`Tulis teks bahasa Jerman Anda di sini (target: ca. ${currentAufgabe.targetWords} Wörter)...`}
              className="w-full h-80 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200 dark:border-zinc-700/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y font-mono leading-relaxed"
            />

            {/* Real-time Connectors & Criteria Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Konnektoren B1:</span>
              {detectedConnectors.length > 0 ? (
                detectedConnectors.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold"
                  >
                    ✓ {c}
                  </span>
                ))
              ) : (
                <span className="text-zinc-600 italic text-[11px]">
                  Belum terdeteksi (gunakan weil, obwohl, trotzdem, deshalb, dll)
                </span>
              )}
            </div>
          </div>

          {/* Evaluator & Musterlösung Side-by-Side Panel */}
          {isEvaluated && (
            <div className="p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-700 shadow-xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm">
                    Evaluasi Mandiri & Musterlösung (Goethe B1 Rubrik)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEvaluated(false)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Tutup Evaluasi
                </button>
              </div>

              {/* Heuristic Scores breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700">
                  <div className="text-zinc-400">Jumlah Kata</div>
                  <div
                    className={`font-bold mt-1 ${
                      wordCount >= currentAufgabe.minWords ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {wordCount >= currentAufgabe.minWords ? "✓ Sesuai Target" : "✗ Terlalu Pendek"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700">
                  <div className="text-zinc-400">Variasi Konnektor</div>
                  <div className="font-bold text-emerald-400 mt-1">
                    {detectedConnectors.length} Terdeteksi
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700">
                  <div className="text-zinc-400">Sapaan & Penutup</div>
                  <div className={`font-bold mt-1 ${hasGreeting && hasClosing ? "text-emerald-400" : "text-amber-400"}`}>
                    {hasGreeting && hasClosing ? "✓ Lengkap" : "Periksa Format"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700">
                  <div className="text-zinc-400">Poin Isi Terjawab</div>
                  <div className="font-bold text-emerald-400 mt-1">
                    {pointsCheckedCount} / {currentAufgabe.guidelines.length} Poin
                  </div>
                </div>
              </div>

              {/* Side-by-Side: Your Text vs Musterlösung */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-amber-400">
                  Musterlösung (Contoh Jawaban Sempurna Skor 100):
                </span>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-serif text-xs text-zinc-200 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                  {currentAufgabe.musterloesung}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
