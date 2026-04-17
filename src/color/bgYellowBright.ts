import { makeColor } from './makeColor.ts';

/**
 * Bright yellow background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgYellowBright } from 'es-toolkit/color';
 *
 * console.log(bgYellowBright('hello'));
 */
export const bgYellowBright = makeColor('\x1b[103m', '\x1b[49m', true);
