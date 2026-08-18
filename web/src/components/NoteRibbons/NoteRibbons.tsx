/**
 * NoteRibbons — every note in the store's history, as bars down the time axis.
 *
 * One mesh per event, keyed by event id, so a ribbon is mounted when the note
 * starts and unmounted when the store forgets it. React handles the set;
 * each ribbon handles its own motion.
 */

import type { ReactNode } from 'react';
import type { NoteEvent } from '../../@types/NoteEvent';
import NoteRibbon from '../NoteRibbon/NoteRibbon';

export type NoteRibbonsProps = {
  readonly events: readonly NoteEvent[];
  readonly timeSpanSeconds: number;
};

function NoteRibbons({ events, timeSpanSeconds }: NoteRibbonsProps): ReactNode {
  return (
    <group>
      {events.map((event) => (
        <NoteRibbon key={event.id} event={event} timeSpanSeconds={timeSpanSeconds} />
      ))}
    </group>
  );
}

export default NoteRibbons;
