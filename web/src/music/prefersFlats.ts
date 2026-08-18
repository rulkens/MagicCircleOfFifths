/**
 * Whether a key spells its black keys as flats.
 *
 * C major (0) is deliberately on the sharp side of the line: with no
 * accidentals of its own, the ones it borrows are overwhelmingly raised —
 * the F# of a secondary dominant, not a Gb.
 */
export function prefersFlats(signature: number): boolean {
  return signature < 0;
}
