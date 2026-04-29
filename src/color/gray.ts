import { blackBright } from './blackBright.ts';

/**
 * Gray foreground — alias of `blackBright`. Wraps text with ANSI codes.
 *
 * "Gray" and "bright black" map to the same SGR code (`\x1b[90m`); this export
 * exists so callers can use the friendlier name.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { gray } from 'es-toolkit/color';
 *
 * console.log(gray('muted'));
 */
export const gray = blackBright;
