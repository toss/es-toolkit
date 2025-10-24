# rearg (Lodash Compatibility)

::: warning Use arrow functions instead

This `rearg` function creates a complex wrapper that rearranges argument order, which can be slow. You can write clearer and faster code by directly rearranging argument order using arrow functions.

Use faster, more modern arrow functions instead.

:::

Creates a new function that rearranges the arguments of the original function in the specified order.

```typescript
const rearranged = rearg(func, ...indices);
```

## Reference

### `rearg(func, ...indices)`

Use `rearg` when you want to change the order of arguments when calling a function. It rearranges the arguments in the order specified by the indices and calls the original function.

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting, name) => `${greeting}, ${name}!`;

// Swap argument order (1st, 0th)
const rearrangedGreet = rearg(greet, 1, 0);
rearrangedGreet('World', 'Hello');
// Returns: "Hello, World!"

// Original function remains unchanged
greet('Hello', 'World');
// Returns: "Hello, World!"
```

You can also pass indices as an array.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// Specify indices using an array
const rearranged = rearg(fn, [2, 0, 1]);
rearranged('a', 'b', 'c');
// Returns: ['c', 'a', 'b']
```

You can rearrange only some arguments and leave the rest as is.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// Rearrange only the first two arguments
const rearranged = rearg(fn, 1, 0);
rearranged('first', 'second', 'third', 'fourth');
// Returns: ['second', 'first', 'third', 'fourth']
```

Non-existent indices are treated as `undefined`.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// Include non-existent index 5
const rearranged = rearg(fn, 5, 1, 0);
rearranged('a', 'b', 'c');
// Returns: [undefined, 'b', 'a']
```

Nested arrays are also flattened and processed.

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// Nested array indices
const rearranged = rearg(fn, [1, [2, 0]], 3);
rearranged('a', 'b', 'c', 'd');
// Returns: ['b', 'c', 'a', 'd']
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function whose arguments will be rearranged.
- `...indices` (`Array<number | number[]>`): The indices of the arguments to rearrange. Nested arrays are also supported.

#### Returns

(`(...args: any[]) => any`): Returns a new function with rearranged arguments.
