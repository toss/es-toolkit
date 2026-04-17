import { makeColor } from './makeColor.ts';

/**
 * Black foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { black } from 'es-toolkit/color';
 *
 * console.log(black('hello'));
 */
export const black = makeColor('\x1b[30m', '\x1b[39m');
