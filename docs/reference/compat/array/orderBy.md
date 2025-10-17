# orderBy (Lodash Compatibility)

::: warning Use [orderBy](../../array/orderBy.md) from `es-toolkit` instead

This `orderBy` function operates slowly due to handling `null` or `undefined`, complex path navigation, and various sorting criteria.

Use the faster and more modern [orderBy](../../array/orderBy.md) from `es-toolkit` instead.

:::

Sorts the elements of a collection by multiple criteria.

```typescript
const result = orderBy(collection, criteria, orders);
```

## Reference

### `orderBy(collection, criteria, orders)`

Sorts the elements of an array or object according to specified criteria and sort orders. You can use multiple criteria, and specify ascending (`'asc'`) or descending (`'desc'`) order for each criterion.

```typescript
import { orderBy } from 'es-toolkit/compat';

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
];

// Sort by name ascending, age descending
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// => [
//   { name: 'barney', age: 36 },
//   { name: 'barney', age: 34 },
//   { name: 'fred', age: 48 },
//   { name: 'fred', age: 40 }
// ]

// Specify sort criteria with functions
orderBy(users, [user => user.name, user => user.age], ['asc', 'desc']);
// => Same result as above

// Sort by single criterion
orderBy(users, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'fred', age: 40 }, ...]
```

For objects, sorts the values.

```typescript
import { orderBy } from 'es-toolkit/compat';

const obj = {
  a: { name: 'fred', age: 48 },
  b: { name: 'barney', age: 34 },
};

orderBy(obj, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { orderBy } from 'es-toolkit/compat';

orderBy(null, 'name'); // []
orderBy(undefined, 'age'); // []
```

#### Parameters

- `collection` (`ArrayLike<T> | object | null | undefined`): The array or object to sort.
- `criteria` (`Criterion<T> | Array<Criterion<T>>`, optional): The sort criteria. Can use property names, property paths, functions, etc. Defaults to `[null]`.
- `orders` (`unknown | unknown[]`, optional): The sort order for each criterion. Can use `'asc'` (ascending), `'desc'` (descending), `true` (ascending), `false` (descending). Defaults to `[]`.

#### Returns

(`T[]`): Returns a new sorted array.
