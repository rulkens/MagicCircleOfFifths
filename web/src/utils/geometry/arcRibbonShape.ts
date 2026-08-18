import { Shape } from 'three';

/**
 * An annular sector — one twelfth-slice of the dial at a given ring.
 *
 * Built centred on the +Y axis, so the caller places it by rotating about Z by
 * the note's angle: the same rotation everything else on the circle uses. A
 * Shape rather than a finished geometry so the renderer can own the geometry's
 * lifetime and dispose it when the note is forgotten.
 */
export function arcRibbonShape(radius: number, thickness: number, arcRadians: number): Shape {
  const inner = Math.max(0.01, radius - thickness / 2);
  const outer = radius + thickness / 2;

  // Three measures arcs counter-clockwise from +X, so the top of the dial is a
  // quarter turn round.
  const start = Math.PI / 2 - arcRadians / 2;
  const end = Math.PI / 2 + arcRadians / 2;

  const shape = new Shape();
  shape.moveTo(Math.cos(start) * inner, Math.sin(start) * inner);
  shape.lineTo(Math.cos(start) * outer, Math.sin(start) * outer);
  shape.absarc(0, 0, outer, start, end, false);
  shape.lineTo(Math.cos(end) * inner, Math.sin(end) * inner);
  shape.absarc(0, 0, inner, end, start, true);
  shape.closePath();
  return shape;
}
