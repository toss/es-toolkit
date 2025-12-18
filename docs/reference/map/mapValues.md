# mapValues (for `Map`s)

Creates a new Map with the same keys but with values transformed by the provided function.

```typescript
const transformed = mapValues(map, getNewValue);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `mapValues(map, getNewValue)`

Use `mapValues` when you want to transform the values of a Map while keeping the keys unchanged. Provide a function that generates a new value from each entry, and it returns a new Map with the transformed values.

```typescript
import { mapValues } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapValues(map, value => value * 2);
// Result:
// Map(3) {
//   'a' => 2,
//   'b' => 4,
//   'c' => 6
// }
```

You can transform values in various ways.

```typescript
import { mapValues } from 'es-toolkit/map';

// Format values
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

const formatted = mapValues(prices, value => `$${value.toFixed(2)}`);
// Result: Map with values '$1.50', '$0.75', '$2.00'

// Transform based on key
const inventory = new Map([
  ['premium_item', 10],
  ['standard_item', 20],
  ['basic_item', 30],
]);

const adjusted = mapValues(inventory, (value, key) =>
  key.startsWith('premium_') ? value * 1.5 : value
);
// Result: Map with values 15, 20, 30
```

#### Parameters

- `map` (`Map<K, V>`): The Map to transform.
- `getNewValue` (`(value: V, key: K, object: Map<K, V>) => V`): A function that generates a new value from a value-key pair.

#### Returns

(`Map<K, V>`): A new Map with the same keys and transformed values.
