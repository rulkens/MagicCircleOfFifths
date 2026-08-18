/**
 * One sounding note, from key-down until it stops sounding.
 *
 * Times are milliseconds on the performance clock, stamped by the caller — a
 * reducer can't read a clock and stay pure. The two end times are different
 * facts: `releasedAt` is when the key came up, `endedAt` is when the sound
 * stopped, and the sustain pedal is exactly the gap between them. Holding both
 * here means "which notes are still sounding" and "which keys are still down"
 * are each one filter over this list, rather than a second list to keep in step.
 *
 * A note's length is derived per frame from these times and the current clock;
 * it is never stored, so nothing has to keep it up to date.
 */
export type NoteEvent = {
  readonly id: number;
  /** MIDI note number, 0–127. */
  readonly note: number;
  /** MIDI velocity, 1–127. */
  readonly velocity: number;
  readonly startedAt: number;
  readonly releasedAt: number | null;
  readonly endedAt: number | null;
};
