import { makeColor } from './makeColor.ts';

/**
 * White background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhite } from 'es-toolkit/color';
 *
 * console.log(bgWhite('hello'));
 */
export const bgWhite = makeColor('\x1b[47m', '\x1b[49m', true);
