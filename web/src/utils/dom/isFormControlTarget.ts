/**
 * Whether a key event was aimed at a control that wants the key itself.
 *
 * Without this, adjusting a slider or opening a select would also play notes
 * and flip toggles, because the shortcut listeners sit on the window.
 */
export function isFormControlTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(target.tagName)
  );
}
