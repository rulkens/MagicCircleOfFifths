/**
 * ChordReadout — what is sounding right now, in words.
 *
 * The alternative readings matter as much as the first: a diminished seventh
 * has four equally true names, and showing only the winner would hide the
 * ambiguity the player is actually hearing.
 */

import type { ReactNode } from 'react';
import styles from './ChordReadout.module.css';

export type ChordReadoutProps = {
  readonly chordLabel: string | null;
  readonly alternatives: readonly string[];
  readonly noteNames: readonly string[];
};

function ChordReadout({ chordLabel, alternatives, noteNames }: ChordReadoutProps): ReactNode {
  return (
    <div className={styles.root}>
      <div className={styles.chord}>{chordLabel ?? '—'}</div>
      <div className={styles.notes}>{noteNames.join(' · ') || 'play something'}</div>
      {alternatives.length > 0 && (
        <div className={styles.alternatives}>also: {alternatives.join(', ')}</div>
      )}
    </div>
  );
}

export default ChordReadout;
