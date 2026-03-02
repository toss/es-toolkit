# concat (Lodash compatible)

::: warning Use spread operator or [`Array#concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) instead

This `concat` function operates inefficiently due to the complex way Lodash handles array concatenation.

Use the more intuitive and modern spread operator `[...arr1, ...arr2]` or `arr1.concat(arr2)` instead.

:::

Concatenates multiple arrays and values into a single array.

```typescript
const result = concat(...values);
```

## Usage

### `concat(...values)`

Use `concat` when you want to concatenate multiple values and arrays in order to create a new array. Arrays are flattened, and individual values are added as is.

```typescript
import { concat } from 'es-toolkit/compat';

// Concatenate individual values
concat(1, 2, 3);
// Returns: [1, 2, 3]

// Concatenate arrays
concat([1, 2], [3, 4]);
// Returns: [1, 2, 3, 4]

// Concatenate values and arrays together
concat(1, [2, 3], 4);
// Returns: [1, 2, 3, 4]
```

Nested arrays are flattened only one level deep.

```typescript
import { concat } from 'es-toolkit/compat';

// Nested arrays are flattened only one level
concat([1, [2, 3]], 4);
// Returns: [1, [2, 3], 4]

// More deeply nested arrays
concat([1, [2, [3, 4]]], 5);
// Returns: [1, [2, [3, 4]], 5]
```

Handles empty arrays and empty values.

```typescript
import { concat } from 'es-toolkit/compat';

// With empty arrays
concat([], [1, 2], [], [3]);
// Returns: [1, 2, 3]

// When no values are provided
concat();
// Returns: []
```

#### Parameters

- `values` (`...(T | readonly T[])`): Values and arrays to concatenate. Each array is flattened one level.

#### Returns

(`T[]`): Returns a new array with all values and array elements concatenated in order.
