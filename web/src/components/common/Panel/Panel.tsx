/**
 * Panel — the glass surface every overlay in the app sits on.
 *
 * Owns the chrome and nothing else: position is the caller's business, which is
 * why it takes a className rather than choosing a corner of the screen.
 */

import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './Panel.module.css';

export type PanelProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

function Panel({ children, className }: PanelProps): ReactNode {
  return <div className={cx(styles.root, className)}>{children}</div>;
}

export default Panel;
