# map (for `Set`s)

Creates a new Set with elements transformed by the provided function.

```typescript
const transformed = map(set, getNewValue);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `map(set, getNewValue)`

Use `map` when you want to transform the elements of a Set. Provide a function that generates a new value from each element, and it returns a new Set with the transformed elements.

```typescript
import { map } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = map(set, value => value * 2);
// Result: Set(3) { 2, 4, 6 }
```

You can transform elements in various ways.

```typescript
import { map } from 'es-toolkit/set';

// Transform strings
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased = map(names, name => name.toUpperCase());
// Result: Set(3) { 'ALICE', 'BOB', 'CHARLIE' }

// Transform objects
const prices = new Set([10, 20, 30]);

const products = map(prices, price => ({ price, currency: 'USD' }));
// Result: Set with objects { price: 10, currency: 'USD' }, etc.

// Extract properties
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

const ids = map(users, user => user.id);
// Result: Set(2) { 1, 2 }
```

#### Parameters

- `set` (`Set<T>`): The Set to transform.
- `getNewValue` (`(value: T, value2: T, set: Set<T>) => U`): A function that generates a new value from an element.

#### Returns

(`Set<U>`): A new Set with transformed elements.
