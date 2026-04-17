import { makeColor } from './makeColor.ts';

/**
 * Magenta background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgMagenta } from 'es-toolkit/color';
 *
 * console.log(bgMagenta('hello'));
 */
export const bgMagenta = makeColor('\x1b[45m', '\x1b[49m', true);
