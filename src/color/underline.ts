import { makeColor } from './makeColor.ts';

/**
 * Underlined text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { underline } from 'es-toolkit/color';
 *
 * console.log(underline('hello'));
 */
export const underline = makeColor('\x1b[4m', '\x1b[24m');
