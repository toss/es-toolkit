# compact (Lodash compatible)

::: warning Use [`compact`](../../array/compact.md) from `es-toolkit` instead

This `compact` function operates slowly due to handling `null` or `undefined`, `size` default value processing, and more.

Use the faster and more modern [compact](../../array/compact.md) from `es-toolkit` instead.

:::

Removes falsy values from an array.

```typescript
const compacted = compact(arr);
```

## Usage

### `compact(arr)`

Use `compact` when you want to remove falsy values like `false`, `null`, `0`, `""`, `undefined`, `NaN` from an array.

```typescript
import { compact } from 'es-toolkit/compat';

// Remove falsy values
compact([0, 1, false, 2, '', 3]);
// Returns: [1, 2, 3]

compact(['a', null, 'b', undefined, 'c', NaN]);
// Returns: ['a', 'b', 'c']

// BigInt 0 is also removed
compact([0n, 1n, false, 2n]);
// Returns: [1n, 2n]

// Works with empty arrays
compact([]);
// Returns: []

// When all values are falsy
compact([false, null, 0, '', undefined, NaN]);
// Returns: []
```

Truthy values are preserved.

```typescript
import { compact } from 'es-toolkit/compat';

compact([1, 'hello', true, {}, []]);
// Returns: [1, 'hello', true, {}, []]

// Non-zero numbers
compact([0, -1, 2, -3]);
// Returns: [-1, 2, -3]
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { compact } from 'es-toolkit/compat';

compact(null);
// Returns: []

compact(undefined);
// Returns: []
```

#### Parameters

- `arr` (`ArrayLike<T> | null | undefined`): The array to compact.

#### Returns

(`T[]`): Returns a new array with falsy values removed.
