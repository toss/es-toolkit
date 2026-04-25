# mapKeys (Lodash compatibility)

::: warning Use `mapKeys` from `es-toolkit`

This `mapKeys` function is relatively slow due to handling `null` or `undefined` and the `iteratee` conversion process.

Use the faster and more modern [`mapKeys`](../../object/mapKeys.md) from `es-toolkit` instead.

:::

Creates a new object by transforming keys while keeping values the same.

```typescript
const result = mapKeys(obj, iteratee);
```

## Usage

### `mapKeys(object, iteratee)`

Transforms each key in an object using the `iteratee` function to create a new object. Values remain unchanged while only keys are modified. Useful for transforming or normalizing object keys.

```typescript
import { mapKeys } from 'es-toolkit/compat';

// Add prefix to keys
const obj = { a: 1, b: 2, c: 3 };
const result = mapKeys(obj, (value, key) => 'prefix_' + key);
// Result: { prefix_a: 1, prefix_b: 2, prefix_c: 3 }

// Convert keys to uppercase
const data = { name: 'John', age: 30 };
const uppercased = mapKeys(data, (value, key) => key.toUpperCase());
// Result: { NAME: 'John', AGE: 30 }

// Convert array indices to keys
const arr = ['apple', 'banana', 'orange'];
const indexed = mapKeys(arr, (value, index) => `item_${index}`);
// Result: { item_0: 'apple', item_1: 'banana', item_2: 'orange' }

// Create new keys by combining key and value
const scores = { math: 90, science: 85, english: 92 };
const detailed = mapKeys(scores, (value, key) => `${key}_score_${value}`);
// Result: { math_score_90: 90, science_score_85: 85, english_score_92: 92 }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { mapKeys } from 'es-toolkit/compat';

mapKeys(null, iteratee); // {}
mapKeys(undefined, iteratee); // {}
```

#### Parameters

- `object` (`ArrayLike<T> | T | null | undefined`): The object or array to transform keys from.
- `iteratee` (`ListIteratee<T> | ObjectIteratee<T>`, optional): The function to transform each key. Defaults to the `identity` function.

#### Returns

(`Record<string, T> | Record<string, T[keyof T]>`): Returns a new object with transformed keys.
