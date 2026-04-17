import { makeColor } from './makeColor.ts';

/**
 * Bright red foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { redBright } from 'es-toolkit/color';
 *
 * console.log(redBright('hello'));
 */
export const redBright = makeColor('\x1b[91m', '\x1b[39m');
