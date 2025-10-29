# pullAllWith (Lodash Compatibility)

Removes specified values from an array using a comparison function.

```typescript
const modified = pullAllWith(array, valuesToRemove, comparator);
```

## Reference

### `pullAllWith(array, values, comparator)`

Removes specified values from an array using the provided comparison function. The original array is modified and the modified array is returned.

```typescript
import { pullAllWith } from 'es-toolkit/compat';

// Remove with object comparison
const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
console.log(array); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]

// Remove by comparing string length
const words = ['hello', 'world', 'test', 'code'];
pullAllWith(words, ['hi'], (a, b) => a.length === b.length);
console.log(words); // ['hello', 'world', 'code'] ('test' removed as it has same length as 'hi')
```

If the array is empty or `null`, `undefined`, the original array is returned as is.

```typescript
import { pullAllWith } from 'es-toolkit/compat';

pullAllWith([], [1], (a, b) => a === b); // []
pullAllWith(null as any, [1], (a, b) => a === b); // null
```

#### Parameters

- `array` (`T[]`): The array to modify.
- `values` (`ArrayLike<T>`, optional): The array of values to remove.
- `comparator` (`(a: T, b: T) => boolean`, optional): The function to compare two elements. Should return `true` if the two elements are considered equal.

#### Returns

(`T[]`): Returns the original array with the specified values removed.
