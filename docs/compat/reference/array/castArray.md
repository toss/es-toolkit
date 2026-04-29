# castArray (Lodash Compatibility)

::: warning Use `Array.from()` or array literals (`[value]`)

This `castArray` function behaves complexly due to no-argument handling and `undefined` processing.

Instead, use the clearer and more modern `Array.from()` or conditional array creation (`Array.isArray(value) ? value : [value]`).

:::

Converts a value to an array if it's not already an array.

```typescript
const result = castArray(value);
```

## Usage

### `castArray(value?)`

Use `castArray` when you want to ensure any value becomes an array. If the value is already an array, it returns as is. Otherwise, it creates a new array containing that value.

```typescript
import { castArray } from 'es-toolkit/compat';

// Convert a number to an array
castArray(1);
// Returns: [1]

// Convert a string to an array
castArray('hello');
// Returns: ['hello']

// Convert an object to an array
castArray({ a: 1 });
// Returns: [{ a: 1 }]
```

Values that are already arrays are returned as is.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray([1, 2, 3]);
// Returns: [1, 2, 3]

castArray(['a', 'b']);
// Returns: ['a', 'b']
```

`null` and `undefined` are also converted to arrays.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray(null);
// Returns: [null]

castArray(undefined);
// Returns: [undefined]
```

When called without arguments, returns an empty array.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray();
// Returns: []
```

#### Parameters

- `value` (`T | readonly T[]`, optional): The value to convert to an array. If no argument is provided, returns an empty array.

#### Returns

(`T[]`): Returns the array if the input is already an array, otherwise returns a new array containing the input value.
