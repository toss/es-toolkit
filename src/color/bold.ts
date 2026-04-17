import { makeColor } from './makeColor.ts';

/**
 * Bold text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bold } from 'es-toolkit/color';
 *
 * console.log(bold('hello'));
 */
export const bold = makeColor('\x1b[1m', '\x1b[22m');
