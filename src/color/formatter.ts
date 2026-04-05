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

// CSS Color Level 4 defines #RGB, #RGBA, #RRGGBB, #RRGGBBAA formats,
// but ANSI escape codes don't support alpha channels.
// We only accept #RGB (3 digits) and #RRGGBB (6 digits).
const HEX_COLOR_REGEX = /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/;

/**
 * Parses a hex color string (e.g. "#ff0000", "#f00", "ff0000") into
 * an [r, g, b] tuple. Used by `hex()` and `bgHex()` to convert
 * user-provided hex values into RGB components for ANSI escape codes.
 *
 * Only #RGB and #RRGGBB formats are supported. #RGBA and #RRGGBBAA
 * are not accepted because ANSI terminals do not support alpha channels.
 * Returns [0, 0, 0] (black) for invalid input.
 */
export function parseHex(hex: string): [number, number, number] {
  const raw = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!HEX_COLOR_REGEX.test(raw)) {
    return BLACK;
  }

  // Expand shorthand "RGB" to "RRGGBB" (e.g. "f00" → "ff0000").
  const full = raw.length === 3 ? raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2] : raw;

  const colorValue = parseInt(full, 16);

  const red = (colorValue >> 16) & 0xff;
  const green = (colorValue >> 8) & 0xff;
  const blue = colorValue & 0xff;

  return [red, green, blue];
}
