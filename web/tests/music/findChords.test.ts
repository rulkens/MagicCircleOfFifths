import { describe, expect, it } from 'vitest';
import { chordName } from '../../src/music/chordName';
import { findChords } from '../../src/music/findChords';

/** Names the best match, the way the readout shows it. */
function best(notes: readonly number[], useFlats = false): string | null {
  const [match] = findChords(notes);
  return match ? chordName(match, useFlats) : null;
}

// Middle-C octave, so the notes read like a keyboard.
const C = 60;
const Cs = 61;
const D = 62;
const Ds = 63;
const E = 64;
const F = 65;
const Fs = 66;
const G = 67;
const Gs = 68;
const A = 69;
const As = 70;
const B = 71;

describe('findChords', () => {
  it('names the triads', () => {
    expect(best([C, E, G])).toBe('C');
    expect(best([D, F, A])).toBe('Dm');
    expect(best([B, D, F])).toBe('Bdim');
    expect(best([C, E, Gs])).toBe('Caug');
  });

  it('names the sevenths', () => {
    expect(best([G, B, D + 12, F + 12])).toBe('G7');
    expect(best([C, E, G, B])).toBe('Cmaj7');
    expect(best([D, F, A, C + 12])).toBe('Dm7');
    expect(best([B, D + 12, F + 12, A + 12])).toBe('Bm7b5');
  });

  it('ignores octave and duplication', () => {
    expect(best([C, E, G, C + 12, E + 24, G - 12])).toBe('C');
  });

  it('reads an inversion as the chord it inverts, not a new one', () => {
    // E-G-C is a C major triad in first inversion. It should still say C —
    // but with E in the bass the root-position reading no longer wins on bass,
    // so C has to survive on chord likelihood alone.
    expect(best([E, G, C + 12])).toBe('C');
  });

  it('lets the bass decide between equally valid readings', () => {
    // The same three keys are C sus2 and G sus4; the lowest note breaks the tie.
    expect(best([C, D, G])).toBe('Csus2');
    expect(best([G - 12, C, D])).toBe('Gsus4');
  });

  it('offers every root of a symmetrical chord', () => {
    // A diminished seventh is four minor thirds: every note can be the root,
    // and refusing to say so would be a lie about what the player is hearing.
    const matches = findChords([C, Ds, Fs, A]).filter((m) => m.shape.id === 'dim7');
    expect(new Set(matches.map((m) => m.root))).toEqual(new Set([0, 3, 6, 9]));
  });

  it('spells the root to suit the key', () => {
    expect(best([Cs, F, Gs], false)).toBe('C#');
    expect(best([Cs, F, Gs], true)).toBe('Db');
  });

  it('says nothing about an interval', () => {
    expect(findChords([C, G])).toEqual([]);
    expect(findChords([C])).toEqual([]);
    expect(findChords([])).toEqual([]);
  });

  it('says nothing about a cluster that is no chord', () => {
    expect(findChords([C, Cs, D])).toEqual([]);
  });

  it('recognises a seventh voiced without its fifth', () => {
    // The left hand has the root and the right hand drops the fifth: still Cmaj7.
    expect(best([C, E, B])).toBe('Cmaj7');
  });

  it('reads a ninth as one chord rather than a stack of two', () => {
    expect(best([C, D, E, G, As])).toBe('C9');
  });
});
