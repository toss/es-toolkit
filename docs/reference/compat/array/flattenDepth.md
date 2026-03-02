# flattenDepth (Lodash Compatibility)

::: warning Use `flatten` from `es-toolkit`

This `flattenDepth` function operates slowly due to handling `null` or `undefined`. The `flatten` function from `es-toolkit` operates faster and simpler without this additional processing.

Use the faster and more modern [flatten](../../array/flatten.md) from `es-toolkit` instead.

:::

Flattens an array to the specified depth.

```typescript
const flattened = flattenDepth(array, depth);
```

## Usage

### `flattenDepth(array, depth)`

Use `flattenDepth` when you want to flatten a nested array to a desired depth. When you specify a depth, it flattens the nested array only to that depth.

```typescript
import { flattenDepth } from 'es-toolkit/compat';

// Flatten to depth 1
flattenDepth([1, [2, [3, [4]], 5]], 1);
// Returns: [1, 2, [3, [4]], 5]

// Flatten to depth 2
flattenDepth([1, [2, [3, [4]], 5]], 2);
// Returns: [1, 2, 3, [4], 5]

// If no depth is specified, it defaults to 1
flattenDepth([1, [2, [3, [4]], 5]]);
// Returns: [1, 2, [3, [4]], 5]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { flattenDepth } from 'es-toolkit/compat';

flattenDepth(null, 2); // []
flattenDepth(undefined, 2); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to flatten.
- `depth` (`number`, optional): The maximum depth to flatten. Default is `1`.

#### Returns

(`T[]`): Returns a new array flattened to the specified depth.
