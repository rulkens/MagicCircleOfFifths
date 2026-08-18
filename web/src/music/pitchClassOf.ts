import type { PitchClass } from '../@types/PitchClass';

/** Strips the octave off a MIDI note, leaving 0 (C) through 11 (B). */
export function pitchClassOf(note: number): PitchClass {
  return ((note % 12) + 12) % 12;
}
