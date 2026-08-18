/**
 * How much played history the store keeps, in seconds.
 *
 * Sets the ceiling for the visible time axis: the scene can show any span up to
 * this, and anything older has been dropped and cannot be brought back by
 * widening the view.
 */
export const HISTORY_SECONDS = 60;

/** Visible depth of the time axis, in seconds — the ends of the slider. */
export const MIN_TIME_SPAN_SECONDS = 2;
export const MAX_TIME_SPAN_SECONDS = 30;
