# rgbToHex

Converts RGB color values to a hexadecimal color string.

This function takes RGB color values and converts them to a hexadecimal color string. Each RGB component should be an integer between 0 and 255 (inclusive).

## Signature

```typescript
function rgbToHex(r: number, g: number, b: number): string;
```

### Parameters

- `r` (`number`): The red color component. Must be an integer between 0 and 255.
- `g` (`number`): The green color component. Must be an integer between 0 and 255.
- `b` (`number`): The blue color component. Must be an integer between 0 and 255.

### Returns

(`string`): The hexadecimal color string representation of the RGB values, prefixed with '#'.

### Throws

Throws an error if any of the RGB values are not integers or are outside the range 0-255.

## Examples

```typescript
import { rgbToHex } from 'es-toolkit/color';

// Basic colors
rgbToHex(255, 0, 0); // '#ff0000' (red)
rgbToHex(0, 255, 0); // '#00ff00' (green)
rgbToHex(0, 0, 255); // '#0000ff' (blue)

// Other colors
rgbToHex(255, 255, 255); // '#ffffff' (white)
rgbToHex(0, 0, 0); // '#000000' (black)
rgbToHex(255, 165, 0); // '#ffa500' (orange)

// Edge cases
rgbToHex(0, 0, 0); // '#000000'
rgbToHex(255, 255, 255); // '#ffffff'

// Error cases
rgbToHex(256, 0, 0); // throws Error: Invalid RGB value
rgbToHex(-1, 0, 0); // throws Error: Invalid RGB value
rgbToHex(1.5, 0, 0); // throws Error: Invalid RGB value
```
