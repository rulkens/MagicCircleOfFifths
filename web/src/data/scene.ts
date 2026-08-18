import type { NoteSoundState } from '../@types/NoteSoundState';

/**
 * Scene dimensions, in world units.
 *
 * One second of time is one world unit deep, which is what makes the time axis
 * readable against the circle: a note held for the width of a ring band lasted
 * about as long as that band is wide.
 */

export const UNITS_PER_SECOND = 1;

/** Twelve positions, so a step is a twelfth of a turn. */
export const POSITION_COUNT = 12;

/**
 * Each note fills its whole twelfth of the circle, as in the original sketch —
 * so the ring band reads as a stack of complete sectors rather than a scatter
 * of tick marks.
 */
export const ARC_RADIANS = (2 * Math.PI) / POSITION_COUNT;

/**
 * The ring band, one ring per octave, low notes inside and high notes out.
 *
 * The band has to hold the overtones as well as the notes: the eighth harmonic
 * is over three octaves above its fundamental, so a band sized for a keyboard's
 * range alone would pile every overtone onto the outer rim.
 */
export const LOWEST_OCTAVE = 0;
export const HIGHEST_OCTAVE = 9;
export const BAND_INNER_RADIUS = 2.9;
export const BAND_OUTER_RADIUS = 8;

/** Radial spacing between neighbouring octave rings. */
export const OCTAVE_RING_STEP =
  (BAND_OUTER_RADIUS - BAND_INNER_RADIUS) / (HIGHEST_OCTAVE - LOWEST_OCTAVE);

/** Half the spacing, so rings read as separate bands with gaps between them. */
export const RIBBON_THICKNESS = OCTAVE_RING_STEP * 0.55;

/** Note names sit inside the band, scale degrees outside it. */
export const LABEL_RADIUS = 2.15;
export const DEGREE_LABEL_RADIUS = 8.8;

/**
 * Extrusion settings for every arc.
 *
 * Exactly one unit deep, so a caller scales Z by a duration in seconds and gets
 * a ribbon whose length is its time — no second constant to keep in step.
 */
export const ARC_EXTRUDE_SETTINGS = { depth: 1, bevelEnabled: false, curveSegments: 12 } as const;

/** How brightly a ribbon glows, by why it is sounding. */
export const RIBBON_GLOW: Readonly<Record<NoteSoundState, number>> = {
  held: 0.95,
  pedalled: 0.5,
  stopped: 0.15,
};
