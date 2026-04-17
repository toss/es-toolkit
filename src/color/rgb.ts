import { makeColor } from './makeColor.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with the given 24-bit (truecolor) foreground.
 *
 * @param r - Red component (0–255).
 * @param g - Green component (0–255).
 * @param b - Blue component (0–255).
 * @returns A color function that wraps text with the chosen RGB foreground.
 *
 * @example
 * import { rgb } from 'es-toolkit/color';
 *
 * const brand = rgb(255, 99, 71);
 * console.log(brand('hello'));
 */
export function rgb(r: number, g: number, b: number): ColorFunction {
  return makeColor(`\x1b[38;2;${r};${g};${b}m`, '\x1b[39m');
}
