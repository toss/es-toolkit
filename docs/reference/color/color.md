# color

Terminal colors and styles with automatic color-support detection.

Every utility is exposed as an individual named export **and** bundled in a default export. Each function auto-detects whether the terminal supports ANSI colors — on unsupported environments (non-TTY, `NO_COLOR=1`, pipes, CI without `FORCE_COLOR`), every call returns the input text unchanged.

```typescript
// Individual named imports (tree-shakeable):
import { red, bold, hex } from 'es-toolkit/color';

// Or the default bundle:
import color from 'es-toolkit/color';
color.red('error');
```

## Available utilities

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

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## Usage

### Basic colors and styles

```typescript
import { red, green, blue, bold, underline, bgYellow, black } from 'es-toolkit/color';

red('Red text');
green('Green text');
blue('Blue text');

bold('Bold text');
underline('Underlined text');

bgYellow(black('Black text on yellow background'));
```

### Composition

Nest multiple styles. The outer style is automatically re-opened after the inner style closes so subsequent text keeps its color.

```typescript
import { red, bold } from 'es-toolkit/color';

bold(red('Bold red text'));
red(`Status: ${bold('IMPORTANT')} — please review`);
```

### Extended colors

256-color, RGB, and hex use a curried form: pass the color value first, then the text.

```typescript
import { ansi256, bgAnsi256, rgb, bgRgb, hex, bgHex } from 'es-toolkit/color';

ansi256(196)('Bright red');
bgAnsi256(21)('Blue background');

rgb(255, 128, 0)('Orange');
bgRgb(0, 255, 0)('Green background');

hex('#ff00ff')('Magenta');
hex('#f0f')('Magenta'); // short form
bgHex('#00ff00')('Green background');
```

### Input type

All color functions accept a `string`. Convert other values before passing them in.

```typescript
import { red } from 'es-toolkit/color';

red(String(42)); // '42'
red(JSON.stringify({ a: 1 }));
```
