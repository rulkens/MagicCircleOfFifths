import type { NoteEvent } from '../@types/NoteEvent';
import type { NoteSoundState } from '../@types/NoteSoundState';

/** Reads a note event's two end times as the one state they describe. */
export function noteSoundState(event: NoteEvent): NoteSoundState {
  if (event.endedAt !== null) return 'stopped';
  return event.releasedAt === null ? 'held' : 'pedalled';
}
