/**
 * MidiBar — the state of the MIDI connection, and the button that starts it.
 *
 * Browsers only hand out MIDI access from a user gesture, so the button is not
 * a convenience: without a click there is nothing to connect to.
 */

import type { ReactNode } from 'react';
import type { MidiStatus } from '../../@types/MidiStatus';
import styles from './MidiBar.module.css';

export type MidiBarProps = {
  readonly status: MidiStatus;
  readonly inputNames: readonly string[];
  readonly onConnect: () => void;
};

const MESSAGE: Readonly<Record<MidiStatus, string>> = {
  idle: 'Connect a MIDI keyboard, or play with the computer keys.',
  unsupported: 'This browser has no Web MIDI — use the computer keys.',
  denied: 'MIDI access was refused. Allow it and try again.',
  ready: 'Listening.',
};

function MidiBar({ status, inputNames, onConnect }: MidiBarProps): ReactNode {
  return (
    <div className={styles.root}>
      <span className={styles.message}>
        {status === 'ready' && inputNames.length > 0 ? inputNames.join(', ') : MESSAGE[status]}
      </span>
      {status !== 'ready' && status !== 'unsupported' && (
        <button type="button" className={styles.button} onClick={onConnect}>
          Connect MIDI
        </button>
      )}
    </div>
  );
}

export default MidiBar;
