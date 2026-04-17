import { makeColor } from './makeColor.ts';

/**
 * Color-inverted text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { inverse } from 'es-toolkit/color';
 *
 * console.log(inverse('hello'));
 */
export const inverse = makeColor('\x1b[7m', '\x1b[27m');
