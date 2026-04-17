import { makeColor } from './makeColor.ts';

/**
 * Resets all styles and colors.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { reset } from 'es-toolkit/color';
 *
 * console.log(reset('hello'));
 */
export const reset = makeColor('\x1b[0m', '\x1b[0m');
