import { makeColor } from './makeColor.ts';

/**
 * Blue background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlue } from 'es-toolkit/color';
 *
 * console.log(bgBlue('hello'));
 */
export const bgBlue = makeColor('\x1b[44m', '\x1b[49m', true);
