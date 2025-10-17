# initial (Lodash Compatibility)

::: warning Use [`initial`](../../array/initial.md) from `es-toolkit`

This `initial` function operates slowly due to `ArrayLike` object processing and array conversion process.

Instead, use the faster and more modern [`initial`](../../array/initial.md) from `es-toolkit`.

:::

Returns a new array with all elements except the last one from an array.

```typescript
const result = initial(array);
```

## Reference

### `initial(array)`

Returns a new array containing all elements except the last one from an array or array-like object. Returns an empty array if the array is empty or has only one element.

```typescript
import { initial } from 'es-toolkit/compat';

// Exclude last element from number array
const numbers = [1, 2, 3, 4];
const result = initial(numbers);
// result is [1, 2, 3]

// Exclude last element from string array
const strings = ['a', 'b', 'c', 'd'];
const withoutLast = initial(strings);
// withoutLast is ['a', 'b', 'c']

// Array-like object
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const items = initial(arrayLike);
// items is ['x', 'y']
```

Empty arrays or invalid inputs return an empty array.

```typescript
import { initial } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const result = initial(emptyArray);
// result is []

const singleItem = [42];
const onlyOne = initial(singleItem);
// onlyOne is []

initial(null); // []
initial(undefined); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array or array-like object to exclude the last element from.

#### Returns

(`T[]`): Returns a new array with the last element excluded.
