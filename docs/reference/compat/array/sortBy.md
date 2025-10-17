# sortBy (Lodash Compatibility)

::: warning Use the `Array.prototype.sort` method instead

This `sortBy` function behaves in a complex way due to handling various types of criteria and object support.

Instead, use the faster and more modern `Array.prototype.sort` method.

:::

Sorts an array in ascending order based on multiple criteria.

```typescript
const sorted = sortBy(collection, ...iteratees);
```

## Reference

### `sortBy(collection, ...iteratees)`

Use `sortBy` to sort an array or object in ascending order using multiple criteria. It executes the sorting criteria functions for each element and sorts based on the resulting values.

```typescript
import { sortBy } from 'es-toolkit/compat';

// Sort users by name.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

sortBy(users, ['user']);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]

// Sort using a function.
sortBy(users, [
  function (o) {
    return o.user;
  },
]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]
```

You can also use multiple criteria at once.

```typescript
import { sortBy } from 'es-toolkit/compat';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

// Sort by name first, then by age.
sortBy(users, ['user', item => item.age]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]
```

`null` and `undefined` are treated as empty arrays.

```typescript
import { sortBy } from 'es-toolkit/compat';

sortBy(null, ['key']); // []
sortBy(undefined, ['key']); // []
```

#### Parameters

- `collection` (`ArrayLike<T> | object | null | undefined`): The array or object to sort.
- `...iteratees` (`Array<Many<ListIteratee<T> | ObjectIteratee<T>>>`): The functions or property names that determine the sorting criteria.

#### Returns

(`T[]`): Returns a new array sorted in ascending order.
