# Mariposa: product requirements

## The problem

Duolingo's daily loop works. Five minutes, mixed modes, a streak. What it lacks is a reason to care about any given sentence. "The bear drinks beer" teaches a word and is forgotten by lunch.

Graded readers work the other way. A story you want to finish carries vocabulary on its back. What they lack is the daily loop and the drill.

## The idea

A serialized story, one chapter a day, that starts in English and becomes Spanish a few words at a time. Each chapter is followed by a handful of drills built only from that chapter. The story is the spaced repetition system.

The name: a caterpillar turns into a butterfly. The English turns into Spanish.

## Who it is for

One reader to start: Mark. Friends after that, by sending them the link. The site is public but it is not a product: no signup, no accounts, nothing collected.

## Core loop (one day)

1. Open the app. Today's chapter is on the home screen.
2. Read it. Three to five minutes. Spanish words are highlighted; tap one to see the English and, the first time, a one-line note.
3. Five or six drills from the chapter: fill the blank, reorder a phrase, answer a plot question in Spanish.
4. Done screen with the cliffhanger for tomorrow.

## How the weave works

- Every vocabulary item has a state per reader: new, learning, known.
- A word introduced in today's chapter is always shown in Spanish. Words from earlier chapters are Spanish once the reader has met them, English if not.
- Correct drill answers move a word toward known. Looking it up moves it back.
- Words a reader keeps missing are written into upcoming chapters. The schedule is invisible; it is just the plot.
- Weave order: cognate nouns, other nouns, adjectives, fixed phrases, present-tense verbs, clauses, whole paragraphs. Cognates go first so the ratio climbs fast in week one.

## Principles

- **The story has to be good.** If the plot is dull the mechanism is worthless.
- **The Spanish has to be right.** One wrong gender in a note costs more trust than ten features earn.
- **No guilt mechanics.** No streak-loss notifications, no hearts, no gems. The cliffhanger is the streak.
- **Progress you can feel.** Reread chapter 3 a month later and it is mostly Spanish now. That is the progress bar.
- **Small daily unit.** A chapter plus drills fits in the time it takes to drink a coffee.

## Not in scope for the MVP

- Speech (listening and shadowing). Planned; needs TTS.
- Personalized chapter generation. The MVP ships fixed chapters with a hand-tuned ramp.
- Accounts and sync. Progress is per device in localStorage.
- Any language other than English to Spanish.

## Success

Mark opens it twenty days in a row. If that holds, build the adaptive weave and the audio. If it does not, fix the story first.
