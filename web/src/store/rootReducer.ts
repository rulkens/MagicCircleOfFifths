import { combineReducers } from '@reduxjs/toolkit';
import midi from '../state/midi/midiSlice';
import performance from '../state/performance/performanceSlice';
import settings from '../state/settings/settingsSlice';

export const rootReducer = combineReducers({ midi, performance, settings });

export type RootState = ReturnType<typeof rootReducer>;
