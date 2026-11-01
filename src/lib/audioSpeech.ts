"use client";

export interface SpeechPlayerOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  onSentenceChange?: (index: number, total: number) => void;
  rate?: number;
}

class BulletproofSpeechPlayer {
  private isSpeaking: boolean = false;
  private isManualStop: boolean = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private cachedGermanVoice: SpeechSynthesisVoice | null = null;
  private sentenceQueue: string[] = [];
  private currentSentenceIdx: number = 0;
  private activeOptions: SpeechPlayerOptions = {};

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  private initVoices(): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize high-quality German native voices
    const deVoice =
      voices.find((v) => v.lang === "de-DE" && !v.name.includes("Mobile")) ||
      voices.find((v) => v.lang === "de-DE") ||
      voices.find((v) => v.lang.startsWith("de")) ||
      null;
    this.cachedGermanVoice = deVoice;
  }

  public getVoice(): SpeechSynthesisVoice | null {
    if (!this.cachedGermanVoice) {
      this.initVoices();
    }
    return this.cachedGermanVoice;
  }

  // Split text into natural sentences to prevent mobile browsers cutting off long speech (> 15s)
  private splitIntoSentences(text: string): string[] {
    const sanitized = text
      .replace(/Dr\.\s+/g, "Dr.__SPACE__")
      .replace(/z\.B\.\s+/g, "z.B.__SPACE__")
      .replace(/bzw\.\s+/g, "bzw.__SPACE__")
      .replace(/ca\.\s+/g, "ca.__SPACE__")
      .replace(/Hr\.\s+/g, "Hr.__SPACE__")
      .replace(/Fr\.\s+/g, "Fr.__SPACE__");

    const raw = sanitized
      .split(/(?<=[.?!])\s+|\n+/)
      .map((s) => s.replace(/__SPACE__/g, " ").trim())
      .filter((s) => s.length > 0);
    return raw.length > 0 ? raw : [text];
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    // Mobile browsers (Chromium / Safari) pause speechSynthesis after 15s. This heartbeat keeps it alive.
    this.heartbeatInterval = setInterval(() => {
      if (typeof window !== "undefined" && window.speechSynthesis && this.isSpeaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  public speak(text: string, options: SpeechPlayerOptions = {}): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      options.onError?.("Browser tidak mendukung Speech Synthesis");
      return;
    }

    this.stop(); // Stop any existing playback

    this.activeOptions = options;
    this.sentenceQueue = this.splitIntoSentences(text);
    this.currentSentenceIdx = 0;
    this.isSpeaking = true;
    this.isManualStop = false;
    this.startHeartbeat();

    options.onStart?.();
    this.playNextSentence();
  }

  private playNextSentence(): void {
    if (!this.isSpeaking || this.isManualStop || this.currentSentenceIdx >= this.sentenceQueue.length) {
      this.finishPlayback();
      return;
    }

    const sentence = this.sentenceQueue[this.currentSentenceIdx];
    this.activeOptions.onSentenceChange?.(this.currentSentenceIdx + 1, this.sentenceQueue.length);

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "de-DE";
    utterance.rate = this.activeOptions.rate || 1.0;

    const voice = this.getVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      if (!this.isSpeaking || this.isManualStop) return;
      this.currentSentenceIdx += 1;
      this.playNextSentence();
    };

    utterance.onerror = (e) => {
      if (!this.isSpeaking || this.isManualStop) return;
      this.activeOptions.onError?.(e);
      this.finishPlayback();
    };

    window.speechSynthesis.speak(utterance);
  }

  private finishPlayback(): void {
    const wasNaturalEnd = this.isSpeaking && !this.isManualStop;
    this.isSpeaking = false;
    this.isManualStop = false;
    this.stopHeartbeat();
    if (wasNaturalEnd) {
      this.activeOptions.onEnd?.();
    }
  }

  public stop(): void {
    this.isManualStop = true;
    this.isSpeaking = false;
    this.stopHeartbeat();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechPlayer = new BulletproofSpeechPlayer();
