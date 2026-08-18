import { createSelector } from '@reduxjs/toolkit';
import type { Mode } from '../../@types/Mode';
import type { PitchClass } from '../../@types/PitchClass';
import { MODE_BY_ID } from '../../data/modes';
import { keySignature } from '../../music/keySignature';
import { noteName } from '../../music/noteName';
import { prefersFlats } from '../../music/prefersFlats';
import type { RootState } from '../../store/rootReducer';
import type { SettingsState } from './settingsSlice';

export const selectSettings = (state: RootState): SettingsState => state.settings;

export const selectTonic = (state: RootState): PitchClass => state.settings.tonic;

export const selectMode = (state: RootState): Mode => MODE_BY_ID[state.settings.modeId];

export const selectTimeSpanSeconds = (state: RootState): number => state.settings.timeSpanSeconds;

export const selectKeySignature = createSelector([selectTonic, selectMode], keySignature);

/** Whether the current key spells its black keys as flats. */
export const selectUseFlats = createSelector([selectKeySignature], prefersFlats);

/** The twelve tonics as the current key would spell them — the key picker. */
export const selectTonicNames = createSelector([selectUseFlats], (useFlats): string[] =>
  Array.from({ length: 12 }, (_, pitchClass) => noteName(pitchClass, useFlats)),
);
