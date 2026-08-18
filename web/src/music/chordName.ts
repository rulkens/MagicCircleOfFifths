import type { ChordMatch } from '../@types/ChordMatch';
import { noteName } from './noteName';

/** Renders a matched chord as a player would write it: 'Dm7', 'Ab', 'F#dim'. */
export function chordName(match: ChordMatch, useFlats: boolean): string {
  return `${noteName(match.root, useFlats)}${match.shape.symbol}`;
}
