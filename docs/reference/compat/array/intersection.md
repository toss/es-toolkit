# intersection (Lodash Compatibility)

::: warning Use [`intersection`](../../array/intersection.md) from `es-toolkit`

This `intersection` function operates slowly due to handling `null` or `undefined`, multiple array support, and duplicate removal process.

Instead, use the faster and more modern [`intersection`](../../array/intersection.md) from `es-toolkit`.

:::

Finds the intersection of multiple arrays.

```typescript
const result = intersection(...arrays);
```

## Reference

### `intersection(...arrays)`

Finds elements that exist in all arrays and returns them as a new array. The result is deduplicated and maintains the order of the first array.

```typescript
import { intersection } from 'es-toolkit/compat';

// Intersection of two arrays
const array1 = [1, 2, 3, 4];
const array2 = [2, 3, 5, 6];
const result = intersection(array1, array2);
// result is [2, 3]

// Intersection of three arrays
const array3 = [3, 4, 7, 8];
const multiResult = intersection(array1, array2, array3);
// multiResult is [3]

// String arrays
const strings1 = ['a', 'b', 'c'];
const strings2 = ['b', 'c', 'd'];
const stringResult = intersection(strings1, strings2);
// stringResult is ['b', 'c']

// Array-like objects
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, 2: 4, length: 3 };
const likeResult = intersection(arrayLike1, arrayLike2);
// likeResult is [2, 3]
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3];
const result1 = intersection(array1, null);
// result1 is []

const result2 = intersection(null, undefined);
// result2 is []
```

Duplicate elements are removed from the result.

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 1, 2, 3];
const array2 = [1, 2, 2, 4];
const result = intersection(array1, array2);
// result is [1, 2] (duplicates removed)
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to find the intersection of. Array-like objects, null, or undefined are also allowed.

#### Returns

(`T[]`): Returns a new array of elements that exist in all arrays. Duplicates are removed and the order follows the first array.
