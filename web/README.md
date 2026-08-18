# Magic Circle — web

A TypeScript/React rewrite of the Processing sketch, with time as a third axis:
the circle of fifths stands in the XY plane, and every note you play extrudes a
ribbon backwards along Z for as long as it sounds. Looked at head-on it reads as
the original 2D dial; orbit, and the last few seconds of playing are laid out
behind it.

```bash
npm install
npm run dev        # vite dev server
npm test           # vitest
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production bundle
```

## Playing it

Click **Connect MIDI** and play — Web MIDI needs a user gesture, so the button
is not optional. With no keyboard plugged in, the computer keys work as a
fallback piano: `A`–`;` are the white keys, the row above holds the black ones.

Display shortcuts are `n` notes, `c` chords, `v` overtones, `b` key structure,
`i` info, `z` presentation, and `1`–`7` for the modes, brightest first. They
differ from the original sketch's letters because the computer keyboard is now
also the piano, and most of the old ones are notes.

## How it is put together

```
src/
  @types/     one type per file
  data/       plain-data registries: chords, modes, note names, scene metrics
  music/      pure theory functions, one per file
  state/      RTK slices, selectors and sagas, per domain
  store/      store wiring: root reducer, root saga
  components/ presentational components; containers/ hold all store reach
  hooks/      typed store hooks, keyboard input
  utils/      pure helpers, one function per file
tests/        mirrors src/
```

Three ideas carry most of the design:

**One home for intent, everything else derived.** The store holds what the
player asked for (key, mode, toggles, time span) and the note events themselves.
Everything drawn is computed from those: which notes are sounding, what chord
they make, how they are spelled. There is no second copy of any of it to fall
out of step — see `state/analysis/selectors.ts`.

**A note's length is never stored.** A ribbon's depth and position are pure
functions of the event's timestamps and the current clock, written straight onto
the transform in `useFrame`. Holding a chord dispatches nothing; the store only
hears about key-downs, key-ups and the pedal.

**Registries, not switch statements.** Chords, modes, MIDI messages and keyboard
shortcuts are each a table. Adding a chord is a row in `data/chords.ts`; adding a
MIDI message is a row in `state/midi/toPerformanceAction.ts`, and the compiler
names the row you forgot.

The sustain pedal is why `NoteEvent` carries two end times: `releasedAt` is when
the key came up and `endedAt` when the sound stopped, and the pedal is the gap
between them. "Which notes are sounding" and "which keys are down" are then each
one filter over one list.

## Differences from the Processing sketch

The theory is the same; a few things were corrected on the way across.

- The circle-of-fifths positions and the key signatures were two hand-written
  tables in `COFNote.java`. Both are `(pitchClass * 7) % 12` — one derivation,
  in `music/cofPosition.ts`, so they can no longer disagree.
- Two chords in `COFChord.java` were mislabelled: `{0,4,6,10}` was called half
  diminished (it is a dominant 7♭5) and the real half-diminished shape was
  labelled `dim`. Both also shared the symbol `b5` with the diminished triad.
- Chord matching now ranks its results, asking the bass note first. The original
  returned matches in circle order, so an inversion could be named from the
  wrong root.
- Scale degrees are addressed by distance in fifths, which makes one table cover
  every mode — including Lydian's ♯IV and Locrian's ♭V, the same key on the
  keyboard spelled two ways.
- Octaves follow scientific pitch (MIDI 60 is C4).

## Tests

The suite covers the theory and the state machine, not the rendering: chord
naming (inversions, symmetrical chords, rootless voicings), key signatures and
scale degrees across every mode and tonic, the note lifecycle through the
sustain pedal, MIDI decoding, and that a shortcut key never collides with a
piano key.
