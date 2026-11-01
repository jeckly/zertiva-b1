"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GameQuestion, Difficulty, UserStats } from "@/types";
import { getAllGameQuestions, recordGameAnswer, addFehlerItem, saveStats } from "@/lib/storage";
import confetti from "canvas-confetti";
import {
  Heart,
  Timer,
  Zap,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Infinity as InfinityIcon,
} from "lucide-react";

interface GameArenaViewProps {
  stats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export const GameArenaView: React.FC<GameArenaViewProps> = ({
  stats,
  onStatsUpdate,
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [zenMode, setZenMode] = useState<boolean>(stats.zenMode);
  const [hearts, setHearts] = useState<number>(3);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Load questions for the selected difficulty & active packet
  const loadRound = useCallback(() => {
    const all = getAllGameQuestions(stats.activePacket);
    const filtered = all.filter((q) => q.difficulty === difficulty);
    // Shuffle question order for replayability
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(25);
    setScore(0);
    setCombo(0);
    setHearts(3);
    setGameOver(false);
    setGameWon(false);
    setTimerActive(true);
  }, [difficulty, stats.activePacket]);

  useEffect(() => {
    loadRound();
  }, [loadRound]);

  // Question Timer countdown
  useEffect(() => {
    if (!timerActive || isAnswered || gameOver || gameWon) return;

    if (timeLeft <= 0) {
      // Time is up -> count as wrong answer
      handleSelectOption("__TIMEOUT__");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, isAnswered, gameOver, gameWon]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(option);
    setIsAnswered(true);
    setTimerActive(false);

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 100 + (newCombo > 1 ? newCombo * 20 : 0);
      setScore((prev) => prev + points);
      const updated = recordGameAnswer(true);
      onStatsUpdate(updated);
    } else {
      setCombo(0);
      const updated = recordGameAnswer(false);
      onStatsUpdate(updated);

      // Save to Fehlerbuch!
      addFehlerItem({
        source: "game",
        questionText: currentQ.question,
        userAnswer: option === "__TIMEOUT__" ? "Waktu Habis (Keine Antwort)" : option,
        correctAnswer: currentQ.correctAnswer,
        explanation: `${currentQ.explanation} (${currentQ.ruleTip || ""})`,
      });

      if (!zenMode) {
        const nextHearts = hearts - 1;
        setHearts(nextHearts);
        if (nextHearts <= 0) {
          setGameOver(true);
          return;
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(25);
      setTimerActive(true);
    } else {
      // Completed all questions in the round
      setGameWon(true);
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Level Selector & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Difficulty Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <button
            type="button"
            onClick={() => setDifficulty("easy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              difficulty === "easy"
                ? "bg-emerald-500 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            EASY (Vocab)
          </button>
          <button
            type="button"
            onClick={() => setDifficulty("medium")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              difficulty === "medium"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            MEDIUM (Grammatik)
          </button>
          <button
            type="button"
            onClick={() => setDifficulty("hard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              difficulty === "hard"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            HARD (Fallen & Satzbau)
          </button>
        </div>

        {/* Zen Mode toggle & Reset */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const nextZen = !zenMode;
              setZenMode(nextZen);
              const updated = saveStats({ zenMode: nextZen });
              onStatsUpdate(updated);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              zenMode
                ? "bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
            }`}
            title="Zen Mode: Tanpa batas nyawa (latihan santai)"
          >
            <InfinityIcon className="w-3.5 h-3.5" />
            <span>Zen Mode: {zenMode ? "ON" : "OFF"}</span>
          </button>

          <button
            type="button"
            onClick={loadRound}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            title="Mulai Ulang Ronde"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card / Game Arena */}
      {!gameOver && !gameWon && currentQ && (
        <div className="space-y-4">
          {/* Status HUD (Timer, Hearts, Progress, Combo) */}
          <div className="flex items-center justify-between px-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
            {/* Left: Progress */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
                {currentIndex + 1} / {questions.length}
              </span>
              <span className="uppercase text-[10px] tracking-wider text-amber-600 dark:text-amber-400">
                {currentQ.category}
              </span>
            </div>

            {/* Center: Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono transition-colors ${
                timeLeft <= 5
                  ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 border-rose-300 animate-pulse"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>

            {/* Right: Hearts & Combo */}
            <div className="flex items-center gap-3">
              {combo > 1 && (
                <span className="text-orange-500 flex items-center gap-0.5 animate-bounce">
                  <Zap className="w-3.5 h-3.5 fill-orange-500" />
                  {combo}x Combo!
                </span>
              )}

              {zenMode ? (
                <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                  <ShieldCheck className="w-4 h-4" /> Zen
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((h) => (
                    <Heart
                      key={h}
                      className={`w-4 h-4 transition-colors ${
                        h <= hearts
                          ? "fill-rose-500 text-rose-500"
                          : "fill-zinc-300 dark:fill-zinc-700 text-zinc-300 dark:text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Pertanyaan B1 ({currentQ.packet === "A" ? "Paket A" : currentQ.packet === "B" ? "Paket B" : "Paket C"})
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
                {currentQ.question}
              </h2>
              {currentQ.promptIndo && (
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 italic">
                  Petunjuk: {currentQ.promptIndo}
                </p>
              )}
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQ.correctAnswer;

                let btnStyle =
                  "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold";
                  } else {
                    btnStyle = "opacity-40 border-zinc-200 dark:border-zinc-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium transition-all flex items-center justify-between gap-3 active:scale-[0.99] ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Grammar Explanation (Bahasa Indonesia) */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 space-y-2 animate-fade-in text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Penjelasan Tata Bahasa B1:</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.ruleTip && (
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold text-xs">
                    💡 Kaidah Emas: {currentQ.ruleTip}
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                  >
                    <span>Lanjut Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">
            <XCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
              Nyawa Habis (Game Over)!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Jangan menyerah! Semua kesalahan telah otomatis dicatat ke dalam <strong>Fehlerbuch</strong> untuk diuji ulang.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 max-w-sm mx-auto text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Skor Diperoleh:</span>
              <span className="font-bold">{score} Poin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Tingkat Kesulitan:</span>
              <span className="font-bold uppercase">{difficulty}</span>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={loadRound}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          </div>
        </div>
      )}

      {/* Game Won Screen */}
      {gameWon && (
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
              Ausgezeichnet! Ronde Selesai!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Kamu berhasil menyelesaikan seluruh {questions.length} soal pada level{" "}
              <strong className="uppercase">{difficulty}</strong>!
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 max-w-sm mx-auto text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Skor Ronde:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {score} Poin
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Level:</span>
              <span className="font-bold uppercase">{difficulty}</span>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={loadRound}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mainkan Lagi / Acak Ronde</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
