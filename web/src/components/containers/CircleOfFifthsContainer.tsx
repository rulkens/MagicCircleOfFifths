import { memo, type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectMode,
  selectSettings,
  selectTonic,
  selectUseFlats,
} from '../../state/settings/selectors';
import CircleOfFifths from '../CircleOfFifths/CircleOfFifths';

function CircleOfFifthsContainer(): ReactNode {
  const tonic = useAppSelector(selectTonic);
  const mode = useAppSelector(selectMode);
  const useFlats = useAppSelector(selectUseFlats);
  const showTonicStructure = useAppSelector(selectSettings).showTonicStructure;

  return (
    <CircleOfFifths
      tonic={tonic}
      mode={mode}
      useFlats={useFlats}
      showTonicStructure={showTonicStructure}
    />
  );
}

export default memo(CircleOfFifthsContainer);
