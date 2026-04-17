export type ColorLevel = 0 | 1 | 2 | 3;

export type ColorFunction = (text: string) => string;

export interface Colors {
  reset: ColorFunction;
  bold: ColorFunction;
  dim: ColorFunction;
  italic: ColorFunction;
  underline: ColorFunction;
  inverse: ColorFunction;
  hidden: ColorFunction;
  strikethrough: ColorFunction;

  black: ColorFunction;
  red: ColorFunction;
  green: ColorFunction;
  yellow: ColorFunction;
  blue: ColorFunction;
  magenta: ColorFunction;
  cyan: ColorFunction;
  white: ColorFunction;
  gray: ColorFunction;

  blackBright: ColorFunction;
  redBright: ColorFunction;
  greenBright: ColorFunction;
  yellowBright: ColorFunction;
  blueBright: ColorFunction;
  magentaBright: ColorFunction;
  cyanBright: ColorFunction;
  whiteBright: ColorFunction;

  bgBlack: ColorFunction;
  bgRed: ColorFunction;
  bgGreen: ColorFunction;
  bgYellow: ColorFunction;
  bgBlue: ColorFunction;
  bgMagenta: ColorFunction;
  bgCyan: ColorFunction;
  bgWhite: ColorFunction;

  bgBlackBright: ColorFunction;
  bgRedBright: ColorFunction;
  bgGreenBright: ColorFunction;
  bgYellowBright: ColorFunction;
  bgBlueBright: ColorFunction;
  bgMagentaBright: ColorFunction;
  bgCyanBright: ColorFunction;
  bgWhiteBright: ColorFunction;

  ansi256: (code: number) => ColorFunction;
  bgAnsi256: (code: number) => ColorFunction;
  rgb: (r: number, g: number, b: number) => ColorFunction;
  bgRgb: (r: number, g: number, b: number) => ColorFunction;
  hex: (color: string) => ColorFunction;
  bgHex: (color: string) => ColorFunction;
}
