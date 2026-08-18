import type { ModeId } from './ModeId';

/**
 * A diatonic mode, positioned by how far its tonic sits from the major scale
 * that shares its notes.
 *
 * `fifthsFromMajor` is the whole model: one step clockwise on the circle of
 * fifths is one sharp. Lydian is +1 (one sharp brighter than major), Mixolydian
 * −1, and so on down to Locrian at −5. Every key-signature question reduces to
 * adding this offset, which is why no mode carries its own accidental table.
 */
export type Mode = {
  readonly id: ModeId;
  readonly label: string;
  readonly fifthsFromMajor: number;
};
