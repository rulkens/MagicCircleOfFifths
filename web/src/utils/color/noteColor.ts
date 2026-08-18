import type { PitchClass } from '../../@types/PitchClass';
import { POSITION_COUNT } from '../../data/scene';
import { NOTE_LIGHTNESS, NOTE_SATURATION } from '../../data/theme';
import { cofPosition } from '../../music/cofPosition';

/**
 * Colour for a pitch class, hued by where it sits on the circle.
 *
 * Keying the hue to circle position rather than to the chromatic scale means
 * neighbouring hues are a fifth apart, so a chord built in fifths reads as a
 * run of related colours and a chromatic clash reads as a clash.
 */
export function noteColor(pitchClass: PitchClass): string {
  const hue = (cofPosition(pitchClass) * 360) / POSITION_COUNT;
  return `hsl(${hue}, ${NOTE_SATURATION}%, ${NOTE_LIGHTNESS}%)`;
}
