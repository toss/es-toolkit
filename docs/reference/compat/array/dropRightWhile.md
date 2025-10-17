# dropRightWhile (Lodash Compatibility)

::: warning Use `dropRightWhile` from `es-toolkit`

This `dropRightWhile` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, support for various predicate function formats, etc.

Instead, use the faster and more modern [`dropRightWhile`](../../array/dropRightWhile.md) from `es-toolkit`.

:::

Removes elements from the end of an array based on a predicate function.

```typescript
const result = dropRightWhile(array, predicate);
```

## Reference

### `dropRightWhile(array, predicate)`

Use `dropRightWhile` when you want to consecutively remove elements from the end of an array that satisfy a specific condition. Removal stops when the predicate function returns `false`.

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

// Using a function as a predicate.
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

dropRightWhile(users, user => !user.active);
// Returns: [{ user: 'barney', active: true }]

// Matching with an object pattern.
dropRightWhile(users, { user: 'pebbles', active: false });
// Returns: [{ user: 'barney', active: true }, { user: 'fred', active: false }]

// Specifying property and value in array format.
dropRightWhile(users, ['active', false]);
// Returns: [{ user: 'barney', active: true }]

// Checking condition by property name.
dropRightWhile(users, 'active');
// Returns: [{ user: 'barney', active: true }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

dropRightWhile(null, x => x > 0); // []
dropRightWhile(undefined, x => x > 0); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove elements from.
- `predicate` (`ListIteratee<T>`, optional): The predicate function to apply to each element. Can accept a function, object pattern, array pattern, or property name.

#### Returns

(`T[]`): Returns a new array starting from the first element that does not satisfy the condition.
