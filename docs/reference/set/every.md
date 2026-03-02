# every (for `Set`s)

Tests whether all elements in a Set satisfy the provided predicate function.

```typescript
const allMatch = every(set, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `every(set, doesMatch)`

Use `every` when you want to check if all elements in a Set meet a specific condition. Provide a predicate function that tests each element, and it returns true if the predicate is satisfied for all elements, and false otherwise.

```typescript
import { every } from 'es-toolkit/set';

const set = new Set([10, 20, 30]);

const result = every(set, value => value > 5);
// Result: true

const result2 = every(set, value => value > 15);
// Result: false
```

You can test various conditions.

```typescript
import { every } from 'es-toolkit/set';

// Check if all values meet criteria
const ages = new Set([25, 30, 35, 40]);

const allAdults = every(ages, age => age >= 18);
// Result: true

const allSeniors = every(ages, age => age >= 65);
// Result: false

// Check object properties
const users = new Set([
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
]);

const allActive = every(users, user => user.active);
// Result: true
```

#### Parameters

- `set` (`Set<T>`): The Set to test.
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): A predicate function that tests each element.

#### Returns

(`boolean`): true if all elements satisfy the predicate, false otherwise.
