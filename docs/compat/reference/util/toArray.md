# toArray (Lodash Compatibility)

::: warning Use Object.values and Array.from instead

This `toArray` function performs slowly due to complex type validation and handling of various inputs.

Instead, use faster and more modern Object.values or Array.from.

:::

Converts a value to an array.

```typescript
const array = toArray(value);
```

## Usage

### `toArray(value)`

Converts various values to arrays. Objects are converted to arrays of their values, array-like objects are converted to arrays, and everything else becomes an empty array.

```typescript
import { toArray } from 'es-toolkit/compat';

// Convert object to array of values
toArray({ a: 1, b: 2 });
// Returns: [1, 2]

// Convert string to array of characters
toArray('abc');
// Returns: ['a', 'b', 'c']

// Convert Map to array of values
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
toArray(map);
// Returns: [['a', 1], ['b', 2]]
```

null or undefined are converted to empty arrays.

```typescript
import { toArray } from 'es-toolkit/compat';

toArray(null);
// Returns: []

toArray(undefined);
// Returns: []
```

#### Parameters

- `value` (`unknown`): The value to convert to an array.

#### Returns

(`any[]`): Returns the converted array.
