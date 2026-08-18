import { describe, expect, it } from 'vitest';
import {
  selectAlternativeChordNames,
  selectChordLabel,
  selectSoundingNoteNames,
} from '../../src/state/analysis/selectors';
import { createAppStore } from '../../src/store/createAppStore';
import { noteOn } from '../../src/state/performance/performanceSlice';
import { modeChanged, tonicChanged } from '../../src/state/settings/settingsSlice';

/**
 * Exercised through a real store rather than hand-built state: the point of
 * these selectors is that they read the performance and the key together, and
 * a literal state object would let the two drift out of a shape the reducers
 * can actually produce.
 */
function storePlaying(...notes: readonly number[]) {
  const store = createAppStore();
  notes.forEach((note) => store.dispatch(noteOn(note, 100, 1000)));
  return store;
}

describe('analysis selectors', () => {
  it('names what is being played', () => {
    const store = storePlaying(60, 64, 67);
    expect(selectChordLabel(store.getState())).toBe('C');
    expect(selectSoundingNoteNames(store.getState())).toEqual(['C', 'E', 'G']);
  });

  it('respells the notes when the key changes', () => {
    const store = storePlaying(61, 65, 68);
    expect(selectSoundingNoteNames(store.getState())).toEqual(['C#', 'F', 'G#']);

    store.dispatch(tonicChanged(3)); // Eb major: three flats
    expect(selectSoundingNoteNames(store.getState())).toEqual(['Db', 'F', 'Ab']);
    expect(selectChordLabel(store.getState())).toBe('Db');
  });

  it('respells when only the mode changes', () => {
    // C major has no flats; C phrygian has four. Same tonic, different spelling.
    const store = storePlaying(61, 65, 68);
    expect(selectSoundingNoteNames(store.getState())).toEqual(['C#', 'F', 'G#']);

    store.dispatch(modeChanged('phrygian'));
    expect(selectSoundingNoteNames(store.getState())).toEqual(['Db', 'F', 'Ab']);
  });

  it('offers the other readings without repeating the first', () => {
    const store = storePlaying(60, 63, 66, 69); // a diminished seventh
    const label = selectChordLabel(store.getState());
    const alternatives = selectAlternativeChordNames(store.getState());
    expect(alternatives.length).toBeGreaterThan(0);
    expect(alternatives).not.toContain(label);
  });

  it('says nothing when nothing is playing', () => {
    const store = createAppStore();
    expect(selectChordLabel(store.getState())).toBeNull();
    expect(selectSoundingNoteNames(store.getState())).toEqual([]);
  });
});
