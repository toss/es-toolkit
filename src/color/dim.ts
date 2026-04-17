import { makeColor } from './makeColor.ts';

/**
 * Dim (faint) text.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { dim } from 'es-toolkit/color';
 *
 * console.log(dim('hello'));
 */
export const dim = makeColor('\x1b[2m', '\x1b[22m');
