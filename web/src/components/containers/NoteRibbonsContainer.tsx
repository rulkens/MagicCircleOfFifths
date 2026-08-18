import { memo, type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectNoteEvents } from '../../state/performance/selectors';
import { selectSettings, selectTimeSpanSeconds } from '../../state/settings/selectors';
import NoteRibbons from '../NoteRibbons/NoteRibbons';

function NoteRibbonsContainer(): ReactNode {
  const events = useAppSelector(selectNoteEvents);
  const timeSpanSeconds = useAppSelector(selectTimeSpanSeconds);
  const showOvertones = useAppSelector(selectSettings).showOvertones;

  return (
    <NoteRibbons events={events} timeSpanSeconds={timeSpanSeconds} showOvertones={showOvertones} />
  );
}

export default memo(NoteRibbonsContainer);
