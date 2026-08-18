/**
 * ToggleRow — a labelled checkbox.
 *
 * The whole row is the label, so the hit target is the row rather than a
 * 13-pixel box.
 */

import type { ReactNode } from 'react';
import styles from './ToggleRow.module.css';

export type ToggleRowProps = {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
};

function ToggleRow({ label, checked, onChange }: ToggleRowProps): ReactNode {
  return (
    <label className={styles.root}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default ToggleRow;
