import { describe, expect, it } from 'vitest';
import { HISTORY_SECONDS } from '../../src/data/timeline';
import reducer, {
  allNotesOff,
  noteOff,
  noteOn,
  sustainChanged,
} from '../../src/state/performance/performanceSlice';
import type { PerformanceState } from '../../src/state/performance/performanceSlice';

const empty = reducer(undefined, { type: '@@init' });

/** Applies actions in order, the way the MIDI stream would. */
function play(...actions: readonly { type: string }[]): PerformanceState {
  return actions.reduce((state, action) => reducer(state, action), empty);
}

const sounding = (state: PerformanceState): number[] =>
  state.events.filter((e) => e.endedAt === null).map((e) => e.note);

describe('performance reducer', () => {
  it('starts and stops a note', () => {
    const down = play(noteOn(60, 100, 1000));
    expect(sounding(down)).toEqual([60]);

    const up = reducer(down, noteOff(60, 1500));
    expect(sounding(up)).toEqual([]);
    expect(up.events[0]?.startedAt).toBe(1000);
    expect(up.events[0]?.endedAt).toBe(1500);
  });

  it('keeps a released note sounding while the pedal is down', () => {
    const state = play(
      sustainChanged(true, 0),
      noteOn(60, 100, 1000),
      noteOff(60, 1200), // key up, but the pedal holds it
    );
    expect(sounding(state)).toEqual([60]);
    expect(state.events[0]?.releasedAt).toBe(1200);
  });

  it('stops pedalled notes when the pedal comes up, and leaves held keys alone', () => {
    const state = play(
      sustainChanged(true, 0),
      noteOn(60, 100, 1000),
      noteOn(64, 100, 1000),
      noteOff(60, 1200), // released, pedal-held
      sustainChanged(false, 2000), // pedal up: 60 stops, 64 is still held down
    );
    expect(sounding(state)).toEqual([64]);
    expect(state.events.find((e) => e.note === 60)?.endedAt).toBe(2000);
  });

  it('retriggering a key ends the old sound instead of stacking a second one', () => {
    // A dropped note-off — a real hazard on flaky USB cables — would otherwise
    // leave two open events on one key, both drawing forever.
    const state = play(noteOn(60, 100, 1000), noteOn(60, 100, 1400));
    expect(sounding(state)).toEqual([60]);
    expect(state.events).toHaveLength(2);
    expect(state.events[0]?.endedAt).toBe(1400);
  });

  it('silences everything on panic', () => {
    const state = play(
      sustainChanged(true, 0),
      noteOn(60, 100, 1000),
      noteOn(64, 100, 1000),
      allNotesOff(1800),
    );
    expect(sounding(state)).toEqual([]);
    expect(state.sustain).toBe(false);
  });

  it('drops history past the window, but never a sounding note', () => {
    const ancient = 1000;
    const now = ancient + (HISTORY_SECONDS + 1) * 1000;
    const state = play(
      noteOn(60, 100, ancient),
      noteOff(60, ancient + 10),
      noteOn(48, 100, ancient), // still held when the sweep runs
      noteOn(64, 100, now),
    );
    expect(state.events.map((e) => e.note)).toEqual([48, 64]);
  });
});
