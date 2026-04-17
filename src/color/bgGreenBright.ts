import { makeColor } from './makeColor.ts';

/**
 * Bright green background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreenBright } from 'es-toolkit/color';
 *
 * console.log(bgGreenBright('hello'));
 */
export const bgGreenBright = makeColor('\x1b[102m', '\x1b[49m', true);
