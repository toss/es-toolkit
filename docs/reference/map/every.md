# every (for `Map`s)

Tests whether all entries in a Map satisfy the provided predicate function.

```typescript
const allMatch = every(map, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `every(map, doesMatch)`

Use `every` when you want to check if all entries in a Map meet a specific condition. Provide a predicate function that tests each entry, and it returns true if the predicate is satisfied for all entries, and false otherwise.

```typescript
import { every } from 'es-toolkit/map';

const map = new Map([
  ['a', 10],
  ['b', 20],
  ['c', 30],
]);

const result = every(map, value => value > 5);
// Result: true

const result2 = every(map, value => value > 15);
// Result: false
```

You can test various conditions.

```typescript
import { every } from 'es-toolkit/map';

// Check if all values meet criteria
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 8, inStock: true }],
]);

const allInStock = every(inventory, item => item.inStock);
// Result: true

// Check if all keys match pattern
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['api.host', 'localhost'],
]);

const allApiSettings = every(settings, (value, key) => key.startsWith('api.'));
// Result: true
```

#### Parameters

- `map` (`Map<K, V>`): The Map to test.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): A predicate function that tests each entry.

#### Returns

(`boolean`): true if all entries satisfy the predicate, false otherwise.
