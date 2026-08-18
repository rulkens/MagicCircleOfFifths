/**
 * SoundingNotes — a lamp on the dial for each note being played, and optionally
 * the overtones it drags along with it.
 *
 * Overtones are drawn small and dim on purpose: they are what the ear is being
 * pulled towards, not what the player pressed, and drawing them at equal weight
 * makes a plain triad look like a cluster.
 */

import type { ReactNode } from 'react';
import { OVERTONE_SEMITONES } from '../../data/overtones';
import NoteLamp from './NoteLamp';

export type SoundingNotesProps = {
  readonly notes: readonly number[];
  readonly showOvertones: boolean;
};

function SoundingNotes({ notes, showOvertones }: SoundingNotesProps): ReactNode {
  return (
    <group>
      {notes.map((note) => (
        <NoteLamp key={note} note={note} radius={0.24} opacity={1} />
      ))}
      {showOvertones &&
        notes.flatMap((note) =>
          OVERTONE_SEMITONES.map((semitones) => (
            <NoteLamp
              key={`${note}:${semitones}`}
              note={note + semitones}
              radius={0.1}
              opacity={0.45}
            />
          )),
        )}
    </group>
  );
}

export default SoundingNotes;
