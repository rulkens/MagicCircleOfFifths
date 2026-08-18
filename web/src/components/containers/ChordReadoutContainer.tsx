import { memo, type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectAlternativeChordNames,
  selectChordLabel,
  selectSoundingNoteNames,
} from '../../state/analysis/selectors';
import ChordReadout from '../ChordReadout/ChordReadout';

function ChordReadoutContainer(): ReactNode {
  const chordLabel = useAppSelector(selectChordLabel);
  const alternatives = useAppSelector(selectAlternativeChordNames);
  const noteNames = useAppSelector(selectSoundingNoteNames);

  return <ChordReadout chordLabel={chordLabel} alternatives={alternatives} noteNames={noteNames} />;
}

export default memo(ChordReadoutContainer);
