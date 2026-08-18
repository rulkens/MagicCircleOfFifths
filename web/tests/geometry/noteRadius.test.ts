import { describe, expect, it } from 'vitest';
import { OVERTONE_SEMITONES } from '../../src/data/overtones';
import { BAND_INNER_RADIUS, BAND_OUTER_RADIUS } from '../../src/data/scene';
import { noteRadius } from '../../src/utils/geometry/noteRadius';

const MIDDLE_C = 60;

describe('noteRadius', () => {
  it('puts every overtone outside the note that raises it', () => {
    // The band has to be wide enough for the harmonics as well as the keyboard:
    // the eighth overtone is over three octaves up, and a band sized for played
    // notes alone would flatten them all onto the rim.
    for (const start of [24, 36, 48, MIDDLE_C, 72]) {
      for (const semitones of OVERTONE_SEMITONES) {
        expect(noteRadius(start + semitones)).toBeGreaterThan(noteRadius(start));
      }
    }
  });

  it('gives each octave its own ring', () => {
    const radii = [12, 24, 36, 48, 60, 72, 84, 96].map(noteRadius);
    expect(new Set(radii).size).toBe(radii.length);
  });

  it('keeps notes an octave apart the same distance apart on the dial', () => {
    expect(noteRadius(72) - noteRadius(60)).toBeCloseTo(noteRadius(60) - noteRadius(48));
  });

  it('holds notes beyond the keyboard inside the band', () => {
    for (const note of [0, 1, 126, 127]) {
      expect(noteRadius(note)).toBeGreaterThanOrEqual(BAND_INNER_RADIUS);
      expect(noteRadius(note)).toBeLessThanOrEqual(BAND_OUTER_RADIUS);
    }
  });
});
