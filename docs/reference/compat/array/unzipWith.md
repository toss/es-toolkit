# unzipWith (Lodash Compatibility)

::: warning Use `unzipWith` from `es-toolkit`

This `unzipWith` function operates slowly due to handling of `null` or `undefined`, `ArrayLike` type processing, support for various condition function forms, etc.

Instead, use the faster and more modern [unzipWith](../../array/unzipWith.md) from `es-toolkit`.

:::

Collects elements at the same positions in grouped arrays and applies a transformation function to create a new array.

```typescript
const result = unzipWith(array, iteratee);
```

## Reference

### `unzipWith(array, iteratee)`

Collects elements at the same index in nested arrays and applies a transformation function. Similar to the `unzip` function, but can apply a transformation function to each group. If no transformation function is provided, it performs the default `unzip` operation.

```typescript
import { unzipWith } from 'es-toolkit/compat';

// Add elements at the same positions
unzipWith(
  [
    [1, 10, 100],
    [2, 20, 200],
  ],
  (a, b) => a + b
);
// Returns: [3, 30, 300]

// Use without transformation function (default unzip operation)
unzipWith([
  [1, 4],
  [2, 5],
  [3, 6],
]);
// Returns: [[1, 2, 3], [4, 5, 6]]

// String concatenation
unzipWith(
  [
    ['a', 'x'],
    ['b', 'y'],
    ['c', 'z'],
  ],
  (a, b) => a + b
);
// Returns: ['abc', 'xyz']

// Find maximum values
unzipWith(
  [
    [1, 10],
    [2, 20],
    [3, 5],
  ],
  Math.max
);
// Returns: [3, 20]
```

`null`, `undefined`, or empty arrays are treated as empty arrays.

```typescript
import { unzipWith } from 'es-toolkit/compat';

unzipWith(null, (a, b) => a + b); // []
unzipWith(undefined, (a, b) => a + b); // []
unzipWith([], (a, b) => a + b); // []
```

#### Parameters

- `array` (`ArrayLike<ArrayLike<T>> | null | undefined`): The nested array to unzip.
- `iteratee` (`(...values: T[]) => R`, optional): The transformation function to apply to each group of elements. If not provided, performs the default `unzip` operation.

#### Returns

(`R[]` or `T[][]`): Returns an array of transformed results if a transformation function is provided, or an unzipped array if not.
