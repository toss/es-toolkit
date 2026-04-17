import { makeColor } from './makeColor.ts';

/**
 * Strikethrough text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { strikethrough } from 'es-toolkit/color';
 *
 * console.log(strikethrough('hello'));
 */
export const strikethrough = makeColor('\x1b[9m', '\x1b[29m');
