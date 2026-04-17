import { makeColor } from './makeColor.ts';

/**
 * Bright white background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhiteBright } from 'es-toolkit/color';
 *
 * console.log(bgWhiteBright('hello'));
 */
export const bgWhiteBright = makeColor('\x1b[107m', '\x1b[49m', true);
