import '@fontsource/eb-garamond/latin-500.css';
import '@fontsource/eb-garamond/latin-500-italic.css';
import '@fontsource/eb-garamond/latin-600.css';
import './style.css';
import type { Chapter, Progress } from './types';
import { chapters, season, vocabIndex } from './content';
import * as store from './store';
import { closeGloss, renderSegments } from './weave';
import { renderDrill } from './drills';

const app = document.getElementById('app')!;
const progress: Progress = store.load();

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & { className?: string } = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  Object.assign(el, props);
  el.append(...children);
  return el;
}

function screen(...children: (Node | string)[]): void {
  closeGloss();
  app.replaceChildren(h('main', { className: 'screen' }, ...children));
  window.scrollTo(0, 0);
}

function nextChapter(): Chapter | undefined {
  return chapters.find((c) => !progress.completed[c.id]);
}

function stats(): { learning: number; known: number } {
  let learning = 0;
  let known = 0;
  for (const w of Object.values(progress.words)) {
    if (w.state === 'known') known++;
    else if (w.state === 'learning') learning++;
  }
  return { learning, known };
}

/* ---------- chrome ---------- */

function roman(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of table) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

/** "Capítulo I · Florida, abril de 1528" */
function eyebrowFor(c: Chapter): string {
  const where = [c.place, c.date].filter(Boolean).join(', ');
  return `Capítulo ${roman(c.number)}` + (where ? ` · ${where}` : '');
}

function ornament(): HTMLElement {
  return h('div', { className: 'rule' }, h('span', {}, '❦'));
}

/* ---------- screens ---------- */

function home(): void {
  const next = nextChapter();
  const s = stats();
  const done = chapters.filter((c) => progress.completed[c.id]);

  const header = h(
    'header',
    { className: 'brand' },
    h('h1', {}, 'Mariposa'),
    h('p', { className: 'season' }, season.title),
    h('p', { className: 'tag' }, 'Poco a poco.'),
  );

  const day = Math.min(done.length + 1, season.chapters);
  const place = next?.place ?? done[done.length - 1]?.place;
  const fill = h('i');
  fill.style.width = `${(done.length / season.chapters) * 100}%`;
  const journey = h(
    'section',
    { className: 'journey' },
    h('p', {}, `Día ${day} de ${season.chapters}` + (place ? ` · ${place}` : '')),
    h('div', { className: 'bar' }, fill),
  );

  const card = next
    ? h(
        'section',
        { className: 'card' },
        h('p', { className: 'eyebrow' }, eyebrowFor(next)),
        h('h2', {}, next.title.es),
        h('p', { className: 'muted' }, next.title.en),
        h('button', { className: 'primary', onclick: () => read(next) }, 'Read today’s chapter'),
      )
    : h(
        'section',
        { className: 'card' },
        h('h2', {}, 'You are caught up.'),
        h('p', { className: 'muted' }, 'The next chapter is not written yet.'),
      );

  const words = h('p', { className: 'stats' }, `${s.known} known · ${s.learning} learning`);

  const rewind = done.length
    ? h(
        'section',
        { className: 'rewind' },
        h('h3', {}, 'Rewind'),
        ...done.map((c) =>
          h(
            'button',
            { className: 'link row', onclick: () => read(c, true) },
            h('span', {}, `${roman(c.number)}. ${c.title.es}`),
            h('span', { className: 'when' }, progress.completed[c.id]),
          ),
        ),
      )
    : '';

  const foot = h(
    'footer',
    {},
    h(
      'button',
      {
        className: 'link subtle',
        onclick: () => {
          if (confirm('Reset all progress?')) {
            store.reset();
            location.reload();
          }
        },
      },
      'Reset progress',
    ),
  );

  screen(header, journey, card, words, rewind, foot);
}

function read(chapter: Chapter, rewind = false): void {
  store.introduce(progress, chapter);
  const title = h(
    'header',
    {},
    h('p', { className: 'eyebrow' }, eyebrowFor(chapter)),
    h('h2', {}, chapter.title.es),
    ornament(),
  );
  const body = h('article', { className: 'story' });
  for (const para of chapter.paragraphs) {
    const pEl = document.createElement('p');
    pEl.append(renderSegments(para, chapter, progress, vocabIndex));
    body.append(pEl);
  }
  const tip = h('p', { className: 'muted small' }, 'Tap a red word to see the English.');
  const cta = rewind
    ? h('button', { className: 'primary', onclick: home }, 'Back')
    : h('button', { className: 'primary', onclick: () => drills(chapter) }, 'Continue to drills');
  screen(title, body, tip, cta);
}

function drills(chapter: Chapter): void {
  let i = 0;
  let correct = 0;
  const step = (): void => {
    if (i >= chapter.drills.length) {
      finish(chapter, correct);
      return;
    }
    const progressBar = h('p', { className: 'eyebrow' }, `Ejercicio ${i + 1} de ${chapter.drills.length}`);
    const el = renderDrill(chapter.drills[i], chapter, progress, vocabIndex, (r) => {
      if (r.correct) correct++;
      i++;
      step();
    });
    screen(progressBar, el);
  };
  step();
}

function finish(chapter: Chapter, correct: number): void {
  store.complete(progress, chapter);
  const s = stats();
  screen(
    h('header', {}, h('p', { className: 'eyebrow' }, 'Fin del capítulo'), h('h2', {}, '¡Listo!')),
    h('p', { className: 'score' }, `${correct} of ${chapter.drills.length} correct.`),
    h('p', { className: 'stats' }, `${s.known} known · ${s.learning} learning`),
    ornament(),
    chapter.hook ? h('p', { className: 'hook' }, chapter.hook) : '',
    chapter.hook ? ornament() : '',
    h('button', { className: 'primary', onclick: home }, 'Done for today'),
  );
}

home();
