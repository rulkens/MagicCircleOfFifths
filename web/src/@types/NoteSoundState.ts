/**
 * Why a note is (or is not) sounding.
 *
 * 'pedalled' is the state the sustain pedal creates: the key is up, the sound
 * is not. Tagged so anything that draws a note dispatches on the tag rather
 * than re-deriving the three cases from two nullable timestamps.
 */
export type NoteSoundState = 'held' | 'pedalled' | 'stopped';
