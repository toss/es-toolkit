# differenceBy (Lodash compatible)

::: warning Use `differenceBy` from `es-toolkit` instead

This `differenceBy` function operates slowly due to complex argument processing and iteratee transformation.

Use the faster and more modern [differenceBy](../../array/differenceBy.md) from `es-toolkit` instead.

:::

Computes the difference between the first array and other arrays after applying an iteratee function to transform the values for comparison.

```typescript
const result = differenceBy(array, ...values, iteratee);
```

## Reference

### `differenceBy(array, ...values, iteratee)`

Use `differenceBy` when you want to remove elements from the first array that have equivalent transformed values in the other arrays. This is useful for comparing arrays of objects by a specific property or transformed value.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// Compare using Math.floor
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// Returns: [1.2] (2.1 is excluded because Math.floor(2.1) === Math.floor(2.3))

// Compare by string length
differenceBy(['one', 'two', 'three'], ['four', 'five'], 'length');
// Returns: ['one', 'two'] (excludes items with length 4 and 5, three is also excluded as its length is 5)

// Compare objects by property
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [{ id: 1, name: 'Different Alice' }];
differenceBy(users1, users2, 'id');
// Returns: [{ id: 2, name: 'Bob' }] (excludes object with id 1)
```

Can exclude from multiple arrays at once.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// Exclude from multiple arrays
differenceBy([2.1, 1.2, 3.5], [2.3], [1.4], [3.2], Math.floor);
// Returns: [] (all elements are excluded)

// Compare strings by length from multiple arrays
differenceBy(['a', 'bb', 'ccc'], ['x'], ['yy'], ['zzz'], 'length');
// Returns: [] (lengths 1, 2, 3 are all excluded)
```

Without an iteratee function, it behaves like regular `difference`.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// Without iteratee function
differenceBy([1, 2, 3], [2, 4]);
// Returns: [1, 3]
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { differenceBy } from 'es-toolkit/compat';

differenceBy(null, [1, 2], Math.floor);
// Returns: []

differenceBy(undefined, [1, 2], x => x);
// Returns: []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The base array to compute the difference from.
- `values` (`...ArrayLike<T>[]`): Arrays containing values to exclude.
- `iteratee` (`ValueIteratee<T>`): The function that transforms each element for comparison. Can be a function, property name, or partial object.

#### Returns

(`T[]`): Returns a new array with elements excluded based on the transformed values.