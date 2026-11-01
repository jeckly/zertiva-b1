"use client";

import React, { useState } from "react";
import { findB1Word, DictionaryEntry } from "@/data/b1Dictionary";
import { saveVocabWord } from "@/lib/storage";
import { speechPlayer } from "@/lib/audioSpeech";
import { BookmarkPlus, Check, Volume2, X } from "lucide-react";

interface InteractiveTextProps {
  text: string;
  className?: string;
  onVocabSaved?: () => void;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  className = "",
  onVocabSaved,
}) => {
  const [selectedWord, setSelectedWord] = useState<{
    entry: DictionaryEntry;
    raw: string;
  } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Split text into lines and words while preserving whitespace
  const lines = text.split("\n");

  const handleWordClick = (rawWord: string) => {
    const entry = findB1Word(rawWord);
    if (entry) {
      setSelectedWord({ entry, raw: rawWord });
      setSavedSuccess(false);
    }
  };

  const handleSaveVocab = () => {
    if (!selectedWord) return;
    const cleanRaw = selectedWord.raw.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, "").trim();
    saveVocabWord({
      german: selectedWord.entry.german,
      indonesian: selectedWord.entry.indonesian,
      article: selectedWord.entry.article,
      exampleSentence: `Gefunden im Prüfungstext: "${cleanRaw}"`,
    });
    setSavedSuccess(true);
    onVocabSaved?.();
    setTimeout(() => {
      setSelectedWord(null);
      setSavedSuccess(false);
    }, 1500);
  };

  const handlePronounce = () => {
    if (!selectedWord) return;
    const toSpeak = selectedWord.entry.article
      ? `${selectedWord.entry.article} ${selectedWord.entry.german}`
      : selectedWord.entry.german;
    speechPlayer.speak(toSpeak, { rate: 0.9 });
  };

  return (
    <div className={`relative ${className}`}>
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <p key={lineIdx} className="mb-3 leading-relaxed">
            {words.map((w, wIdx) => {
              const matched = findB1Word(w);
              if (matched) {
                return (
                  <span
                    key={wIdx}
                    onClick={() => handleWordClick(w)}
                    className="inline cursor-pointer text-amber-700 dark:text-amber-300 font-medium underline decoration-amber-400/40 hover:decoration-amber-500 hover:bg-amber-100/60 dark:hover:bg-amber-950/60 rounded px-0.5 transition-colors"
                    title={`Klik untuk melihat arti kata "${matched.german}"`}
                  >
                    {w}{" "}
                  </span>
                );
              }
              return <span key={wIdx}>{w} </span>;
            })}
          </p>
        );
      })}

      {/* Interactive Tooltip Popover */}
      {selectedWord && (
        <div className="fixed sm:absolute z-50 bottom-4 left-4 right-4 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-4 max-w-sm mx-auto p-4 rounded-2xl bg-zinc-900 text-white shadow-2xl border border-amber-500/50 animate-fade-in space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {selectedWord.entry.article && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  {selectedWord.entry.article}
                </span>
              )}
              <h4 className="font-bold text-sm sm:text-base text-white">
                {selectedWord.entry.german}
              </h4>
            </div>

            <button
              onClick={() => setSelectedWord(null)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-amber-200 font-medium">
            🇮🇩 {selectedWord.entry.indonesian}
          </p>

          {selectedWord.entry.contextTip && (
            <p className="text-[11px] text-zinc-400 italic">
              💡 {selectedWord.entry.contextTip}
            </p>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
            <button
              type="button"
              onClick={handlePronounce}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan</span>
            </button>

            <button
              type="button"
              disabled={savedSuccess}
              onClick={handleSaveVocab}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                savedSuccess
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-500 hover:bg-amber-600 text-white"
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Simpan ke Meine Vokabeln</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
