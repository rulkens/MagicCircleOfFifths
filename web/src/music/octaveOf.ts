/**
 * Scientific pitch octave of a MIDI note: middle C (60) is C4.
 *
 * The −1 is the whole convention — MIDI note 0 is C−1, not C0 — and dropping it
 * shifts every octave label by one, which is the kind of error that looks
 * correct on screen until someone compares it with a score.
 */
export function octaveOf(note: number): number {
  return Math.floor(note / 12) - 1;
}
