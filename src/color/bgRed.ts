import { makeColor } from './makeColor.ts';

/**
 * Red background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgRed } from 'es-toolkit/color';
 *
 * console.log(bgRed('hello'));
 */
export const bgRed = makeColor('\x1b[41m', '\x1b[49m', true);
