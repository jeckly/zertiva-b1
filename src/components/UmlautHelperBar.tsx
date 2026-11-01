"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface UmlautHelperBarProps {
  onInsert?: (char: string) => void;
  className?: string;
  isFloating?: boolean;
}

const UMLAUTS = ["ä", "ö", "ü", "Ä", "Ö", "Ü", "ß"];

export const UmlautHelperBar: React.FC<UmlautHelperBarProps> = ({
  onInsert,
  className = "",
  isFloating = false,
}) => {
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const handleClick = (char: string) => {
    if (onInsert) {
      onInsert(char);
    } else {
      // Copy to clipboard fallback
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(char);
      }
    }
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1200);
  };

  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-xl shadow-xs backdrop-blur-xs select-none ${
        isFloating ? "shadow-lg" : ""
      } ${className}`}
    >
      <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider px-2 hidden sm:inline">
        Umlaut:
      </span>
      <div className="flex items-center gap-1">
        {UMLAUTS.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => handleClick(char)}
            className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-700 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 rounded-lg transition-all border border-zinc-200/80 dark:border-zinc-600 active:scale-95 shadow-xs"
            title={`Sisipkan karakter "${char}"`}
          >
            {char}
          </button>
        ))}
      </div>
      {copiedChar && (
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 ml-1 animate-fade-in">
          <Check className="w-3.5 h-3.5" />
          {onInsert ? `Tersisip "${copiedChar}"` : `Disalin "${copiedChar}"`}
        </span>
      )}
    </div>
  );
};
