# uniqBy (Lodash Compatibility)

::: warning Use [uniqBy](../../array/uniqBy.md) from `es-toolkit`

This `uniqBy` function operates slowly due to handling of `null` or `undefined`, complex argument type processing, etc.

Instead, use the faster and more modern [uniqBy](../../array/uniqBy.md) from `es-toolkit`.

:::

Creates a new array of unique elements by removing duplicates based on the values returned by a transformation function.

```typescript
const result = uniqBy(array, iteratee);
```

## Reference

### `uniqBy(array, iteratee)`

Applies a transformation function to each element of the array and keeps only the first element among those with the same transformation result. This is useful when removing duplicates based on a specific property in an object array or based on a specific calculation result in a number array.

```typescript
import { uniqBy } from 'es-toolkit/compat';

// Remove duplicates by Math.floor result in number array
uniqBy([2.1, 1.2, 2.3], Math.floor);
// Returns: [2.1, 1.2]

// Remove duplicates by property in object array
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 1 }, { x: 2 }]

// Remove duplicates with function
uniqBy([{ name: 'John' }, { name: 'Jane' }, { name: 'John' }], obj => obj.name);
// Returns: [{ name: 'John' }, { name: 'Jane' }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { uniqBy } from 'es-toolkit/compat';

uniqBy(null, Math.floor); // []
uniqBy(undefined, 'x'); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove duplicates from.
- `iteratee` (`ValueIteratee<T>`): The transformation function to apply to each element. Can be a function, property name, partial object, etc.

#### Returns

(`T[]`): Returns a new array with duplicates removed based on the transformation function result.
