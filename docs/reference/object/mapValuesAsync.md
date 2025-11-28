# mapValuesAsync

Returns a new object with values transformed through an async function.

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## Usage

### `mapValuesAsync(object, getNewValue, options?)`

Use `mapValuesAsync` when you want to create a new object by asynchronously transforming each value. Keys remain the same, and only the values are changed to the resolved results of the `getNewValue` function.

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// Double all values
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubled becomes { a: 2, b: 4, c: 6 }

// Convert string values to uppercase
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercased becomes { first: 'HELLO', second: 'WORLD' }

// Use both key and value
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades becomes { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }

// Limit concurrency.
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// Only 2 values are processed concurrently at most.
```

#### Parameters

- `object` (`T extends object`): The object to transform values from.
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): An async function that generates new values. Receives value, key, and the entire object as parameters.
- `options` (`MapValuesAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

#### Returns

(`Promise<Record<K, V>>`): A promise that resolves to a new object with transformed values.
