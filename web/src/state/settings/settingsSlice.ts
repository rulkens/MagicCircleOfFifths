import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModeId } from '../../@types/ModeId';
import type { PitchClass } from '../../@types/PitchClass';
import { MAX_TIME_SPAN_SECONDS, MIN_TIME_SPAN_SECONDS } from '../../data/timeline';

/**
 * Everything the player has asked for. Serializable throughout, so a view can
 * be deep-linked or replayed later without a second capture mechanism.
 */
export type SettingsState = {
  readonly tonic: PitchClass;
  readonly modeId: ModeId;
  readonly showNotes: boolean;
  readonly showChords: boolean;
  readonly showOvertones: boolean;
  readonly showTonicStructure: boolean;
  readonly showInfo: boolean;
  /** Presentation mode hides the panels; the toggles above are left untouched. */
  readonly presenting: boolean;
  /** Visible depth of the time axis, in seconds. */
  readonly timeSpanSeconds: number;
};

const initialState: SettingsState = {
  tonic: 0,
  modeId: 'major',
  showNotes: true,
  showChords: true,
  showOvertones: false,
  showTonicStructure: true,
  showInfo: true,
  presenting: false,
  timeSpanSeconds: 12,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState as SettingsState,
  reducers: {
    tonicChanged(state, action: PayloadAction<PitchClass>) {
      state.tonic = ((action.payload % 12) + 12) % 12;
    },
    modeChanged(state, action: PayloadAction<ModeId>) {
      state.modeId = action.payload;
    },
    timeSpanChanged(state, action: PayloadAction<number>) {
      state.timeSpanSeconds = Math.min(
        MAX_TIME_SPAN_SECONDS,
        Math.max(MIN_TIME_SPAN_SECONDS, action.payload),
      );
    },
    notesToggled(state) {
      state.showNotes = !state.showNotes;
    },
    chordsToggled(state) {
      state.showChords = !state.showChords;
    },
    overtonesToggled(state) {
      state.showOvertones = !state.showOvertones;
    },
    tonicStructureToggled(state) {
      state.showTonicStructure = !state.showTonicStructure;
    },
    infoToggled(state) {
      state.showInfo = !state.showInfo;
    },
    presentingToggled(state) {
      state.presenting = !state.presenting;
    },
  },
});

export const {
  tonicChanged,
  modeChanged,
  timeSpanChanged,
  notesToggled,
  chordsToggled,
  overtonesToggled,
  tonicStructureToggled,
  infoToggled,
  presentingToggled,
} = settingsSlice.actions;
export default settingsSlice.reducer;
