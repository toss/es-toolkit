import { makeColor } from './makeColor.ts';

/**
 * Italic text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { italic } from 'es-toolkit/color';
 *
 * console.log(italic('hello'));
 */
export const italic = makeColor('\x1b[3m', '\x1b[23m');
