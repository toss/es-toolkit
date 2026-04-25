# color

Wraps strings with ANSI escape codes for color and style.

```typescript
import { red } from 'es-toolkit/color';

red('error');
```

## Available utilities

### Text effects

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### Text colors

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### Bright text colors

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### Background colors

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### Bright background colors

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### Extended colors

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`

## Usage

### Imports

Each utility is available as an individual named export, and they are also bundled together as a default export. Individual imports are tree-shakeable, so only the colors you actually use end up in your bundle.

```typescript
// Individual named imports (tree-shakeable)
import { bold, hex, red } from 'es-toolkit/color';
// Or the default bundle
import color from 'es-toolkit/color';

color.red('error');
```

### Basic colors and styles

Color functions take a `string` and return a string with ANSI escape codes embedded. The terminal reads those codes and renders the color and style.

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
