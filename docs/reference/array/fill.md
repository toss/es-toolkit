# fill

Fills array elements with a specified value. Modifies the original array directly.

```typescript
const filled = fill(arr, value, start, end);
```

::: info If you don't want to modify the original array, use [`toFilled`](./toFilled.md).

`toFilled` returns a new array instead of modifying the original.

:::

## Usage

### `fill(arr, value, start?, end?)`

Use `fill` when you want to fill a specific range of an array with a specified value. It replaces elements from the start position to just before the end position with the provided value. If you don't specify start or end positions, it fills the entire array.

```typescript
import { fill } from 'es-toolkit/array';

// Fill the entire array with 'a'.
const array1 = [1, 2, 3];
fill(array1, 'a');
// Returns: ['a', 'a', 'a']

// Fill an empty array with 2.
const array2 = Array(3);
fill(array2, 2);
// Returns: [2, 2, 2]

// Fill from index 1 to just before 3 with '*'.
const array3 = [4, 6, 8, 10];
fill(array3, '*', 1, 3);
// Returns: [4, '*', '*', 10]
```

You can also use negative indices. Negative indices count from the end of the array.

```typescript
import { fill } from 'es-toolkit/array';

const array = [1, 2, 3];
fill(array, '*', -2, -1);
// Returns: [1, '*', 3]
```

#### Parameters

- `arr` (`Array<T | U>`): The array to fill.
- `value` (`U`): The value to fill the array with.
- `start` (`number`, optional): The start position. Default is `0`.
- `end` (`number`, optional): The end position. Default is the array length.

#### Returns

(`Array<T | U>`): Returns the original array filled with values.
