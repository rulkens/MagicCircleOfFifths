import type { ChordShape } from './ChordShape';
import type { PitchClass } from './PitchClass';

/** A chord shape resolved onto a root — the only form that can be named. */
export type ChordMatch = {
  readonly root: PitchClass;
  readonly shape: ChordShape;
  /** True when the lowest sounding note is the root; drives ranking. */
  readonly rootInBass: boolean;
};
