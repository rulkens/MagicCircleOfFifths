/**
 * ShortcutHints — the key map, printed from the same table that handles the keys.
 */

import type { ReactNode } from 'react';
import styles from './ShortcutHints.module.css';

export type ShortcutHintsProps = {
  readonly shortcuts: readonly { readonly key: string; readonly label: string }[];
};

function ShortcutHints({ shortcuts }: ShortcutHintsProps): ReactNode {
  return (
    <div className={styles.root}>
      <p className={styles.piano}>
        <kbd>A</kbd>–<kbd>;</kbd> plays; the row above holds the black keys.
      </p>
      <ul className={styles.list}>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.key} className={styles.item}>
            <kbd>{shortcut.key}</kbd>
            <span>{shortcut.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShortcutHints;
