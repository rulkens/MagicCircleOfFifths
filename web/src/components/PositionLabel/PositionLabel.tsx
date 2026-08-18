/**
 * PositionLabel — the note name at one of the twelve positions, with its scale
 * degree outside it.
 *
 * Labels sit in the plane of the dial rather than turning to face the camera:
 * the circle is a thing you read from the front, and letters that swivel as you
 * orbit make it hard to tell which way round the wheel is.
 */

import { Text } from '@react-three/drei';
import type { ReactNode } from 'react';
import type { PitchClass } from '../../@types/PitchClass';
import { LABEL_FONT } from '../../data/fonts';
import { DEGREE_LABEL_RADIUS, LABEL_RADIUS } from '../../data/scene';
import { LABEL_COLOR, LABEL_COLOR_IN_KEY, TONIC_COLOR } from '../../data/theme';
import { noteName } from '../../music/noteName';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { pointOnCircle } from '../../utils/geometry/pointOnCircle';

export type PositionLabelProps = {
  readonly pitchClass: PitchClass;
  readonly useFlats: boolean;
  readonly isTonic: boolean;
  readonly inKey: boolean;
  /** Roman numeral, or null to leave the outer ring blank here. */
  readonly degree: string | null;
};

function PositionLabel({
  pitchClass,
  useFlats,
  isTonic,
  inKey,
  degree,
}: PositionLabelProps): ReactNode {
  const angle = cofAngle(pitchClass);
  const [x, y] = pointOnCircle(angle, LABEL_RADIUS);
  const [dx, dy] = pointOnCircle(angle, DEGREE_LABEL_RADIUS);
  const color = isTonic ? TONIC_COLOR : inKey ? LABEL_COLOR_IN_KEY : LABEL_COLOR;

  return (
    <group>
      <Text
        font={LABEL_FONT}
        position={[x, y, 0]}
        fontSize={isTonic ? 0.46 : 0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {noteName(pitchClass, useFlats)}
      </Text>
      {degree !== null && (
        <Text
          font={LABEL_FONT}
          position={[dx, dy, 0]}
          fontSize={0.42}
          color={isTonic ? TONIC_COLOR : LABEL_COLOR}
          anchorX="center"
          anchorY="middle"
        >
          {degree}
        </Text>
      )}
    </group>
  );
}

export default PositionLabel;
