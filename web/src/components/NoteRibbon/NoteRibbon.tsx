/**
 * NoteRibbon — one played note, drawn as a bar receding down the time axis.
 *
 * The bar's angle is the note's place on the circle and its radius is the
 * octave, both fixed for the note's lifetime. Only its length and depth move,
 * and they move every frame, so they are written straight onto the transform in
 * `useFrame` rather than dispatched — a note held for four seconds would
 * otherwise be 240 store writes saying nothing but "still going".
 */

import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode } from 'react';
import type { Mesh } from 'three';
import type { NoteEvent } from '../../@types/NoteEvent';
import { RIBBON_GLOW, RIBBON_HEIGHT, RIBBON_WIDTH, UNITS_PER_SECOND } from '../../data/scene';
import { noteSoundState } from '../../music/noteSoundState';
import { pitchClassOf } from '../../music/pitchClassOf';
import { noteColor } from '../../utils/color/noteColor';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { noteRadius } from '../../utils/geometry/noteRadius';
import { pointOnCircle } from '../../utils/geometry/pointOnCircle';

export type NoteRibbonProps = {
  readonly event: NoteEvent;
  /** How deep the visible time axis runs, in seconds. */
  readonly timeSpanSeconds: number;
};

/** Keeps a just-struck note visible before it has any length to speak of. */
const MINIMUM_LENGTH = 0.08;

function NoteRibbon({ event, timeSpanSeconds }: NoteRibbonProps): ReactNode {
  const meshRef = useRef<Mesh>(null);

  const angle = cofAngle(pitchClassOf(event.note));
  const [x, y] = pointOnCircle(angle, noteRadius(event.note));
  const color = noteColor(pitchClassOf(event.note));
  const loudness = 0.35 + 0.65 * (event.velocity / 127);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const now = performance.now();
    const headSeconds = (now - (event.endedAt ?? now)) / 1000;
    const tailSeconds = (now - event.startedAt) / 1000;

    // Past the far edge of the view there is nothing to draw; the ribbon stays
    // mounted because the store still holds the event, and widening the span
    // brings it back without replaying anything.
    mesh.visible = headSeconds <= timeSpanSeconds;
    mesh.scale.z = Math.max(MINIMUM_LENGTH, (tailSeconds - headSeconds) * UNITS_PER_SECOND);
    mesh.position.z = -((headSeconds + tailSeconds) / 2) * UNITS_PER_SECOND;
  });

  return (
    <mesh ref={meshRef} position={[x, y, 0]} rotation={[0, 0, -angle]} scale={[1, loudness, 1]}>
      <boxGeometry args={[RIBBON_WIDTH, RIBBON_HEIGHT, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={RIBBON_GLOW[noteSoundState(event)]}
        roughness={0.35}
      />
    </mesh>
  );
}

export default NoteRibbon;
