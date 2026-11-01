"use client";

import React from "react";
import {
  LayoutDashboard,
  Gamepad2,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  AlertOctagon,
  FileJson,
  X,
  Sparkles,
  Bookmark,
  Award,
} from "lucide-react";

export type TabKey =
  | "dashboard"
  | "game"
  | "lesen"
  | "hoeren"
  | "schreiben"
  | "sprechen"
  | "meine-vokabeln"
  | "fehlerbuch"
  | "report-card"
  | "json-manager";

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  isOpen: boolean;
  onClose: () => void;
  fehlerCount: number;
  vocabCount?: number;
}

interface NavItem {
  key: TabKey;
  label: string;
  badge?: string;
  icon: React.ElementType;
  description: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  fehlerCount,
  vocabCount = 0,
}) => {
  const navItems: NavItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Ringkasan kesiapan & statistik",
    },
    {
      key: "game",
      label: "Game Arena B1",
      icon: Gamepad2,
      badge: "Easy/Med/Hard",
      description: "Latihan vocab & grammatik interaktif",
    },
    {
      key: "lesen",
      label: "Simulasi Lesen",
      icon: BookOpen,
      badge: "Teil 1-5",
      description: "Format resmi membaca Goethe B1",
    },
    {
      key: "hoeren",
      label: "Simulasi Hören",
      icon: Headphones,
      badge: "TTS Audio",
      description: "Format resmi mendengarkan Goethe B1",
    },
    {
      key: "schreiben",
      label: "Simulasi Schreiben",
      icon: PenTool,
      badge: "Aufgabe 1-3",
      description: "Editor teks + Evaluasi cerdas",
    },
    {
      key: "sprechen",
      label: "Simulasi Sprechen",
      icon: Mic,
      badge: "Voice Rec",
      description: "Partner virtual & perekam suara",
    },
    {
      key: "meine-vokabeln",
      label: "Meine Vokabeln",
      icon: Bookmark,
      badge: vocabCount > 0 ? `${vocabCount}` : undefined,
      description: "Kamus kata simpanan & flashcard",
    },
    {
      key: "fehlerbuch",
      label: "Fehlerbuch",
      icon: AlertOctagon,
      badge: fehlerCount > 0 ? `${fehlerCount}` : undefined,
      description: "Bank kesalahan & spaced repetition",
    },
    {
      key: "report-card",
      label: "Zertifikat & Report",
      icon: Award,
      badge: "PDF Print",
      description: "Kartu hasil ujian & sertifikat B1",
    },
    {
      key: "json-manager",
      label: "JSON Manager",
      icon: FileJson,
      badge: "Import/Export",
      description: "Tambah soal & backup data",
    },
  ];

  const handleNavClick = (key: TabKey) => {
    onSelectTab(key);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-50 md:z-20 w-72 h-[calc(100vh-4rem)] flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Navigation list */}
        <div className="p-4 space-y-1 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 px-2 md:hidden">
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Menu GoetheMeister
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${
                  isActive
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 shadow-xs"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm leading-tight">{item.label}</div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-normal leading-tight mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                      item.key === "fehlerbuch" && fehlerCount > 0
                        ? "bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                        : item.key === "meine-vokabeln" && vocabCount > 0
                        ? "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                        : isActive
                        ? "bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/5 to-indigo-500/10 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standar Goethe B1</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Target lulus: minimal <strong>60 dari 100 poin (60%)</strong> per modul ujian (Lesen, Hören, Schreiben, Sprechen).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
