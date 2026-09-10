import type { Chapter, Progress, WordRecord, WordState } from './types';

const KEY = 'mariposa.progress.v1';

/** Correct drill answers in a row before a word is marked known. */
const KNOWN_AFTER = 3;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function empty(): Progress {
  return { completed: {}, words: {} };
}

export function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { completed: parsed.completed ?? {}, words: parsed.words ?? {} };
  } catch {
    return empty();
  }
}

export function save(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* private mode or quota; the session still works in memory */
  }
}

export function wordState(p: Progress, id: string): WordState {
  return p.words[id]?.state ?? 'new';
}

/** Every vocab item in a chapter moves from new to learning when the chapter opens. */
export function introduce(p: Progress, chapter: Chapter): void {
  const d = today();
  for (const v of chapter.vocab) {
    if (!p.words[v.id]) {
      const rec: WordRecord = { state: 'learning', lookups: 0, streak: 0, firstSeen: d, lastSeen: d };
      p.words[v.id] = rec;
    } else {
      p.words[v.id].lastSeen = d;
    }
  }
  save(p);
}

export function recordLookup(p: Progress, id: string): void {
  const rec = p.words[id];
  if (!rec) return;
  rec.lookups += 1;
  rec.streak = 0;
  if (rec.state === 'known') rec.state = 'learning';
  rec.lastSeen = today();
  save(p);
}

export function recordDrill(p: Progress, id: string | undefined, correct: boolean): void {
  if (!id) return;
  const rec = p.words[id];
  if (!rec) return;
  rec.lastSeen = today();
  if (correct) {
    rec.streak += 1;
    if (rec.streak >= KNOWN_AFTER) rec.state = 'known';
  } else {
    rec.streak = 0;
    rec.state = 'learning';
  }
  save(p);
}

export function complete(p: Progress, chapter: Chapter): void {
  p.completed[chapter.id] = today();
  save(p);
}

export function reset(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
