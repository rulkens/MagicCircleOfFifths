/**
 * How far the browser got towards giving us a MIDI device.
 *
 * A descriptor of the connection, not the connection itself — the MIDIAccess
 * handle stays out of the store.
 */
export type MidiStatus = 'idle' | 'unsupported' | 'denied' | 'ready';
