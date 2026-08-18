/**
 * Colours shared by the scene and the UI.
 *
 * The 3D layer can't read CSS custom properties, so the palette lives here as
 * data and `styles/global.css` mirrors the background token — the one value
 * that appears in both worlds, and the only one that can drift.
 */

export const BACKGROUND_COLOR = '#0a0c12';
export const GUIDE_COLOR = '#2a3348';
export const GUIDE_COLOR_IN_KEY = '#4a5a80';
export const LABEL_COLOR = '#8892a8';
export const LABEL_COLOR_IN_KEY = '#dfe6f5';
export const TONIC_COLOR = '#ffd479';

/** Sounding notes are hued by position on the circle; these set the rest. */
export const NOTE_SATURATION = 70;
export const NOTE_LIGHTNESS = 62;
