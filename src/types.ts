/** Content schema for Mariposa chapters. See docs/CONTENT-GUIDE.md. */

export type PartOfSpeech =
  | 'noun'
  | 'adj'
  | 'verb'
  | 'adv'
  | 'phrase'
  | 'prep'
  | 'pron'
  | 'conj';

/** A vocabulary item introduced by a chapter. `id` is stable across chapters. */
export interface VocabEntry {
  id: string;
  es: string;
  en: string;
  pos: PartOfSpeech;
  /** True when the Spanish is an obvious cognate of the English. Weaves in first. */
  cognate?: boolean;
  /** One-line, just-in-time grammar or usage note. Shown on first tap. */
  note?: string;
}

/**
 * A run of prose. A plain string is always shown as written.
 * A woven segment renders in Spanish or English depending on the reader's
 * state for `id`. `es` and `en` carry the inflected form for this occurrence
 * (e.g. "las vacas" vs "the cows"), so the vocab entry stays the lemma.
 */
export type Segment = string | { id: string; es: string; en: string };

export type Drill =
  | {
      type: 'choose';
      /** Prompt with a blank rendered as ___ . May contain woven segments. */
      prompt: Segment[];
      options: string[];
      answer: number;
      /** Vocab id the drill exercises. Drives word state. */
      vocab: string;
    }
  | {
      type: 'reorder';
      /** Correct order of tokens. Shuffled at render time. */
      tokens: string[];
      /** English hint shown above the tiles. */
      hint: string;
      vocab?: string;
    }
  | {
      type: 'comprehend';
      /** Question, usually in Spanish, may contain woven segments. */
      question: Segment[];
      options: string[];
      answer: number;
    };

export interface Chapter {
  id: string;
  number: number;
  title: { es: string; en: string };
  /** Weave level 1..10. See docs/CONTENT-GUIDE.md for what each level allows. */
  level: number;
  /** Where and when the chapter happens, for the header line ("Florida", "abril de 1528"). */
  place?: string;
  date?: string;
  vocab: VocabEntry[];
  paragraphs: Segment[][];
  drills: Drill[];
  /** Optional cliffhanger line shown on the done screen. */
  hook?: string;
}

export type WordState = 'new' | 'learning' | 'known';

export interface WordRecord {
  state: WordState;
  /** Times the reader tapped to reveal the English. */
  lookups: number;
  /** Consecutive correct drill answers. Resets on a miss. */
  streak: number;
  firstSeen: string; // ISO date
  lastSeen: string; // ISO date
}

export interface Progress {
  /** chapter id -> ISO date completed */
  completed: Record<string, string>;
  words: Record<string, WordRecord>;
}
