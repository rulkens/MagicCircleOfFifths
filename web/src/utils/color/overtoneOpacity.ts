import { OVERTONE_SEMITONES } from '../../data/overtones';

/**
 * How solidly the nth overtone is drawn, fading with harmonic number.
 *
 * The curve is the original sketch's: the ear gives less and less weight to
 * each higher harmonic, and drawing them at equal strength turns a plain triad
 * into a wall of arcs.
 */
export function overtoneOpacity(index: number): number {
  return 0.6 - (0.4 * index) / OVERTONE_SEMITONES.length;
}
