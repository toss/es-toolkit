import { makeColor } from './makeColor.ts';

/**
 * White foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { white } from 'es-toolkit/color';
 *
 * console.log(white('hello'));
 */
export const white = makeColor('\x1b[37m', '\x1b[39m');
