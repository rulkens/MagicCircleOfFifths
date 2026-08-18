import type { ChordShape } from '../@types/ChordShape';

/**
 * The chord vocabulary, ordered most- to least-likely to be what a player meant.
 *
 * Order is load-bearing: a set of notes routinely matches several shapes at
 * several roots (a diminished seventh matches at all four of its notes; C sus2
 * and G sus4 are the same three keys), and ranking falls back to this order
 * once the bass note has had its say. Add a row where its likelihood puts it.
 *
 * Intervals are semitones above the root, ascending. Ninths appear as 2 rather
 * than 14 because matching happens on pitch classes — the player's octave
 * choice is not part of the chord's identity.
 */
export const CHORD_SHAPES = [
  { id: 'major', symbol: '', label: 'major', intervals: [0, 4, 7] },
  { id: 'minor', symbol: 'm', label: 'minor', intervals: [0, 3, 7] },
  { id: 'dom7', symbol: '7', label: 'dominant 7th', intervals: [0, 4, 7, 10] },
  { id: 'dim', symbol: 'dim', label: 'diminished', intervals: [0, 3, 6] },
  { id: 'aug', symbol: 'aug', label: 'augmented', intervals: [0, 4, 8] },
  { id: 'maj7', symbol: 'maj7', label: 'major 7th', intervals: [0, 4, 7, 11] },
  { id: 'min7', symbol: 'm7', label: 'minor 7th', intervals: [0, 3, 7, 10] },
  { id: 'sus2', symbol: 'sus2', label: 'suspended 2nd', intervals: [0, 2, 7] },
  { id: 'sus4', symbol: 'sus4', label: 'suspended 4th', intervals: [0, 5, 7] },
  { id: 'dim7', symbol: 'dim7', label: 'diminished 7th', intervals: [0, 3, 6, 9] },
  { id: 'min7flat5', symbol: 'm7b5', label: 'half diminished', intervals: [0, 3, 6, 10] },
  { id: 'dom7flat5', symbol: '7b5', label: 'dominant 7th flat 5', intervals: [0, 4, 6, 10] },
  { id: 'minmaj7', symbol: 'mMaj7', label: 'minor major 7th', intervals: [0, 3, 7, 11] },
  { id: 'maj9', symbol: 'maj9', label: 'major 9th', intervals: [0, 2, 4, 7, 11] },
  { id: 'min9', symbol: 'm9', label: 'minor 9th', intervals: [0, 2, 3, 7, 10] },
  { id: 'dom9', symbol: '9', label: 'dominant 9th', intervals: [0, 2, 4, 7, 10] },
  { id: 'majadd9', symbol: 'add9', label: 'major add 9th', intervals: [0, 2, 4, 7] },
  { id: 'minadd9', symbol: 'm add9', label: 'minor add 9th', intervals: [0, 2, 3, 7] },
  { id: 'six9', symbol: '69', label: 'six nine', intervals: [0, 2, 4, 7, 9] },
  // Rootless-fifth voicings: common in two-handed piano, where the bass hand
  // carries the fifth and the right hand drops it.
  { id: 'maj7no5', symbol: 'maj7', label: 'major 7th (no 5th)', intervals: [0, 4, 11] },
  { id: 'min7no5', symbol: 'm7', label: 'minor 7th (no 5th)', intervals: [0, 3, 10] },
  { id: 'dom7no5', symbol: '7', label: 'dominant 7th (no 5th)', intervals: [0, 4, 10] },
] as const satisfies readonly ChordShape[];
