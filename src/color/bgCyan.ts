import { makeColor } from './makeColor.ts';

/**
 * Cyan background.
 * Falls back to a passthrough when color support is unavailable.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgCyan } from 'es-toolkit/color';
 *
 * console.log(bgCyan('hello'));
 */
export const bgCyan = makeColor('\x1b[46m', '\x1b[49m', true);
