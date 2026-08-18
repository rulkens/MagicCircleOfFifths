import { eventChannel, type EventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'typed-redux-saga';
import type { MidiMessage } from '../../@types/MidiMessage';
import { parseMidiMessage } from '../../utils/midi/parseMidiMessage';
import { allNotesOff } from '../performance/performanceSlice';
import { midiInputsChanged, midiRequested, midiStatusChanged } from './midiSlice';
import { toPerformanceAction } from './toPerformanceAction';

type MidiEvent =
  | { readonly kind: 'message'; readonly message: MidiMessage; readonly at: number }
  | { readonly kind: 'inputs'; readonly names: readonly string[] };

/**
 * Bridges the MIDIAccess handle to the saga world.
 *
 * The handle itself never leaves this function — only decoded messages and
 * device names cross into the store, which is what keeps the state
 * serializable.
 */
function createMidiChannel(access: MIDIAccess): EventChannel<MidiEvent> {
  return eventChannel<MidiEvent>((emit) => {
    const inputNames = (): string[] => [...access.inputs.values()].map((i) => i.name ?? 'unnamed');

    const onMessage = (event: Event): void => {
      const data = (event as MIDIMessageEvent).data;
      if (!data) return;
      const message = parseMidiMessage(data);
      // `performance.now()` rather than the event's own timestamp: the two
      // clocks agree in every browser that implements the spec, but Firefox
      // has shipped epoch-based timestamps, which would put every note an
      // eternity into the past.
      if (message) emit({ kind: 'message', message, at: performance.now() });
    };

    const listen = (): void => {
      for (const input of access.inputs.values()) {
        input.removeEventListener('midimessage', onMessage);
        input.addEventListener('midimessage', onMessage);
      }
      emit({ kind: 'inputs', names: inputNames() });
    };

    const onStateChange = (): void => listen();

    listen();
    access.addEventListener('statechange', onStateChange);

    return () => {
      access.removeEventListener('statechange', onStateChange);
      for (const input of access.inputs.values()) {
        input.removeEventListener('midimessage', onMessage);
      }
    };
  });
}

function* connectMidi() {
  if (typeof navigator === 'undefined' || !navigator.requestMIDIAccess) {
    yield* put(midiStatusChanged('unsupported'));
    return;
  }

  let access: MIDIAccess;
  try {
    access = yield* call([navigator, navigator.requestMIDIAccess]);
  } catch {
    yield* put(midiStatusChanged('denied'));
    return;
  }

  yield* put(midiStatusChanged('ready'));
  const channel = yield* call(createMidiChannel, access);

  try {
    while (true) {
      const event = yield* take(channel);
      if (event.kind === 'inputs') {
        yield* put(midiInputsChanged(event.names));
        continue;
      }
      yield* put(toPerformanceAction(event.message, event.at));
    }
  } finally {
    // Unplugging mid-chord otherwise leaves those notes sounding forever,
    // because the note-offs that would have closed them never arrive.
    channel.close();
    yield* put(allNotesOff(performance.now()));
  }
}

export function* watchMidiSaga() {
  yield* takeLatest(midiRequested.type, connectMidi);
}
