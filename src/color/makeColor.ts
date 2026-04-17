import { isColorSupported } from './colorLevel.ts';
import { createFormatter } from './createFormatter.ts';
import type { ColorFunction } from './types.ts';

const identity: ColorFunction = text => text;

/**
 * Returns a color function for the given ANSI open/close codes.
 * Falls back to an identity passthrough when color support is unavailable.
 */
export function makeColor(open: string, close: string, isBackground = false): ColorFunction {
  if (!isColorSupported) {
    return identity;
  }
  return createFormatter(open, close, isBackground);
}
