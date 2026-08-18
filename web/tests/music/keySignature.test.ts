import { describe, expect, it } from 'vitest';
import { MODE_BY_ID } from '../../src/data/modes';
import { keySignature } from '../../src/music/keySignature';

const major = MODE_BY_ID.major;

describe('keySignature', () => {
  it('counts sharps up the sharp side', () => {
    expect(keySignature(0, major)).toBe(0); // C
    expect(keySignature(7, major)).toBe(1); // G
    expect(keySignature(2, major)).toBe(2); // D
    expect(keySignature(4, major)).toBe(4); // E
    expect(keySignature(6, major)).toBe(6); // F#
  });

  it('counts flats down the flat side', () => {
    expect(keySignature(5, major)).toBe(-1); // F
    expect(keySignature(10, major)).toBe(-2); // Bb
    expect(keySignature(3, major)).toBe(-3); // Eb
    expect(keySignature(1, major)).toBe(-5); // Db
  });

  it('spells the far side of the circle with the cheaper accidental', () => {
    // C# major would be seven sharps; Db is the same keys for five flats.
    expect(keySignature(1, major)).toBe(-5);
  });

  it('gives relative modes the signature of the major scale they share', () => {
    expect(keySignature(9, MODE_BY_ID.minor)).toBe(0); // A minor  = C major
    expect(keySignature(2, MODE_BY_ID.dorian)).toBe(0); // D dorian = C major
    expect(keySignature(4, MODE_BY_ID.phrygian)).toBe(0); // E phrygian = C major
    expect(keySignature(11, MODE_BY_ID.locrian)).toBe(0); // B locrian = C major
  });

  it('brightens by one sharp per mode step up the circle', () => {
    expect(keySignature(0, MODE_BY_ID.lydian)).toBe(1); // C lydian has F#
    expect(keySignature(0, MODE_BY_ID.mixolydian)).toBe(-1); // C mixolydian has Bb
  });
});
