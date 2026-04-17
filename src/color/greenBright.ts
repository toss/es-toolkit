import { makeColor } from './makeColor.ts';

/**
 * Bright green foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { greenBright } from 'es-toolkit/color';
 *
 * console.log(greenBright('hello'));
 */
export const greenBright = makeColor('\x1b[92m', '\x1b[39m');
