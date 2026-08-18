import type { Mode } from '../@types/Mode';

/**
 * Whether a note belongs to the key.
 *
 * A key is seven adjacent positions on the circle, and the mode decides where
 * that window sits relative to the tonic: major spans one step flat to five
 * sharp, and every mode slides the same window by its own offset. This is why
 * the circle shows a key as an unbroken arc rather than a scattering.
 */
export function isDiatonic(fifthsFromTonic: number, mode: Mode): boolean {
  const lowest = mode.fifthsFromMajor - 1;
  return fifthsFromTonic >= lowest && fifthsFromTonic <= lowest + 6;
}
