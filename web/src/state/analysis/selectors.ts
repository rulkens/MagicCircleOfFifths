import { createSelector } from '@reduxjs/toolkit';
import type { ChordMatch } from '../../@types/ChordMatch';
import { chordName } from '../../music/chordName';
import { findChords } from '../../music/findChords';
import { noteName } from '../../music/noteName';
import { selectSoundingNotes } from '../performance/selectors';
import { selectUseFlats } from '../settings/selectors';

/**
 * What the player is playing, read as chords.
 *
 * Cross-slice on purpose: the analysis is a function of the performance and the
 * key it is being read in, and belongs to neither slice alone.
 */
export const selectChordMatches = createSelector([selectSoundingNotes], (notes): ChordMatch[] =>
  findChords(notes),
);

export const selectBestChord = createSelector(
  [selectChordMatches],
  (matches): ChordMatch | null => matches[0] ?? null,
);

export const selectChordLabel = createSelector(
  [selectBestChord, selectUseFlats],
  (match, useFlats): string | null => (match ? chordName(match, useFlats) : null),
);

/**
 * The other readings of the same notes, deduplicated.
 *
 * Capped at three: past that the list stops being a second opinion and starts
 * being noise, and the tail is always the least likely reading anyway.
 */
export const selectAlternativeChordNames = createSelector(
  [selectChordMatches, selectUseFlats],
  (matches, useFlats): string[] => {
    const names = matches.map((match) => chordName(match, useFlats));
    return [...new Set(names)].slice(1, 4);
  },
);

/** Names of the sounding notes, spelled for the key — the note readout. */
export const selectSoundingNoteNames = createSelector(
  [selectSoundingNotes, selectUseFlats],
  (notes, useFlats): string[] => notes.map((note) => noteName(note, useFlats)),
);
