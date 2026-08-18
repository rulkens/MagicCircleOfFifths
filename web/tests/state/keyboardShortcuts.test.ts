import { describe, expect, it } from 'vitest';
import { KEY_TO_SEMITONE } from '../../src/data/computerKeyboard';
import { SHORTCUTS, shortcutActionFor } from '../../src/state/settings/keyboardShortcuts';
import { modeChanged, notesToggled } from '../../src/state/settings/settingsSlice';

describe('keyboard shortcuts', () => {
  it('never steals a key the fallback piano is using', () => {
    // The two maps share one keyboard: a key in both would toggle a panel and
    // play a note at once, and nothing in either table can notice on its own.
    const stolen = SHORTCUTS.filter((shortcut) => shortcut.key in KEY_TO_SEMITONE);
    expect(stolen).toEqual([]);
  });

  it('binds each key once', () => {
    const keys = SHORTCUTS.map((shortcut) => shortcut.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('resolves a key to its action, whatever the case', () => {
    expect(shortcutActionFor('n')).toEqual(notesToggled());
    expect(shortcutActionFor('N')).toEqual(notesToggled());
  });

  it('numbers the modes from the brightest', () => {
    expect(shortcutActionFor('1')).toEqual(modeChanged('lydian'));
    expect(shortcutActionFor('2')).toEqual(modeChanged('major'));
    expect(shortcutActionFor('7')).toEqual(modeChanged('locrian'));
  });

  it('ignores a key it has no binding for', () => {
    expect(shortcutActionFor('q')).toBeNull();
  });
});
