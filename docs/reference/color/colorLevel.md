# colorLevel

A value representing the color support level of the current terminal environment.

```typescript
import { colorLevel, isColorSupported } from 'es-toolkit/color';
```

## Usage

### `colorLevel`

Returns the color support level of the terminal as a number.

| Value | Meaning | Colors |
|-------|---------|--------|
| `0` | No color support | - |
| `1` | Basic colors | 16 colors |
| `2` | 256 colors | 256 colors |
| `3` | Truecolor | 16 million colors (RGB) |

```typescript
import { colorLevel } from 'es-toolkit/color';

if (colorLevel >= 2) {
  // Terminal supports 256 colors or more
}
```

### `isColorSupported`

A boolean value indicating whether color output is available. Equivalent to `colorLevel > 0`.

```typescript
import { isColorSupported } from 'es-toolkit/color';

if (isColorSupported) {
  console.log('This terminal supports colors');
}
```

## Detection Order

The color level is detected in the following order:

1. **FORCE_COLOR** -- The user explicitly forces a color level. `"0"` disables colors; `"1"` through `"3"` sets the corresponding level.
2. **NO_COLOR** -- The user explicitly disables colors.
3. **TTY check** -- If stdout is not a terminal (pipes, redirects, etc.), colors are disabled.
4. **Windows** -- Detects Windows Terminal (truecolor) and ConEmu. Other Windows terminals default to 16 colors.
5. **COLORTERM** -- If set to `truecolor` or `24bit`, truecolor is detected. Set by terminals such as iTerm2 and Alacritty.
6. **TERM** -- If it contains `256color`, 256-color support is detected (e.g., `xterm-256color`).
7. **hasColors()** -- Uses the Node.js built-in API (11.13+) to directly check terminal color capabilities.
8. **Default** -- If a TTY is confirmed, defaults to 16 colors.

`FORCE_COLOR` and `NO_COLOR` treat empty strings (`""`) as "not set". This follows the [force-color.org](https://force-color.org/) and [no-color.org](https://no-color.org/) specs respectively.
