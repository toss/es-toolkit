# padStart (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.padStart`

This `padStart` function operates slower due to handling non-string values.

Instead, use the faster and more modern JavaScript's `String.prototype.padStart`.

:::

Pads the start of a string to extend it to the specified length.

```typescript
const padded = padStart(str, length, chars);
```

## Reference

### `padStart(str, length?, chars?)`

Use `padStart` when you want to pad the start of a string to match a desired length.

```typescript
import { padStart } from 'es-toolkit/compat';

// Pad with spaces
padStart('abc', 6);
// Returns: '   abc'

// Pad with specific characters
padStart('abc', 6, '_-');
// Returns: '_-_abc'

// Return as is if original length is longer
padStart('abc', 3);
// Returns: 'abc'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { padStart } from 'es-toolkit/compat';

padStart(null, 5, '*');
// Returns: '*****'

padStart(undefined, 3);
// Returns: '   '
```

#### Parameters

- `str` (`string`, optional): The string to add padding to.
- `length` (`number`, optional): The desired final string length. Defaults to `0`.
- `chars` (`string`, optional): The character to use for padding. Defaults to `' '` (space).

#### Returns

(`string`): Returns the string with padding added to the start.
