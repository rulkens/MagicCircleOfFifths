/**
 * Roman numeral for a note, addressed by its distance in fifths from the tonic.
 *
 * Fifths rather than steps is what makes one table cover every mode: the note
 * three fifths below any tonic is its flat third, whether that tonic is playing
 * major, minor or phrygian. Reading a scale off the circle is then a run of
 * adjacent entries, and the chromatic notes either side name themselves.
 */
const DEGREE_BY_FIFTHS = [
  'bV', // −6
  'bII',
  'bVI',
  'bIII',
  'bVII',
  'IV',
  'I', // 0
  'V',
  'II',
  'VI',
  'III',
  'VII',
  '#IV', // +6
] as const;

export function scaleDegreeLabel(fifthsFromTonic: number): string | null {
  return DEGREE_BY_FIFTHS[fifthsFromTonic + 6] ?? null;
}
