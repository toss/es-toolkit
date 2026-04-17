import { makeColor } from './makeColor.ts';

/**
 * Bright magenta foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { magentaBright } from 'es-toolkit/color';
 *
 * console.log(magentaBright('hello'));
 */
export const magentaBright = makeColor('\x1b[95m', '\x1b[39m');
