import type { Chapter, VocabEntry } from './types';

/** Season metadata for the home screen. The planned length drives the journey line. */
export const season = { title: 'Naufragios', chapters: 90 };

const modules = import.meta.glob<{ default: Chapter }>('../content/chapters/*.json', { eager: true });

export const chapters: Chapter[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.number - b.number);

/** Every vocab entry across all chapters, keyed by id. First definition wins. */
export const vocabIndex: Map<string, VocabEntry> = new Map();
for (const ch of chapters) {
  for (const v of ch.vocab) {
    if (!vocabIndex.has(v.id)) vocabIndex.set(v.id, v);
  }
}
