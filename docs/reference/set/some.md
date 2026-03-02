# some (for `Set`s)

Tests whether at least one element in a Set satisfies the provided predicate function.

```typescript
const anyMatch = some(set, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `some(set, doesMatch)`

Use `some` when you want to check if at least one element in a Set meets a specific condition. Provide a predicate function that tests each element, and it returns true if the predicate is satisfied for at least one element, and false otherwise.

```typescript
import { some } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = some(set, value => value > 2);
// Result: true

const result2 = some(set, value => value > 5);
// Result: false
```

You can test various conditions.

```typescript
import { some } from 'es-toolkit/set';

// Check if any value meets criteria
const numbers = new Set([1, 3, 5, 7, 9]);

const hasEven = some(numbers, num => num % 2 === 0);
// Result: false

const hasLarge = some(numbers, num => num > 5);
// Result: true

// Check object properties
const users = new Set([
  { name: 'Alice', admin: false },
  { name: 'Bob', admin: true },
  { name: 'Charlie', admin: false },
]);

const hasAdmin = some(users, user => user.admin);
// Result: true
```

#### Parameters

- `set` (`Set<T>`): The Set to test.
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): A predicate function that tests each element.

#### Returns

(`boolean`): true if at least one element satisfies the predicate, false otherwise.
