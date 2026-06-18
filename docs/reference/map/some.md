# some (for `Map`s)

Tests whether at least one entry in a Map satisfies the provided predicate function.

```typescript
const anyMatch = some(map, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `some(map, doesMatch)`

Use `some` when you want to check if at least one entry in a Map meets a specific condition. Provide a predicate function that tests each entry, and it returns true if the predicate is satisfied for at least one entry, and false otherwise.

```typescript
import { some } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = some(map, value => value > 2);
// Result: true

const result2 = some(map, value => value > 5);
// Result: false
```

You can test various conditions.

```typescript
import { some } from 'es-toolkit/map';

// Check if any value meets criteria
const inventory = new Map([
  ['apple', { quantity: 0, inStock: false }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 0, inStock: false }],
]);

const hasStock = some(inventory, item => item.inStock);
// Result: true

// Check if any key matches pattern
const data = new Map([
  ['user_1', 'Alice'],
  ['user_2', 'Bob'],
  ['group_1', 'Admins'],
]);

const hasAdmin = some(data, (value, key) => key.startsWith('admin_'));
// Result: false
```

#### Parameters

- `map` (`Map<K, V>`): The Map to test.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): A predicate function that tests each entry.

#### Returns

(`boolean`): true if at least one entry satisfies the predicate, false otherwise.
