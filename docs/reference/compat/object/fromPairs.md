# fromPairs (Lodash compatibility)

::: warning Use `Object.fromEntries`

This `fromPairs` function operates slowly due to array-like object checks and iteration processing.

Use the faster and more modern `Object.fromEntries` instead.

:::

Converts an array of key-value pairs into an object.

```typescript
const result = fromPairs(pairs);
```

## Reference

### `fromPairs(pairs)`

Takes an array of key-value pairs and converts them into an object. Each key-value pair must be an array with 2 elements. The first element becomes the key, and the second element becomes the value. This is useful when organizing or transforming data.

```typescript
import { fromPairs } from 'es-toolkit/compat';

// Basic key-value pair conversion
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// Result: { a: 1, b: 2, c: 3 }

// Handling various value types
const mixedPairs = [
  ['name', 'John'],
  ['age', 30],
  ['active', true],
];
const user = fromPairs(mixedPairs);
// Result: { name: 'John', age: 30, active: true }
```

Values that are `null`, `undefined`, or not array-like objects are treated as empty objects.

```typescript
import { fromPairs } from 'es-toolkit/compat';

fromPairs(null); // {}
fromPairs(undefined); // {}
fromPairs('invalid'); // {}
```

#### Parameters

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): An array of key-value pairs to convert into an object.

#### Returns

(`Record<string, any> | Record<string, T>`): Returns an object created from the key-value pairs.
