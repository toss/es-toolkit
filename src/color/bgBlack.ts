import { makeColor } from './makeColor.ts';

/**
 * Black background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlack } from 'es-toolkit/color';
 *
 * console.log(bgBlack('hello'));
 */
export const bgBlack = makeColor('\x1b[40m', '\x1b[49m', true);
