import { makeColor } from './makeColor.ts';

/**
 * Yellow background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgYellow } from 'es-toolkit/color';
 *
 * console.log(bgYellow('hello'));
 */
export const bgYellow = makeColor('\x1b[43m', '\x1b[49m', true);
