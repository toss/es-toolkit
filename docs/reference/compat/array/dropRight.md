# dropRight (Lodash Compatibility)

::: warning Use `dropRight` from `es-toolkit`

This `dropRight` function operates slowly due to handling `null` or `undefined`, `guard` parameter processing, `toInteger` conversion, etc.

Instead, use the faster and more modern [`dropRight`](../../array/dropRight.md) from `es-toolkit`.

:::

Returns a new array with a specified number of elements removed from the end.

```typescript
const result = dropRight(array, itemsCount);
```

## Usage

### `dropRight(array, itemsCount)`

Use `dropRight` when you want to remove a certain number of elements from the end of an array and create a new array with the remaining elements.

```typescript
import { dropRight } from 'es-toolkit/compat';

// Remove the last 2 elements from a number array.
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// Remove the last 1 element from a string array.
dropRight(['a', 'b', 'c'], 1);
// Returns: ['a', 'b']

// If the number to remove is not specified, the default value 1 is used.
dropRight([1, 2, 3]);
// Returns: [1, 2]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { dropRight } from 'es-toolkit/compat';

dropRight(null, 2); // []
dropRight(undefined, 2); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove elements from.
- `itemsCount` (`number`, optional): The number of elements to remove from the end of the array. Default is `1`.

#### Returns

(`T[]`): Returns a new array with `itemsCount` elements removed from the end.
