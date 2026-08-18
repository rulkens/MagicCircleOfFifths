import type { NoteSoundState } from '../@types/NoteSoundState';

/**
 * Scene dimensions, in world units.
 *
 * One second of time is one world unit deep, which is what makes the time axis
 * readable against the circle: a note held for the width of the ring lasted
 * about as long as the ring is wide.
 */

export const UNITS_PER_SECOND = 1;

/** The band the note ribbons occupy; low notes inside, high notes outside. */
export const BAND_INNER_RADIUS = 3.1;
export const BAND_OUTER_RADIUS = 6.4;

/** Octaves mapped across the band. Beyond these, notes pile up on the rim. */
export const LOWEST_OCTAVE = 1;
export const HIGHEST_OCTAVE = 7;

export const LABEL_RADIUS = 7.3;
export const DEGREE_LABEL_RADIUS = 8.5;

export const RIBBON_WIDTH = 0.42;
export const RIBBON_HEIGHT = 0.16;

/** Twelve positions, so a step is a twelfth of a turn. */
export const POSITION_COUNT = 12;

/** How brightly a ribbon glows, by why it is sounding. */
export const RIBBON_GLOW: Readonly<Record<NoteSoundState, number>> = {
  held: 0.95,
  pedalled: 0.5,
  stopped: 0.15,
};
