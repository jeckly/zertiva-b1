"use client";

import React, { useState, useEffect } from "react";
import { UserStats } from "@/types";
import { initialLesenPackets } from "@/data/lesenData";
import {
  saveExamResult,
  addFehlerItem,
  saveActiveExamSession,
  getActiveExamSession,
  clearActiveExamSession,
  ACTIVE_LESEN_KEY,
} from "@/lib/storage";
import { InteractiveText } from "./InteractiveText";
import {
  Timer,
  Flag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  HelpCircle as QuestionIcon,
  Flame,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";

interface LesenViewProps {
  stats: UserStats;
}

export const LesenView: React.FC<LesenViewProps> = ({ stats }) => {
  const [activePacketId, setActivePacketId] = useState<"A" | "B" | "C">("A");
  const [examMode, setExamMode] = useState<"exam" | "study">("exam");
  const [currentTeilIndex, setCurrentTeilIndex] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<"text" | "questions">("text");

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(65 * 60); // 65 mins
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [sessionRestored, setSessionRestored] = useState<boolean>(false);

  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    totalCount: number;
    passed: boolean;
  } | null>(null);

  // Restore active session on mount
  useEffect(() => {
    const saved = getActiveExamSession<void>(ACTIVE_LESEN_KEY);
    if (saved && !saved.isSubmitted) {
      setActivePacketId(saved.packetId);
      setExamMode(saved.mode);
      setAnswers(saved.answers || {});
      setFlagged(saved.flagged || {});
      setTimeLeft(saved.timeLeft || 65 * 60);
      setCurrentTeilIndex(saved.currentTeilIndex || 0);
      setIsSubmitted(saved.isSubmitted || false);
      setScoreResult(saved.scoreResult || null);
      setSessionRestored(true);
    } else if (
      stats.activePacket === "A" ||
      stats.activePacket === "B" ||
      stats.activePacket === "C"
    ) {
      setActivePacketId(stats.activePacket);
    }
  }, [stats.activePacket]);

  const packet =
    initialLesenPackets.find((p) => p.packetId === activePacketId) || initialLesenPackets[0];
  const teile = packet.teile;
  const currentTeil = teile[currentTeilIndex] || teile[0];
  const allQuestions = teile.flatMap((t) => t.questions);

  // Auto-Save active session in realtime
  useEffect(() => {
    if (isSubmitted) return;
    saveActiveExamSession(ACTIVE_LESEN_KEY, {
      packetId: activePacketId,
      mode: examMode,
      answers,
      flagged,
      timeLeft,
      currentTeilIndex,
      isSubmitted,
      scoreResult,
      lastUpdated: new Date().toISOString(),
    });
  }, [activePacketId, examMode, answers, flagged, timeLeft, currentTeilIndex, isSubmitted, scoreResult]);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || isSubmitted || examMode === "study") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted, examMode]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (qId: string, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitExam = () => {
    let correct = 0;
    allQuestions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === q.correctAnswer) {
        correct++;
      } else {
        addFehlerItem({
          source: "lesen",
          questionText: `[Lesen Teil ${q.teil} - Q${q.questionNumber}] ${q.questionText}`,
          userAnswer: userAns || "Tidak dijawab (Leer)",
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        });
      }
    });

    const scaledScore = Math.round((correct / allQuestions.length) * 100);
    const passed = scaledScore >= 60;

    const res = {
      score: scaledScore,
      correctCount: correct,
      totalCount: allQuestions.length,
      passed,
    };

    setScoreResult(res);
    setIsSubmitted(true);
    setTimerRunning(false);
    clearActiveExamSession(ACTIVE_LESEN_KEY);

    saveExamResult({
      module: "lesen",
      packetId: activePacketId,
      score: scaledScore,
      totalQuestions: allQuestions.length,
      correctCount: correct,
      passed,
    });

    if (passed && typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleResetExam = (confirmFresh = true) => {
    if (
      confirmFresh &&
      Object.keys(answers).length > 0 &&
      !isSubmitted &&
      !window.confirm("Yakin ingin memulai ulang ujian? Progres sesi ini akan di-reset.")
    ) {
      return;
    }
    clearActiveExamSession(ACTIVE_LESEN_KEY);
    setAnswers({});
    setFlagged({});
    setTimeLeft(65 * 60);
    setTimerRunning(true);
    setIsSubmitted(false);
    setScoreResult(null);
    setCurrentTeilIndex(0);
    setSessionRestored(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Session Restored Alert Banner */}
      {sessionRestored && !isSubmitted && (
        <div className="p-3.5 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Sesi ujian sebelumnya otomatis dipulihkan dari LocalStorage.</span>
          </div>
          <button
            onClick={() => handleResetExam(true)}
            className="text-[11px] font-bold text-amber-900 dark:text-amber-100 underline hover:no-underline"
          >
            Mulai Ujian Baru
          </button>
        </div>
      )}

      {/* Top Header & Exam Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Packet tabs & Mode selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            {(["A", "B", "C"] as const).map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  setActivePacketId(pid);
                  handleResetExam(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePacketId === pid
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Paket {pid}
              </button>
            ))}
          </div>

          {/* Mode Switcher: Real Exam vs Study Mode */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setExamMode("exam")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                examMode === "exam"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Real Exam</span>
            </button>
            <button
              type="button"
              onClick={() => setExamMode("study")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                examMode === "study"
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Study Mode</span>
            </button>
          </div>
        </div>

        {/* Timer, Answered counter, and Actions */}
        <div className="flex items-center gap-3">
          {examMode === "exam" ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs ${
                timeLeft < 300
                  ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 border-rose-300 animate-pulse"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <Timer className="w-4 h-4 text-blue-500" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold">
              Latihan Bebas Waktu
            </div>
          )}

          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hidden sm:inline">
            Terjawab: {Object.keys(answers).length}/{allQuestions.length}
          </span>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              Selesai & Koreksi
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleResetExam(true)}
              className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Uji Ulang
            </button>
          )}
        </div>
      </div>

      {/* Result Banner */}
      {isSubmitted && scoreResult && (
        <div
          className={`p-6 rounded-3xl border shadow-lg animate-fade-in ${
            scoreResult.passed
              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md ${
                  scoreResult.passed ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {scoreResult.score}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-xl text-zinc-900 dark:text-white">
                    {scoreResult.passed ? "BESTANDEN! (LULUS)" : "NICHT BESTANDEN"}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border">
                    {scoreResult.correctCount} / {scoreResult.totalCount} Benar
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                  {scoreResult.passed
                    ? "Selamat! Nilai Anda memenuhi standar kelulusan resmi Goethe B1 (minimal 60 poin)."
                    : "Belum mencapai 60 poin. Pelajari bukti teks dan pembahasan di bawah untuk memperbaiki kesalahan."}
                </p>
              </div>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              💡 Jawaban salah otomatis masuk ke <strong>Fehlerbuch</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Teil Navigation Jumper Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {teile.map((t, idx) => (
          <button
            key={t.teil}
            type="button"
            onClick={() => setCurrentTeilIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              currentTeilIndex === idx
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            Teil {t.teil} ({t.questions.length} Soal)
          </button>
        ))}
      </div>

      {/* MOBILE TAB TOGGLE: "Baca Teks" vs "Jawab Soal" (lg:hidden) */}
      <div className="lg:hidden flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
        <button
          type="button"
          onClick={() => setMobileTab("text")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === "text"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Baca Teks Teil {currentTeil.teil}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("questions")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mobileTab === "questions"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          <QuestionIcon className="w-4 h-4" />
          <span>Jawab Soal ({currentTeil.questions.length})</span>
        </button>
      </div>

      {/* Split-Screen Interface (Desktop) / Tab Toggle (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Reading Text Column */}
        <div
          className={`lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto ${
            mobileTab === "text" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {currentTeil.title}
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
              {currentTeil.textTitle || "Lesetext"}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              {currentTeil.instruction}
            </p>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1.5">
              💡 <span>Ketuk kata bergaris bawah untuk melihat arti atau menyimpannya ke Kamus.</span>
            </div>
          </div>

          {/* Interactive Text Component */}
          <InteractiveText
            text={currentTeil.readingText}
            className="text-sm text-zinc-800 dark:text-zinc-200 font-serif leading-relaxed"
          />

          {/* Teil 3 Matching Ads */}
          {currentTeil.matchingAds && (
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Daftar Iklan (Anzeigen A - D):
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentTeil.matchingAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700/60 text-xs"
                  >
                    <div className="font-bold text-blue-700 dark:text-blue-400">
                      {ad.title}
                    </div>
                    <InteractiveText
                      text={ad.text}
                      className="text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile shortcut to jump to questions */}
          <div className="lg:hidden pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setMobileTab("questions")}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Jawab Soal Teil {currentTeil.teil}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Questions Column */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            mobileTab === "questions" ? "block" : "hidden lg:block"
          }`}
        >
          {currentTeil.questions.map((q) => {
            const userAns = answers[q.id];
            const isFlag = !!flagged[q.id];
            const isRevealed = isSubmitted || (examMode === "study" && !!userAns);
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border transition-all ${
                  isFlag
                    ? "border-amber-400 shadow-amber-500/10 shadow-md"
                    : "border-zinc-200 dark:border-zinc-800 shadow-xs"
                }`}
              >
                {/* Header: Question Number & Flag */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Aufgabe {q.questionNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFlag(q.id)}
                    className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors ${
                      isFlag
                        ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                        : "text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isFlag ? "fill-amber-500 text-amber-500" : ""}`} />
                    <span>{isFlag ? "Ditandai" : "Tandai"}</span>
                  </button>
                </div>

                {/* Question Text */}
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white leading-snug mb-3">
                  {q.questionText}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {(q.options || ["Richtig", "Falsch"]).map((opt, i) => {
                    const isSelected = userAns === opt;
                    let optStyle =
                      "border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200";

                    if (isRevealed) {
                      if (opt === q.correctAnswer) {
                        optStyle =
                          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-bold";
                      } else if (isSelected && opt !== q.correctAnswer) {
                        optStyle =
                          "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 font-bold";
                      } else {
                        optStyle = "opacity-40 border-zinc-200 dark:border-zinc-800";
                      }
                    } else if (isSelected) {
                      optStyle =
                        "border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 font-bold shadow-xs";
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !isRevealed && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                        {isRevealed && opt === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation in Study Mode or Submitted Mode */}
                {isRevealed && (
                  <div className="mt-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1.5 animate-fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      <span>Pembahasan:</span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.evidenceQuote && (
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 italic font-serif text-[11px]">
                        Bukti Teks: &ldquo;{q.evidenceQuote}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentTeilIndex === 0}
              onClick={() => setCurrentTeilIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Teil Sebelumnya
            </button>
            <button
              type="button"
              disabled={currentTeilIndex === teile.length - 1}
              onClick={() => setCurrentTeilIndex((prev) => Math.min(teile.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white disabled:opacity-40 flex items-center gap-1.5"
            >
              Teil Selanjutnya
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
