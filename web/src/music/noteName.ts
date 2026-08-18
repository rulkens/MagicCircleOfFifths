import { FLAT_NAMES, SHARP_NAMES } from '../data/noteNames';
import { pitchClassOf } from './pitchClassOf';

/** Letter name of a MIDI note, spelled to suit the key. */
export function noteName(note: number, useFlats: boolean): string {
  const names = useFlats ? FLAT_NAMES : SHARP_NAMES;
  return names[pitchClassOf(note)] as string;
}
