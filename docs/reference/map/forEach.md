# forEach (for `Map`s)

Executes a provided function once for each entry in a Map.

```typescript
forEach(map, callback);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `forEach(map, callback)`

Use `forEach` when you want to execute a function for each entry in a Map. The callback function receives the value, key, and the Map itself as arguments. This is useful for side effects like logging, updating external state, or performing operations on each entry.

```typescript
import { forEach } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

forEach(map, (value, key) => {
  console.log(`${key}: ${value}`);
});
// Output:
// a: 1
// b: 2
// c: 3
```

You can perform various operations on each entry.

```typescript
import { forEach } from 'es-toolkit/map';

// Accumulate values
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

let total = 0;
forEach(prices, value => {
  total += value;
});
// total is now 4.25

// Collect entries into an array
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
]);

const userList: string[] = [];
forEach(users, (value, key) => {
  userList.push(`${key}: ${value.name} (${value.age})`);
});
// userList: ['user1: Alice (25)', 'user2: Bob (30)']

// Update external Map based on conditions
const inventory = new Map([
  ['item1', { stock: 10, price: 5 }],
  ['item2', { stock: 0, price: 10 }],
  ['item3', { stock: 5, price: 15 }],
]);

const outOfStock = new Map<string, any>();
forEach(inventory, (value, key) => {
  if (value.stock === 0) {
    outOfStock.set(key, value);
  }
});
// outOfStock contains item2
```

#### Parameters

- `map` (`Map<K, V>`): The Map to iterate over.
- `callback` (`(value: V, key: K, map: Map<K, V>) => void`): A function to execute for each entry.

#### Returns

(`void`): This function does not return a value.
