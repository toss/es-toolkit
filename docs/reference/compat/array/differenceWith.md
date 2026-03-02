# differenceWith (Lodash compatible)

::: warning Use `differenceWith` from `es-toolkit` instead

This `differenceWith` function operates slowly due to handling `null` or `undefined`, processing multiple arrays, and `ArrayLike` type processing.

Use the faster and more modern [differenceWith](../../array/differenceWith.md) from `es-toolkit` instead.

:::

Removes elements from the first array that are present in the other arrays using a comparator function.

```typescript
const result = differenceWith(array, ...values, comparator);
```

## Usage

### `differenceWith(array, ...values, comparator)`

Use `differenceWith` when you want to compute the difference using a comparator function to compare elements. The last argument becomes the comparator function.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// Compare objects by id
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const others = [{ id: 2 }];
const comparator = (a, b) => a.id === b.id;

differenceWith(objects, others, comparator);
// Returns: [{ id: 1 }, { id: 3 }]

// Exclude from multiple arrays at once
const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];

differenceWith(array, values1, values2, comparator);
// Returns: [{ id: 1 }, { id: 4 }]
```

Without a comparator function, it behaves like regular `difference`.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// Without comparator, uses regular comparison
differenceWith([1, 2, 3], [2], [3]);
// Returns: [1]
```

Can use complex comparison logic.

```typescript
import { differenceWith } from 'es-toolkit/compat';

const users = [
  { name: 'alice', age: 25 },
  { name: 'bob', age: 30 },
  { name: 'charlie', age: 35 },
];
const excludeUsers = [{ name: 'bob', age: 25 }]; // Different age

// Compare only by name
const compareByName = (a, b) => a.name === b.name;
differenceWith(users, excludeUsers, compareByName);
// Returns: [{ name: 'alice', age: 25 }, { name: 'charlie', age: 35 }]
// bob is excluded (even though age is different, name matches)
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The base array to compute the difference from.
- `...values` (`Array<ArrayLike<T>>` + `(a: T, b: T) => boolean`): Arrays containing elements to exclude, with the last argument being the comparator function.

#### Returns

(`T[]`): Returns a new array with elements from the first array excluding those found in the other arrays using the comparator function.
