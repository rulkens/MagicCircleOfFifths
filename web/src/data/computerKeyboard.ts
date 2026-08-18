/**
 * The computer keyboard as a one-octave-and-a-bit piano, so the app is usable
 * with no MIDI hardware plugged in.
 *
 * Laid out the way tracker and DAW keyboards are: the home row is the white
 * keys, the row above holds the black keys roughly where they'd sit on a piano.
 * Values are semitones from the lowest key, not MIDI notes, so the register can
 * move without rewriting the map.
 */
export const KEY_TO_SEMITONE: Readonly<Record<string, number>> = {
  a: 0, // C
  w: 1,
  s: 2, // D
  e: 3,
  d: 4, // E
  f: 5, // F
  t: 6,
  g: 7, // G
  y: 8,
  h: 9, // A
  u: 10,
  j: 11, // B
  k: 12, // C
  o: 13,
  l: 14, // D
  p: 15,
  ';': 16, // E
};

/** Middle C: the register the map starts from. */
export const KEYBOARD_BASE_NOTE = 60;

/** Stand-in for the velocity a key press has no way to express. */
export const KEYBOARD_VELOCITY = 96;
