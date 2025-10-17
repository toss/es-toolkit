# tail (Lodash compatibility)

::: warning Please use [tail](../../array/tail.md) from `es-toolkit`

This `tail` function operates slowly due to handling `null` or `undefined`.

Please use the faster and modern [tail](../../array/tail.md) from `es-toolkit` instead.

:::

Returns all elements of an array except the first one.

```typescript
const result = tail(array);
```

## Reference

### `tail(array)`

Use `tail` when you want to create a new array containing all elements except the first one from the input array. If the input array is empty or has only one element, it returns an empty array.

```typescript
import { tail } from 'es-toolkit/compat';

// Remove the first element from a number array.
tail([1, 2, 3]);
// Returns: [2, 3]

// Remove the first element from a string array.
tail(['a', 'b', 'c']);
// Returns: ['b', 'c']

// Array with only one element.
tail([1]);
// Returns: []

// Empty array.
tail([]);
// Returns: []
```

`null` or `undefined` is treated as an empty array.

```typescript
import { tail } from 'es-toolkit/compat';

tail(null); // []
tail(undefined); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove the first element from.

#### Returns

(`T[]`): Returns a new array containing all elements except the first one.
