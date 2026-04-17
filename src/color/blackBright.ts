import { makeColor } from './makeColor.ts';

/**
 * Bright black (gray) foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { blackBright } from 'es-toolkit/color';
 *
 * console.log(blackBright('hello'));
 */
export const blackBright = makeColor('\x1b[90m', '\x1b[39m');
