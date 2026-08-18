import type { Vec2 } from '../../@types/Vec2';

/** Cartesian point at an angle measured clockwise from the top of the circle. */
export function pointOnCircle(angle: number, radius: number): Vec2 {
  return [Math.sin(angle) * radius, Math.cos(angle) * radius];
}
