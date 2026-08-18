import { describe, expect, it } from 'vitest';
import { cofPosition } from '../../src/music/cofPosition';

describe('cofPosition', () => {
  it('places C at the top and walks a fifth per step', () => {
    // C→G→D→A: the opening of the circle, counted off by ear.
    expect(cofPosition(0)).toBe(0);
    expect(cofPosition(7)).toBe(1);
    expect(cofPosition(2)).toBe(2);
    expect(cofPosition(9)).toBe(3);
  });

  it('puts F one step counter-clockwise of C', () => {
    expect(cofPosition(5)).toBe(11);
  });

  it('puts the tritone opposite the tonic', () => {
    expect(cofPosition(6)).toBe(6);
  });

  it('visits all twelve positions exactly once', () => {
    const positions = Array.from({ length: 12 }, (_, pc) => cofPosition(pc));
    expect(new Set(positions).size).toBe(12);
  });
});
