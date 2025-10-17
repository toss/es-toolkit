# unzip (Lodash Compatibility)

::: warning Use [unzip](../../array/unzip.md) from `es-toolkit`

This `unzip` function operates slowly due to handling of `null` or `undefined`, filtering of non-array values, etc.

Instead, use the faster and more modern [unzip](../../array/unzip.md) from `es-toolkit`.

:::

Collects elements at the same positions in grouped arrays into new arrays.

```typescript
const result = unzip(array);
```

## Reference

### `unzip(array)`

Collects elements at the same index in nested arrays and returns them as a new array. Performs the opposite operation of the `zip` function. This is useful when transposing matrices or reorganizing structured data.

```typescript
import { unzip } from 'es-toolkit/compat';

// Unzip arrays with mixed strings, booleans, and numbers
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
];
const result = unzip(zipped);
// Returns: [['a', 'b'], [true, false], [1, 2]]

// Unzip number arrays
const numbers = [
  [1, 4],
  [2, 5],
  [3, 6],
];
unzip(numbers);
// Returns: [[1, 2, 3], [4, 5, 6]]

// Handle arrays with different lengths
const uneven = [
  ['a', 1],
  ['b', 2, true],
];
unzip(uneven);
// Returns: [['a', 'b'], [1, 2], [undefined, true]]
```

`null`, `undefined`, or empty arrays are treated as empty arrays.

```typescript
import { unzip } from 'es-toolkit/compat';

unzip(null); // []
unzip(undefined); // []
unzip([]); // []
```

#### Parameters

- `array` (`T[][] | ArrayLike<ArrayLike<T>> | null | undefined`): The nested array to unzip. Elements at the same position in each inner array are collected together.

#### Returns

(`T[][]`): Returns a new array with elements at the same positions collected together.
