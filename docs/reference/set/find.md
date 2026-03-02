# find (for `Set`s)

Finds the first element in a Set for which the predicate function returns true.

```typescript
const element = find(set, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `find(set, doesMatch)`

Use `find` when you want to find the first element in a Set that matches a specific condition. Provide a predicate function that tests each element, and it returns the first matching element or undefined if none is found.

```typescript
import { find } from 'es-toolkit/set';

const set = new Set([
  { name: 'apple', quantity: 10 },
  { name: 'banana', quantity: 5 },
  { name: 'grape', quantity: 15 },
]);

const result = find(set, value => value.quantity > 10);
// Result: { name: 'grape', quantity: 15 }
```

You can search based on various criteria.

```typescript
import { find } from 'es-toolkit/set';

// Find by value property
const users = new Set([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]);

const senior = find(users, user => user.age >= 35);
// Result: { id: 3, name: 'Charlie', age: 35 }

// Find by string pattern
const emails = new Set(['user@example.com', 'admin@example.com', 'info@company.com']);

const adminEmail = find(emails, email => email.startsWith('admin'));
// Result: 'admin@example.com'
```

#### Parameters

- `set` (`Set<T>`): The Set to search.
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): A predicate function that tests each element.

#### Returns

(`T | undefined`): The first element that satisfies the predicate, or undefined if none found.
