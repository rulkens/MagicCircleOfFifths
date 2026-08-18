import type { UnknownAction } from '@reduxjs/toolkit';
import { MODES } from '../../data/modes';
import {
  chordsToggled,
  infoToggled,
  modeChanged,
  notesToggled,
  overtonesToggled,
  presentingToggled,
  tonicStructureToggled,
} from './settingsSlice';

export type Shortcut = {
  readonly key: string;
  readonly label: string;
  readonly action: () => UnknownAction;
};

/**
 * Keyboard shortcuts, and the panel's own source for what to print.
 *
 * The letters differ from the original sketch's (o, n, tab, i, p, t) because
 * the computer keyboard is now also the fallback piano, and every one of those
 * letters except n and i is a note. Toggles took the free keys; the notes keep
 * the ones a player's hands already know.
 */
export const SHORTCUTS: readonly Shortcut[] = [
  { key: 'n', label: 'notes', action: notesToggled },
  { key: 'c', label: 'chords', action: chordsToggled },
  { key: 'v', label: 'overtones', action: overtonesToggled },
  { key: 'b', label: 'key structure', action: tonicStructureToggled },
  { key: 'i', label: 'info', action: infoToggled },
  { key: 'z', label: 'presentation', action: presentingToggled },
  ...MODES.map((mode, index) => ({
    key: String(index + 1),
    label: mode.label.toLowerCase(),
    action: () => modeChanged(mode.id),
  })),
];

const SHORTCUT_BY_KEY = new Map(SHORTCUTS.map((shortcut) => [shortcut.key, shortcut]));

/** The action a key press means, or null if it means nothing. */
export function shortcutActionFor(key: string): UnknownAction | null {
  const shortcut = SHORTCUT_BY_KEY.get(key.toLowerCase());
  return shortcut ? shortcut.action() : null;
}
