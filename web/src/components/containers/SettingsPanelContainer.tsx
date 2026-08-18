import { memo, useCallback, useMemo, type ReactNode } from 'react';
import type { ModeId } from '../../@types/ModeId';
import type { PitchClass } from '../../@types/PitchClass';
import type { ToggleItem } from '../../@types/ToggleItem';
import { MODES } from '../../data/modes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectKeySignature,
  selectSettings,
  selectTonicNames,
} from '../../state/settings/selectors';
import {
  chordsToggled,
  infoToggled,
  modeChanged,
  notesToggled,
  overtonesToggled,
  timeSpanChanged,
  tonicChanged,
  tonicStructureToggled,
} from '../../state/settings/settingsSlice';
import { keySignatureLabel } from '../../utils/format/keySignatureLabel';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

function SettingsPanelContainer(): ReactNode {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const tonicNames = useAppSelector(selectTonicNames);
  const signature = useAppSelector(selectKeySignature);

  const onTonicChange = useCallback(
    (tonic: PitchClass) => dispatch(tonicChanged(tonic)),
    [dispatch],
  );
  const onModeChange = useCallback((modeId: ModeId) => dispatch(modeChanged(modeId)), [dispatch]);
  const onTimeSpanChange = useCallback(
    (seconds: number) => dispatch(timeSpanChanged(seconds)),
    [dispatch],
  );

  const toggles = useMemo<readonly ToggleItem[]>(
    () => [
      {
        id: 'notes',
        label: 'notes',
        checked: settings.showNotes,
        onChange: () => dispatch(notesToggled()),
      },
      {
        id: 'chords',
        label: 'chords',
        checked: settings.showChords,
        onChange: () => dispatch(chordsToggled()),
      },
      {
        id: 'overtones',
        label: 'overtones',
        checked: settings.showOvertones,
        onChange: () => dispatch(overtonesToggled()),
      },
      {
        id: 'structure',
        label: 'key structure',
        checked: settings.showTonicStructure,
        onChange: () => dispatch(tonicStructureToggled()),
      },
      {
        id: 'info',
        label: 'info',
        checked: settings.showInfo,
        onChange: () => dispatch(infoToggled()),
      },
    ],
    [dispatch, settings],
  );

  return (
    <SettingsPanel
      tonic={settings.tonic}
      tonicNames={tonicNames}
      modes={MODES}
      modeId={settings.modeId}
      timeSpanSeconds={settings.timeSpanSeconds}
      keySignatureLabel={keySignatureLabel(signature)}
      toggles={toggles}
      onTonicChange={onTonicChange}
      onModeChange={onModeChange}
      onTimeSpanChange={onTimeSpanChange}
    />
  );
}

export default memo(SettingsPanelContainer);
