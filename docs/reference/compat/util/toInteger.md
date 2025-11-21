# toInteger (Lodash Compatibility)

Converts a value to an integer.

```typescript
const integer = toInteger(value);
```

## Usage

### `toInteger(value)`

Converts a value to an integer. The decimal part is discarded, leaving only the integer part.

```typescript
import { toInteger } from 'es-toolkit/compat';

// Convert decimal to integer
toInteger(3.2);
// Returns: 3

// Convert string number to integer
toInteger('3.2');
// Returns: 3

// Very small numbers become 0
toInteger(Number.MIN_VALUE);
// Returns: 0

// Infinity becomes MAX_VALUE
toInteger(Infinity);
// Returns: 1.7976931348623157e+308
```

Invalid values are converted to 0.

```typescript
import { toInteger } from 'es-toolkit/compat';

toInteger(NaN);
// Returns: 0

toInteger(Symbol.iterator);
// Returns: 0

toInteger(null);
// Returns: 0
```

#### Parameters

- `value` (`unknown`): The value to convert.

#### Returns

(`number`): Returns the converted integer.
