import { useEffect } from 'react';
import { shortcutActionFor } from '../state/settings/keyboardShortcuts';
import { isFormControlTarget } from '../utils/dom/isFormControlTarget';
import { useAppDispatch } from './useAppDispatch';

/** Applies the display shortcuts listed in `keyboardShortcuts.ts`. */
export function useKeyboardShortcuts(): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (isFormControlTarget(event.target)) return;
      const action = shortcutActionFor(event.key);
      if (!action) return;
      event.preventDefault();
      dispatch(action);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);
}
