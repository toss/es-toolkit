import { makeColor } from './makeColor.ts';

/**
 * Green background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreen } from 'es-toolkit/color';
 *
 * console.log(bgGreen('hello'));
 */
export const bgGreen = makeColor('\x1b[42m', '\x1b[49m', true);
