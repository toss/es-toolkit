# mapKeysAsync

Returns a new object with keys transformed through an async function.

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## Usage

### `mapKeysAsync(object, getNewKey, options?)`

Use `mapKeysAsync` when you want to create a new object by asynchronously transforming each key. Values remain the same, and only the keys are changed to the resolved results of the `getNewKey` function.

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// Add prefix to keys
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, (value, key) => `prefix_${key}`);
// prefixed becomes { prefix_a: 1, prefix_b: 2 }

// Combine key and value to create new keys
const combined = await mapKeysAsync(obj, (value, key) => `${key}${value}`);
// combined becomes { a1: 1, b2: 2 }

// Convert keys to uppercase
const uppercased = await mapKeysAsync(obj, (value, key) => key.toString().toUpperCase());
// uppercased becomes { A: 1, B: 2 }

// Limit concurrency.
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// Only 2 keys are processed concurrently at most.
```

#### Parameters

- `object` (`T extends Record<PropertyKey, any>`): The object to transform keys from.
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): An async function that generates new keys. Receives value, key, and the entire object as parameters.
- `options` (`MapKeysAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

#### Returns

(`Promise<Record<K, T[keyof T]>>`): A promise that resolves to a new object with transformed keys.
