# filter (for `Map`s)

Filters a Map based on a predicate function.

```typescript
const filtered = filter(map, callback);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `filter(map, callback)`

Use `filter` when you want to create a new Map containing only the entries that satisfy a specific condition. Provide a predicate function that tests each entry, and it returns a new Map with only the entries for which the predicate returns true.

```typescript
import { filter } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
]);

const result = filter(map, value => value > 2);
// Result:
// Map(2) {
//   'c' => 3,
//   'd' => 4
// }
```

You can filter based on various criteria.

```typescript
import { filter } from 'es-toolkit/map';

// Filter by value type
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 0, inStock: false }],
  ['orange', { quantity: 5, inStock: true }],
]);

const inStockItems = filter(inventory, item => item.inStock);
// Result: Map with 'apple' and 'orange' entries

// Filter by key pattern
const data = new Map([
  ['user_1', 'Alice'],
  ['admin_1', 'Bob'],
  ['user_2', 'Charlie'],
]);

const users = filter(data, (value, key) => key.startsWith('user_'));
// Result: Map with 'user_1' and 'user_2' entries
```

#### Parameters

- `map` (`Map<K, V>`): The Map to filter.
- `callback` (`(value: V, key: K, map: Map<K, V>) => boolean`): A predicate function that tests each entry.

#### Returns

(`Map<K, V>`): A new Map containing only the entries that satisfy the predicate.
