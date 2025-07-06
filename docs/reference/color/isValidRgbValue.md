# isValidRgbValue

Validates if a number is a valid RGB color value.

This function checks whether a given number represents a valid RGB color component. A valid RGB value must be an integer between 0 and 255 (inclusive).

## Signature

```typescript
function isValidRgbValue(value: number): boolean;
```

### Parameters

- `value` (`number`): The number to validate as an RGB color component.

### Returns

(`boolean`): `true` if the value is a valid RGB color component, `false` otherwise.

## Examples

```typescript
import { isValidRgbValue } from 'es-toolkit/color';

// Valid RGB values
isValidRgbValue(0); // true (minimum value)
isValidRgbValue(255); // true (maximum value)
isValidRgbValue(128); // true (middle value)
isValidRgbValue(42); // true

// Invalid RGB values - out of range
isValidRgbValue(-1); // false (below minimum)
isValidRgbValue(256); // false (above maximum)
isValidRgbValue(300); // false (above maximum)

// Invalid RGB values - not integers
isValidRgbValue(1.5); // false (decimal)
isValidRgbValue(255.1); // false (decimal)
isValidRgbValue(42.999); // false (decimal)

// Invalid RGB values - not numbers
isValidRgbValue(NaN); // false
isValidRgbValue(Infinity); // false
isValidRgbValue(-Infinity); // false
```
