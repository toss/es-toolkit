# toNumber (Lodash Compatibility)

::: warning Use Number constructor instead

This `toNumber` function performs slowly due to symbol type validation and additional processing.

Use the faster and more modern Number constructor instead.

:::

Converts a value to a number.

```typescript
const number = toNumber(value);
```

## Usage

### `toNumber(value)`

Converts a value to a number. Symbols are treated as NaN.

```typescript
import { toNumber } from 'es-toolkit/compat';

// Regular numbers are returned as is
toNumber(3.2);
// Returns: 3.2

// Convert string numbers
toNumber('3.2');
// Returns: 3.2

// Infinity is also returned as is
toNumber(Infinity);
// Returns: Infinity

// Very small numbers are also returned as is
toNumber(Number.MIN_VALUE);
// Returns: 5e-324
```

Symbols and NaN are converted to NaN.

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Symbol.iterator);
// Returns: NaN

toNumber(NaN);
// Returns: NaN
```

#### Parameters

- `value` (`unknown`): The value to convert.

#### Returns

(`number`): Returns the converted number.
