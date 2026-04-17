import { makeColor } from './makeColor.ts';

/**
 * Yellow foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { yellow } from 'es-toolkit/color';
 *
 * console.log(yellow('hello'));
 */
export const yellow = makeColor('\x1b[33m', '\x1b[39m');
