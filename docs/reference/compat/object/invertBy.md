# invertBy (Lodash compatibility)

::: warning Use modern JavaScript APIs

This `invertBy` function operates slowly due to complex iterator processing and grouping logic.

Instead, use the faster and more modern `Object.entries()` with `reduce()` or `Map`.

:::

Inverts the keys and values of an object while grouping identical values into arrays.

```typescript
const inverted = invertBy(object, iteratee);
```

## Reference

### `invertBy(object, iteratee?)`

Use `invertBy` when you want to invert the keys and values of an object and group keys with the same value into arrays. You can optionally provide an iteratee function to transform the values.

```typescript
import { invertBy } from 'es-toolkit/compat';

// Basic key-value inversion (identical values are grouped into arrays)
const object = { a: 1, b: 2, c: 1 };
invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }

// Value transformation using iteratee function
const ages = { john: 25, jane: 30, bob: 25 };
invertBy(ages, age => `age_${age}`);
// => { 'age_25': ['john', 'bob'], 'age_30': ['jane'] }

// Grouping by string length
const words = { a: 'hello', b: 'world', c: 'hi', d: 'test' };
invertBy(words, word => word.length);
// => { '5': ['a', 'b'], '2': ['c'], '4': ['d'] }
```

You can also group by object properties.

```typescript
import { invertBy } from 'es-toolkit/compat';

// Grouping by object property
const users = {
  user1: { department: 'IT', age: 30 },
  user2: { department: 'HR', age: 25 },
  user3: { department: 'IT', age: 35 },
};

invertBy(users, user => user.department);
// => { 'IT': ['user1', 'user3'], 'HR': ['user2'] }
```

Safely handles `null` or `undefined`.

```typescript
import { invertBy } from 'es-toolkit/compat';

invertBy(null);
// => {}

invertBy(undefined);
// => {}
```

#### Parameters

- `object` (`object`): The object to invert.
- `iteratee` (`ValueIteratee`, optional): The function to transform values. Defaults to a function that uses the value as-is.

#### Returns

(`Record<string, string[]>`): Returns a new object with transformed values as keys and arrays of original keys as values.
