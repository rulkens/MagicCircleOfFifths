import type { MidiMessage } from '../../@types/MidiMessage';

const NOTE_OFF = 0x80;
const NOTE_ON = 0x90;
const CONTROL_CHANGE = 0xb0;

const SUSTAIN_CC = 64;
const ALL_NOTES_OFF_CC = 123;

/** Below this a pedal counts as up; the MIDI spec puts the switch point here. */
const PEDAL_ON_THRESHOLD = 64;

/**
 * Decodes the MIDI bytes this app understands, discarding the rest.
 *
 * Channel is deliberately dropped: the circle shows what is sounding, not which
 * channel it arrived on, and splitting by channel would mean an instrument on
 * channel 2 silently drawing nothing.
 */
export function parseMidiMessage(data: ArrayLike<number>): MidiMessage | null {
  if (data.length < 2) return null;
  const status = (data[0] as number) & 0xf0;
  const first = data[1] as number;
  const second = data.length > 2 ? (data[2] as number) : 0;

  switch (status) {
    case NOTE_ON:
      // Note-on at zero velocity is the common spelling of note-off — a
      // keyboard sending it that way would otherwise leave every note stuck on.
      return second > 0
        ? { type: 'noteOn', note: first, velocity: second }
        : { type: 'noteOff', note: first };
    case NOTE_OFF:
      return { type: 'noteOff', note: first };
    case CONTROL_CHANGE:
      if (first === SUSTAIN_CC) return { type: 'sustain', down: second >= PEDAL_ON_THRESHOLD };
      if (first === ALL_NOTES_OFF_CC) return { type: 'allNotesOff' };
      return null;
    default:
      return null;
  }
}
