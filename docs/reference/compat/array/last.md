# last (Lodash compatibility)

::: warning Use `es-toolkit`'s [last](../../array/last.md)

This `last` function behaves complexly due to handling `null` or `undefined`.

Instead, use the faster and more modern `es-toolkit`'s [last](../../array/last.md).

:::

Returns the last element of an array.

```typescript
const lastElement = last(array);
```

## Usage

### `last(array)`

Use `last` when you want to get the last element of an array. Returns `undefined` if the array is empty.

```typescript
import { last } from 'es-toolkit/compat';

// Last element of a number array
last([1, 2, 3, 4, 5]);
// Returns: 5

// Last element of a string array
last(['a', 'b', 'c']);
// Returns: 'c'

// Last element of an object array
const users = [{ name: 'Alice' }, { name: 'Bob' }];
last(users);
// Returns: { name: 'Bob' }
```

Empty arrays or `null`, `undefined` return `undefined`.

```typescript
import { last } from 'es-toolkit/compat';

// Empty array
last([]);
// Returns: undefined

// null array
last(null);
// Returns: undefined

// undefined array
last(undefined);
// Returns: undefined
```

Array-like objects are also supported.

```typescript
import { last } from 'es-toolkit/compat';

// Array-like object
const arrayLike = { 0: 'first', 1: 'second', length: 2 };
last(arrayLike);
// Returns: 'second'

// Strings are also array-like objects
last('hello');
// Returns: 'o'
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to get the last element from.

#### Returns

(`T | undefined`): Returns the last element of the array, or `undefined` if the array is empty, `null`, or `undefined`.
