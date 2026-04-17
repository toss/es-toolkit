import { makeColor } from './makeColor.ts';

/**
 * Bright blue background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlueBright } from 'es-toolkit/color';
 *
 * console.log(bgBlueBright('hello'));
 */
export const bgBlueBright = makeColor('\x1b[104m', '\x1b[49m', true);
