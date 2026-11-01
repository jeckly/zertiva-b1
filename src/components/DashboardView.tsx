"use client";

import React, { useState, useEffect } from "react";
import { UserStats, ExamResultRecord, PacketId } from "@/types";
import { TabKey } from "./Sidebar";
import {
  getActiveExamSession,
  ACTIVE_LESEN_KEY,
  ACTIVE_HOREN_KEY,
  ACTIVE_SCHREIBEN_KEY,
} from "@/lib/storage";
import {
  Trophy,
  Target,
  Flame,
  Zap,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Gamepad2,
  Sparkles,
  Award,
  Bookmark,
  AlertTriangle,
} from "lucide-react";

interface DashboardViewProps {
  stats: UserStats;
  history: ExamResultRecord[];
  onNavigate: (tab: TabKey) => void;
  onPacketChange: (packet: PacketId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  history,
  onNavigate,
  onPacketChange,
}) => {
  const [activeSessionInfo, setActiveSessionInfo] = useState<string | null>(null);

  useEffect(() => {
    const lesenSess = getActiveExamSession(ACTIVE_LESEN_KEY);
    if (lesenSess && !lesenSess.isSubmitted) {
      setActiveSessionInfo("Lesen");
      return;
    }
    const horenSess = getActiveExamSession(ACTIVE_HOREN_KEY);
    if (horenSess && !horenSess.isSubmitted) {
      setActiveSessionInfo("Hören");
      return;
    }
    const schreibenSess = getActiveExamSession(ACTIVE_SCHREIBEN_KEY);
    if (schreibenSess && !schreibenSess.isSubmitted) {
      setActiveSessionInfo("Schreiben");
      return;
    }
    setActiveSessionInfo(null);
  }, []);

  const getModuleAvg = (module: "lesen" | "hoeren" | "schreiben" | "sprechen") => {
    const records = history.filter((h) => h.module === module);
    if (records.length === 0) return null;
    const sum = records.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / records.length);
  };

  const lesenAvg = getModuleAvg("lesen");
  const hoerenAvg = getModuleAvg("hoeren");
  const schreibenAvg = getModuleAvg("schreiben");
  const sprechenAvg = getModuleAvg("sprechen");

  const modules = [
    {
      id: "lesen" as const,
      name: "Lesen (Membaca)",
      target: "60 / 100",
      avg: lesenAvg,
      time: "65 Menit",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      tab: "lesen" as TabKey,
    },
    {
      id: "hoeren" as const,
      name: "Hören (Mendengar)",
      target: "60 / 100",
      avg: hoerenAvg,
      time: "40 Menit",
      icon: Headphones,
      color: "from-purple-500 to-indigo-500",
      tab: "hoeren" as TabKey,
    },
    {
      id: "schreiben" as const,
      name: "Schreiben (Menulis)",
      target: "60 / 100",
      avg: schreibenAvg,
      time: "60 Menit",
      icon: PenTool,
      color: "from-emerald-500 to-teal-500",
      tab: "schreiben" as TabKey,
    },
    {
      id: "sprechen" as const,
      name: "Sprechen (Berbicara)",
      target: "60 / 100",
      avg: sprechenAvg,
      time: "15 Menit",
      icon: Mic,
      color: "from-amber-500 to-orange-500",
      tab: "sprechen" as TabKey,
    },
  ];

  const accuracy =
    stats.totalGameQuestionsAnswered > 0
      ? Math.round((stats.totalGameCorrect / stats.totalGameQuestionsAnswered) * 100)
      : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Active Session Recovery Banner */}
      {activeSessionInfo && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200 font-semibold">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              Anda memiliki sesi ujian <strong>{activeSessionInfo}</strong> yang belum diselesaikan. Progres tersimpan secara aman di peramban Anda.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(activeSessionInfo.toLowerCase() as TabKey)}
            className="px-4 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs shrink-0 shadow-xs hover:bg-amber-600 transition-colors"
          >
            Lanjutkan Sesi
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 p-6 sm:p-8 text-white shadow-xl border border-zinc-800">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              GOETHEMEISTER B1 STUDIO (GMB1)
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Studio Persiapan Goethe-Zertifikat B1
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Selamat datang{stats.candidateName ? `, ${stats.candidateName}` : ""}! Latih 4 modul ujian resmi Goethe B1 (Lesen, Hören, Schreiben, Sprechen), simpan kosakata penting ke kamus pribadi, dan pantau kelulusan Anda.
            </p>
          </div>

          {/* Quick Start Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate("game")}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mainkan Game B1</span>
            </button>
            <button
              onClick={() => onNavigate("lesen")}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-sm border border-zinc-700 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mulai Ujian Lesen</span>
            </button>
            <button
              onClick={() => onNavigate("report-card")}
              className="px-4 py-3 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700 text-amber-400 font-semibold text-sm border border-zinc-700 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              title="Lihat Kartu Hasil Ujian B1"
            >
              <Award className="w-4 h-4" />
              <span className="hidden xl:inline">Zertifikat</span>
            </button>
          </div>
        </div>

        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white">
              {stats.streak} Hari
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Streak Latihan Harian
            </div>
          </div>
        </div>

        {/* Total XP */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 fill-indigo-500 text-indigo-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white">
              {stats.xp} XP
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Level {Math.floor(stats.xp / 100) + 1} Deutschlerner
            </div>
          </div>
        </div>

        {/* Game Accuracy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white">
              {accuracy}%
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Akurasi Game ({stats.totalGameCorrect}/{stats.totalGameQuestionsAnswered})
            </div>
          </div>
        </div>

        {/* Active Packet */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-black text-lg">
            {stats.activePacket === "shuffle" ? "🔀" : stats.activePacket}
          </div>
          <div>
            <div className="text-sm font-black text-zinc-900 dark:text-white">
              {stats.activePacket === "A" && "Paket A (Utama)"}
              {stats.activePacket === "B" && "Paket B (Cadangan 1)"}
              {stats.activePacket === "C" && "Paket C (Cadangan 2)"}
              {stats.activePacket === "shuffle" && "Mode Acak"}
              {stats.activePacket === "custom" && "Bank Kustom"}
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Paket Soal Aktif
            </div>
          </div>
        </div>
      </div>

      {/* 4 Modul Goethe B1 Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Kesiapan 4 Modul Goethe B1
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Syarat kelulusan resmi: Nilai minimal 60% per modul (Bestanden ≥ 60 Poin)
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("report-card")}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline"
          >
            <span>Buka Lembar Sertifikat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            const hasData = m.avg !== null;
            const passed = hasData && m.avg! >= 60;

            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.tab)}
                className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                      {m.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                      Target Lulus: {m.target}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-600 dark:text-zinc-400">Rata-rata:</span>
                      <span
                        className={
                          hasData
                            ? passed
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-500"
                            : "text-zinc-600"
                        }
                      >
                        {hasData ? `${m.avg} / 100` : "Belum ada tes"}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          passed
                            ? "bg-emerald-500"
                            : hasData
                            ? "bg-rose-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                        style={{ width: `${hasData ? Math.min(100, m.avg!) : 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 transition-colors">
                  <span>Buka Modul</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Riwayat Ujian Terkini */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Riwayat Simulasi Ujian Terkini
          </h3>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">
            Total {history.length} simulasi tercatat
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-zinc-600 dark:text-zinc-400 text-xs">
            Belum ada simulasi yang diselesaikan. Mulai latihan di modul Lesen atau Hören sekarang!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  <th className="pb-2 font-semibold">Tanggal</th>
                  <th className="pb-2 font-semibold">Modul</th>
                  <th className="pb-2 font-semibold">Paket</th>
                  <th className="pb-2 font-semibold">Skor Akhir</th>
                  <th className="pb-2 font-semibold text-right">Status Kelulusan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="py-2.5">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2.5 font-bold uppercase">{item.module}</td>
                    <td className="py-2.5">Paket {item.packetId}</td>
                    <td className="py-2.5 font-bold">{item.score} / 100</td>
                    <td className="py-2.5 text-right">
                      {item.passed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> BESTANDEN (≥60)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3" /> NICHT BESTANDEN
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
