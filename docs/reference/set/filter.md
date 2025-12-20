# filter (for `Set`s)

Filters a Set based on a predicate function.

```typescript
const filtered = filter(set, callback);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `filter(set, callback)`

Use `filter` when you want to create a new Set containing only the elements that satisfy a specific condition. Provide a predicate function that tests each element, and it returns a new Set with only the elements for which the predicate returns true.

```typescript
import { filter } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = filter(set, value => value > 2);
// Result: Set(3) { 3, 4, 5 }
```

You can filter based on various criteria.

```typescript
import { filter } from 'es-toolkit/set';

// Filter by value type
const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const evenNumbers = filter(numbers, num => num % 2 === 0);
// Result: Set(5) { 2, 4, 6, 8, 10 }

// Filter objects
const products = new Set([
  { name: 'Laptop', price: 1000, available: true },
  { name: 'Mouse', price: 25, available: false },
  { name: 'Keyboard', price: 75, available: true },
]);

const availableProducts = filter(products, product => product.available);
// Result: Set with Laptop and Keyboard
```

#### Parameters

- `set` (`Set<T>`): The Set to filter.
- `callback` (`(value: T, value2: T, set: Set<T>) => boolean`): A predicate function that tests each element.

#### Returns

(`Set<T>`): A new Set containing only the elements that satisfy the predicate.
