import { makeColor } from './makeColor.ts';

/**
 * Magenta foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { magenta } from 'es-toolkit/color';
 *
 * console.log(magenta('hello'));
 */
export const magenta = makeColor('\x1b[35m', '\x1b[39m');
