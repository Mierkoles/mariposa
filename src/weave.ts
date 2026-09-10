import type { Chapter, Progress, Segment, VocabEntry } from './types';
import { recordLookup, wordState } from './store';

/**
 * Decide whether a woven segment shows Spanish for this reader.
 * A word introduced in the current chapter is always Spanish (that is the
 * lesson). Otherwise it is Spanish once the reader has met it.
 */
export function showSpanish(p: Progress, chapter: Chapter, id: string): boolean {
  if (chapter.vocab.some((v) => v.id === id)) return true;
  return wordState(p, id) !== 'new';
}

export function renderSegments(
  segments: Segment[],
  chapter: Chapter,
  p: Progress,
  vocabIndex: Map<string, VocabEntry>,
): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const seg of segments) {
    if (typeof seg === 'string') {
      frag.append(seg);
      continue;
    }
    if (!showSpanish(p, chapter, seg.id)) {
      frag.append(seg.en);
      continue;
    }
    const entry = vocabIndex.get(seg.id);
    const isNew = chapter.vocab.some((v) => v.id === seg.id);
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'w' + (isNew ? ' w-new' : '') + (wordState(p, seg.id) === 'known' ? ' w-known' : '');
    el.textContent = seg.es;
    el.setAttribute('aria-label', `${seg.es}, tap for English`);
    el.addEventListener('click', () => reveal(el, seg.en, entry, p, seg.id));
    frag.append(el);
  }
  return frag;
}

/* ---------- gloss card ---------- */

let open: { card: HTMLElement; word: HTMLElement } | null = null;

/** Remove the open gloss, if any. Screens call this when they replace the page. */
export function closeGloss(): void {
  if (!open) return;
  open.card.remove();
  open.word.classList.remove('active');
  open = null;
}

document.addEventListener('click', (e) => {
  if (!open) return;
  const t = e.target as Node;
  if (open.card.contains(t) || open.word === t) return;
  closeGloss();
});
window.addEventListener('resize', closeGloss);

function reveal(
  el: HTMLElement,
  en: string,
  entry: VocabEntry | undefined,
  p: Progress,
  id: string,
): void {
  if (open && open.word === el) {
    closeGloss();
    return;
  }
  closeGloss();

  const card = document.createElement('div');
  card.className = 'gloss';
  card.setAttribute('role', 'status');
  const head = document.createElement('b');
  head.textContent = el.textContent ?? '';
  card.append(head, en);
  if (entry?.note && !el.dataset.noted) {
    const note = document.createElement('small');
    note.textContent = entry.note;
    card.append(note);
    el.dataset.noted = '1';
  }
  document.body.append(card);

  // Anchor under the word, centered, clamped to the viewport. The card is
  // positioned in document coordinates so it scrolls with the text.
  const r = el.getBoundingClientRect();
  const margin = 12;
  const vw = document.documentElement.clientWidth;
  const cw = card.offsetWidth;
  const center = r.left + r.width / 2;
  const left = Math.max(margin, Math.min(center - cw / 2, vw - margin - cw));
  card.style.left = `${left + window.scrollX}px`;
  card.style.top = `${r.bottom + window.scrollY + 8}px`;
  card.style.setProperty('--caret', `${center - left}px`);

  el.classList.add('active');
  open = { card, word: el };
  recordLookup(p, id);
}
