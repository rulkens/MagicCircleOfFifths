import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NoteEvent } from '../../@types/NoteEvent';
import { HISTORY_SECONDS } from '../../data/timeline';

/**
 * What the player is playing: the note events themselves, and the pedal.
 *
 * This is an append-mostly log rather than a set of currently-held notes,
 * because the time axis needs the history and the chord readout needs only the
 * tail of it — one home serves both, where a "held notes" set beside a history
 * would be two homes that could disagree.
 */
export type PerformanceState = {
  readonly events: readonly NoteEvent[];
  readonly sustain: boolean;
  readonly nextId: number;
};

const initialState: PerformanceState = {
  events: [],
  sustain: false,
  nextId: 1,
};

/** Sounding: started and not yet stopped. */
const isSounding = (event: NoteEvent): boolean => event.endedAt === null;

/** Waiting on the pedal: the key is up but the sound is not. */
const isPedalled = (event: NoteEvent): boolean =>
  event.endedAt === null && event.releasedAt !== null;

const performanceSlice = createSlice({
  name: 'performance',
  initialState: initialState as PerformanceState,
  reducers: {
    noteOn: {
      reducer(state, action: PayloadAction<{ note: number; velocity: number; at: number }>) {
        const { note, velocity, at } = action.payload;

        // A repeated key with no key-up in between (a retrigger, or a dropped
        // note-off from a flaky cable) ends the old sound rather than stacking
        // a second one under it — two open events for one key would both draw.
        const cutoff = at - HISTORY_SECONDS * 1000;
        const kept: NoteEvent[] = [];
        for (const event of state.events) {
          if (event.note === note && isSounding(event)) {
            kept.push({ ...event, releasedAt: event.releasedAt ?? at, endedAt: at });
            continue;
          }
          if (event.endedAt !== null && event.endedAt < cutoff) continue;
          kept.push(event);
        }

        kept.push({
          id: state.nextId,
          note,
          velocity,
          startedAt: at,
          releasedAt: null,
          endedAt: null,
        });
        state.events = kept;
        state.nextId += 1;
      },
      prepare(note: number, velocity: number, at: number) {
        return { payload: { note, velocity, at } };
      },
    },

    noteOff: {
      reducer(state, action: PayloadAction<{ note: number; at: number }>) {
        const { note, at } = action.payload;
        const sustain = state.sustain;
        state.events = state.events.map((event) =>
          event.note === note && isSounding(event) && event.releasedAt === null
            ? { ...event, releasedAt: at, endedAt: sustain ? null : at }
            : event,
        );
      },
      prepare(note: number, at: number) {
        return { payload: { note, at } };
      },
    },

    sustainChanged: {
      reducer(state, action: PayloadAction<{ down: boolean; at: number }>) {
        const { down, at } = action.payload;
        state.sustain = down;
        if (down) return;
        state.events = state.events.map((event) =>
          isPedalled(event) ? { ...event, endedAt: at } : event,
        );
      },
      prepare(down: boolean, at: number) {
        return { payload: { down, at } };
      },
    },

    /** Panic: silence everything, e.g. on MIDI reset or a lost device. */
    allNotesOff: {
      reducer(state, action: PayloadAction<{ at: number }>) {
        const { at } = action.payload;
        state.events = state.events.map((event) =>
          isSounding(event) ? { ...event, releasedAt: event.releasedAt ?? at, endedAt: at } : event,
        );
        state.sustain = false;
      },
      prepare(at: number) {
        return { payload: { at } };
      },
    },
  },
});

export const { noteOn, noteOff, sustainChanged, allNotesOff } = performanceSlice.actions;
export default performanceSlice.reducer;
