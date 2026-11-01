"use client";

import React, { useState, useEffect } from "react";
import { VocabItem } from "@/types";
import { getSavedVocab, deleteVocabWord, toggleVocabLearned, saveVocabWord } from "@/lib/storage";
import { speechPlayer } from "@/lib/audioSpeech";
import {
  Bookmark,
  Search,
  Volume2,
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  BookOpen,
  RotateCcw,
} from "lucide-react";

export const MeineVokabelnView: React.FC = () => {
  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "learning" | "learned">("all");

  // New word form state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newGerman, setNewGerman] = useState<string>("");
  const [newIndo, setNewIndo] = useState<string>("");
  const [newArticle, setNewArticle] = useState<"der" | "die" | "das" | "">("");

  // Flashcard mode
  const [flashcardMode, setFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const loadData = () => {
    setVocabList(getSavedVocab());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleLearned = (id: string) => {
    const updated = toggleVocabLearned(id);
    setVocabList(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteVocabWord(id);
    setVocabList(updated);
  };

  const handlePronounce = (item: VocabItem) => {
    const text = item.article ? `${item.article} ${item.german}` : item.german;
    speechPlayer.speak(text, { rate: 0.9 });
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGerman.trim() || !newIndo.trim()) return;

    const updated = saveVocabWord({
      german: newGerman.trim(),
      indonesian: newIndo.trim(),
      article: (newArticle as "der" | "die" | "das") || undefined,
    });
    setVocabList(updated);
    setNewGerman("");
    setNewIndo("");
    setNewArticle("");
    setIsAdding(false);
  };

  const filteredList = vocabList.filter((item) => {
    const matchesSearch =
      item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indonesian.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === "learning") return !item.learned;
    if (filter === "learned") return item.learned;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Bookmark className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              Meine Vokabeln (Kamus Kosakata B1)
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Daftar kosakata penting yang Anda simpan langsung dari bacaan Lesen dan skrip Hören.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {vocabList.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setFlashcardMode(!flashcardMode);
                setFlashcardIndex(0);
                setShowAnswer(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{flashcardMode ? "Tutup Flashcard" : "Mode Flashcard"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kata</span>
          </button>
        </div>
      </div>

      {/* Flashcard Training Mode */}
      {flashcardMode && vocabList.length > 0 && (
        <div className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-700 shadow-2xl text-center space-y-6 animate-fade-in max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold text-amber-400 uppercase tracking-wider">
              Flashcard B1 ({flashcardIndex + 1} / {vocabList.length})
            </span>
            <span>Klik kartu untuk membalik</span>
          </div>

          <div
            onClick={() => setShowAnswer(!showAnswer)}
            className="min-h-[160px] p-6 rounded-2xl bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 cursor-pointer flex flex-col items-center justify-center space-y-3 transition-all"
          >
            {vocabList[flashcardIndex].article && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                {vocabList[flashcardIndex].article}
              </span>
            )}
            <h3 className="text-2xl font-black">{vocabList[flashcardIndex].german}</h3>

            {showAnswer ? (
              <p className="text-base text-emerald-300 font-semibold animate-fade-in">
                🇮🇩 {vocabList[flashcardIndex].indonesian}
              </p>
            ) : (
              <p className="text-xs text-zinc-400 italic">Tekan untuk melihat terjemahan</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => handlePronounce(vocabList[flashcardIndex])}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Dengarkan pelafalan"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={flashcardIndex === 0}
                onClick={() => {
                  setFlashcardIndex((prev) => Math.max(0, prev - 1));
                  setShowAnswer(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 text-xs font-bold disabled:opacity-40"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                disabled={flashcardIndex === vocabList.length - 1}
                onClick={() => {
                  setFlashcardIndex((prev) => Math.min(vocabList.length - 1, prev + 1));
                  setShowAnswer(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold disabled:opacity-40"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Word Form */}
      {isAdding && (
        <form
          onSubmit={handleAddCustomWord}
          className="p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 shadow-xs space-y-4 animate-fade-in"
        >
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
            Tambahkan Kosakata Baru ke Kamus Anda:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <select
                value={newArticle}
                onChange={(e) => setNewArticle(e.target.value as "der" | "die" | "das" | "")}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
              >
                <option value="">(Tanpa Artikel)</option>
                <option value="der">der (Maskulin)</option>
                <option value="die">die (Feminin)</option>
                <option value="das">das (Netral)</option>
              </select>
            </div>
            <div className="sm:col-span-5">
              <input
                type="text"
                required
                placeholder="Kata bahasa Jerman (misal: die Ausbildung)"
                value={newGerman}
                onChange={(e) => setNewGerman(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-4">
              <input
                type="text"
                required
                placeholder="Arti dalam Bahasa Indonesia"
                value={newIndo}
                onChange={(e) => setNewIndo(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
            >
              Simpan Kata
            </button>
          </div>
        </form>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata Jerman / Indonesia..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-semibold w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === "all" ? "bg-white dark:bg-zinc-700 font-bold shadow-xs" : "text-zinc-500"
            }`}
          >
            Semua ({vocabList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("learning")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === "learning" ? "bg-white dark:bg-zinc-700 font-bold shadow-xs text-amber-600" : "text-zinc-500"
            }`}
          >
            Belajar ({vocabList.filter((v) => !v.learned).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("learned")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === "learned" ? "bg-white dark:bg-zinc-700 font-bold shadow-xs text-emerald-600" : "text-zinc-500"
            }`}
          >
            Hafal ({vocabList.filter((v) => v.learned).length})
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      {filteredList.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-2">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Belum Ada Kosakata</h4>
          <p className="text-xs text-zinc-500">
            Saat membaca teks di modul Lesen atau melihat skrip Hören, ketuk kata yang bergaris bawah untuk menyimpannya ke sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleLearned(item.id)}
                  className="text-zinc-400 hover:text-emerald-500 transition-colors"
                  title={item.learned ? "Tandai belum hafal" : "Tandai sudah hafal"}
                >
                  {item.learned ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-1.5">
                    {item.article && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 font-mono">
                        {item.article}
                      </span>
                    )}
                    <span
                      className={`text-sm font-bold ${
                        item.learned ? "line-through opacity-70 text-zinc-500" : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {item.german}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {item.indonesian}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePronounce(item)}
                  className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Dengarkan pelafalan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Hapus kata"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
