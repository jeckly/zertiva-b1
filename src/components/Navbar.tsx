"use client";

import React, { useEffect, useState } from "react";
import { PacketId, UserStats } from "@/types";
import {
  Flame,
  Zap,
  Layers,
  Moon,
  Sun,
  Menu,
  GraduationCap,
} from "lucide-react";

interface NavbarProps {
  stats: UserStats;
  onPacketChange: (packet: PacketId) => void;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  onPacketChange,
  onToggleSidebar,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("gmb1_theme") || localStorage.getItem("zertiva_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("gmb1_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("gmb1_theme", "dark");
      setIsDark(true);
    }
  };

  const level = Math.floor(stats.xp / 100) + 1;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md transition-colors print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                  GoetheMeister B1
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/50">
                  GMB1 STUDIO
                </span>
              </div>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 hidden sm:block font-medium">
                Official Goethe-Zertifikat B1 Exam Studio
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right: Paket Selector, Stats & Theme */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Paket Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/70">
            <Layers className="w-4 h-4 text-zinc-500 ml-1 hidden sm:block" />
            <select
              value={stats.activePacket}
              onChange={(e) => onPacketChange(e.target.value as PacketId)}
              className="bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer pr-1 py-1"
              title="Pilih Paket Soal Aktif"
            >
              <option value="A" className="dark:bg-zinc-800 text-zinc-900 dark:text-white">
                Paket A (Utama)
              </option>
              <option value="B" className="dark:bg-zinc-800 text-zinc-900 dark:text-white">
                Paket B (Cadangan 1)
              </option>
              <option value="C" className="dark:bg-zinc-800 text-zinc-900 dark:text-white">
                Paket C (Cadangan 2)
              </option>
              <option value="shuffle" className="dark:bg-zinc-800 text-zinc-900 dark:text-white">
                Mode Acak (Shuffle Pool)
              </option>
              <option value="custom" className="dark:bg-zinc-800 text-zinc-900 dark:text-white">
                Bank Soal Kustom (Import)
              </option>
            </select>
          </div>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 font-bold text-xs"
            title={`${stats.streak} hari streak latihan berturut-turut`}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{stats.streak}d</span>
          </div>

          {/* XP & Level Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs"
            title={`${stats.xp} XP total • Level ${level}`}
          >
            <Zap className="w-4 h-4 fill-indigo-500 text-indigo-500" />
            <span>{stats.xp} XP</span>
            <span className="hidden sm:inline-block text-[10px] font-normal opacity-80">
              (Lvl {level})
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            aria-label="Ganti mode gelap/terang"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
