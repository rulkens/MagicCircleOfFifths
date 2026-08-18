import { memo, useCallback, type ReactNode } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { midiRequested } from '../../state/midi/midiSlice';
import MidiBar from '../MidiBar/MidiBar';

function MidiBarContainer(): ReactNode {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.midi.status);
  const inputNames = useAppSelector((state) => state.midi.inputNames);

  const onConnect = useCallback(() => dispatch(midiRequested()), [dispatch]);

  return <MidiBar status={status} inputNames={inputNames} onConnect={onConnect} />;
}

export default memo(MidiBarContainer);
