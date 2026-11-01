"use client";

import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleClick = (char: string) => {
    if (onInsert) {
      onInsert(char);
    } else {
      // If an input or textarea is active, insert directly at the cursor
      const activeEl =
        typeof document !== "undefined"
          ? (document.activeElement as HTMLInputElement | HTMLTextAreaElement)
          : null;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA") &&
        !activeEl.readOnly &&
        !activeEl.disabled
      ) {
        const start = activeEl.selectionStart ?? activeEl.value.length;
        const end = activeEl.selectionEnd ?? activeEl.value.length;
        const val = activeEl.value;
        const updated = val.substring(0, start) + char + val.substring(end);
        
        // Use native setter to trigger React synthetic event
        const nativeSetter =
          Object.getOwnPropertyDescriptor(
            activeEl.tagName === "INPUT" ? HTMLInputElement.prototype : HTMLTextAreaElement.prototype,
            "value"
          )?.set;
        if (nativeSetter) {
          nativeSetter.call(activeEl, updated);
        } else {
          activeEl.value = updated;
        }
        activeEl.dispatchEvent(new Event("input", { bubbles: true }));
        activeEl.selectionStart = activeEl.selectionEnd = start + char.length;
        activeEl.focus();
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(char);
      }
    }
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1200);
  };

  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-xs backdrop-blur-xs select-none ${
        isFloating ? "shadow-2xl border-amber-500/40" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-1 w-full sm:w-auto">
        <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider px-1 hidden sm:inline">
          Umlaut:
        </span>

        {/* Collapse toggle for mobile */}
        {isFloating && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="sm:hidden p-1 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
            title={isCollapsed ? "Buka Umlaut" : "Sembunyikan"}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {UMLAUTS.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => handleClick(char)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-700 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 rounded-lg transition-all border border-zinc-200/80 dark:border-zinc-600 active:scale-95 shadow-xs shrink-0"
              title={`Sisipkan karakter "${char}"`}
            >
              {char}
            </button>
          ))}
        </div>
      )}

      {copiedChar && !isCollapsed && (
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 ml-1 animate-fade-in shrink-0">
          <Check className="w-3.5 h-3.5" />
          {onInsert ? `"${copiedChar}"` : `Disalin "${copiedChar}"`}
        </span>
      )}
    </div>
  );
};
