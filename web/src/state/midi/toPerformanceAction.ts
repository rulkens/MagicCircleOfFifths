import type { UnknownAction } from '@reduxjs/toolkit';
import type { MidiMessage } from '../../@types/MidiMessage';
import { allNotesOff, noteOff, noteOn, sustainChanged } from '../performance/performanceSlice';

type MessageOf<T extends MidiMessage['type']> = Extract<MidiMessage, { type: T }>;

type ActionTable = {
  [K in MidiMessage['type']]: (message: MessageOf<K>, at: number) => UnknownAction;
};

const TO_ACTION: ActionTable = {
  noteOn: (message, at) => noteOn(message.note, message.velocity, at),
  noteOff: (message, at) => noteOff(message.note, at),
  sustain: (message, at) => sustainChanged(message.down, at),
  allNotesOff: (_message, at) => allNotesOff(at),
};

/**
 * Turns a decoded MIDI message into the action it means.
 *
 * A table rather than a chain of `if`s so a new message type is a new row, and
 * the compiler names the missing one.
 */
export function toPerformanceAction(message: MidiMessage, at: number): UnknownAction {
  const handle = TO_ACTION[message.type] as (m: MidiMessage, at: number) => UnknownAction;
  return handle(message, at);
}
