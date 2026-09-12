// Report each chapter's Spanish share and level against the weave ramp.
// Usage: npm run weave
// The ramp is defined in docs/CONTENT-GUIDE.md. Keep these numbers in sync with it.
import { readdirSync, readFileSync } from 'node:fs';

const TOLERANCE = 3;
const LEVEL_STARTS = [1, 10, 19, 28, 36, 45, 54, 61, 71, 80];

const targetShare = (n) => Math.min(95, 6 + n);
const targetLevel = (n) => LEVEL_STARTS.filter((s) => s <= n).length;
const words = (s) => s.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;

const dir = new URL('../content/chapters/', import.meta.url);
const files = readdirSync(dir)
  .filter((f) => /^ch\d+\.json$/.test(f))
  .sort();

let misses = 0;
console.log('ch  words  es%  target  level');
for (const f of files) {
  const ch = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
  let es = 0;
  let all = 0;
  for (const p of ch.paragraphs) {
    for (const seg of p) {
      const n = words(typeof seg === 'string' ? seg : seg.es);
      all += n;
      if (typeof seg !== 'string') es += n;
    }
  }
  const share = Math.round((100 * es) / all);
  const t = targetShare(ch.number);
  const lv = targetLevel(ch.number);
  const notes = [];
  if (Math.abs(share - t) > TOLERANCE) notes.push(`share off target by ${share - t}`);
  if (ch.level !== lv) notes.push(`ramp says level ${lv}`);
  if (notes.length) misses++;
  console.log(
    `${String(ch.number).padStart(2)}  ${String(all).padStart(5)}  ${String(share).padStart(3)}%  ${String(t).padStart(5)}%  ${String(ch.level).padStart(5)}` +
      (notes.length ? `  <-- ${notes.join('; ')}` : ''),
  );
}
if (misses) {
  console.log(`\n${misses} chapter(s) off the ramp.`);
  process.exitCode = 1;
}
