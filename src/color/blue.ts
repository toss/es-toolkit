import { makeColor } from './makeColor.ts';

/**
 * Blue foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { blue } from 'es-toolkit/color';
 *
 * console.log(blue('hello'));
 */
export const blue = makeColor('\x1b[34m', '\x1b[39m');
