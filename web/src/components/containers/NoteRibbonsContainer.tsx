import { memo, type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectNoteEvents } from '../../state/performance/selectors';
import { selectTimeSpanSeconds } from '../../state/settings/selectors';
import NoteRibbons from '../NoteRibbons/NoteRibbons';

function NoteRibbonsContainer(): ReactNode {
  const events = useAppSelector(selectNoteEvents);
  const timeSpanSeconds = useAppSelector(selectTimeSpanSeconds);

  return <NoteRibbons events={events} timeSpanSeconds={timeSpanSeconds} />;
}

export default memo(NoteRibbonsContainer);
