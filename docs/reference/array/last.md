# last

Returns the last element of an array.

```typescript
const lastElement = last(arr);
```

## Reference

### `last(arr)`

Use `last` when you want to get the last element of an array. If the array is empty, it returns `undefined`. This is useful when accessing data at the end of an array.

```typescript
import { last } from 'es-toolkit/array';

// Get the last element of a number array
const numbers = [1, 2, 3, 4, 5];
last(numbers);
// Returns: 5

// Get the last element of a string array
const strings = ['a', 'b', 'c'];
last(strings);
// Returns: 'c'

// Empty array returns undefined
const emptyArray: number[] = [];
last(emptyArray);
// Returns: undefined
```

Type handling is safe.

```typescript
import { last } from 'es-toolkit/array';

// For non-empty arrays, the type is certain
const nonEmptyArray = [1, 2, 3] as const;
last(nonEmptyArray);
// Returns: 3 (type: 3)

// For regular arrays, undefined is possible
const maybeEmptyArray = [1, 2, 3];
last(maybeEmptyArray);
// Returns: 3 | undefined (type: number | undefined)
```

It works efficiently even with large arrays.

```typescript
import { last } from 'es-toolkit/array';

// Performance optimized
const largeArray = Array(1000000)
  .fill(0)
  .map((_, i) => i);
last(largeArray);
// Returns: 999999 (fast access)

// It can also handle nested arrays
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
last(nested);
// Returns: [5, 6]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to get the last element.

#### Returns

(`T | undefined`): The last element of the array. Returns `undefined` if the array is empty.
