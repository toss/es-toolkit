# nthArg (Lodash Compatibility)

::: warning Use arrow functions

This `nthArg` function simply creates a wrapper function that returns the argument at a specific index. You can implement the same functionality more concisely and clearly using arrow functions.

Instead, use the faster and more modern arrow functions.

:::

Creates a function that returns the argument at the specified index.

```typescript
const getNthArg = nthArg(n);
```

## Reference

### `nthArg(n)`

Use `nthArg` when you need only the argument at a specific position of a function. If you use a negative index, it counts from the end.

```typescript
import { nthArg } from 'es-toolkit/compat';

// Create a function to get the second argument
const getSecondArg = nthArg(1);
getSecondArg('a', 'b', 'c', 'd');
// Returns: 'b'

// Create a function to get the penultimate argument
const getPenultimateArg = nthArg(-2);
getPenultimateArg('a', 'b', 'c', 'd');
// Returns: 'c'

// Create a function to get the first argument (default)
const getFirstArg = nthArg();
getFirstArg('a', 'b', 'c');
// Returns: 'a'
```

It's useful when used with array methods.

```typescript
import { nthArg } from 'es-toolkit/compat';

// Extract only the second element from each array
const arrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
arrays.map(nthArg(1));
// Returns: [2, 5, 8]
```

Negative indices count from the end.

```typescript
import { nthArg } from 'es-toolkit/compat';

// Function to get the last argument
const getLastArg = nthArg(-1);
getLastArg('first', 'middle', 'last');
// Returns: 'last'
```

#### Parameters

- `n` (`number`, optional): The index of the argument to return. Negative values count from the end. Default is `0`.

#### Returns

(`(...args: any[]) => any`): Returns a new function that returns the argument at the specified index.
