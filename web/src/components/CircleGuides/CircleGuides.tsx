/**
 * CircleGuides — the dial the notes are read against: two rings and twelve spokes.
 *
 * Drawn once and never animated. Spokes in the current key are brighter, which
 * is what turns an abstract wheel into "this is where the key lives".
 */

import { Line } from '@react-three/drei';
import type { ReactNode } from 'react';
import type { Mode } from '../../@types/Mode';
import type { PitchClass } from '../../@types/PitchClass';
import { BAND_INNER_RADIUS, BAND_OUTER_RADIUS, POSITION_COUNT } from '../../data/scene';
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

const RING_SEGMENTS = 96;

function ringPoints(radius: number): [number, number, number][] {
  return Array.from({ length: RING_SEGMENTS + 1 }, (_, i) => {
    const [x, y] = pointOnCircle((i / RING_SEGMENTS) * Math.PI * 2, radius);
    return [x, y, 0];
  });
}

function CircleGuides({ tonic, mode, highlightKey }: CircleGuidesProps): ReactNode {
  return (
    <group>
      <Line points={ringPoints(BAND_INNER_RADIUS)} color={GUIDE_COLOR} lineWidth={1} />
      <Line points={ringPoints(BAND_OUTER_RADIUS)} color={GUIDE_COLOR} lineWidth={1} />
      {PITCH_CLASSES.map((pitchClass) => {
        const angle = cofAngle(pitchClass);
        const [ix, iy] = pointOnCircle(angle, BAND_INNER_RADIUS);
        const [ox, oy] = pointOnCircle(angle, BAND_OUTER_RADIUS);
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
