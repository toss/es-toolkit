export { isColorSupported, colorLevel } from './colorLevel.ts';
export { createColors } from './createColors.ts';
export { stripAnsi } from './stripAnsi.ts';
export type { ColorLevel, ColorFunction, Colors } from './types.ts';

/**
 * Pre-configured color instance that auto-detects terminal color support.
 *
 * @example
 * import { color } from 'es-toolkit/color';
 *
 * color.red('hello');
 * color.bold(color.red('hello'));
 * color.hex('#ff0000')('hello');
 */
export { color } from './color.ts';
