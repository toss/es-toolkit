# mapKeys

Returns a new object with keys transformed through a function.

```typescript
const newObj = mapKeys(object, getNewKey);
```

## Usage

### `mapKeys(object, getNewKey)`

Use `mapKeys` when you want to create a new object by transforming each key. Values remain the same, and only the keys are changed to the results of the `getNewKey` function.

```typescript
import { mapKeys } from 'es-toolkit/object';

// Add prefix to keys
const obj = { a: 1, b: 2 };
const prefixed = mapKeys(obj, (value, key) => `prefix_${key}`);
// prefixed becomes { prefix_a: 1, prefix_b: 2 }

// Combine key and value to create new keys
const combined = mapKeys(obj, (value, key) => `${key}${value}`);
// combined becomes { a1: 1, b2: 2 }

// Convert keys to uppercase
const uppercased = mapKeys(obj, (value, key) => key.toString().toUpperCase());
// uppercased becomes { A: 1, B: 2 }
```

#### Parameters

- `object` (`T extends Record<PropertyKey, any>`): The object to transform keys from.
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => K`): A function that generates new keys. Receives value, key, and the entire object as parameters.

#### Returns

(`Record<K, T[keyof T]>`): Returns a new object with transformed keys.
