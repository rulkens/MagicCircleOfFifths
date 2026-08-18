/**
 * Semitones from a fundamental to its first eight audible overtones.
 *
 * Tempered approximations of harmonics 2–9: the 7th harmonic (34) is a third of
 * a semitone flat of the minor seventh it is drawn as, which is why the display
 * is a guide to where the ear is pulled, not a pitch claim.
 */
export const OVERTONE_SEMITONES = [12, 19, 24, 28, 31, 34, 36, 38] as const;
