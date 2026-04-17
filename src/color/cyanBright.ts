import { makeColor } from './makeColor.ts';

/**
 * Bright cyan foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { cyanBright } from 'es-toolkit/color';
 *
 * console.log(cyanBright('hello'));
 */
export const cyanBright = makeColor('\x1b[96m', '\x1b[39m');
