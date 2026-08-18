import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MidiStatus } from '../../@types/MidiStatus';

/**
 * A descriptor of the MIDI connection: enough for the UI to say what is
 * plugged in and what went wrong, with none of the device handles.
 */
export type MidiState = {
  readonly status: MidiStatus;
  readonly inputNames: readonly string[];
};

const initialState: MidiState = { status: 'idle', inputNames: [] };

const midiSlice = createSlice({
  name: 'midi',
  initialState: initialState as MidiState,
  reducers: {
    /** Asks the effects layer to request access; the browser needs a gesture. */
    midiRequested() {},
    midiStatusChanged(state, action: PayloadAction<MidiStatus>) {
      state.status = action.payload;
    },
    midiInputsChanged(state, action: PayloadAction<readonly string[]>) {
      state.inputNames = action.payload.slice();
    },
  },
});

export const { midiRequested, midiStatusChanged, midiInputsChanged } = midiSlice.actions;
export default midiSlice.reducer;
