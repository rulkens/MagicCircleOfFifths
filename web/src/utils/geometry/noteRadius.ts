import {
  BAND_INNER_RADIUS,
  HIGHEST_OCTAVE,
  LOWEST_OCTAVE,
  OCTAVE_RING_STEP,
} from '../../data/scene';
import { octaveOf } from '../../music/octaveOf';

/**
 * How far from the centre a note sits: one ring per octave, ascending outwards.
 *
 * Pitch class already sets the angle, so the radius is free to carry the
 * octave — which is what separates a two-handed voicing into two rings instead
 * of collapsing it onto one, and what puts a note's overtones outside it.
 */
export function noteRadius(note: number): number {
  const octave = Math.min(HIGHEST_OCTAVE, Math.max(LOWEST_OCTAVE, octaveOf(note)));
  return BAND_INNER_RADIUS + (octave - LOWEST_OCTAVE) * OCTAVE_RING_STEP;
}
