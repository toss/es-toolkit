# dropWhile (Lodash Compatibility)

::: warning Use `dropWhile` from `es-toolkit`

This `dropWhile` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, support for various predicate function formats, etc.

Instead, use the faster and more modern [`dropWhile`](../../array/dropWhile.md) from `es-toolkit`.

:::

Removes elements from the beginning of an array based on a predicate function.

```typescript
const result = dropWhile(array, predicate);
```

## Reference

### `dropWhile(array, predicate)`

Use `dropWhile` when you want to consecutively remove elements from the beginning of an array that satisfy a specific condition. Removal stops when the predicate function returns `false`.

```typescript
import { dropWhile } from 'es-toolkit/compat';

// Using a function as a predicate.
dropWhile([1, 2, 3, 4, 5], n => n < 3);
// Returns: [3, 4, 5]

// Matching with an object pattern.
const users = [
  { name: 'alice', active: false },
  { name: 'bob', active: false },
  { name: 'charlie', active: true },
];

dropWhile(users, { active: false });
// Returns: [{ name: 'charlie', active: true }]

// Specifying property and value in array format.
dropWhile(users, ['active', false]);
// Returns: [{ name: 'charlie', active: true }]

// Checking condition by property name.
const items = [{ visible: false }, { visible: false }, { visible: true }];

dropWhile(items, 'visible');
// Returns: [{ visible: false }, { visible: false }, { visible: true }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { dropWhile } from 'es-toolkit/compat';

dropWhile(null, x => x > 0); // []
dropWhile(undefined, x => x > 0); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove elements from.
- `predicate` (`ListIteratee<T>`, optional): The predicate function to apply to each element. Can accept a function, object pattern, array pattern, or property name. Default is `identity`.

#### Returns

(`T[]`): Returns a new array starting from the first element that does not satisfy the condition.
