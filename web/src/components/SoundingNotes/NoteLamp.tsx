/**
 * NoteLamp — a glowing bead at a note's place on the dial.
 *
 * Takes a MIDI note rather than a position so that a note above or below the
 * drawn range lands on the rim by the same rule everything else uses.
 */

import type { ReactNode } from 'react';
import { pitchClassOf } from '../../music/pitchClassOf';
import { noteColor } from '../../utils/color/noteColor';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { noteRadius } from '../../utils/geometry/noteRadius';
import { pointOnCircle } from '../../utils/geometry/pointOnCircle';

export type NoteLampProps = {
  readonly note: number;
  readonly radius: number;
  readonly opacity: number;
};

function NoteLamp({ note, radius, opacity }: NoteLampProps): ReactNode {
  const [x, y] = pointOnCircle(cofAngle(pitchClassOf(note)), noteRadius(note));
  const color = noteColor(pitchClassOf(note));

  return (
    <mesh position={[x, y, 0]}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

export default NoteLamp;
