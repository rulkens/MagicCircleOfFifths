/**
 * CircleOfFifths — the dial: guides, note names, and the current key's degrees.
 *
 * Everything here is a function of the key alone. Anything that depends on what
 * is being played lives in the ribbons and the note markers, so this whole
 * subtree re-renders only when the player changes key.
 */

import type { ReactNode } from 'react';
import type { Mode } from '../../@types/Mode';
import type { PitchClass } from '../../@types/PitchClass';
import { POSITION_COUNT } from '../../data/scene';
import { fifthsFromTonic } from '../../music/fifthsFromTonic';
import { isDiatonic } from '../../music/isDiatonic';
import { scaleDegreeLabel } from '../../music/scaleDegreeLabel';
import CircleGuides from '../CircleGuides/CircleGuides';
import PositionLabel from '../PositionLabel/PositionLabel';

export type CircleOfFifthsProps = {
  readonly tonic: PitchClass;
  readonly mode: Mode;
  readonly useFlats: boolean;
  /** Whether to mark out the notes of the key and number their degrees. */
  readonly showTonicStructure: boolean;
};

const PITCH_CLASSES: readonly PitchClass[] = Array.from({ length: POSITION_COUNT }, (_, i) => i);

function CircleOfFifths({
  tonic,
  mode,
  useFlats,
  showTonicStructure,
}: CircleOfFifthsProps): ReactNode {
  return (
    <group>
      <CircleGuides tonic={tonic} mode={mode} highlightKey={showTonicStructure} />
      {PITCH_CLASSES.map((pitchClass) => {
        const fifths = fifthsFromTonic(pitchClass, tonic, mode);
        const inKey = isDiatonic(fifths, mode);
        return (
          <PositionLabel
            key={pitchClass}
            pitchClass={pitchClass}
            useFlats={useFlats}
            isTonic={showTonicStructure && pitchClass === tonic}
            inKey={showTonicStructure && inKey}
            degree={showTonicStructure && inKey ? scaleDegreeLabel(fifths) : null}
          />
        );
      })}
    </group>
  );
}

export default CircleOfFifths;
