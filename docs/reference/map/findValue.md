# findValue (for `Map`s)

Finds the first value in a Map for which the predicate function returns true.

```typescript
const value = findValue(map, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `findValue(map, doesMatch)`

Use `findValue` when you want to find the value of the first entry that matches a specific condition. Provide a predicate function that tests each entry, and it returns the value of the first matching entry or undefined if none is found.

```typescript
import { findValue } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findValue(map, value => value.quantity > 10);
// Result: { color: 'purple', quantity: 15 }
```

You can search based on various criteria.

```typescript
import { findValue } from 'es-toolkit/map';

// Find by value property
const products = new Map([
  ['p1', { name: 'Laptop', price: 1000, inStock: true }],
  ['p2', { name: 'Mouse', price: 25, inStock: false }],
  ['p3', { name: 'Keyboard', price: 75, inStock: true }],
]);

const expensiveProduct = findValue(products, product => product.price > 500);
// Result: { name: 'Laptop', price: 1000, inStock: true }

// Find by key pattern
const cache = new Map([
  ['temp_1', { data: 'foo', timestamp: 100 }],
  ['perm_1', { data: 'bar', timestamp: 200 }],
  ['temp_2', { data: 'baz', timestamp: 300 }],
]);

const permanent = findValue(cache, (value, key) => key.startsWith('perm_'));
// Result: { data: 'bar', timestamp: 200 }
```

#### Parameters

- `map` (`Map<K, V>`): The Map to search.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): A predicate function that tests each entry.

#### Returns

(`V | undefined`): The value of the first entry that satisfies the predicate, or undefined if none found.
