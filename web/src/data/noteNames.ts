/**
 * Semitone → letter name, in both spellings.
 *
 * Which array a caller reads is a key-signature decision, not a note decision:
 * a flat key spells the black key between G and A as Ab, a sharp key as G#.
 * See music/prefersFlats.ts.
 */

export const SHARP_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export const FLAT_NAMES = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
] as const;
