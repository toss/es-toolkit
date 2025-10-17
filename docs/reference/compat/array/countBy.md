# countBy (Lodash compatible)

::: warning Use `countBy` from `es-toolkit` instead

This `countBy` function operates slowly due to complex transformation function processing and type conversion.

Use the faster and more modern [countBy](../../array/countBy.md) from `es-toolkit` instead.

:::

Counts the occurrences of elements in an array or object, grouped by a criterion.

```typescript
const counts = countBy(collection, iteratee);
```

## Reference

### `countBy(collection, iteratee?)`

Use `countBy` when you want to group elements of an array or object by some criterion and count how many elements are in each group. The value returned by the iteratee function becomes the key, and the count of elements with that key becomes the value.

```typescript
import { countBy } from 'es-toolkit/compat';

// Group numbers by floor value
countBy([6.1, 4.2, 6.3], Math.floor);
// Returns: { '4': 1, '6': 2 }

// Group strings by length
countBy(['one', 'two', 'three'], 'length');
// Returns: { '3': 2, '5': 1 }

// Group users by age range
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
  { name: 'Charlie', age: 25 },
];
countBy(users, user => Math.floor(user.age / 10) * 10);
// Returns: { '20': 2, '30': 1 }
```

Works with objects too.

```typescript
import { countBy } from 'es-toolkit/compat';

// Classify object values by type
const obj = { a: 1, b: 'string', c: 2, d: 'text' };
countBy(obj, value => typeof value);
// Returns: { 'number': 2, 'string': 2 }
```

When used without an iteratee function, groups by the value itself.

```typescript
import { countBy } from 'es-toolkit/compat';

// Group by value itself
countBy([1, 2, 1, 3, 2, 1]);
// Returns: { '1': 3, '2': 2, '3': 1 }

// Group boolean values
countBy([true, false, true, true]);
// Returns: { 'true': 3, 'false': 1 }
```

`null` or `undefined` collections return an empty object.

```typescript
import { countBy } from 'es-toolkit/compat';

countBy(null);
// Returns: {}

countBy(undefined);
// Returns: {}
```

#### Parameters

- `collection` (`ArrayLike<T> | object | null | undefined`): The array or object to process.
- `iteratee` (`ValueIteratee<T>`, optional): The function that defines the grouping criterion for each element. Can be a function, property name, or partial object.

#### Returns

(`Record<string, number>`): Returns an object with keys for each group and values representing the count of elements in that group.