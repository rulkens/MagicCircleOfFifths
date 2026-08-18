/**
 * A pitch class: a note name stripped of its octave, as a semitone index from C.
 *
 * Kept as a plain number rather than a branded type — every consumer does
 * arithmetic on it, and a brand would only add casts at each of those sites.
 */
export type PitchClass = number;
