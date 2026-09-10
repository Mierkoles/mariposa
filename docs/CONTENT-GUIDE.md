# Writing a chapter

The Spanish must be correct. Everything else in this guide is secondary to that. When in doubt, use fewer Spanish words and get them right.

## The story so far

Season one is **Naufragios**, an adaptation of Cabeza de Vaca's *Relación* (1542). The story bible, cast, sources, and the full beat outline are in `STORY.md`. Read it first; this table only tracks what has been written.

**Narrator:** Álvar Núñez Cabeza de Vaca, treasurer of the Narváez expedition. First person, present tense.
**Where we are:** April 1528, the west coast of Florida. The expedition has just landed.

Keep a running summary here as chapters are added, so the next chapter can be written without rereading everything. Mark anything not in the source `(invented)`.

| Ch | Title | Level | Beat (STORY.md) | New words | Notes |
|---|---|---|---|---|---|
| 1 | Cabeza de Vaca | 1 | 1 | 11 (8 cognates + cabeza, vaca, oro) | Name, treasurer, Narváez's eye, the gold rattle, the argument on the beach. Family legend of the cow skull is the family's own tradition, not the *Relación*. |

## Weave levels

The level says what kinds of things may appear in Spanish. Each level includes everything below it.

| Level | Spanish may include | Chapters (see STORY.md arcs) |
|---|---|---|
| 1 | Cognate nouns, plus one or two high-value non-cognate nouns | 1 to 13 |
| 2 | Any concrete noun; articles start attaching (el/la/los/las) | 14 to 30 |
| 3 | Adjectives after nouns; fixed phrases (buenos días, no hay agua, un momento) | 31 to 35 |
| 4 | Present-tense verbs in short clauses (camino, tengo hambre, duermo en la arena) | 36 to 60 |
| 5 | Full sentences; preterite for narration; dialogue fully Spanish | 61 to 76 |
| 6 | Paragraphs in Spanish with English only for genuinely new material; modernized passages of the 1542 text | 77 to 90 |

Do not skip levels. A word that appears woven must have been introduced in this chapter or an earlier one. Track this in the table above and in each chapter's `vocab`.

## Chapter rules

- 250 to 400 words of prose. Three to five minutes to read.
- At most 12 new vocab items. Cognates count as half.
- Every new word appears at least twice in the chapter.
- At least two words from the previous three chapters must reappear (this is the manual SRS until it is automated).
- End on a hook. Put it in the `hook` field as a one-line teaser for tomorrow.
- Five or six drills: two `choose`, two `reorder`, one or two `comprehend`. Every drill uses only words the reader has met.
- `comprehend` questions are in Spanish, use woven segments for vocab, and test the plot, not translation.
- Notes are one line and answer the question a learner would actually ask on first sight (gender, false friend, why the article is missing). No grammar lectures.
- Every chapter advances by at least one beat from the outline in `STORY.md`. Numbers, dates, names, and places come from the source exactly or not at all. Dialogue, interior, and texture are ours; mark inventions in the table above.

## File format

`content/chapters/chNN.json`. See `src/types.ts` for the schema and `ch01.json` for a complete example.

- `id`: `chNN`.
- `vocab[].id`: lowercase, no accents, the lemma (`recepcion`, `problema`). Stable forever.
- Segments: `"plain english"` or `{ "id": "llave", "es": "llave", "en": "key" }`. Put the inflected form for that spot in `es`/`en`; keep capitalization matching the position in the sentence.
- Punctuation stays in the plain strings, outside the woven segment, except where it is part of a reorder token.

Run `npm run build` after adding a chapter. The type-check will catch a malformed file.

## Generation prompt

Use this with Claude when drafting a chapter. Review the Spanish before committing. Do not let the model invent vocab ids; give it the list of existing ids.

```
You are writing chapter {N} of "Naufragios", a serialized adaptation of Cabeza de Vaca's
Relación (1542) used to teach Spanish by the diglot weave method. Prose is English with
Spanish words woven in. First person, present tense, Cabeza de Vaca narrating.

Story so far:
{running summary table from CONTENT-GUIDE.md}

This chapter's beat, from STORY.md:
{paste the numbered beat}

Historical rule: every date, number, name, and place must come from the beat or the
Relación. Do not invent facts. Dialogue and interior are yours; if you add a named
person or an event not in the beat, mark it (invented) in a comment after the JSON.

Weave level for this chapter: {level}. Rules for that level:
{paste the row from the levels table}

Vocabulary the reader already knows (may be woven freely, use these exact ids):
{list of id: es (en)}

Words that must reappear in this chapter (due for review):
{list}

Write the chapter as JSON matching this TypeScript schema:
{paste Chapter, Segment, VocabEntry, Drill from src/types.ts}

Constraints:
- 250 to 400 words of prose across 4 to 6 paragraphs.
- Introduce at most {K} new vocab items, preferring cognates at low levels.
- Every new word appears at least twice.
- Vocab ids are lowercase lemmas with no accents. Do not reuse an existing id for a different word.
- Segments carry the inflected form for that spot; punctuation stays outside woven segments.
- 5 or 6 drills: two choose, two reorder, one or two comprehend. Drills use only known or newly introduced words.
- comprehend questions are in Spanish and test the plot.
- Notes: one line, only when a learner would actually wonder (gender, false friend, article).
- End on a hook and put a one-line teaser in "hook".
- Advance the story by the beat given. No filler. Do not explain the wonders.

Output only the JSON.
```

After generating: read every Spanish string aloud. Check gender agreement, accents, and that each `en` is what that word means in this sentence, not the dictionary headword.
