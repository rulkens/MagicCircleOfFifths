import type { Mode } from '../@types/Mode';
import type { PitchClass } from '../@types/PitchClass';
import { cofPosition } from './cofPosition';

/**
 * Distance from the tonic in fifths, signed: the sharp side positive, the flat
 * side counter-clockwise and negative.
 *
 * The mode is an input because a distance of six fifths and one of minus six
 * land on the same key, and only the mode says which one it is: the note a
 * tritone above a lydian tonic is its sharp fourth, while the same key under a
 * locrian tonic is its flat fifth. Answering that with a fixed range would
 * mis-spell one of the two modes no matter which end it favoured, so the range
 * is centred on the key's own seven notes.
 */
export function fifthsFromTonic(pitchClass: PitchClass, tonic: PitchClass, mode: Mode): number {
  const centre = mode.fifthsFromMajor + 2;
  const steps = cofPosition(pitchClass) - cofPosition(tonic);
  return ((((steps - centre + 6) % 12) + 12) % 12) - 6 + centre;
}
