# fromPairs

Converts an array of key-value pairs into an object.

```typescript
const object = fromPairs(pairs);
```

## Usage

### `fromPairs(pairs)`

Use `fromPairs` when you want to convert an array of key-value pairs into a single object. Each pair should be an array with two elements: the first element becomes the key, and the second element becomes the value.

This function is the inverse of `Object.entries` or similar functions that convert objects into key-value pair arrays.

```typescript
import { fromPairs } from 'es-toolkit/array';

// Convert key-value pairs to an object
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// Returns: { a: 1, b: 2, c: 3 }

// Works with different key types
const symbolKey = Symbol('key');
const mixedPairs = [
  ['stringKey', 'value1'],
  [42, 'value2'],
  [symbolKey, 'value3'],
];
const mixedResult = fromPairs(mixedPairs);
// Returns: { stringKey: 'value1', 42: 'value2', [symbolKey]: 'value3' }
```

If there are duplicate keys, the last value wins.

```typescript
import { fromPairs } from 'es-toolkit/array';

const duplicatePairs = [
  ['a', 1],
  ['b', 2],
  ['a', 3],
];
const result = fromPairs(duplicatePairs);
// Returns: { a: 3, b: 2 }
```

#### Parameters

- `pairs` (`ReadonlyArray<readonly [K, V]>`): An array of key-value pairs to convert into an object.

#### Returns

(`Record<K, V>`): Returns a new object created from the key-value pairs.
