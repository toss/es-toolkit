import { makeColor } from './makeColor.ts';

/**
 * Bright cyan background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgCyanBright } from 'es-toolkit/color';
 *
 * console.log(bgCyanBright('hello'));
 */
export const bgCyanBright = makeColor('\x1b[106m', '\x1b[49m', true);
