# flatten (Lodash Compatibility)

::: warning Use `flatten` from `es-toolkit`

This `flatten` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, and supporting various condition function formats.

Use the faster and more modern [flatten](../../array/flatten.md) from `es-toolkit` instead.

:::

Flattens an array by one level.

```typescript
const result = flatten(array, depth);
```

## Reference

### `flatten(value, depth)`

Flattens a nested array by the specified depth. By default, it flattens only one level, and also supports Arguments objects and objects with Symbol.isConcatSpreadable.

```typescript
import { flatten } from 'es-toolkit/compat';

// Basic flattening (one level)
flatten([1, [2, [3, [4]], 5]]);
// Result: [1, 2, [3, [4]], 5]

// Specify depth
flatten([1, [2, [3, [4]], 5]], 2);
// Result: [1, 2, 3, [4], 5]

// Support for Arguments objects
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// Result: [1, 2, 3, [4]]
```

Empty arrays, null, or undefined return empty arrays.

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

Objects with Symbol.isConcatSpreadable are also flattened like arrays.

```typescript
import { flatten } from 'es-toolkit/compat';

const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// Result: [1, 'a', 'b', 3]
```

#### Parameters

- `value` (`ArrayLike<T> | null | undefined`): The array to flatten.
- `depth` (`number`, optional): The maximum depth to flatten. Default is `1`.

#### Returns

(`T[]`): Returns a new flattened array.
