import robotoBold from '@fontsource/roboto/files/roboto-latin-700-normal.woff';

/**
 * The face the 3D labels are drawn in.
 *
 * Imported from a package and bundled rather than fetched at runtime: the
 * text library will happily pull a default face off a CDN, which puts the
 * legibility of the dial at the mercy of someone else's uptime. WOFF, not
 * WOFF2 — the library's parser does not read WOFF2.
 */
export const LABEL_FONT = robotoBold;
