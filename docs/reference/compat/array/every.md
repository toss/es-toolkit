# every (Lodash Compatibility)

::: warning Use `Array.prototype.every()`

This `every` function operates slowly due to complex object processing, support for various condition formats, etc.

Instead, use the faster and more modern `Array.prototype.every()`.

:::

Checks if all values in an array or object meet the given condition.

```typescript
const result = every(collection, predicate);
```

## Reference

### `every(collection, predicate?)`

Use `every` when you want to check if all elements in an array or object satisfy a specific condition. The condition can be specified in various formats such as a function, partial object, property-value pair, property name, etc.

```typescript
import { every } from 'es-toolkit/compat';

// Using a test function
const numbers = [2, 4, 6, 8];
every(numbers, x => x % 2 === 0);
// Returns: true

// Using a property name
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
];
every(users, 'active');
// Returns: true

// Using a partial object
every(users, { active: true });
// Returns: true

// Using a property-value pair
every(users, ['active', true]);
// Returns: true
```

It works the same way for objects.

```typescript
import { every } from 'es-toolkit/compat';

const scores = { math: 90, english: 85, science: 92 };
every(scores, score => score >= 80);
// Returns: true
```

`null` or `undefined` are treated as empty collections and return `true`.

```typescript
import { every } from 'es-toolkit/compat';

every(null);
// Returns: true

every(undefined);
// Returns: true
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): The array or object to check.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, optional): The condition to check. Can use a function, partial object, property-value pair, or property name. Defaults to the `identity` function.

#### Returns

(`boolean`): Returns `true` if all elements satisfy the condition, otherwise `false`.
