# hexToRgb

Converts a hexadecimal color string to RGB color values.

This function takes a hexadecimal color string (with or without the '#' prefix) and converts it to RGB color values. It supports both 3-digit shorthand hex colors (e.g., '#f00') and 6-digit hex colors (e.g., '#ff0000').

## Signature

```typescript
function hexToRgb(hex: string): RgbColor;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}
```

### Parameters

- `hex` (`string`): The hexadecimal color string. Can include or exclude the `#` prefix. Supports both 3-digit (`#f00`) and 6-digit (`#ff0000`) formats.

### Returns

(`RgbColor`): An object containing the RGB color values.

- `r` (`number`): Red component (0-255)
- `g` (`number`): Green component (0-255)
- `b` (`number`): Blue component (0-255)

### Throws

Throws an error if the hex string is invalid.

## Examples

```typescript
import { hexToRgb } from 'es-toolkit/color';

// 6-digit hex with # prefix
hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
hexToRgb('#0000ff'); // { r: 0, g: 0, b: 255 }

// 6-digit hex without # prefix
hexToRgb('ff0000'); // { r: 255, g: 0, b: 0 }
hexToRgb('ffffff'); // { r: 255, g: 255, b: 255 }
hexToRgb('000000'); // { r: 0, g: 0, b: 0 }

// 3-digit hex (shorthand)
hexToRgb('#f00'); // { r: 255, g: 0, b: 0 }
hexToRgb('#0f0'); // { r: 0, g: 255, b: 0 }
hexToRgb('00f'); // { r: 0, g: 0, b: 255 }

// Mixed case
hexToRgb('#FfA500'); // { r: 255, g: 165, b: 0 }

// Error cases
hexToRgb('#gg0000'); // throws Error: Invalid hex color string
hexToRgb('#ff00'); // throws Error: Invalid hex color string
hexToRgb(''); // throws Error: Invalid hex color string
```
