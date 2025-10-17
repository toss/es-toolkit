# sampleSize (Lodash Compatibility)

::: warning Use `es-toolkit`'s [sampleSize](../../array/sampleSize.md)

This `sampleSize` function operates slowly due to `null` or `undefined` handling, object support, default value processing, etc.

Instead, use the faster and more modern `es-toolkit`'s [sampleSize](../../array/sampleSize.md).

:::

Randomly selects a specified number of elements from an array or object.

```typescript
const sampled = sampleSize(collection, size);
```

## Reference

### `sampleSize(collection, size?)`

Use `sampleSize` to randomly select elements from an array or object. It uses Floyd's algorithm to sample efficiently without duplicates.

```typescript
import { sampleSize } from 'es-toolkit/compat';

// Randomly select 3 elements from an array.
sampleSize([1, 2, 3, 4, 5], 3);
// Returns: [2, 4, 5] (actual results may vary)

// Randomly select 2 values from an object.
sampleSize({ a: 1, b: 2, c: 3, d: 4 }, 2);
// Returns: [2, 4] (actual results may vary)
```

`null` or `undefined` is handled as an empty array.

```typescript
import { sampleSize } from 'es-toolkit/compat';

sampleSize(null, 2);
// Returns: []

sampleSize(undefined, 2);
// Returns: []
```

#### Parameters

- `collection` (`Record<string, T> | Record<number, T> | T | null | undefined`): The array or object to sample from.
- `size` (`number`, optional): The number of elements to select. The default is `1`.

#### Returns

(`T[]`): Returns a new array composed of randomly selected elements.
