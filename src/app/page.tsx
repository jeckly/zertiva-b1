"use client";

import React, { useState, useEffect } from "react";
import { UserStats, PacketId, ExamResultRecord } from "@/types";
import { getStoredStats, saveStats, getFehlerbuch, getExamHistory } from "@/lib/storage";
import { Navbar } from "@/components/Navbar";
import { Sidebar, TabKey } from "@/components/Sidebar";
import { DashboardView } from "@/components/DashboardView";
import { GameArenaView } from "@/components/GameArenaView";
import { LesenView } from "@/components/LesenView";
import { HorenView } from "@/components/HorenView";
import { SchreibenView } from "@/components/SchreibenView";
import { SprechenView } from "@/components/SprechenView";
import { FehlerbuchView } from "@/components/FehlerbuchView";
import { JsonManagerView } from "@/components/JsonManagerView";
import { UmlautHelperBar } from "@/components/UmlautHelperBar";
import { Keyboard } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>({
    xp: 0,
    streak: 1,
    lastActiveDate: "",
    totalGameQuestionsAnswered: 0,
    totalGameCorrect: 0,
    activePacket: "A",
    zenMode: false,
  });
  const [fehlerCount, setFehlerCount] = useState<number>(0);
  const [examHistory, setExamHistory] = useState<ExamResultRecord[]>([]);
  const [showGlobalUmlaut, setShowGlobalUmlaut] = useState<boolean>(false);

  const refreshState = () => {
    const s = getStoredStats();
    setStats(s);
    const fb = getFehlerbuch().filter((f) => !f.mastered);
    setFehlerCount(fb.length);
    setExamHistory(getExamHistory());
  };

  useEffect(() => {
    refreshState();
    setMounted(true);
  }, []);

  const handlePacketChange = (packet: PacketId) => {
    const updated = saveStats({ activePacket: packet });
    setStats(updated);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Memuat Zertiva B1 Studio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        onPacketChange={handlePacketChange}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          fehlerCount={fehlerCount}
        />

        {/* Content View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          {activeTab === "dashboard" && (
            <DashboardView
              stats={stats}
              history={examHistory}
              onNavigate={setActiveTab}
              onPacketChange={handlePacketChange}
            />
          )}

          {activeTab === "game" && (
            <GameArenaView
              stats={stats}
              onStatsUpdate={(newStats) => {
                setStats(newStats);
                setFehlerCount(getFehlerbuch().filter((f) => !f.mastered).length);
              }}
            />
          )}

          {activeTab === "lesen" && <LesenView stats={stats} />}

          {activeTab === "hoeren" && <HorenView stats={stats} />}

          {activeTab === "schreiben" && <SchreibenView stats={stats} />}

          {activeTab === "sprechen" && <SprechenView stats={stats} />}

          {activeTab === "fehlerbuch" && <FehlerbuchView />}

          {activeTab === "json-manager" && (
            <JsonManagerView stats={stats} onRefresh={refreshState} />
          )}
        </main>
      </div>

      {/* Floating Global Umlaut Helper Button & Popover */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {showGlobalUmlaut && (
          <div className="animate-fade-in shadow-2xl">
            <UmlautHelperBar isFloating />
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowGlobalUmlaut((prev) => !prev)}
          className="p-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs font-bold"
          title="Buka / Tutup Virtual Umlaut Bar"
        >
          <Keyboard className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Umlaut Helper</span>
        </button>
      </div>
    </div>
  );
}
