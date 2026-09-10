import type { Chapter, Drill, Progress, VocabEntry } from './types';
import { recordDrill } from './store';
import { renderSegments } from './weave';

export interface DrillResult {
  correct: boolean;
}

type Done = (r: DrillResult) => void;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Fixed bar at the bottom of the viewport, so the answer tiles do not move. */
function feedback(root: HTMLElement, correct: boolean, answerText: string, onNext: () => void): void {
  const box = document.createElement('div');
  box.className = 'feedback ' + (correct ? 'ok' : 'miss');
  const inner = document.createElement('div');
  inner.className = 'inner';
  const msg = document.createElement('p');
  const verdict = document.createElement('span');
  verdict.className = 'verdict';
  verdict.textContent = correct ? '¡Bien!' : 'No.';
  msg.append(verdict);
  if (!correct) {
    const ans = document.createElement('em');
    ans.textContent = answerText;
    msg.append(' ', ans);
  }
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'primary';
  next.textContent = 'Continue';
  next.addEventListener('click', onNext);
  inner.append(msg, next);
  box.append(inner);
  root.append(box);
  next.focus();
}

export function renderDrill(
  drill: Drill,
  chapter: Chapter,
  p: Progress,
  vocabIndex: Map<string, VocabEntry>,
  done: Done,
): HTMLElement {
  const root = document.createElement('section');
  root.className = 'drill';
  switch (drill.type) {
    case 'choose':
      return choose(root, drill, chapter, p, vocabIndex, done);
    case 'reorder':
      return reorder(root, drill, p, done);
    case 'comprehend':
      return comprehend(root, drill, chapter, p, vocabIndex, done);
  }
}

function choose(
  root: HTMLElement,
  d: Extract<Drill, { type: 'choose' }>,
  chapter: Chapter,
  p: Progress,
  vocabIndex: Map<string, VocabEntry>,
  done: Done,
): HTMLElement {
  const prompt = document.createElement('p');
  prompt.className = 'prompt';
  prompt.append(renderSegments(d.prompt, chapter, p, vocabIndex));
  root.append(prompt);

  const list = document.createElement('div');
  list.className = 'options';
  const order = shuffle(d.options.map((_, i) => i));
  let answered = false;
  for (const i of order) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = d.options[i];
    b.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const correct = i === d.answer;
      b.classList.add(correct ? 'ok' : 'miss');
      list.querySelectorAll('button').forEach((x, idx) => {
        x.disabled = true;
        if (order[idx] === d.answer) x.classList.add('ok');
      });
      recordDrill(p, d.vocab, correct);
      feedback(root, correct, d.options[d.answer], () => done({ correct }));
    });
    list.append(b);
  }
  root.append(list);
  return root;
}

function reorder(
  root: HTMLElement,
  d: Extract<Drill, { type: 'reorder' }>,
  p: Progress,
  done: Done,
): HTMLElement {
  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent = d.hint;
  const answer = document.createElement('div');
  answer.className = 'answer-row';
  const bank = document.createElement('div');
  bank.className = 'bank';
  const check = document.createElement('button');
  check.type = 'button';
  check.className = 'primary';
  check.textContent = 'Check';
  check.disabled = true;

  const picked: string[] = [];
  const tiles = shuffle(d.tokens.map((t, i) => ({ t, i })));
  for (const tile of tiles) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = tile.t;
    b.addEventListener('click', () => {
      if (b.parentElement === bank) {
        picked.push(tile.t);
        answer.append(b);
      } else {
        picked.splice(picked.indexOf(tile.t), 1);
        bank.append(b);
      }
      check.disabled = picked.length !== d.tokens.length;
    });
    bank.append(b);
  }

  check.addEventListener('click', () => {
    const correct = picked.join(' ') === d.tokens.join(' ');
    check.hidden = true;
    answer.querySelectorAll('button').forEach((x) => (x.disabled = true));
    bank.querySelectorAll('button').forEach((x) => (x.disabled = true));
    recordDrill(p, d.vocab, correct);
    feedback(root, correct, d.tokens.join(' '), () => done({ correct }));
  });

  root.append(hint, answer, bank, check);
  return root;
}

function comprehend(
  root: HTMLElement,
  d: Extract<Drill, { type: 'comprehend' }>,
  chapter: Chapter,
  p: Progress,
  vocabIndex: Map<string, VocabEntry>,
  done: Done,
): HTMLElement {
  const q = document.createElement('p');
  q.className = 'prompt';
  q.append(renderSegments(d.question, chapter, p, vocabIndex));
  root.append(q);
  const list = document.createElement('div');
  list.className = 'options';
  let answered = false;
  d.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = opt;
    b.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const correct = i === d.answer;
      list.querySelectorAll('button').forEach((x, idx) => {
        x.disabled = true;
        if (idx === d.answer) x.classList.add('ok');
      });
      if (!correct) b.classList.add('miss');
      feedback(root, correct, d.options[d.answer], () => done({ correct }));
    });
    list.append(b);
  });
  root.append(list);
  return root;
}
