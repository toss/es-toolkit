# colors

Wraps text with ANSI escape codes for terminal colors and styles.

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red('error'));
console.log(colors.bold(colors.cyan('hello')));
```

## Usage

`colors` is an object that exposes ANSI styling functions. Each function takes a string and returns a string wrapped with the corresponding open and close codes.

```typescript
import { colors } from 'es-toolkit/server';

colors.red('error');
colors.bold('emphasized');
colors.underline(colors.cyan('link'));
```

The functions are tree-shake friendly: only the styles you actually reference end up in your bundle.

### Modifiers

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### Foreground colors

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### Bright foreground colors

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### Background colors

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### Bright background colors

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### Extended colors

The extended-color helpers are curried — pass the color first, then the text:

- `ansi256(code)` / `bgAnsi256(code)` — 8-bit (256-color) palette, `code` in `0–255`.
- `rgb(r, g, b)` / `bgRgb(r, g, b)` — 24-bit truecolor.
- `hex(color)` / `bgHex(color)` — 24-bit truecolor parsed from `#RGB`, `#RRGGBB`, or the same without `#`.

```typescript
import { colors } from 'es-toolkit/server';

const orange = colors.rgb(255, 99, 71);
console.log(orange('hello'));

console.log(colors.hex('#f06')('hello'));
console.log(colors.bgAnsi256(21)('hello'));
```

### Composition

Nested calls re-open the outer style after the inner one closes, so the surrounding color survives:

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.red(`error: ${colors.underline('not found')}, please retry`));
```

Background helpers additionally re-open across line breaks, since most terminals reset the background at every newline:

```typescript
import { colors } from 'es-toolkit/server';

console.log(colors.bgYellow('line one\nline two'));
```

## Types

Helpers that return a styling function (`ansi256`, `bgAnsi256`, `rgb`, `bgRgb`, `hex`, `bgHex`) return a `ColorFunction`:

```typescript
import type { ColorFunction } from 'es-toolkit/server';

type ColorFunction = (text: string) => string;
```

## Notes

`colors` does not detect whether the terminal supports color — every call emits ANSI escape codes unconditionally. If you need to honor `NO_COLOR`, `FORCE_COLOR`, TTY detection, or CI environments, gate the call yourself.
