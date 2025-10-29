# filter (Lodash Compatibility)

::: warning Use `Array.prototype.filter()`

This `filter` function operates slowly due to complex object processing, support for various condition formats, etc.

Instead, use the faster and more modern `Array.prototype.filter()`.

:::

Creates a new array with elements that satisfy the given condition.

```typescript
const result = filter(collection, predicate);
```

## Reference

### `filter(collection, predicate)`

Use `filter` when you want to filter out only elements that satisfy a specific condition from an array or object. The condition can be specified in various formats such as a function, partial object, property-value pair, property name, etc.

```typescript
import { filter } from 'es-toolkit/compat';

// Using a test function
const numbers = [1, 2, 3, 4, 5];
filter(numbers, x => x % 2 === 0);
// Returns: [2, 4]

// Using a property name
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];
filter(users, 'active');
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// Using a partial object
filter(users, { active: true });
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// Using a property-value pair
filter(users, ['active', true]);
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
```

It works the same way for objects, returning an array of values that satisfy the condition.

```typescript
import { filter } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
filter(scores, score => score >= 80);
// Returns: [90, 85]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { filter } from 'es-toolkit/compat';

filter(null, x => x > 0);
// Returns: []

filter(undefined, x => x > 0);
// Returns: []
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): The array or object to filter.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): The filtering condition. Can use a function, partial object, property-value pair, or property name.

#### Returns

(`T[]`): Returns a new array consisting of elements that satisfy the condition.
