# takeRight (Lodash compatibility)

::: warning Please use [takeRight](../../array/takeRight.md) from `es-toolkit`

This `takeRight` function operates slowly due to handling `null` or `undefined`.

Please use the faster and modern [takeRight](../../array/takeRight.md) from `es-toolkit` instead.

:::

Takes a specified number of elements from the end of an array.

```typescript
const result = takeRight(array, count);
```

## Usage

### `takeRight(array, count)`

Use `takeRight` when you want to create a new array by taking a specified number of elements from the end of an array. If the requested count is greater than the array length, returns the entire array.

```typescript
import { takeRight } from 'es-toolkit/compat';

// Take the last 2 elements from a number array.
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// Take the last 3 elements from a string array.
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']

// When requested count is greater than array length
takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]

// Request 0 elements
takeRight([1, 2, 3], 0);
// Returns: []

// Request negative number
takeRight([1, 2, 3], -1);
// Returns: []
```

`null` or `undefined` is treated as an empty array.

```typescript
import { takeRight } from 'es-toolkit/compat';

takeRight(null, 2); // []
takeRight(undefined, 2); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to take elements from.
- `count` (`number`, optional): The number of elements to take. Default is `1`.

#### Returns

(`T[]`): Returns a new array containing the specified number of elements from the end.
