export type PacketId = "A" | "B" | "C" | "shuffle" | "custom";

export type Difficulty = "easy" | "medium" | "hard";

export interface GameQuestion {
  id: string;
  packet: "A" | "B" | "C";
  difficulty: Difficulty;
  category: "wortschatz" | "artikel" | "konnektoren" | "praepositionen" | "passiv_konjunktiv" | "satzbau";
  question: string;
  promptIndo: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  ruleTip?: string;
}

// LESEN
export interface LesenQuestion {
  id: string;
  teil: 1 | 2 | 3 | 4 | 5;
  questionNumber: number;
  questionText: string;
  options?: string[]; // for MC (A, B, C) or Ja/Nein / Richtig/Falsch
  correctAnswer: string;
  explanation: string;
  evidenceQuote?: string; // Text snippet that proves answer
}

export interface LesenTeil {
  teil: 1 | 2 | 3 | 4 | 5;
  title: string;
  instruction: string;
  textTitle?: string;
  readingText: string;
  matchingAds?: { id: string; title: string; text: string }[];
  matchingSituations?: { id: string; person: string; need: string; correctAdId: string }[];
  questions: LesenQuestion[];
}

export interface LesenPacket {
  packetId: "A" | "B" | "C";
  title: string;
  description: string;
  teile: LesenTeil[];
}

// HÖREN
export interface HorenQuestion {
  id: string;
  teil: 1 | 2 | 3 | 4;
  questionNumber: number;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface HorenTeil {
  teil: 1 | 2 | 3 | 4;
  title: string;
  instruction: string;
  playLimit: 1 | 2; // 1x or 2x as per Goethe B1 rules
  audioTranscript: string;
  audioSpeakers?: { name: string; text: string }[];
  questions: HorenQuestion[];
}

export interface HorenPacket {
  packetId: "A" | "B" | "C";
  title: string;
  description: string;
  teile: HorenTeil[];
}

// SCHREIBEN
export interface SchreibenAufgabe {
  aufgabeNumber: 1 | 2 | 3;
  type: "informell" | "meinung" | "formell";
  title: string;
  targetWords: number;
  minWords: number;
  maxWords: number;
  promptText: string;
  guidelines: string[];
  redemittel: { category: string; phrases: string[] }[];
  musterloesung: string;
}

export interface SchreibenPacket {
  packetId: "A" | "B" | "C";
  title: string;
  aufgaben: SchreibenAufgabe[];
}

// SPRECHEN
export interface SprechenTeil1 {
  title: string;
  scenario: string;
  taskPoints: string[];
  partnerDialogues: { prompt: string; partnerVoiceText: string; suggestedResponsePoints: string[] }[];
  redemittel: string[];
}

export interface SprechenTeil2Topic {
  id: string;
  topicTitle: string;
  slides: { slideNumber: number; slideTitle: string; guidePoints: string[] }[];
  musterVortrag: string;
  redemittel: { slide: string; phrases: string[] }[];
}

export interface SprechenTeil3 {
  title: string;
  instruction: string;
  partnerPresentationsSummary: string;
  feedbackTemplates: string[];
  examinerQuestions: { questionText: string; audioText: string; sampleAnswer: string }[];
}

export interface SprechenPacket {
  packetId: "A" | "B" | "C";
  title: string;
  teil1: SprechenTeil1;
  teil2Topics: SprechenTeil2Topic[];
  teil3: SprechenTeil3;
}

// FEHLERBUCH
export interface FehlerItem {
  id: string;
  source: "game" | "lesen" | "hoeren";
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  dateAdded: string;
  consecutiveCorrect: number; // 2x correct = mastered
  mastered: boolean;
}

// USER STATS & EXAM HISTORY
export interface ExamResultRecord {
  id: string;
  module: "lesen" | "hoeren" | "schreiben" | "sprechen";
  packetId: string;
  score: number; // 0 to 100
  totalQuestions: number;
  correctCount: number;
  passed: boolean; // >= 60
  date: string;
  details?: Record<string, string>;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastActiveDate: string;
  totalGameQuestionsAnswered: number;
  totalGameCorrect: number;
  activePacket: PacketId;
  zenMode: boolean;
}
