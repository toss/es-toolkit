# mapValues

Returns a new object with values transformed through a function.

```typescript
const newObj = mapValues(object, getNewValue);
```

## Reference

### `mapValues(object, getNewValue)`

Use `mapValues` when you want to create a new object by transforming each value. Keys remain the same, and only the values are changed to the results of the `getNewValue` function.

```typescript
import { mapValues } from 'es-toolkit/object';

// Double all values
const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapValues(numbers, value => value * 2);
// doubled becomes { a: 2, b: 4, c: 6 }

// Convert string values to uppercase
const strings = { first: 'hello', second: 'world' };
const uppercased = mapValues(strings, value => value.toUpperCase());
// uppercased becomes { first: 'HELLO', second: 'WORLD' }

// Use both key and value
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = mapValues(scores, (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades becomes { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }
```

#### Parameters

- `object` (`T extends object`): The object to transform values from.
- `getNewValue` (`(value: T[K], key: K, object: T) => V`): A function that generates new values. Receives value, key, and the entire object as parameters.

#### Returns

(`Record<K, V>`): Returns a new object with transformed values.
