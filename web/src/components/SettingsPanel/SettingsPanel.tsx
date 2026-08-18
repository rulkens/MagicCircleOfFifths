/**
 * SettingsPanel — key, mode, how far back the time axis reaches, and what to draw.
 *
 * Every control here is also a keyboard shortcut; the panel is the discoverable
 * half of the same intent, not a second way of storing it.
 */

import type { ReactNode } from 'react';
import type { Mode } from '../../@types/Mode';
import type { ModeId } from '../../@types/ModeId';
import type { PitchClass } from '../../@types/PitchClass';
import type { ToggleItem } from '../../@types/ToggleItem';
import { MAX_TIME_SPAN_SECONDS, MIN_TIME_SPAN_SECONDS } from '../../data/timeline';
import ToggleRow from './ToggleRow';
import styles from './SettingsPanel.module.css';

export type SettingsPanelProps = {
  readonly tonic: PitchClass;
  readonly tonicNames: readonly string[];
  readonly modes: readonly Mode[];
  readonly modeId: ModeId;
  readonly timeSpanSeconds: number;
  readonly keySignatureLabel: string;
  readonly toggles: readonly ToggleItem[];
  readonly onTonicChange: (tonic: PitchClass) => void;
  readonly onModeChange: (modeId: ModeId) => void;
  readonly onTimeSpanChange: (seconds: number) => void;
};

function SettingsPanel({
  tonic,
  tonicNames,
  modes,
  modeId,
  timeSpanSeconds,
  keySignatureLabel,
  toggles,
  onTonicChange,
  onModeChange,
  onTimeSpanChange,
}: SettingsPanelProps): ReactNode {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <span className={styles.label}>Key</span>
        <select
          value={tonic}
          onChange={(event) => onTonicChange(Number(event.target.value))}
          aria-label="Tonic"
        >
          {tonicNames.map((name, pitchClass) => (
            <option key={name} value={pitchClass}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={modeId}
          onChange={(event) => onModeChange(event.target.value as ModeId)}
          aria-label="Mode"
        >
          {modes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
        <span className={styles.signature}>{keySignatureLabel}</span>
      </div>

      <label className={styles.row}>
        <span className={styles.label}>Time</span>
        <input
          type="range"
          min={MIN_TIME_SPAN_SECONDS}
          max={MAX_TIME_SPAN_SECONDS}
          step={1}
          value={timeSpanSeconds}
          onChange={(event) => onTimeSpanChange(Number(event.target.value))}
        />
        <span className={styles.seconds}>{timeSpanSeconds}s</span>
      </label>

      <div className={styles.toggles}>
        {toggles.map((toggle) => (
          <ToggleRow
            key={toggle.id}
            label={toggle.label}
            checked={toggle.checked}
            onChange={toggle.onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsPanel;
