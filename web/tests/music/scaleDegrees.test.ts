import { describe, expect, it } from 'vitest';
import type { ModeId } from '../../src/@types/ModeId';
import { MODES, MODE_BY_ID } from '../../src/data/modes';
import { fifthsFromTonic } from '../../src/music/fifthsFromTonic';
import { isDiatonic } from '../../src/music/isDiatonic';
import { scaleDegreeLabel } from '../../src/music/scaleDegreeLabel';

const ALL_PITCH_CLASSES = Array.from({ length: 12 }, (_, pc) => pc);

/** Every pitch class of a key, as the numeral the circle would print on it. */
function degreesOf(tonic: number, modeId: ModeId): string[] {
  const mode = MODE_BY_ID[modeId];
  return ALL_PITCH_CLASSES.map((pc) => fifthsFromTonic(pc, tonic, mode))
    .filter((fifths) => isDiatonic(fifths, mode))
    .sort((a, b) => a - b)
    .map((fifths) => scaleDegreeLabel(fifths) as string);
}

const major = MODE_BY_ID.major;

describe('fifthsFromTonic', () => {
  it('measures the sharp side positive and the flat side negative', () => {
    expect(fifthsFromTonic(7, 0, major)).toBe(1); // G is a fifth above C
    expect(fifthsFromTonic(5, 0, major)).toBe(-1); // F is a fifth below
    expect(fifthsFromTonic(0, 0, major)).toBe(0);
  });

  it('takes the short way round', () => {
    expect(fifthsFromTonic(11, 0, major)).toBe(5); // B: five up, not seven down
    expect(fifthsFromTonic(10, 0, major)).toBe(-2); // Bb
  });

  it('spells the tritone from whichever side the mode approaches it', () => {
    // Same key on the keyboard, two different notes: F# is lydian's sharp
    // fourth, Gb is locrian's flat fifth.
    expect(scaleDegreeLabel(fifthsFromTonic(6, 0, MODE_BY_ID.lydian))).toBe('#IV');
    expect(scaleDegreeLabel(fifthsFromTonic(6, 0, MODE_BY_ID.locrian))).toBe('bV');
  });
});

describe('scale degrees', () => {
  it('spells a major key', () => {
    expect(degreesOf(0, 'major')).toEqual(['IV', 'I', 'V', 'II', 'VI', 'III', 'VII']);
  });

  it('spells a minor key with its flattened degrees', () => {
    // A minor: A B C D E F G — the third, sixth and seventh are flat.
    expect(degreesOf(9, 'minor')).toEqual(['bVI', 'bIII', 'bVII', 'IV', 'I', 'V', 'II']);
  });

  it('gives dorian its major sixth and phrygian its flat second', () => {
    expect(degreesOf(2, 'dorian')).toContain('VI');
    expect(degreesOf(2, 'dorian')).not.toContain('bVI');
    expect(degreesOf(4, 'phrygian')).toContain('bII');
  });

  it('puts seven notes in every key, on every tonic', () => {
    for (const mode of MODES) {
      for (const tonic of ALL_PITCH_CLASSES) {
        expect(degreesOf(tonic, mode.id)).toHaveLength(7);
      }
    }
  });

  it('excludes the tritone from every key that has no business with one', () => {
    // Lydian's #IV and locrian's bV are the two that do.
    const withTritone = MODES.filter((mode) => isDiatonic(fifthsFromTonic(6, 0, mode), mode)).map(
      (mode) => mode.id,
    );
    expect(withTritone).toEqual(['lydian', 'locrian']);
  });
});
