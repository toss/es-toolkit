# drop (Lodash Compatibility)

::: warning Use `drop` from `es-toolkit`

This `drop` function operates in a complex manner due to handling of `null` or `undefined`, `toInteger` conversion, etc.

Instead, use the faster and more modern [`drop`](../../array/drop.md) from `es-toolkit`.

:::

Removes a specified number of elements from the beginning of an array.

```typescript
const result = drop(array, n);
```

## Usage

### `drop(array, n?)`

Use `drop` when you want to remove several elements from the beginning of an array and get the rest. By default, it removes the first element.

```typescript
import { drop } from 'es-toolkit/compat';

// Basic usage (removes first element)
drop([1, 2, 3, 4, 5]);
// Returns: [2, 3, 4, 5]

// Remove first 2 elements
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// Remove first 3 elements
drop(['a', 'b', 'c', 'd'], 3);
// Returns: ['d']
```

When specifying 0 or a negative number, it returns the original array as is.

```typescript
import { drop } from 'es-toolkit/compat';

// Remove 0 elements
drop([1, 2, 3], 0);
// Returns: [1, 2, 3]

// Specify negative number
drop([1, 2, 3], -1);
// Returns: [1, 2, 3]
```

When specifying a number larger than the array, it returns an empty array.

```typescript
import { drop } from 'es-toolkit/compat';

// Specify number larger than array size
drop([1, 2, 3], 5);
// Returns: []

// Remove from empty array
drop([], 1);
// Returns: []
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { drop } from 'es-toolkit/compat';

drop(null, 1);
// Returns: []

drop(undefined, 2);
// Returns: []
```

Array-like objects are also supported.

```typescript
import { drop } from 'es-toolkit/compat';

// Array-like object
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
drop(arrayLike, 1);
// Returns: ['b', 'c']
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array from which elements will be removed.
- `n` (`number`, optional): The number of elements to remove. Default is `1`.

#### Returns

(`T[]`): Returns a new array with the specified number of elements removed from the beginning.
