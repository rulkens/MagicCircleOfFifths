import type { Mode } from '../@types/Mode';
import type { ModeId } from '../@types/ModeId';

/**
 * The seven diatonic modes, brightest first.
 *
 * Listed in circle-of-fifths order rather than the usual Ionian-first order, so
 * `fifthsFromMajor` descends by exactly one per row — the ordering is the data.
 */
export const MODES = [
  { id: 'lydian', label: 'Lydian', fifthsFromMajor: 1 },
  { id: 'major', label: 'Major', fifthsFromMajor: 0 },
  { id: 'mixolydian', label: 'Mixolydian', fifthsFromMajor: -1 },
  { id: 'dorian', label: 'Dorian', fifthsFromMajor: -2 },
  { id: 'minor', label: 'Minor', fifthsFromMajor: -3 },
  { id: 'phrygian', label: 'Phrygian', fifthsFromMajor: -4 },
  { id: 'locrian', label: 'Locrian', fifthsFromMajor: -5 },
] as const satisfies readonly Mode[];

export const MODE_BY_ID = Object.fromEntries(MODES.map((m) => [m.id, m])) as Readonly<
  Record<ModeId, Mode>
>;
