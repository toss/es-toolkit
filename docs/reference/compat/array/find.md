# find (Lodash Compatibility)

::: warning Use `Array.prototype.find()`

This `find` function operates slowly due to complex object processing, support for various condition formats, etc.

Instead, use the faster and more modern `Array.prototype.find()`.

:::

Finds the first element in an array or object that matches the condition.

```typescript
const result = find(collection, predicate, fromIndex);
```

## Usage

### `find(collection, predicate, fromIndex?)`

Use `find` when you want to find the first element that satisfies a specific condition in an array or object. The condition can be specified in various formats such as a function, partial object, property-value pair, property name, etc.

```typescript
import { find } from 'es-toolkit/compat';

// Using a test function
const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 3);
// Returns: 4

// Using a property name
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
];
find(users, 'active');
// Returns: { name: 'Bob', active: true }

// Using a partial object
find(users, { active: true });
// Returns: { name: 'Bob', active: true }

// Using a property-value pair
find(users, ['name', 'Charlie']);
// Returns: { name: 'Charlie', active: true }
```

You can specify a starting index.

```typescript
import { find } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 2, 2);
// Returns: 3 (starts searching from index 2)
```

It works the same way for objects.

```typescript
import { find } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
find(scores, score => score >= 80);
// Returns: 90
```

`null` or `undefined` are treated as empty collections and return `undefined`.

```typescript
import { find } from 'es-toolkit/compat';

find(null, x => x > 0);
// Returns: undefined

find(undefined, x => x > 0);
// Returns: undefined
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): The array or object to search.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): The search condition. Can use a function, partial object, property-value pair, or property name.
- `fromIndex` (`number`, optional): The index to start searching from. Defaults to `0`.

#### Returns

(`T | undefined`): Returns the first element that satisfies the condition. If not found, returns `undefined`.
