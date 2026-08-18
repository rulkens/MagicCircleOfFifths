/**
 * A MIDI message this app acts on, already decoded from its bytes.
 *
 * Tagged so every consumer dispatches by `type` and a new message kind shows up
 * as a missing table row rather than a silently ignored byte.
 */
export type MidiMessage =
  | { readonly type: 'noteOn'; readonly note: number; readonly velocity: number }
  | { readonly type: 'noteOff'; readonly note: number }
  | { readonly type: 'sustain'; readonly down: boolean }
  | { readonly type: 'allNotesOff' };
