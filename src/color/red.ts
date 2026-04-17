import { makeColor } from './makeColor.ts';

/**
 * Wraps text with ANSI codes for red foreground color.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to colorize.
 * @returns The text wrapped with red ANSI codes.
 *
 * @example
 * import { red } from 'es-toolkit/color';
 *
 * console.log(red('error'));
 */
export const red = makeColor('\x1b[31m', '\x1b[39m');
