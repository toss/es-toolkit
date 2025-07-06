# isValidHex

Validates if a string is a valid hexadecimal color string.

This function checks whether a given string represents a valid hexadecimal color value. It accepts both 3-digit and 6-digit hex strings and is case-insensitive. The input should not include the '#' prefix.

## Signature

```typescript
function isValidHex(hex: string): boolean;
```

### Parameters

- `hex` (`string`): The hexadecimal color string to validate (without the '#' prefix). Should be either 3 or 6 characters long.

### Returns

(`boolean`): `true` if the hex string is valid, `false` otherwise.

## Examples

```typescript
import { isValidHex } from 'es-toolkit/color';

// Valid 6-digit hex strings
isValidHex('ff0000'); // true (red)
isValidHex('00ff00'); // true (green)
isValidHex('0000ff'); // true (blue)
isValidHex('ffffff'); // true (white)
isValidHex('000000'); // true (black)
isValidHex('123456'); // true
isValidHex('abcdef'); // true

// Valid 3-digit hex strings
isValidHex('f00'); // true (red)
isValidHex('0f0'); // true (green)
isValidHex('00f'); // true (blue)
isValidHex('fff'); // true (white)
isValidHex('000'); // true (black)
isValidHex('123'); // true
isValidHex('abc'); // true

// Mixed case (valid)
isValidHex('FF0000'); // true
isValidHex('fF0000'); // true
isValidHex('aB12Cd'); // true
isValidHex('AbC'); // true

// Invalid lengths
isValidHex(''); // false
isValidHex('f'); // false
isValidHex('ff'); // false
isValidHex('ff00'); // false (4 digits)
isValidHex('ff000'); // false (5 digits)
isValidHex('ff00000'); // false (7 digits)

// Invalid characters
isValidHex('gg0000'); // false
isValidHex('ff00xx'); // false
isValidHex('ff00!!'); // false
isValidHex('xyz'); // false
```
