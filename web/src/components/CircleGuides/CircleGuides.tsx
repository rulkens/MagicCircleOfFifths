/**
 * CircleGuides — the dial the notes are read against: one ring per octave and
 * twelve spokes.
 *
 * Drawn once and never animated. Spokes in the current key are brighter, which
 * is what turns an abstract wheel into "this is where the key lives".
 */

import { Line } from '@react-three/drei';
import type { ReactNode } from 'react';
import type { Mode } from '../../@types/Mode';
import type { PitchClass } from '../../@types/PitchClass';
import {
  BAND_INNER_RADIUS,
  BAND_OUTER_RADIUS,
  HIGHEST_OCTAVE,
  LOWEST_OCTAVE,
  OCTAVE_RING_STEP,
  POSITION_COUNT,
} from '../../data/scene';
import { GUIDE_COLOR, GUIDE_COLOR_IN_KEY } from '../../data/theme';
import { fifthsFromTonic } from '../../music/fifthsFromTonic';
import { isDiatonic } from '../../music/isDiatonic';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { pointOnCircle } from '../../utils/geometry/pointOnCircle';

export type CircleGuidesProps = {
  readonly tonic: PitchClass;
  readonly mode: Mode;
  readonly highlightKey: boolean;
};

const PITCH_CLASSES: readonly PitchClass[] = Array.from({ length: POSITION_COUNT }, (_, i) => i);

const OCTAVE_RINGS: readonly number[] = Array.from(
  { length: HIGHEST_OCTAVE - LOWEST_OCTAVE + 2 },
  (_, i) => BAND_INNER_RADIUS + (i - 0.5) * OCTAVE_RING_STEP,
);

const RING_SEGMENTS = 96;

function ringPoints(radius: number): [number, number, number][] {
  return Array.from({ length: RING_SEGMENTS + 1 }, (_, i) => {
    const [x, y] = pointOnCircle((i / RING_SEGMENTS) * Math.PI * 2, radius);
    return [x, y, 0];
  });
}

const SPOKE_INNER = BAND_INNER_RADIUS - OCTAVE_RING_STEP / 2;
const SPOKE_OUTER = BAND_OUTER_RADIUS + OCTAVE_RING_STEP / 2;

function CircleGuides({ tonic, mode, highlightKey }: CircleGuidesProps): ReactNode {
  return (
    <group>
      {OCTAVE_RINGS.map((radius) => (
        <Line key={radius} points={ringPoints(radius)} color={GUIDE_COLOR} lineWidth={1} />
      ))}
      {PITCH_CLASSES.map((pitchClass) => {
        const angle = cofAngle(pitchClass);
        const [ix, iy] = pointOnCircle(angle, SPOKE_INNER);
        const [ox, oy] = pointOnCircle(angle, SPOKE_OUTER);
        const inKey = isDiatonic(fifthsFromTonic(pitchClass, tonic, mode), mode);
        return (
          <Line
            key={pitchClass}
            points={[
              [ix, iy, 0],
              [ox, oy, 0],
            ]}
            color={highlightKey && inKey ? GUIDE_COLOR_IN_KEY : GUIDE_COLOR}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
}

export default CircleGuides;
