import { makeColor } from './makeColor.ts';

/**
 * Bright white foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { whiteBright } from 'es-toolkit/color';
 *
 * console.log(whiteBright('hello'));
 */
export const whiteBright = makeColor('\x1b[97m', '\x1b[39m');
