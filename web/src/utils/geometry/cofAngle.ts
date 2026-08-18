import type { PitchClass } from '../../@types/PitchClass';
import { POSITION_COUNT } from '../../data/scene';
import { cofPosition } from '../../music/cofPosition';

/**
 * Angle of a pitch class on the circle, in radians clockwise from the top.
 *
 * Clockwise because that is the direction the sharps run, and the top is C —
 * both are what a musician expects to find when they glance at the thing.
 */
export function cofAngle(pitchClass: PitchClass): number {
  return (cofPosition(pitchClass) * 2 * Math.PI) / POSITION_COUNT;
}
