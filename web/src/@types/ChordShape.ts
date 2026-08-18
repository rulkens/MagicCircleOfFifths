/**
 * A chord with no root yet — the interval pattern alone.
 *
 * `intervals` are semitones above the root, ascending, starting at 0. A shape
 * plus a root is a ChordMatch; the two are separate types because only the
 * match can be named, and a shape that carried a nullable root would let an
 * unnamed one reach the UI.
 */
export type ChordShape = {
  readonly id: string;
  /** Suffix appended to the root name, e.g. 'm7' in 'Dm7'. Empty for major. */
  readonly symbol: string;
  readonly label: string;
  readonly intervals: readonly number[];
};
