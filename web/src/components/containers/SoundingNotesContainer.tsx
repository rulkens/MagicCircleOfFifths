import { memo, type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectSoundingNotes } from '../../state/performance/selectors';
import { selectSettings } from '../../state/settings/selectors';
import SoundingNotes from '../SoundingNotes/SoundingNotes';

function SoundingNotesContainer(): ReactNode {
  const notes = useAppSelector(selectSoundingNotes);
  const settings = useAppSelector(selectSettings);

  if (!settings.showNotes) return null;
  return <SoundingNotes notes={notes} showOvertones={settings.showOvertones} />;
}

export default memo(SoundingNotesContainer);
