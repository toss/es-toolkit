# slice (Lodash Compatibility)

::: warning Use `Array.prototype.slice`

This `slice` function operates slowly due to `null` or `undefined` handling and special processing of sparse arrays. JavaScript's native `Array.prototype.slice` method is faster and more standardized.

Instead, use the faster and more modern `Array.prototype.slice`.

:::

Slices a portion of an array to create a new array.

```typescript
const sliced = slice(array, start, end);
```

## Reference

### `slice(array, start, end)`

Use `slice` when you need only a specific portion of an array. It creates a new array containing elements from the start position up to, but not including, the end position.

```typescript
import { slice } from 'es-toolkit/compat';

// Slice from index 1 to 2
slice([1, 2, 3, 4], 1, 3);
// Returns: [2, 3]

// Use negative indices
slice([1, 2, 3, 4], -2);
// Returns: [3, 4]

// Specify only start position
slice([1, 2, 3, 4], 2);
// Returns: [3, 4]
```

`null` or `undefined` is handled as an empty array.

```typescript
import { slice } from 'es-toolkit/compat';

slice(null); // []
slice(undefined); // []
```

When processing sparse arrays, empty slots are filled with `undefined`.

```typescript
import { slice } from 'es-toolkit/compat';

const sparse = new Array(3);
sparse[1] = 'b';
slice(sparse);
// Returns: [undefined, 'b', undefined]
```

Using negative indices calculates from the end of the array.

```typescript
import { slice } from 'es-toolkit/compat';

slice([1, 2, 3, 4, 5], -3, -1);
// Returns: [3, 4]
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to slice.
- `start` (`number`, optional): The start position. Negative values calculate from the end. The default is `0`.
- `end` (`number`, optional): The end position (not included). Negative values calculate from the end. The default is the array's length.

#### Returns

(`T[]`): Returns a new array containing elements from `start` up to, but not including, `end`.
