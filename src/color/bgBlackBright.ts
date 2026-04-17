import { makeColor } from './makeColor.ts';

/**
 * Bright black (gray) background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlackBright } from 'es-toolkit/color';
 *
 * console.log(bgBlackBright('hello'));
 */
export const bgBlackBright = makeColor('\x1b[100m', '\x1b[49m', true);
