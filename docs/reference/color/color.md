# color

An object that applies colors and styles to terminal output. It automatically detects color support based on the environment.

```typescript
import { color } from 'es-toolkit/color';

color.red('An error occurred');
```

## Why es-toolkit/color?

It fixes known issues found in existing color libraries (such as picocolors).

- **`FORCE_COLOR=0` bug fix**: picocolors treats `"0"` as truthy, keeping colors enabled. es-toolkit correctly disables colors per the spec (force-color.org).
- **Safe `process` access**: Works without crashing in environments where `process` is unavailable, such as Cloudflare Workers.
- **CI pipe output handling**: Disables colors when stdout is not a TTY (pipes, redirects). picocolors ignores this in CI environments.
- **FORCE_COLOR/NO_COLOR spec compliance**: Correctly treats empty strings as "not set".
- **Extended color support**: Supports 256-color, RGB, and Hex colors. picocolors only supports the basic 16 colors.
- **Built-in `stripAnsi`**: Provides a utility to remove ANSI codes without requiring a separate package.
- **Background color multiline handling**: Background colors don't break across line breaks.
- **TypeScript support**: Provides complete type definitions.
- **ESM/CJS dual**: Supports both named exports and CommonJS.

## Usage

### Basic Colors and Styles

```typescript
import { color } from 'es-toolkit/color';

// Foreground colors
color.red('Red text');
color.green('Green text');
color.blue('Blue text');
color.yellow('Yellow text');

// Styles
color.bold('Bold text');
color.dim('Dim text');
color.italic('Italic text');
color.underline('Underlined text');
color.strikethrough('Strikethrough text');

// Background colors
color.bgRed('Red background');
color.bgGreen('Green background');
```

### Composition

You can nest multiple styles together.

```typescript
import { color } from 'es-toolkit/color';

color.bold(color.red('Bold red text'));
color.bgYellow(color.black('Black text on yellow background'));
```

### Extended Colors

You can use 256-color, RGB, and Hex colors. They use a curried approach: pass the color value first, then the text.

```typescript
import { color } from 'es-toolkit/color';

// 256-color palette
color.ansi256(196)('Bright red');
color.bgAnsi256(21)('Blue background');

// RGB
color.rgb(255, 128, 0)('Orange');
color.bgRgb(0, 255, 0)('Green background');

// Hex
color.hex('#ff00ff')('Magenta');
color.bgHex('#00ff00')('Green background');

// Short Hex (#RGB)
color.hex('#f0f')('Magenta');
```

### Input Types

All color functions accept any type and convert it using `String()`. This allows seamless migration from chalk without type errors.

```typescript
color.red(123);       // '123' (number)
color.red(true);      // 'true' (boolean)
color.red(null);      // 'null'
color.red(undefined); // 'undefined'
```

## Available Styles

### Modifiers

`reset`, `bold`, `dim`, `italic`, `underline`, `inverse`, `hidden`, `strikethrough`

### Foreground Colors

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

### Bright Foreground Colors

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

### Background Colors

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

### Bright Background Colors

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

### Extended Colors

`ansi256(code)`, `bgAnsi256(code)`, `rgb(r, g, b)`, `bgRgb(r, g, b)`, `hex(color)`, `bgHex(color)`
