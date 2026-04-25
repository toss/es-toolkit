# groupBy (Lodash Compatibility)

::: warning Use [`groupBy`](../../array/groupBy.md) from `es-toolkit`

This `groupBy` function operates slowly due to handling `null` or `undefined`, object support, complex type processing, etc.

Instead, use the faster and more modern [`groupBy`](../../array/groupBy.md) from `es-toolkit`.

:::

Groups elements of an array or object based on a given condition.

```typescript
const grouped = groupBy(collection, iteratee);
```

## Usage

### `groupBy(collection, iteratee)`

Groups each element of an array or object based on a given condition function and returns an object with groups. The condition can be provided in various forms such as a function, property name, partial object, etc.

```typescript
import { groupBy } from 'es-toolkit/compat';

// Group by function
const array = [6.1, 4.2, 6.3];
const result = groupBy(array, Math.floor);
// result is { '4': [4.2], '6': [6.1, 6.3] }

// Group by property name
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 30 },
];
const byAge = groupBy(users, 'age');
// byAge is { '25': [{ name: 'jane', age: 25 }], '30': [{ name: 'john', age: 30 }, { name: 'bob', age: 30 }] }

// Group from object
const obj = { a: 6.1, b: 4.2, c: 6.3 };
const groupedObj = groupBy(obj, Math.floor);
// groupedObj is { '4': [4.2], '6': [6.1, 6.3] }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { groupBy } from 'es-toolkit/compat';

groupBy(null, x => x); // {}
groupBy(undefined, x => x); // {}
```

You can also group by partial object or property-value pair.

```typescript
import { groupBy } from 'es-toolkit/compat';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// Group by partial object
const byCategory = groupBy(products, { category: 'fruit' });
// Group by property-value pair
const byName = groupBy(products, ['name', 'apple']);
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, T> | null | undefined`): The array or object to group.
- `iteratee` (`Function | PropertyKey | Array | Object`, optional): The condition to group by. Can be a function, property name, property-value pair, or partial object. Default is the `identity` function.

#### Returns

(`Record<string, T[]>`): Returns an object where each key is the condition value and the value is an array of elements belonging to that group.
