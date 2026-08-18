import type { Mode } from '../@types/Mode';
import type { PitchClass } from '../@types/PitchClass';
import { cofPosition } from './cofPosition';

/**
 * Accidentals in a key: positive is sharps, negative is flats, 0 is C major.
 *
 * A key's position on the circle of fifths *is* its accidental count, once the
 * count is centred: C sits at position 0, and every clockwise step adds a sharp
 * until the far side of the circle is cheaper to spell with flats. The wrap at
 * 6 sharps is the enharmonic choice — F# major (6♯) stays sharp, C# major (7♯)
 * comes back as Db (5♭) — which keeps the result readable on a stave.
 */
export function keySignature(tonic: PitchClass, mode: Mode): number {
  const fifths = cofPosition(tonic) + mode.fifthsFromMajor;
  return ((((fifths + 5) % 12) + 12) % 12) - 5;
}
