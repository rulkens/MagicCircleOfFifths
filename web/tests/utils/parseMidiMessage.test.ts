import { describe, expect, it } from 'vitest';
import { parseMidiMessage } from '../../src/utils/midi/parseMidiMessage';

describe('parseMidiMessage', () => {
  it('decodes note on and note off', () => {
    expect(parseMidiMessage([0x90, 60, 100])).toEqual({ type: 'noteOn', note: 60, velocity: 100 });
    expect(parseMidiMessage([0x80, 60, 0])).toEqual({ type: 'noteOff', note: 60 });
  });

  it('reads note-on at zero velocity as a note off', () => {
    // Many keyboards never send 0x80 at all; missing this leaves notes stuck on.
    expect(parseMidiMessage([0x90, 60, 0])).toEqual({ type: 'noteOff', note: 60 });
  });

  it('reads any channel, not just the first', () => {
    expect(parseMidiMessage([0x93, 60, 100])).toEqual({ type: 'noteOn', note: 60, velocity: 100 });
  });

  it('switches the pedal at the value the MIDI spec puts it', () => {
    expect(parseMidiMessage([0xb0, 64, 63])).toEqual({ type: 'sustain', down: false });
    expect(parseMidiMessage([0xb0, 64, 64])).toEqual({ type: 'sustain', down: true });
  });

  it('decodes all-notes-off', () => {
    expect(parseMidiMessage([0xb0, 123, 0])).toEqual({ type: 'allNotesOff' });
  });

  it('ignores messages it has no use for', () => {
    expect(parseMidiMessage([0xb0, 1, 64])).toBeNull(); // mod wheel
    expect(parseMidiMessage([0xe0, 0, 64])).toBeNull(); // pitch bend
    expect(parseMidiMessage([0xf8])).toBeNull(); // clock tick
  });
});
