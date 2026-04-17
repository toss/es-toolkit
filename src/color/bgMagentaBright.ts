import { makeColor } from './makeColor.ts';

/**
 * Bright magenta background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgMagentaBright } from 'es-toolkit/color';
 *
 * console.log(bgMagentaBright('hello'));
 */
export const bgMagentaBright = makeColor('\x1b[105m', '\x1b[49m', true);
