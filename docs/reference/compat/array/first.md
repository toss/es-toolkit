# first (Lodash Compatibility)

::: warning Use `head` from `es-toolkit`

This `first` function operates slowly due to handling `null` or `undefined` and array-like object conversion. The `head` function from `es-toolkit` operates faster and simpler without this additional processing.

Use the faster and more modern [head](../../array/head.md) from `es-toolkit` instead.

:::

Returns the first element of an array.

```typescript
const firstElement = first(array);
```

## Reference

### `first(array)`

Use `first` when you want to get the first element of an array. Returns `undefined` if the array is empty or is `null` or `undefined`.

```typescript
import { first } from 'es-toolkit/compat';

// Get the first element from a regular array
first([1, 2, 3]);
// Returns: 1

// Get the first element from a string array
first(['a', 'b', 'c']);
// Returns: 'a'

// Empty array
first([]);
// Returns: undefined
```

`null` or `undefined` returns `undefined`.

```typescript
import { first } from 'es-toolkit/compat';

first(null); // undefined
first(undefined); // undefined
```

Can be used with array-like objects.

```typescript
import { first } from 'es-toolkit/compat';

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
first(arrayLike);
// Returns: 'a'

// Strings are also treated like arrays
first('hello');
// Returns: 'h'
```

For type-guaranteed tuples, returns the exact type.

```typescript
import { first } from 'es-toolkit/compat';

const tuple = [1, 'two', true] as const;
first(tuple);
// Returns: 1 (type is inferred as 1)
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to get the first element from.

#### Returns

(`T | undefined`): Returns the first element of the array. Returns `undefined` if the array is empty or invalid.
