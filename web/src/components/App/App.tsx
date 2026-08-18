/**
 * App — the scene, with the overlay panels floating over it.
 *
 * Presentation mode hides every panel without touching what they control, so
 * leaving it restores exactly the view the player set up.
 */

import cx from 'classnames';
import type { ReactNode } from 'react';
import { SHORTCUTS } from '../../state/settings/keyboardShortcuts';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useComputerKeyboardNotes } from '../../hooks/useComputerKeyboardNotes';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { selectSettings } from '../../state/settings/selectors';
import Panel from '../common/Panel/Panel';
import ChordReadoutContainer from '../containers/ChordReadoutContainer';
import MidiBarContainer from '../containers/MidiBarContainer';
import SettingsPanelContainer from '../containers/SettingsPanelContainer';
import Scene from '../Scene/Scene';
import ShortcutHints from '../ShortcutHints/ShortcutHints';
import styles from './App.module.css';

function App(): ReactNode {
  useComputerKeyboardNotes();
  useKeyboardShortcuts();
  const settings = useAppSelector(selectSettings);

  return (
    <div className={styles.root}>
      <Scene />
      {!settings.presenting && (
        <>
          {settings.showChords && (
            <Panel className={cx(styles.overlay, styles.readout)}>
              <ChordReadoutContainer />
            </Panel>
          )}
          <Panel className={cx(styles.overlay, styles.settings)}>
            <SettingsPanelContainer />
          </Panel>
          <Panel className={cx(styles.overlay, styles.midi)}>
            <MidiBarContainer />
          </Panel>
          {settings.showInfo && (
            <Panel className={cx(styles.overlay, styles.hints)}>
              <ShortcutHints shortcuts={SHORTCUTS} />
            </Panel>
          )}
        </>
      )}
    </div>
  );
}

export default App;
