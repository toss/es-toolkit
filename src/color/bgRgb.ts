import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with the given 24-bit (truecolor) background.
 *
 * @param r - Red component (0–255).
 * @param g - Green component (0–255).
 * @param b - Blue component (0–255).
 * @returns A color function that wraps text with the chosen RGB background.
 *
 * @example
 * import { bgRgb } from 'es-toolkit/color';
 *
 * const highlight = bgRgb(255, 99, 71);
 * console.log(highlight('hello'));
 */
export function bgRgb(r: number, g: number, b: number): ColorFunction {
  const open = `\x1b[48;2;${r};${g};${b}m`;
  const close = '\x1b[49m';
  return text => wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
