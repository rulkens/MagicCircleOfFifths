import { createSelector } from '@reduxjs/toolkit';
import type { NoteEvent } from '../../@types/NoteEvent';
import type { RootState } from '../../store/rootReducer';

export const selectNoteEvents = (state: RootState): readonly NoteEvent[] =>
  state.performance.events;

export const selectSustain = (state: RootState): boolean => state.performance.sustain;

/**
 * The notes sounding right now, lowest first.
 *
 * Derived from the event log on every read rather than kept alongside it: a
 * second "currently held" collection would be a copy that could disagree with
 * the log about what is sounding.
 */
export const selectSoundingNotes = createSelector([selectNoteEvents], (events) =>
  events
    .filter((event) => event.endedAt === null)
    .map((event) => event.note)
    .sort((a, b) => a - b),
);
