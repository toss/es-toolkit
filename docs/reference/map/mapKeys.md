# mapKeys (for `Map`s)

Creates a new Map with the same values but with keys transformed by the provided function.

```typescript
const transformed = mapKeys(map, getNewKey);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `mapKeys(map, getNewKey)`

Use `mapKeys` when you want to transform the keys of a Map while keeping the values unchanged. Provide a function that generates a new key from each entry, and it returns a new Map with the transformed keys.

```typescript
import { mapKeys } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapKeys(map, (value, key) => key.toUpperCase());
// Result:
// Map(3) {
//   'A' => 1,
//   'B' => 2,
//   'C' => 3
// }
```

You can transform keys in various ways.

```typescript
import { mapKeys } from 'es-toolkit/map';

// Add prefix to keys
const categories = new Map([
  ['fruit', ['apple', 'banana']],
  ['vegetable', ['carrot', 'potato']],
]);

const prefixed = mapKeys(categories, (value, key) => `category_${key}`);
// Result: Map with keys 'category_fruit', 'category_vegetable'

// Transform based on value
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const ranked = mapKeys(scores, (value, key) => (value >= 90 ? `top_${key}` : key));
// Result: Map with keys 'top_alice', 'bob', 'top_charlie'
```

#### Parameters

- `map` (`Map<K, V>`): The Map to transform.
- `getNewKey` (`(value: V, key: K, object: Map<K, V>) => K`): A function that generates a new key from a value-key pair.

#### Returns

(`Map<K, V>`): A new Map with transformed keys and the same values.
