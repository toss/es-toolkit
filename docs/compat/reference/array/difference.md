# difference (Lodash compatible)

::: warning Use `difference` from `es-toolkit` instead

This `difference` function operates in a complex manner due to handling `null` or `undefined` and processing multiple array arguments.

Use the faster and more modern [difference](../../array/difference.md) from `es-toolkit` instead.

:::

Computes the difference between the first array and the other arrays, excluding values from the first array that are present in the other arrays.

```typescript
const result = difference(arr, ...values);
```

## Usage

### `difference(arr, ...values)`

Use `difference` when you want to remove all values from the first array that are present in the other arrays. The order is preserved from the first array.

```typescript
import { difference } from 'es-toolkit/compat';

// Basic usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const array3 = [5, 6];
difference(array1, array2, array3);
// Returns: [1, 3]

// String arrays
difference(['a', 'b', 'c'], ['b'], ['c', 'd']);
// Returns: ['a']

// Handling duplicates
difference([1, 2, 2, 3], [2]);
// Returns: [1, 3]
```

Handles empty arrays or empty differences.

```typescript
import { difference } from 'es-toolkit/compat';

// Difference with empty array
difference([1, 2, 3], []);
// Returns: [1, 2, 3]

// When all values are excluded
difference([1, 2, 3], [1, 2, 3]);
// Returns: []

// When there are no overlapping values
difference([1, 2], [3, 4]);
// Returns: [1, 2]
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { difference } from 'es-toolkit/compat';

difference(null, [1, 2]);
// Returns: []

difference(undefined, [1, 2]);
// Returns: []

difference([1, 2, 3], null, undefined);
// Returns: [1, 2, 3] (null and undefined are ignored)
```

Supports array-like objects.

```typescript
import { difference } from 'es-toolkit/compat';

// Array-like objects
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };
difference(arrayLike1, arrayLike2);
// Returns: [1, 3]
```

#### Parameters

- `arr` (`ArrayLike<T> | null | undefined`): The base array to compute the difference from.
- `values` (`...ArrayLike<T>[]`): Arrays containing values to exclude.

#### Returns

(`T[]`): Returns a new array with values from the first array excluding values present in the other arrays.
