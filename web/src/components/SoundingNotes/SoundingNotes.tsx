/**
 * SoundingNotes — beads on the name ring for the pitch classes being played.
 *
 * The overtones are not here: they belong to the notes that raise them, and
 * travel down the time axis with them.
 */

import type { ReactNode } from 'react';
import { pitchClassOf } from '../../music/pitchClassOf';
import NoteDisc from './NoteDisc';

export type SoundingNotesProps = {
  readonly notes: readonly number[];
};

function SoundingNotes({ notes }: SoundingNotesProps): ReactNode {
  const pitchClasses = [...new Set(notes.map(pitchClassOf))];

  return (
    <group>
      {pitchClasses.map((pitchClass) => (
        <NoteDisc key={pitchClass} pitchClass={pitchClass} />
      ))}
    </group>
  );
}

export default SoundingNotes;
