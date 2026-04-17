import { makeColor } from './makeColor.ts';

/**
 * Green foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { green } from 'es-toolkit/color';
 *
 * console.log(green('hello'));
 */
export const green = makeColor('\x1b[32m', '\x1b[39m');
