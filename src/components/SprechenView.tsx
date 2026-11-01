"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserStats } from "@/types";
import { initialSprechenPackets } from "@/data/sprechenData";
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  Volume2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface SprechenViewProps {
  stats: UserStats;
}

export const SprechenView: React.FC<SprechenViewProps> = ({ stats }) => {
  const [activePacketId, setActivePacketId] = useState<"A" | "B" | "C">("A");
  const [activeTeil, setActiveTeil] = useState<1 | 2 | 3>(1);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);

  // Timers
  const [prepTimeLeft, setPrepTimeLeft] = useState<number>(15 * 60); // 15 mins prep
  const [prepTimerRunning, setPrepTimerRunning] = useState<boolean>(false);
  const [speakTime, setSpeakTime] = useState<number>(0);
  const [speakTimerRunning, setSpeakTimerRunning] = useState<boolean>(false);

  // MediaRecorder Voice Recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // TTS State for Virtual Partner
  const [isPartnerSpeaking, setIsPartnerSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (stats.activePacket === "A" || stats.activePacket === "B" || stats.activePacket === "C") {
      setActivePacketId(stats.activePacket);
    }
  }, [stats.activePacket]);

  // Preparation Timer Interval
  useEffect(() => {
    if (!prepTimerRunning) return;
    const interval = setInterval(() => {
      setPrepTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [prepTimerRunning]);

  // Speaking Timer Interval
  useEffect(() => {
    if (!speakTimerRunning) return;
    const interval = setInterval(() => {
      setSpeakTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [speakTimerRunning]);

  const packet = initialSprechenPackets.find((p) => p.packetId === activePacketId) || initialSprechenPackets[0];
  const currentTopic = packet.teil2Topics[selectedTopicIndex] || packet.teil2Topics[0];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Play Virtual Partner / Examiner TTS
  const playPartnerVoice = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPartnerSpeaking(true);
    utterance.onend = () => setIsPartnerSpeaking(false);
    utterance.onerror = () => setIsPartnerSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Voice Recording Handlers (MediaRecorder)
  const startRecording = async () => {
    setRecordError(null);
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setRecordError("Browser Anda tidak mendukung perekaman mikrofon.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSpeakTimerRunning(true);
      setSpeakTime(0);
    } catch {
      setRecordError("Gagal mengakses mikrofon. Pastikan izin mikrofon diberikan di browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setSpeakTimerRunning(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Packet selector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            {(["A", "B", "C"] as const).map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => setActivePacketId(pid)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePacketId === pid
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Paket {pid}
              </button>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              {packet.title} - Goethe B1 Sprechen
            </h2>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Format Ujian Lisan: Teil 1 (Planen), Teil 2 (Präsentation), Teil 3 (Fragen)
            </p>
          </div>
        </div>

        {/* Dual Timers (Vorbereitung & Sprechzeit) */}
        <div className="flex items-center gap-3">
          {/* Prep timer */}
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">Persiapan:</span>
            <span className="font-mono font-bold text-zinc-900 dark:text-white">
              {formatTimer(prepTimeLeft)}
            </span>
            <button
              type="button"
              onClick={() => setPrepTimerRunning(!prepTimerRunning)}
              className="text-[10px] font-bold text-amber-600 dark:text-amber-400 ml-1 hover:underline"
            >
              {prepTimerRunning ? "Pause" : "Mulai"}
            </button>
          </div>

          {/* Speak timer */}
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-xs text-orange-600 dark:text-orange-400">
            <Mic className="w-3.5 h-3.5" />
            <span className="font-semibold">Bicara:</span>
            <span className="font-mono font-bold">{formatTimer(speakTime)}</span>
          </div>
        </div>
      </div>

      {/* Teil 1, 2, 3 Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTeil(1)}
          className={`flex-1 p-3 rounded-2xl border text-left transition-all ${
            activeTeil === 1
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-100 font-bold shadow-xs"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Teil 1 (~3 Min)
          </div>
          <div className="text-xs truncate font-bold mt-0.5">Gemeinsam etwas planen</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTeil(2)}
          className={`flex-1 p-3 rounded-2xl border text-left transition-all ${
            activeTeil === 2
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-100 font-bold shadow-xs"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Teil 2 (~3 Min)
          </div>
          <div className="text-xs truncate font-bold mt-0.5">Ein Thema präsentieren (5 Folien)</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTeil(3)}
          className={`flex-1 p-3 rounded-2xl border text-left transition-all ${
            activeTeil === 3
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-100 font-bold shadow-xs"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Teil 3 (~1.5 Min)
          </div>
          <div className="text-xs truncate font-bold mt-0.5">Feedback & Fragen</div>
        </button>
      </div>

      {/* MediaRecorder Audio Recording Control Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900 text-white border border-zinc-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isRecording ? "bg-rose-500 animate-pulse" : "bg-zinc-800 text-zinc-300"
            }`}
          >
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">
              {isRecording ? "Sedang Merekam Suara Latihan..." : "Rekam Suara Mandiri (Browser Recorder)"}
            </div>
            <p className="text-[11px] text-zinc-400">
              Dengarkan rekaman bicara Anda untuk mengevaluasi kelancaran dan pengucapan (Aussprache).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Mulai Rekam Suara</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <Square className="w-4 h-4 fill-zinc-900" />
              <span>Selesai & Putar Hasil</span>
            </button>
          )}

          {audioUrl && (
            <div className="flex items-center gap-2">
              <audio src={audioUrl} controls className="h-8 max-w-[200px] sm:max-w-none" />
            </div>
          )}
        </div>

        {recordError && (
          <div className="w-full text-xs text-rose-400 font-semibold pt-1">
            ⚠️ {recordError}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* TEIL 1: GEMEINSAM ETWAS PLANEN */}
      {/* ======================================================== */}
      {activeTeil === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Skenario & Poin Diskusi (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Aufgabenkarte
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {packet.teil1.title}
            </h3>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-serif leading-relaxed">
              <strong>Szenario:</strong> {packet.teil1.scenario}
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Poin yang Harus Didiskusikan Bersama Partner:
              </span>
              <ul className="space-y-2">
                {packet.teil1.taskPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 flex items-start gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redemittel Planen */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
              <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                Redemittel untuk Merencanakan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-serif text-[11px] text-zinc-600 dark:text-zinc-400">
                {packet.teil1.redemittel.map((r, i) => (
                  <div key={i} className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    &bull; {r}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simulasi Partner Virtual (Web Speech API) (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Simulasi Suara Partner Virtual
              </span>
              {isPartnerSpeaking && (
                <span className="text-xs text-amber-500 font-bold animate-pulse flex items-center gap-1">
                  <Volume2 className="w-4 h-4" /> Partner Sedang Bicara...
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Tekan tombol <strong>Putar Suara Partner</strong>, dengarkan pertanyaannya dalam bahasa Jerman, lalu berbicaralah secara langsung seolah-olah berdialog dengan partner asli.
            </p>

            <div className="space-y-3">
              {packet.teil1.partnerDialogues.map((dlg, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Putaran {idx + 1}: {dlg.prompt}
                    </span>
                    <button
                      type="button"
                      onClick={() => playPartnerVoice(dlg.partnerVoiceText)}
                      className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Putar Suara Partner</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-serif italic text-zinc-800 dark:text-zinc-200">
                    &ldquo;{dlg.partnerVoiceText}&rdquo;
                  </div>

                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Ide Respon yang Disarankan:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {dlg.suggestedResponsePoints.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TEIL 2: EIN THEMA PRÄSENTIEREN */}
      {/* ======================================================== */}
      {activeTeil === 2 && (
        <div className="space-y-6">
          {/* Topic selector (Thema 1 vs Thema 2) */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Pilihan Topik:</span>
            {packet.teil2Topics.map((top, idx) => (
              <button
                key={top.id}
                type="button"
                onClick={() => setSelectedTopicIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTopicIndex === idx
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                Thema {idx === 0 ? "A" : "B"}: {top.topicTitle.replace(/^Thema \d+:\s*/, "")}
              </button>
            ))}
          </div>

          {/* 5 Slides Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {currentTopic.slides.map((s) => (
              <div
                key={s.slideNumber}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                  {s.slideNumber}
                </div>
                <h4 className="font-bold text-xs text-zinc-900 dark:text-white leading-tight">
                  {s.slideTitle}
                </h4>
                <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1 font-serif">
                  {s.guidePoints.map((gp, gIdx) => (
                    <li key={gIdx} className="leading-snug">&bull; {gp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Muster-Vortrag & Redemittel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Muster-Vortrag Skrip (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Muster-Vortrag (Contoh Skrip Presentasi Skor 100)
                </span>
                <button
                  type="button"
                  onClick={() => playPartnerVoice(currentTopic.musterVortrag)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Dengarkan Skrip
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700/80 font-serif text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                {currentTopic.musterVortrag}
              </div>
            </div>

            {/* Redemittel Sprechen (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
              <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                Redemittel Struktur Presentasi
              </span>

              <div className="space-y-3 text-xs">
                {currentTopic.redemittel.map((rm, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      {rm.slide}:
                    </span>
                    <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-0.5 font-serif text-[11px]">
                      {rm.phrases.map((p, pI) => (
                        <li key={pI}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TEIL 3: ÜBER EIN THEMA SPRECHEN / FRAGEN */}
      {/* ======================================================== */}
      {activeTeil === 3 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Teil 3: Feedback & Pertanyaan Penguji
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1">
              {packet.teil3.title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              {packet.teil3.instruction}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-white">
              Skenario Presentasi Partner:
            </span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-serif">
              {packet.teil3.partnerPresentationsSummary}
            </p>
          </div>

          {/* Feedback Templates */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Template Kalimat Umpan Balik (Feedback B1):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {packet.teil3.feedbackTemplates.map((fb, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-serif text-zinc-800 dark:text-zinc-200"
                >
                  &ldquo;{fb}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* Examiner Questions (with TTS voice playback) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-white">
              Pertanyaan dari Penguji & Partner (Dengarkan & Latih Respon Lisan):
            </span>
            <div className="space-y-3">
              {packet.teil3.examinerQuestions.map((eq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {eq.questionText}
                    </span>
                    <button
                      type="button"
                      onClick={() => playPartnerVoice(eq.audioText)}
                      className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Pertanyaan</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-serif text-zinc-700 dark:text-zinc-300">
                    <strong className="text-amber-600 dark:text-amber-400">Contoh Jawaban B1:</strong>{" "}
                    {eq.sampleAnswer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
