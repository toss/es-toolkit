# intersectionWith (Lodash Compatibility)

::: warning Use [`intersectionWith`](../../array/intersectionWith.md) from `es-toolkit`

This `intersectionWith` function operates slowly due to handling `null` or `undefined`, support for various overloads, etc.

Instead, use the faster and more modern [`intersectionWith`](../../array/intersectionWith.md) from `es-toolkit`.

:::

Creates an array of common elements found in all arrays using a custom comparison function.

```typescript
const result = intersectionWith(array, ...otherArrays, comparator);
```

## Usage

### `intersectionWith(array, ...otherArrays, comparator)`

Finds the intersection of the first array with the rest using a custom comparison function. The comparison function determines if elements are equal, and only elements found in all arrays are returned.

```typescript
import { intersectionWith } from 'es-toolkit/compat';

const objects = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const others = [
  { id: 1, name: 'john' },
  { id: 3, name: 'joe' },
];

intersectionWith(objects, others, (a, b) => a.id === b.id);
// => [{ id: 1, name: 'john' }]

// You can compare with multiple arrays
const array1 = [{ x: 1 }, { x: 2 }];
const array2 = [{ x: 1 }, { x: 3 }];
const array3 = [{ x: 1 }, { x: 4 }];

intersectionWith(array1, array2, array3, (a, b) => a.x === b.x);
// => [{ x: 1 }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { intersectionWith } from 'es-toolkit/compat';

intersectionWith(null, [1, 2], (a, b) => a === b); // []
intersectionWith([1, 2], undefined, (a, b) => a === b); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The first array to compare.
- `...otherArrays` (`Array<ArrayLike<U> | ((a: T, b: T | U) => boolean)>`): The other arrays to compare and the comparison function as the last element.
- `comparator` (`(a: T, b: T | U) => boolean`): The function to determine if two elements are equal.

#### Returns

(`T[]`): Returns a new array of elements commonly found in all arrays.
