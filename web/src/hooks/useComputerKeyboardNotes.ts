import { useEffect } from 'react';
import { KEYBOARD_BASE_NOTE, KEYBOARD_VELOCITY, KEY_TO_SEMITONE } from '../data/computerKeyboard';
import { noteOff, noteOn } from '../state/performance/performanceSlice';
import { isFormControlTarget } from '../utils/dom/isFormControlTarget';
import { useAppDispatch } from './useAppDispatch';

/**
 * Plays notes from the computer keyboard.
 *
 * A hook rather than a saga: unlike the MIDI connection there is nothing to
 * cancel or re-establish here, so the listener's life is just the app's.
 */
export function useComputerKeyboardNotes(): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const noteFor = (event: KeyboardEvent): number | null => {
      if (event.metaKey || event.ctrlKey || event.altKey) return null;
      if (isFormControlTarget(event.target)) return null;
      const semitone = KEY_TO_SEMITONE[event.key.toLowerCase()];
      return semitone === undefined ? null : KEYBOARD_BASE_NOTE + semitone;
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      // Auto-repeat would restart the note dozens of times a second, chopping
      // one held key into a stutter of ribbons.
      if (event.repeat) return;
      const note = noteFor(event);
      if (note === null) return;
      event.preventDefault();
      dispatch(noteOn(note, KEYBOARD_VELOCITY, performance.now()));
    };

    const onKeyUp = (event: KeyboardEvent): void => {
      const note = noteFor(event);
      if (note === null) return;
      dispatch(noteOff(note, performance.now()));
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [dispatch]);
}
