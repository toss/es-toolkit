# flatten (Lodash Compatibility)

::: warning Use `flatten` from `es-toolkit`

This `flatten` function operates slowly due to handling `null` or `undefined` and `ArrayLike` type processing.

Use the faster and more modern [flatten](../../../reference/array/flatten.md) from `es-toolkit` instead.

:::

Flattens an array by one level.

```typescript
const result = flatten(array);
```

## Usage

### `flatten(array)`

Flattens a nested array by one level.

```typescript
import { flatten } from 'es-toolkit/compat';

// Basic flattening (one level)
flatten([1, [2, [3, [4]], 5]]);
// Result: [1, 2, [3, [4]], 5]

// Support for Arguments objects
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// Result: [1, 2, 3, [4]]

// Support for objects with Symbol.isConcatSpreadable
const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// Result: [1, 'a', 'b', 3]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to flatten.

#### Returns

(`T[]`): Returns a new flattened array.
