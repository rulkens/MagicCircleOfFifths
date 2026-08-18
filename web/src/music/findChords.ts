import type { ChordMatch } from '../@types/ChordMatch';
import type { PitchClass } from '../@types/PitchClass';
import { CHORD_SHAPES } from '../data/chords';
import { pitchClassOf } from './pitchClassOf';

/**
 * Every chord the sounding notes could be, best guess first.
 *
 * Each of the twelve roots is tried in turn and the notes re-read as intervals
 * above it; a shape matches when the two interval sets are identical. Several
 * answers are usually right at once — a diminished seventh is the same four
 * keys whichever of them you call the root, and C sus2 and G sus4 are the same
 * three — so the result is a ranked list and not a single name.
 *
 * Ranking asks the bass first: the lowest note is the strongest evidence a
 * listener has for which root they are hearing. Ties fall back to the ordering
 * of CHORD_SHAPES, where the common chords come first.
 */
const SHAPE_RANK = new Map<string, number>(CHORD_SHAPES.map((shape, index) => [shape.id, index]));

export function findChords(soundingNotes: readonly number[]): ChordMatch[] {
  const classes = [...new Set(soundingNotes.map(pitchClassOf))].sort((a, b) => a - b);
  if (classes.length < 3) return [];

  const bass = pitchClassOf(Math.min(...soundingNotes));
  const matches: ChordMatch[] = [];

  for (let root: PitchClass = 0; root < 12; root++) {
    const intervals = classes.map((pc) => (pc - root + 12) % 12).sort((a, b) => a - b);
    for (const shape of CHORD_SHAPES) {
      if (shape.intervals.length !== intervals.length) continue;
      if (shape.intervals.every((step, i) => step === intervals[i])) {
        matches.push({ root, shape, rootInBass: root === bass });
      }
    }
  }

  return matches.sort((a, b) => {
    if (a.rootInBass !== b.rootInBass) return a.rootInBass ? -1 : 1;
    return (SHAPE_RANK.get(a.shape.id) ?? 0) - (SHAPE_RANK.get(b.shape.id) ?? 0);
  });
}
