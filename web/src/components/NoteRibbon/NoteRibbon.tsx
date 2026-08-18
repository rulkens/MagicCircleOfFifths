/**
 * NoteRibbon — one played note as a slice of the dial, receding down the time axis.
 *
 * The note and its overtones are one object: they start together, end together
 * and travel together, so a single group carries the whole thing through time
 * and the arcs inside it only ever differ by ring and strength.
 *
 * That group's depth and position move every frame, and are written straight
 * onto the transform in `useFrame` rather than dispatched — a note held for
 * four seconds would otherwise be 240 store writes saying "still going".
 */

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type ReactNode } from 'react';
import type { Group } from 'three';
import type { NoteEvent } from '../../@types/NoteEvent';
import { OVERTONE_SEMITONES } from '../../data/overtones';
import {
  ARC_EXTRUDE_SETTINGS,
  ARC_RADIANS,
  RIBBON_GLOW,
  RIBBON_THICKNESS,
  UNITS_PER_SECOND,
} from '../../data/scene';
import { noteSoundState } from '../../music/noteSoundState';
import { pitchClassOf } from '../../music/pitchClassOf';
import { noteColor } from '../../utils/color/noteColor';
import { overtoneOpacity } from '../../utils/color/overtoneOpacity';
import { arcRibbonShape } from '../../utils/geometry/arcRibbonShape';
import { cofAngle } from '../../utils/geometry/cofAngle';
import { noteRadius } from '../../utils/geometry/noteRadius';

export type NoteRibbonProps = {
  readonly event: NoteEvent;
  /** How deep the visible time axis runs, in seconds. */
  readonly timeSpanSeconds: number;
  readonly showOvertones: boolean;
};

/** Keeps a just-struck note visible before it has any length to speak of. */
const MINIMUM_LENGTH = 0.08;

function NoteRibbon({ event, timeSpanSeconds, showOvertones }: NoteRibbonProps): ReactNode {
  const groupRef = useRef<Group>(null);
  const loudness = 0.45 + 0.55 * (event.velocity / 127);

  const arcs = useMemo(() => {
    const notes = showOvertones
      ? [event.note, ...OVERTONE_SEMITONES.map((semitones) => event.note + semitones)]
      : [event.note];

    return notes.map((note, index) => ({
      key: `${note}:${index}`,
      angle: cofAngle(pitchClassOf(note)),
      color: noteColor(pitchClassOf(note)),
      // The fundamental is what was actually played, so it stays solid; the
      // harmonics behind it fade away with their number.
      opacity: index === 0 ? 1 : overtoneOpacity(index - 1),
      shape: arcRibbonShape(
        noteRadius(note),
        RIBBON_THICKNESS * (index === 0 ? loudness : 0.6),
        ARC_RADIANS,
      ),
    }));
  }, [event.note, loudness, showOvertones]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const now = performance.now();
    const headSeconds = (now - (event.endedAt ?? now)) / 1000;
    const tailSeconds = (now - event.startedAt) / 1000;

    // Past the far edge of the view there is nothing to draw; the ribbon stays
    // mounted because the store still holds the event, so widening the span
    // brings it back without replaying anything.
    group.visible = headSeconds <= timeSpanSeconds;
    group.scale.z = Math.max(MINIMUM_LENGTH, (tailSeconds - headSeconds) * UNITS_PER_SECOND);
    group.position.z = -tailSeconds * UNITS_PER_SECOND;
  });

  const glow = RIBBON_GLOW[noteSoundState(event)];

  return (
    <group ref={groupRef}>
      {arcs.map((arc) => (
        <mesh key={arc.key} rotation={[0, 0, -arc.angle]}>
          <extrudeGeometry args={[arc.shape, ARC_EXTRUDE_SETTINGS]} />
          <meshStandardMaterial
            color={arc.color}
            emissive={arc.color}
            emissiveIntensity={glow}
            roughness={0.35}
            transparent={arc.opacity < 1}
            opacity={arc.opacity}
            depthWrite={arc.opacity === 1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default NoteRibbon;
