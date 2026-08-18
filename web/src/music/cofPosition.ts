import type { PitchClass } from '../@types/PitchClass';

/**
 * Where a pitch class sits on the circle of fifths: 0 for C, clockwise to 11 for F.
 *
 * Multiplying by 7 is what a fifth *is* — seven semitones — so the circle is a
 * derivation, not a table. The original sketch carried a hand-written lookup
 * beside a second hand-written table of key signatures; both are this one line,
 * and neither can now drift from it.
 */
export function cofPosition(pitchClass: PitchClass): number {
  return (pitchClass * 7) % 12;
}
