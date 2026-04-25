# color

Terminal colors and styles via ANSI escape codes.

Every utility is exposed as an individual named export **and** bundled in a default export. Color functions always emit ANSI escape codes. When you don't want them in the output — log files, pipes, or terminals that don't support ANSI — pass the result through `stripColor`.

```typescript
// Individual named imports (tree-shakeable):
import { bold, hex, red } from 'es-toolkit/color';
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
import { bgYellow, black, blue, bold, green, red, underline } from 'es-toolkit/color';

red('Red text');
green('Green text');
blue('Blue text');

bold('Bold text');
underline('Underlined text');

bgYellow(black('Black text on yellow background'));
```

### Composition

Styles can be nested freely. When an inner style ends partway through a string, the outer style continues over the rest of the text — no manual re-styling needed.

```typescript
import { bold, red } from 'es-toolkit/color';

bold(red('Bold red text'));
red(`Status: ${bold('IMPORTANT')} — please review`);
```

### Stripping colors

Pass the result through `stripColor` to remove every ANSI escape code — useful for log files, piped output, or CI without ANSI support.

```typescript
import { red, stripColor } from 'es-toolkit/color';

stripColor(red('plain')); // 'plain'
```

### Extended colors

256-color, RGB, and hex are called in two steps: first pick the color, then pass the text to the function it returns.

```typescript
import { ansi256, bgAnsi256, bgHex, bgRgb, hex, rgb } from 'es-toolkit/color';

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
