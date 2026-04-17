import { makeColor } from './makeColor.ts';

/**
 * Cyan foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { cyan } from 'es-toolkit/color';
 *
 * console.log(cyan('hello'));
 */
export const cyan = makeColor('\x1b[36m', '\x1b[39m');
