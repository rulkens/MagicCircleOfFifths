import { all, call } from 'typed-redux-saga';
import { watchMidiSaga } from '../state/midi/watchMidiSaga';

/** Every effect watcher in the app, composed in one place. */
export function* rootSaga() {
  yield* all([call(watchMidiSaga)]);
}
