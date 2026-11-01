"use client";

import React, { useState } from "react";
import { UserStats, ExamResultRecord } from "@/types";
import { saveStats } from "@/lib/storage";
import {
  Award,
  Printer,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Edit2,
  Check,
  Sparkles,
} from "lucide-react";

interface ReportCardViewProps {
  stats: UserStats;
  history: ExamResultRecord[];
  onStatsUpdate: (stats: UserStats) => void;
}

export const ReportCardView: React.FC<ReportCardViewProps> = ({
  stats,
  history,
  onStatsUpdate,
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>(
    stats.candidateName || "Goethe-Kandidat"
  );

  const handleSaveName = () => {
    const updated = saveStats({ candidateName: candidateName.trim() || "Goethe-Kandidat" });
    onStatsUpdate(updated);
    setIsEditingName(false);
  };

  const getLatestScore = (module: "lesen" | "hoeren" | "schreiben" | "sprechen") => {
    const records = history.filter((h) => h.module === module);
    if (records.length === 0) return null;
    return records[0]; // newest
  };

  const lesenRecord = getLatestScore("lesen");
  const hoerenRecord = getLatestScore("hoeren");
  const schreibenRecord = getLatestScore("schreiben");
  const sprechenRecord = getLatestScore("sprechen");

  const modules = [
    { id: "lesen", name: "Modul Lesen (Membaca)", record: lesenRecord, maxScore: 100 },
    { id: "hoeren", name: "Modul Hören (Mendengarkan)", record: hoerenRecord, maxScore: 100 },
    { id: "schreiben", name: "Modul Schreiben (Menulis)", record: schreibenRecord, maxScore: 100 },
    { id: "sprechen", name: "Modul Sprechen (Berbicara)", record: sprechenRecord, maxScore: 100 },
  ];

  const testedModules = modules.filter((m) => m.record !== null);
  const allTested = testedModules.length === 4;
  const allPassed =
    testedModules.length > 0 && testedModules.every((m) => m.record && m.record.score >= 60);

  const averageScore =
    testedModules.length > 0
      ? Math.round(
          testedModules.reduce((acc, curr) => acc + (curr.record?.score || 0), 0) /
            testedModules.length
        )
      : 0;

  const getGradeLabel = (score: number) => {
    if (score >= 90) return "Sehr gut (Sangat Baik)";
    if (score >= 80) return "Gut (Baik)";
    if (score >= 70) return "Befriedigend (Cukup Baik)";
    if (score >= 60) return "Ausreichend (Cukup / Lulus)";
    return "Nicht bestanden (Belum Lulus)";
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Top Banner & Print Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              Kartu Hasil Ujian & Sertifikat Goethe B1
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Hasil evaluasi gabungan 4 modul Goethe-Zertifikat B1 lengkap dengan konversi nilai resmi.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Official Certificate Paper Container (Print-ready) */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-amber-500/40 shadow-2xl space-y-8 text-zinc-900 dark:text-zinc-100 print:border-none print:shadow-none print:p-0 print:m-0">
        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b-2 border-amber-500/20 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs tracking-wider border border-amber-300/40">
            <Sparkles className="w-3.5 h-3.5" />
            GOETHEMEISTER B1 STUDIO &bull; SIMULASI UJIAN RESMI
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-zinc-900 dark:text-white uppercase pt-2">
            Goethe-Zertifikat B1
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-serif tracking-widest uppercase">
            Prüfungszeugnis &bull; Digitales Leistungsnachweis
          </p>
        </div>

        {/* Candidate Info Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Nama Peserta Ujian:
            </span>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="p-1 px-2.5 rounded-lg border border-amber-500 bg-white dark:bg-zinc-800 text-sm font-bold"
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 rounded-lg bg-emerald-500 text-white"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-xl font-bold font-serif">{candidateName}</h3>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-zinc-400 hover:text-amber-500 print:hidden"
                  title="Ubah nama"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="text-center sm:text-right text-xs text-zinc-500 space-y-1">
            <div>
              Status Kelulusan:{" "}
              {allPassed ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  BESTANDEN (LULUS)
                </span>
              ) : (
                <span className="font-bold text-rose-500">NICHT BESTANDEN</span>
              )}
            </div>
            <div>Standar Goethe: Minimal 60% per Modul</div>
          </div>
        </div>

        {/* 4 Modules Score Table */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Rincian Nilai 4 Modul (Prüfungsteile)
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700/80">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold border-b border-zinc-200 dark:border-zinc-700">
                  <th className="p-3.5">Modul Ujian</th>
                  <th className="p-3.5">Nilai Diperoleh</th>
                  <th className="p-3.5">Batas Minimal</th>
                  <th className="p-3.5">Predikat Goethe</th>
                  <th className="p-3.5 text-right">Hasil Modul</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-750">
                {modules.map((m) => {
                  const hasRecord = m.record !== null;
                  const score = m.record ? m.record.score : 0;
                  const passed = score >= 60;

                  return (
                    <tr key={m.id} className="text-zinc-800 dark:text-zinc-200">
                      <td className="p-3.5 font-bold flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-amber-500" />
                        <span>{m.name}</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-sm">
                        {hasRecord ? `${score} / 100` : "-"}
                      </td>
                      <td className="p-3.5 text-zinc-500">60 Poin</td>
                      <td className="p-3.5">
                        {hasRecord ? getGradeLabel(score) : "Belum Diuji"}
                      </td>
                      <td className="p-3.5 text-right font-bold">
                        {hasRecord ? (
                          passed ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Bestanden
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-500">
                              <AlertCircle className="w-3.5 h-3.5" /> Nicht bestanden
                            </span>
                          )
                        ) : (
                          <span className="text-zinc-400 font-normal">Belum ada tes</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overall Summary Box */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest">
              Hasil Keseluruhan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-1">
              {allPassed ? "BESTANDEN (LULUS B1)" : "NICHT BESTANDEN"}
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Rata-rata Skor: <strong>{averageScore} / 100</strong> &bull; {getGradeLabel(averageScore)}
            </p>
          </div>

          <div className="w-20 h-20 rounded-2xl border-4 border-amber-500/50 flex flex-col items-center justify-center font-serif text-center shrink-0">
            <span className="text-[9px] font-bold tracking-widest text-amber-600 dark:text-amber-400">
              GOETHE
            </span>
            <span className="text-lg font-black text-amber-500">B1</span>
            <span className="text-[8px] text-zinc-500">GEPRÜFT</span>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="flex justify-between items-end pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
          <div>
            <div>Tanggal Diterbitkan: {new Date().toLocaleDateString("de-DE")}</div>
            <div>Verifikasi: GoetheMeister B1 Studio Engine v2.0</div>
          </div>
          <div className="text-right">
            <div className="font-serif italic font-bold">GoetheMeister Prüfungszentrum</div>
            <div>Digitales Zertifikat</div>
          </div>
        </div>
      </div>
    </div>
  );
};
