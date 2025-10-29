# uniq (Lodash Compatibility)

::: warning Use [uniq](../../array/uniq.md) from `es-toolkit`

This `uniq` function operates slowly due to additional processing for Lodash compatibility.

Instead, use the faster and more modern [uniq](../../array/uniq.md) from `es-toolkit`.

:::

Creates a new array with only unique elements by removing duplicates from an array.

```typescript
const result = uniq([1, 2, 2, 3, 3, 4]);
// result is [1, 2, 3, 4].
```

## Reference

### `uniq(array)`

Returns a new array containing only unique elements by removing duplicates from the array. Only the first occurrence of each element is kept and the order is preserved.

```typescript
import { uniq } from 'es-toolkit/compat';

// Remove duplicates from number array
const numbers = [1, 2, 2, 3, 3, 4, 1];
const result1 = uniq(numbers);
// Returns: [1, 2, 3, 4]

// Remove duplicates from string array
const strings = ['a', 'b', 'b', 'c', 'a'];
const result2 = uniq(strings);
// Returns: ['a', 'b', 'c']

// Remove duplicates from object array (reference value comparison)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objects = [obj1, obj2, obj1];
const result3 = uniq(objects);
// Returns: [{ id: 1 }, { id: 2 }]
```

#### Parameters

- `array` (`T[]`): The array to process.

#### Returns

(`T[]`): A new array with duplicates removed.
