import { makeColor } from './makeColor.ts';

/**
 * Bright blue foreground.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { blueBright } from 'es-toolkit/color';
 *
 * console.log(blueBright('hello'));
 */
export const blueBright = makeColor('\x1b[94m', '\x1b[39m');
