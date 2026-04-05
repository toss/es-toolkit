import { isColorSupported } from './colorLevel.ts';
import { createFormatter, parseHex, toString } from './formatter.ts';
import type { ColorFunction, Colors } from './types.ts';

/**
 * Creates a set of color functions. When `enabled` is false, all functions
 * return the input as a plain string without any ANSI codes.
 *
 * @param enabled - Whether to apply ANSI codes. Defaults to auto-detected value.
 * @returns An object containing all color and style functions.
 *
 * @example
 * import { createColors } from 'es-toolkit/color';
 *
 * const c = createColors(true);
 * c.red('hello'); // '\x1b[31mhello\x1b[39m'
 *
 * const noColor = createColors(false);
 * noColor.red('hello'); // 'hello'
 */
export function createColors(enabled?: boolean): Colors {
  const on = enabled ?? isColorSupported;
  const blackBright = style(on, '\x1b[90m', '\x1b[39m', false);

  return {
    reset: style(on, '\x1b[0m', '\x1b[0m', false),
    bold: style(on, '\x1b[1m', '\x1b[22m', false),
    dim: style(on, '\x1b[2m', '\x1b[22m', false),
    italic: style(on, '\x1b[3m', '\x1b[23m', false),
    underline: style(on, '\x1b[4m', '\x1b[24m', false),
    inverse: style(on, '\x1b[7m', '\x1b[27m', false),
    hidden: style(on, '\x1b[8m', '\x1b[28m', false),
    strikethrough: style(on, '\x1b[9m', '\x1b[29m', false),

    black: style(on, '\x1b[30m', '\x1b[39m', false),
    red: style(on, '\x1b[31m', '\x1b[39m', false),
    green: style(on, '\x1b[32m', '\x1b[39m', false),
    yellow: style(on, '\x1b[33m', '\x1b[39m', false),
    blue: style(on, '\x1b[34m', '\x1b[39m', false),
    magenta: style(on, '\x1b[35m', '\x1b[39m', false),
    cyan: style(on, '\x1b[36m', '\x1b[39m', false),
    white: style(on, '\x1b[37m', '\x1b[39m', false),
    gray: blackBright,

    blackBright,
    redBright: style(on, '\x1b[91m', '\x1b[39m', false),
    greenBright: style(on, '\x1b[92m', '\x1b[39m', false),
    yellowBright: style(on, '\x1b[93m', '\x1b[39m', false),
    blueBright: style(on, '\x1b[94m', '\x1b[39m', false),
    magentaBright: style(on, '\x1b[95m', '\x1b[39m', false),
    cyanBright: style(on, '\x1b[96m', '\x1b[39m', false),
    whiteBright: style(on, '\x1b[97m', '\x1b[39m', false),

    bgBlack: style(on, '\x1b[40m', '\x1b[49m', true),
    bgRed: style(on, '\x1b[41m', '\x1b[49m', true),
    bgGreen: style(on, '\x1b[42m', '\x1b[49m', true),
    bgYellow: style(on, '\x1b[43m', '\x1b[49m', true),
    bgBlue: style(on, '\x1b[44m', '\x1b[49m', true),
    bgMagenta: style(on, '\x1b[45m', '\x1b[49m', true),
    bgCyan: style(on, '\x1b[46m', '\x1b[49m', true),
    bgWhite: style(on, '\x1b[47m', '\x1b[49m', true),

    bgBlackBright: style(on, '\x1b[100m', '\x1b[49m', true),
    bgRedBright: style(on, '\x1b[101m', '\x1b[49m', true),
    bgGreenBright: style(on, '\x1b[102m', '\x1b[49m', true),
    bgYellowBright: style(on, '\x1b[103m', '\x1b[49m', true),
    bgBlueBright: style(on, '\x1b[104m', '\x1b[49m', true),
    bgMagentaBright: style(on, '\x1b[105m', '\x1b[49m', true),
    bgCyanBright: style(on, '\x1b[106m', '\x1b[49m', true),
    bgWhiteBright: style(on, '\x1b[107m', '\x1b[49m', true),

    ansi256: on ? (code: number) => createFormatter(`\x1b[38;5;${code}m`, '\x1b[39m', false) : stringifyFactory,

    bgAnsi256: on ? (code: number) => createFormatter(`\x1b[48;5;${code}m`, '\x1b[49m', true) : stringifyFactory,

    rgb: on
      ? (r: number, g: number, b: number) => createFormatter(`\x1b[38;2;${r};${g};${b}m`, '\x1b[39m', false)
      : stringifyFactory,

    bgRgb: on
      ? (r: number, g: number, b: number) => createFormatter(`\x1b[48;2;${r};${g};${b}m`, '\x1b[49m', true)
      : stringifyFactory,

    hex: on
      ? (color: string) => {
          const [r, g, b] = parseHex(color);
          return createFormatter(`\x1b[38;2;${r};${g};${b}m`, '\x1b[39m', false);
        }
      : stringifyFactory,

    bgHex: on
      ? (color: string) => {
          const [r, g, b] = parseHex(color);
          return createFormatter(`\x1b[48;2;${r};${g};${b}m`, '\x1b[49m', true);
        }
      : stringifyFactory,
  };
}

/** Returns a formatter when enabled, or a plain toString passthrough when disabled. */
function style(enabled: boolean, open: string, close: string, isBg: boolean): ColorFunction {
  if (enabled) {
    return createFormatter(open, close, isBg);
  }
  return toString;
}

/**
 * Factory for extended color functions (ansi256, rgb, hex) when colors are disabled.
 * All color functions accept `unknown` to ease migration from chalk, which accepts any type.
 * This factory returns `toString` which simply calls `String()` on the input — no ANSI codes.
 */
function stringifyFactory() {
  return toString;
}
