"use client";

import React, { useState, useEffect } from "react";
import { UserStats } from "@/types";
import { initialHorenPackets } from "@/data/horenData";
import {
  saveExamResult,
  addFehlerItem,
  saveActiveExamSession,
  getActiveExamSession,
  clearActiveExamSession,
  ACTIVE_HOREN_KEY,
} from "@/lib/storage";
import { speechPlayer } from "@/lib/audioSpeech";
import { InteractiveText } from "./InteractiveText";
import {
  Play,
  Square,
  RotateCcw,
  Volume2,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Gauge,
  ShieldCheck,
  Timer,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";

interface HorenViewProps {
  stats: UserStats;
}

export const HorenView: React.FC<HorenViewProps> = ({ stats }) => {
  const [activePacketId, setActivePacketId] = useState<"A" | "B" | "C">("A");
  const [examMode, setExamMode] = useState<"exam" | "study">("exam");
  const [currentTeilIndex, setCurrentTeilIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [sessionRestored, setSessionRestored] = useState<boolean>(false);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1.0);
  const [playCount, setPlayCount] = useState<Record<string, number>>({});
  const [currentSentenceInfo, setCurrentSentenceInfo] = useState<{ current: number; total: number } | null>(null);

  // Result state
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    totalCount: number;
    passed: boolean;
  } | null>(null);

  // Restore active session on mount
  useEffect(() => {
    const saved = getActiveExamSession<{ playCount?: Record<string, number> }>(ACTIVE_HOREN_KEY);
    if (saved && !saved.isSubmitted) {
      setActivePacketId(saved.packetId);
      setExamMode(saved.mode);
      setAnswers(saved.answers || {});
      setCurrentTeilIndex(saved.currentTeilIndex || 0);
      setIsSubmitted(saved.isSubmitted || false);
      setScoreResult(saved.scoreResult || null);
      if (saved.extraData?.playCount) setPlayCount(saved.extraData.playCount);
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
    initialHorenPackets.find((p) => p.packetId === activePacketId) || initialHorenPackets[0];
  const teile = packet.teile;
  const currentTeil = teile[currentTeilIndex] || teile[0];
  const allQuestions = teile.flatMap((t) => t.questions);

  const currentTeilKey = `${activePacketId}_teil_${currentTeil.teil}`;
  const currentPlays = playCount[currentTeilKey] || 0;
  const canPlay = examMode === "study" || currentPlays < currentTeil.playLimit;

  // Auto-Save active session in realtime
  useEffect(() => {
    if (isSubmitted) return;
    saveActiveExamSession(ACTIVE_HOREN_KEY, {
      packetId: activePacketId,
      mode: examMode,
      answers,
      timeLeft: 0,
      currentTeilIndex,
      isSubmitted,
      scoreResult,
      extraData: { playCount },
      lastUpdated: new Date().toISOString(),
    });
  }, [activePacketId, examMode, answers, currentTeilIndex, isSubmitted, scoreResult, playCount]);

  // Clean speech when unmounting
  useEffect(() => {
    return () => {
      speechPlayer.stop();
    };
  }, []);

  // Handle Play Audio using Bulletproof speechPlayer
  const handlePlayAudio = () => {
    if (isPlaying) {
      speechPlayer.stop();
      setIsPlaying(false);
      setCurrentSentenceInfo(null);
      return;
    }

    if (!canPlay) return;

    speechPlayer.speak(currentTeil.audioTranscript, {
      rate: playSpeed,
      onStart: () => {
        setIsPlaying(true);
        setPlayCount((prev) => ({
          ...prev,
          [currentTeilKey]: (prev[currentTeilKey] || 0) + 1,
        }));
      },
      onSentenceChange: (cur, tot) => {
        setCurrentSentenceInfo({ current: cur, total: tot });
      },
      onEnd: () => {
        setIsPlaying(false);
        setCurrentSentenceInfo(null);
      },
      onError: () => {
        setIsPlaying(false);
        setCurrentSentenceInfo(null);
      },
    });
  };

  const handleStopAudio = () => {
    speechPlayer.stop();
    setIsPlaying(false);
    setCurrentSentenceInfo(null);
  };

  const handleSelectTeil = (index: number) => {
    handleStopAudio();
    setCurrentTeilIndex(index);
  };

  const handleSelectAnswer = (qId: string, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitExam = () => {
    handleStopAudio();
    let correct = 0;
    allQuestions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === q.correctAnswer) {
        correct++;
      } else {
        addFehlerItem({
          source: "hoeren",
          questionText: `[Hören Teil ${q.teil} - Q${q.questionNumber}] ${q.questionText}`,
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
    setShowTranscript(true);
    clearActiveExamSession(ACTIVE_HOREN_KEY);

    saveExamResult({
      module: "hoeren",
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
      !window.confirm("Yakin ingin memulai ulang ujian Hören? Progres sesi ini akan di-reset.")
    ) {
      return;
    }
    handleStopAudio();
    clearActiveExamSession(ACTIVE_HOREN_KEY);
    setAnswers({});
    setIsSubmitted(false);
    setShowTranscript(false);
    setScoreResult(null);
    setPlayCount({});
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
            <span>Sesi ujian Hören sebelumnya otomatis dipulihkan dari LocalStorage.</span>
          </div>
          <button
            onClick={() => handleResetExam(true)}
            className="text-[11px] font-bold text-amber-900 dark:text-amber-100 underline hover:no-underline"
          >
            Mulai Ujian Baru
          </button>
        </div>
      )}

      {/* Top Header & Packet selection */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            {(["A", "B", "C"] as const).map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  if (activePacketId === pid) return;
                  if (
                    Object.keys(answers).length > 0 &&
                    !isSubmitted &&
                    !window.confirm(`Beralih ke Paket ${pid} akan mereset progres ujian Hören aktif. Lanjutkan?`)
                  ) {
                    return;
                  }
                  setActivePacketId(pid);
                  handleResetExam(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePacketId === pid
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Paket {pid}
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
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

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hidden sm:inline">
            Terjawab: {Object.keys(answers).length}/{allQuestions.length}
          </span>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 active:scale-95 transition-all"
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
                <h3 className="font-black text-xl text-zinc-900 dark:text-white">
                  {scoreResult.passed ? "BESTANDEN! (LULUS HÖREN)" : "NICHT BESTANDEN"}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                  Hasil: {scoreResult.correctCount} / {scoreResult.totalCount} Soal Terjawab Benar (Skala Goethe ≥ 60)
                </p>
              </div>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Transkrip audio kini terbuka dan kata-kata penting dapat diklik untuk disimpan.
            </div>
          </div>
        </div>
      )}

      {/* Smart German Audio Player Hub */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-zinc-900 to-indigo-950 text-white shadow-xl border border-purple-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
              SMART GERMAN AUDIO PLAYER (BULLETPROOF DE-DE ENGINE)
            </span>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-400" />
              {currentTeil.title}
            </h3>
            <p className="text-xs text-zinc-300">
              {examMode === "exam" ? (
                <>
                  Aturan Resmi: Diputar <strong>{currentTeil.playLimit}x</strong>. (Sudah diputar: {currentPlays}/{currentTeil.playLimit}x)
                </>
              ) : (
                <span className="text-emerald-300 font-semibold">
                  Study Mode: Putar audio sepuasnya tanpa batasan kuota.
                </span>
              )}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Speed selection */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-bold">
              <Gauge className="w-3.5 h-3.5 text-purple-300 ml-1.5" />
              {[0.85, 1.0, 1.1].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaySpeed(spd)}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    playSpeed === spd ? "bg-purple-500 text-white shadow-xs" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Play/Stop Button */}
            <button
              type="button"
              disabled={!canPlay && !isPlaying}
              onClick={handlePlayAudio}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
                isPlaying
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
                  : canPlay
                  ? "bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/25"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Hentikan Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {canPlay
                      ? `Putar Audio (${examMode === "study" ? "Bebas" : `${currentPlays + 1}/${currentTeil.playLimit}`})`
                      : "Batas Putar Tercapai"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Speaking Wave visualizer */}
        {isPlaying && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-purple-800/40">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-purple-300 mr-2">
                Suara Asli Jerman Aktif:
              </span>
              {[40, 70, 100, 60, 90, 50, 80, 45, 95, 60, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    height: `${h * 0.25}px`,
                    animationDelay: `${i * 120}ms`,
                    animationDuration: "800ms",
                  }}
                />
              ))}
            </div>

            {currentSentenceInfo && (
              <span className="text-[11px] font-mono text-purple-300 font-bold">
                Membaca Kalimat {currentSentenceInfo.current} dari {currentSentenceInfo.total}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Teil Navigation Jumper Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {teile.map((t, idx) => (
          <button
            key={t.teil}
            type="button"
            onClick={() => handleSelectTeil(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              currentTeilIndex === idx
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            Teil {t.teil} ({t.questions.length} Soal)
          </button>
        ))}
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            📋 <strong>Petunjuk Teil {currentTeil.teil}:</strong> {currentTeil.instruction}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTeil.questions.map((q) => {
            const userAns = answers[q.id];
            const isRevealed = isSubmitted || (examMode === "study" && !!userAns);

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
              >
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  Aufgabe {q.questionNumber}
                </span>

                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
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
                        "border-purple-500 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-100 font-bold shadow-xs";
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
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                        )}
                        {isRevealed && opt === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isRevealed && (
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                      <span>Pembahasan:</span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transcript Reveal Box (Interactive with Tooltip Dictionary) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
            <FileText className="w-4 h-4 text-purple-500" />
            <span>Transkrip Audio Bahasa Jerman</span>
          </div>
          {(isSubmitted || examMode === "study") && (
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              {showTranscript ? "Sembunyikan Transkrip" : "Tampilkan Transkrip"}
            </button>
          )}
        </div>

        {!isSubmitted && examMode === "exam" ? (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
            🔒 Sesuai aturan Goethe B1, transkrip terkunci selama Real Exam dan akan terbuka setelah submit (atau ubah ke Study Mode di atas).
          </p>
        ) : showTranscript ? (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 animate-fade-in space-y-2">
            <div className="text-[11px] text-amber-600 dark:text-amber-400">
              💡 Ketuk kata bergaris bawah untuk melihat terjemahan kata atau menambahkannya ke Kamus Kosakata.
            </div>
            <InteractiveText
              text={currentTeil.audioTranscript}
              className="text-xs text-zinc-800 dark:text-zinc-200 font-serif leading-relaxed"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
