import { makeColor } from './makeColor.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with the given 8-bit (256-color) foreground.
 *
 * @param code - The 8-bit color code (0–255).
 * @returns A color function that wraps text with the chosen ANSI 256 foreground.
 *
 * @example
 * import { ansi256 } from 'es-toolkit/color';
 *
 * const orange = ansi256(208);
 * console.log(orange('hello'));
 */
export function ansi256(code: number): ColorFunction {
  return makeColor(`\x1b[38;5;${code}m`, '\x1b[39m');
}
