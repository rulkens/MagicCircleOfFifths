import {
  BAND_INNER_RADIUS,
  BAND_OUTER_RADIUS,
  HIGHEST_OCTAVE,
  LOWEST_OCTAVE,
} from '../../data/scene';
import { octaveOf } from '../../music/octaveOf';

/**
 * How far from the centre a note sits: register mapped to radius.
 *
 * Pitch class already sets the angle, so the radius is free to carry the
 * octave — which is what separates a two-handed voicing into two rings instead
 * of collapsing it onto one.
 */
export function noteRadius(note: number): number {
  const octave = Math.min(HIGHEST_OCTAVE, Math.max(LOWEST_OCTAVE, octaveOf(note)));
  const t = (octave - LOWEST_OCTAVE) / (HIGHEST_OCTAVE - LOWEST_OCTAVE);
  return BAND_INNER_RADIUS + t * (BAND_OUTER_RADIUS - BAND_INNER_RADIUS);
}
