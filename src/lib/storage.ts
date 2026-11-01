import { UserStats, FehlerItem, ExamResultRecord, GameQuestion, PacketId } from "@/types";
import { initialGameQuestions } from "@/data/gameQuestions";

const STATS_KEY = "zertiva_user_stats_v1";
const FEHLER_KEY = "zertiva_fehlerbuch_v1";
const HISTORY_KEY = "zertiva_exam_history_v1";
const CUSTOM_GAME_KEY = "zertiva_custom_game_questions_v1";

const defaultStats: UserStats = {
  xp: 150,
  streak: 3,
  lastActiveDate: new Date().toISOString().split("T")[0],
  totalGameQuestionsAnswered: 15,
  totalGameCorrect: 13,
  activePacket: "A",
  zenMode: false,
};

export const getStoredStats = (): UserStats => {
  if (typeof window === "undefined") return defaultStats;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
      return defaultStats;
    }
    const parsed = JSON.parse(raw);
    // Check daily streak
    const today = new Date().toISOString().split("T")[0];
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (parsed.lastActiveDate === yesterday) {
        parsed.streak = (parsed.streak || 0) + 1;
      } else {
        // Streak resets if missed more than 1 day
        const daysDiff = (new Date(today).getTime() - new Date(parsed.lastActiveDate).getTime()) / 86400000;
        if (daysDiff > 1.5) {
          parsed.streak = 1;
        }
      }
      parsed.lastActiveDate = today;
      localStorage.setItem(STATS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return defaultStats;
  }
};

export const saveStats = (stats: Partial<UserStats>): UserStats => {
  if (typeof window === "undefined") return defaultStats;
  const current = getStoredStats();
  const updated = { ...current, ...stats };
  localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  return updated;
};

export const addXP = (amount: number): UserStats => {
  const current = getStoredStats();
  return saveStats({ xp: Math.max(0, current.xp + amount) });
};

export const recordGameAnswer = (isCorrect: boolean): UserStats => {
  const current = getStoredStats();
  const updatedAnswered = current.totalGameQuestionsAnswered + 1;
  const updatedCorrect = isCorrect ? current.totalGameCorrect + 1 : current.totalGameCorrect;
  const addedXP = isCorrect ? 15 : 2;
  return saveStats({
    totalGameQuestionsAnswered: updatedAnswered,
    totalGameCorrect: updatedCorrect,
    xp: current.xp + addedXP,
  });
};

// ==========================================
// FEHLERBUCH
// ==========================================
export const getFehlerbuch = (): FehlerItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FEHLER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addFehlerItem = (item: Omit<FehlerItem, "id" | "dateAdded" | "consecutiveCorrect" | "mastered">): FehlerItem[] => {
  if (typeof window === "undefined") return [];
  const current = getFehlerbuch();
  // Check if identical question already exists in active errors
  const existingIndex = current.findIndex((f) => f.questionText === item.questionText);
  if (existingIndex >= 0) {
    current[existingIndex].consecutiveCorrect = 0;
    current[existingIndex].mastered = false;
    current[existingIndex].userAnswer = item.userAnswer;
    current[existingIndex].dateAdded = new Date().toISOString();
  } else {
    const newItem: FehlerItem = {
      ...item,
      id: `err_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      dateAdded: new Date().toISOString(),
      consecutiveCorrect: 0,
      mastered: false,
    };
    current.unshift(newItem);
  }
  localStorage.setItem(FEHLER_KEY, JSON.stringify(current));
  return current;
};

export const recordFehlerPracticeAnswer = (id: string, isCorrect: boolean): FehlerItem[] => {
  if (typeof window === "undefined") return [];
  const current = getFehlerbuch();
  const index = current.findIndex((item) => item.id === id);
  if (index >= 0) {
    if (isCorrect) {
      current[index].consecutiveCorrect += 1;
      if (current[index].consecutiveCorrect >= 2) {
        current[index].mastered = true;
      }
    } else {
      current[index].consecutiveCorrect = 0;
      current[index].mastered = false;
    }
    localStorage.setItem(FEHLER_KEY, JSON.stringify(current));
  }
  return current;
};

export const clearMasteredFehler = (): FehlerItem[] => {
  if (typeof window === "undefined") return [];
  const remaining = getFehlerbuch().filter((item) => !item.mastered);
  localStorage.setItem(FEHLER_KEY, JSON.stringify(remaining));
  return remaining;
};

// ==========================================
// EXAM HISTORY
// ==========================================
export const getExamHistory = (): ExamResultRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveExamResult = (record: Omit<ExamResultRecord, "id" | "date">): ExamResultRecord[] => {
  if (typeof window === "undefined") return [];
  const history = getExamHistory();
  const newRecord: ExamResultRecord = {
    ...record,
    id: `exam_${Date.now()}`,
    date: new Date().toISOString(),
  };
  history.unshift(newRecord);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  // Reward XP based on exam score
  const xpReward = Math.round(record.score * 1.5) + (record.passed ? 100 : 25);
  addXP(xpReward);
  return history;
};

// ==========================================
// CUSTOM QUESTIONS & BACKUP
// ==========================================
export const getCustomGameQuestions = (): GameQuestion[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GAME_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getAllGameQuestions = (activePacket: PacketId): GameQuestion[] => {
  const custom = getCustomGameQuestions();
  const combined = [...initialGameQuestions, ...custom];
  if (activePacket === "shuffle") {
    return [...combined].sort(() => Math.random() - 0.5);
  }
  if (activePacket === "custom") {
    return custom.length > 0 ? custom : initialGameQuestions.filter((q) => q.packet === "A");
  }
  return combined.filter((q) => q.packet === activePacket);
};

export const importCustomQuestions = (questions: GameQuestion[]): number => {
  if (typeof window === "undefined") return 0;
  const current = getCustomGameQuestions();
  const merged = [...current];
  let addedCount = 0;
  questions.forEach((q) => {
    if (!merged.some((m) => m.id === q.id || m.question === q.question)) {
      merged.push({
        ...q,
        id: q.id || `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      });
      addedCount++;
    }
  });
  localStorage.setItem(CUSTOM_GAME_KEY, JSON.stringify(merged));
  return addedCount;
};

export const exportAllData = (): string => {
  if (typeof window === "undefined") return "{}";
  const bundle = {
    exportDate: new Date().toISOString(),
    app: "Zertiva B1 Personal Studio",
    version: "1.0",
    stats: getStoredStats(),
    fehlerbuch: getFehlerbuch(),
    examHistory: getExamHistory(),
    customGameQuestions: getCustomGameQuestions(),
  };
  return JSON.stringify(bundle, null, 2);
};

export const importAllData = (jsonStr: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.stats) localStorage.setItem(STATS_KEY, JSON.stringify(parsed.stats));
    if (parsed.fehlerbuch) localStorage.setItem(FEHLER_KEY, JSON.stringify(parsed.fehlerbuch));
    if (parsed.examHistory) localStorage.setItem(HISTORY_KEY, JSON.stringify(parsed.examHistory));
    if (parsed.customGameQuestions) localStorage.setItem(CUSTOM_GAME_KEY, JSON.stringify(parsed.customGameQuestions));
    return true;
  } catch {
    return false;
  }
};
