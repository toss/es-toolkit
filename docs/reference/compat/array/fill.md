# fill (Lodash Compatibility)

::: warning Use `fill` from `es-toolkit`

This `fill` function operates with complex behavior due to handling `null` or `undefined`, support for array-like objects, etc.

Instead, use the faster and more modern [`fill`](../../array/fill.md) from `es-toolkit`.

:::

Fills the elements of an array with a specified value.

```typescript
const result = fill(array, value, start, end);
```

## Reference

### `fill(array, value, start?, end?)`

Use `fill` when you want to fill a specific range or the entire array with the same value. It modifies the original array directly.

```typescript
import { fill } from 'es-toolkit/compat';

// Fill entire array
const arr1 = [1, 2, 3];
fill(arr1, 'a');
// Returns: ['a', 'a', 'a']

// Fill specific range
const arr2 = [1, 2, 3, 4, 5];
fill(arr2, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]

// Use negative indices
const arr3 = [1, 2, 3, 4, 5];
fill(arr3, 'x', -3, -1);
// Returns: [1, 2, 'x', 'x', 5]
```

Array-like objects are also supported.

```typescript
import { fill } from 'es-toolkit/compat';

const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
fill(arrayLike, 'a', 1, 2);
// Returns: { 0: 1, 1: 'a', 2: 3, length: 3 }
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { fill } from 'es-toolkit/compat';

fill(null, 'a');
// Returns: []

fill(undefined, 'a');
// Returns: []
```

Strings are read-only, so they are returned as is.

```typescript
import { fill } from 'es-toolkit/compat';

fill('abc', 'x');
// Returns: 'abc' (not modified)
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to fill.
- `value` (`U`): The value to fill the array with.
- `start` (`number`, optional): The start position. Defaults to `0`.
- `end` (`number`, optional): The end position (not included). Defaults to `array.length`.

#### Returns

(`ArrayLike<T | U>`): Returns the array filled with the value.
