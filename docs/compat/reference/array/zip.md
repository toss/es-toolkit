# zip (Lodash Compatibility)

::: warning Use [zip](../../array/zip.md) from `es-toolkit`

This `zip` function operates slowly due to additional processing for Lodash compatibility.

Instead, use the faster and more modern [zip](../../array/zip.md) from `es-toolkit`.

:::

Combines multiple arrays into a single array of tuples.

```typescript
const result = zip([1, 2], ['a', 'b']);
// result is [[1, 'a'], [2, 'b']].
```

## Usage

### `zip(...arrs)`

Takes multiple arrays and groups the elements at each index into a single tuple to create a new array. If the input arrays have different lengths, the result array will have the length of the longest input array, with missing elements filled with `undefined`.

```typescript
import { zip } from 'es-toolkit/compat';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// Arrays with different lengths
const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// Returns: [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]

// Including empty array
zip([1, 2], [], ['a', 'b']);
// Returns: [[1, undefined, 'a'], [2, undefined, 'b']]
```

#### Parameters

- `...arrs` (`any[][]`): The arrays to combine.

#### Returns

(`any[][]`): A new array of tuples containing elements from each index of the input arrays.
