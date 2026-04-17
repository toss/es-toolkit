import { makeColor } from './makeColor.ts';

/**
 * Hidden text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { hidden } from 'es-toolkit/color';
 *
 * console.log(hidden('hello'));
 */
export const hidden = makeColor('\x1b[8m', '\x1b[28m');
