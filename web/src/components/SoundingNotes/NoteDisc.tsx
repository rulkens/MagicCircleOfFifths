/**
 * NoteDisc — a filled bead on the name ring marking a pitch class that is sounding.
 *
 * Octave-blind on purpose: the ring band already shows which octaves are in
 * play, and this ring answers the other question — which of the twelve names
 * you are hearing, whatever register they arrived in.
 */

import type { ReactNode } from 'react';
import { DoubleSide } from 'three';
import type { PitchClass } from '../../@types/PitchClass';
import { LABEL_RADIUS } from '../../data/scene';
import { noteColor } from '../../utils/color/noteColor';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { pointOnCircle } from '../../utils/geometry/pointOnCircle';

export type NoteDiscProps = {
  readonly pitchClass: PitchClass;
};

const DISC_RADIUS = 0.36;

/** Just behind the name, which is drawn at z = 0, so the letter stays legible. */
const DISC_DEPTH = -0.04;

function NoteDisc({ pitchClass }: NoteDiscProps): ReactNode {
  const [x, y] = pointOnCircle(cofAngle(pitchClass), LABEL_RADIUS);
  const color = noteColor(pitchClass);

  return (
    <mesh position={[x, y, DISC_DEPTH]}>
      <circleGeometry args={[DISC_RADIUS, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default NoteDisc;
