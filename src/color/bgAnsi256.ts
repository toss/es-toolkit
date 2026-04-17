import { makeColor } from './makeColor.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with the given 8-bit (256-color) background.
 *
 * @param code - The 8-bit color code (0–255).
 * @returns A color function that wraps text with the chosen ANSI 256 background.
 *
 * @example
 * import { bgAnsi256 } from 'es-toolkit/color';
 *
 * const warn = bgAnsi256(208);
 * console.log(warn('hello'));
 */
export function bgAnsi256(code: number): ColorFunction {
  return makeColor(`\x1b[48;5;${code}m`, '\x1b[49m', true);
}
