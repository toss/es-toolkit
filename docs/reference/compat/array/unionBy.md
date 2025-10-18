# unionBy (Lodash Compatibility)

::: warning Use [unionBy](../../array/unionBy.md) from `es-toolkit`

This `unionBy` function operates slowly due to complex processing.

Instead, use the faster and more modern [unionBy](../../array/unionBy.md) from `es-toolkit`.

:::

Merges multiple arrays and keeps only unique values based on a specified criterion.

```typescript
const result = unionBy(...arrays, iteratee);
```

## Reference

### `unionBy(...arrays, iteratee)`

Use `unionBy` when you want to merge multiple arrays and remove duplicates based on a given criterion function to create a new array containing only unique values. The order of first appearance of each value is preserved.

```typescript
import { unionBy } from 'es-toolkit/compat';

// Compare by flooring decimal numbers
unionBy([2.1], [1.2, 2.3], Math.floor);
// Returns: [2.1, 1.2]

// Compare by object property
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 1 }, { x: 2 }]

// Compare with function
unionBy(
  [{ id: 1, name: 'a' }],
  [
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
  ],
  item => item.id
);
// Returns: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]

// Compare with partial object
unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], { x: 1 });
// Returns: [{ x: 1, y: 1 }]
```

`null` or `undefined` arrays are ignored.

```typescript
import { unionBy } from 'es-toolkit/compat';

unionBy([1, 2], null, undefined, [3, 4], x => x);
// Returns: [1, 2, 3, 4]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to merge.
- `iteratee` (`ValueIteratee<T>`): The criterion to determine uniqueness. Can be a function, property name, partial object, or property-value array.

#### Returns

(`T[]`): Returns a new array containing unique values with duplicates removed based on the specified criterion.
