import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text in ANSI escape codes.
 * Background colors get special newline handling because terminals
 * reset the background at line boundaries.
 */
export function createFormatter(open: string, close: string, isBackground: boolean): ColorFunction {
  return (text: unknown): string => {
    const str = toString(text);

    if (str === '') {
      return '';
    }

    let result = str;

    // Re-open the outer style when a nested call with the same color
    // inserts a close code inside the text.
    if (open !== close && result.includes(close)) {
      result = result.replaceAll(close, close + open);
    }

    // Terminals reset background at line boundaries, so re-open after each "\n".
    if (isBackground && result.includes('\n')) {
      result = result.replaceAll('\n', close + '\n' + open);
    }

    return open + result + close;
  };
}

/**
 * Converts any value to a string without adding ANSI codes.
 * Used as a passthrough when colors are disabled.
 */
export function toString(text: unknown): string {
  return String(text);
}

const BLACK: [number, number, number] = [0, 0, 0];

/**
 * Parses a hex color string (e.g. "#ff0000", "#f00", "ff0000") into
 * an [r, g, b] tuple. Used by `hex()` and `bgHex()` to convert
 * user-provided hex values into RGB components for ANSI escape codes.
 */
export function parseHex(hex: string): [number, number, number] {
  const raw = hex.startsWith('#') ? hex.slice(1) : hex;

  // Only 3-char (#RGB) and 6-char (#RRGGBB) formats are valid hex colors.
  if (raw.length !== 3 && raw.length !== 6) {
    return BLACK;
  }

  // Expand shorthand "RGB" to "RRGGBB" (e.g. "f00" → "ff0000").
  const full = raw.length === 3 ? raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2] : raw;

  // Number('0x...') is strict — returns NaN if any character is not a valid hex digit.
  // parseInt would silently parse partial strings like "abcxyz" → 2748 (only "abc").
  const colorValue = Number('0x' + full);

  if (Number.isNaN(colorValue)) {
    return BLACK;
  }

  const red = (colorValue >> 16) & 0xff;
  const green = (colorValue >> 8) & 0xff;
  const blue = colorValue & 0xff;

  return [red, green, blue];
}
