# reduce (for `Map`s)

Reduces a Map to a single value by iterating through its entries and applying a callback function.

```typescript
const result = reduce(map, callback, initialValue);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `reduce(map, callback, initialValue?)`

Use `reduce` when you want to transform a Map into a single value by accumulating results from each entry. Provide a callback function that processes each entry and updates the accumulator. If an initial value is provided, it is used as the starting accumulator value. If no initial value is provided and the Map is empty, a TypeError is thrown.

```typescript
import { reduce } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = reduce(map, (acc, value) => acc + value, 0);
// Result: 6
```

You can reduce a Map in various ways.

```typescript
import { reduce } from 'es-toolkit/map';

// Sum with initial value
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const totalScore = reduce(scores, (acc, score) => acc + score, 0);
// Result: 274

// Without initial value (uses first value)
const numbers = new Map([
  ['a', 10],
  ['b', 20],
]);

const sum = reduce(numbers, (acc, value) => acc + value);
// Result: 30 (starts with first value 10)

// Build an object from Map
const settings = new Map([
  ['theme', 'dark'],
  ['lang', 'en'],
  ['notifications', true],
]);

const config = reduce(
  settings,
  (acc, value, key) => ({ ...acc, [key]: value }),
  {} as Record<string, any>
);
// Result: { theme: 'dark', lang: 'en', notifications: true }
```

#### Parameters

- `map` (`Map<K, V>`): The Map to reduce.
- `callback` (`(accumulator: A, value: V, key: K, map: Map<K, V>) => A`): A function that processes each entry and updates the accumulator.
- `initialValue` (`A`, optional): The initial value for the accumulator. If not provided, the first value in the Map is used.

#### Returns

(`A`): The final accumulated value.

#### Throws

(`TypeError`): If the Map is empty and no initial value is provided.
