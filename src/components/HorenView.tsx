"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserStats } from "@/types";
import { initialHorenPackets } from "@/data/horenData";
import { saveExamResult, addFehlerItem } from "@/lib/storage";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Gauge,
} from "lucide-react";
import confetti from "canvas-confetti";

interface HorenViewProps {
  stats: UserStats;
}

export const HorenView: React.FC<HorenViewProps> = ({ stats }) => {
  const [activePacketId, setActivePacketId] = useState<"A" | "B" | "C">("A");
  const [currentTeilIndex, setCurrentTeilIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1.0);
  const [playCount, setPlayCount] = useState<Record<string, number>>({});
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [germanVoice, setGermanVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Result state
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    totalCount: number;
    passed: boolean;
  } | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (stats.activePacket === "A" || stats.activePacket === "B" || stats.activePacket === "C") {
      setActivePacketId(stats.activePacket);
    }
  }, [stats.activePacket]);

  // Load German TTS voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const deVoice =
        voices.find((v) => v.lang.startsWith("de") && v.name.toLowerCase().includes("german")) ||
        voices.find((v) => v.lang.startsWith("de")) ||
        null;
      setGermanVoice(deVoice);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const packet = initialHorenPackets.find((p) => p.packetId === activePacketId) || initialHorenPackets[0];
  const teile = packet.teile;
  const currentTeil = teile[currentTeilIndex] || teile[0];
  const allQuestions = teile.flatMap((t) => t.questions);

  const currentTeilKey = `${activePacketId}_teil_${currentTeil.teil}`;
  const currentPlays = playCount[currentTeilKey] || 0;
  const canPlay = practiceMode || currentPlays < currentTeil.playLimit;

  // Handle Play TTS
  const handlePlayAudio = () => {
    if (!speechSupported || typeof window === "undefined") return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!canPlay) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentTeil.audioTranscript);
    utterance.lang = "de-DE";
    utterance.rate = playSpeed;
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setPlayCount((prev) => ({
        ...prev,
        [currentTeilKey]: (prev[currentTeilKey] || 0) + 1,
      }));
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Change Teil -> stop speech
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

    setScoreResult({
      score: scaledScore,
      correctCount: correct,
      totalCount: allQuestions.length,
      passed,
    });
    setIsSubmitted(true);
    setShowTranscript(true); // Automatically reveal transcript on review!

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

  const resetExam = () => {
    handleStopAudio();
    setAnswers({});
    setIsSubmitted(false);
    setShowTranscript(false);
    setScoreResult(null);
    setPlayCount({});
    setCurrentTeilIndex(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Packet selection */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            {(["A", "B", "C"] as const).map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  setActivePacketId(pid);
                  resetExam();
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

          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              {packet.title}
            </h2>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Goethe B1 Hören mit nativer Audio-Sprachausgabe (de-DE)
            </p>
          </div>
        </div>

        {/* Practice mode toggle & Submit */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPracticeMode(!practiceMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              practiceMode
                ? "bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
            }`}
            title="Mode Latihan: Bebas putar audio tanpa batas dan transkrip langsung bisa dibuka"
          >
            Latihan Santai: {practiceMode ? "ON" : "OFF"}
          </button>

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
              onClick={resetExam}
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
              Transkrip percakapan kini dapat dibaca di bagian bawah.
            </div>
          </div>
        </div>
      )}

      {/* Smart German Audio Player Hub */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-zinc-900 to-indigo-950 text-white shadow-xl border border-purple-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
              SMART GERMAN AUDIO PLAYER (WEB SPEECH API)
            </span>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-400" />
              {currentTeil.title}
            </h3>
            <p className="text-xs text-zinc-300">
              Aturan Goethe: Audio Teil ini diputar <strong>{currentTeil.playLimit}x</strong>.
              (Sudah diputar: {currentPlays} / {currentTeil.playLimit}x)
            </p>
          </div>

          {/* Player controls */}
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

            {/* Play/Pause Button */}
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
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Hentikan Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {canPlay
                      ? `Putar Audio (${currentPlays + 1}/${currentTeil.playLimit})`
                      : "Batas Putar Tercapai"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Speaking Wave visualizer */}
        {isPlaying && (
          <div className="flex items-center gap-1.5 pt-2">
            <span className="text-[11px] font-semibold text-purple-300 mr-2">
              Audio Sedang Berbicara (de-DE):
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

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Aufgabe {q.questionNumber}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                  {q.questionText}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {(q.options || ["Richtig", "Falsch"]).map((opt, i) => {
                    const isSelected = userAns === opt;
                    let optStyle =
                      "border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200";

                    if (isSubmitted) {
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
                        {isSelected && !isSubmitted && (
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                        )}
                        {isSubmitted && opt === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isSubmitted && (
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

      {/* Transcript Reveal Box (Available after submit or in practice mode) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
            <FileText className="w-4 h-4 text-purple-500" />
            <span>Transkrip Audio Bahasa Jerman</span>
          </div>
          {(isSubmitted || practiceMode) && (
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              {showTranscript ? "Sembunyikan Transkrip" : "Tampilkan Transkrip"}
            </button>
          )}
        </div>

        {!isSubmitted && !practiceMode ? (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
            🔒 Sesuai aturan ujian Goethe B1, transkrip audio terkunci dan hanya dapat dibuka setelah ujian disubmit (atau saat Mode Latihan Santai diaktifkan).
          </p>
        ) : showTranscript ? (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 font-serif text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed animate-fade-in">
            {currentTeil.audioTranscript}
          </div>
        ) : null}
      </div>
    </div>
  );
};
