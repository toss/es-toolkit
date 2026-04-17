import { makeColor } from './makeColor.ts';

/**
 * Bright red background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgRedBright } from 'es-toolkit/color';
 *
 * console.log(bgRedBright('hello'));
 */
export const bgRedBright = makeColor('\x1b[101m', '\x1b[49m', true);
