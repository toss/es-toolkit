import { makeColor } from './makeColor.ts';

/**
 * Bright yellow foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { yellowBright } from 'es-toolkit/color';
 *
 * console.log(yellowBright('hello'));
 */
export const yellowBright = makeColor('\x1b[93m', '\x1b[39m');
