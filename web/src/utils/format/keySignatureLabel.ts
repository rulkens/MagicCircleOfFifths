/** Renders a key signature the way it is spoken: '3♯', '2♭', or '—' for none. */
export function keySignatureLabel(signature: number): string {
  if (signature === 0) return '—';
  return `${Math.abs(signature)}${signature > 0 ? '♯' : '♭'}`;
}
