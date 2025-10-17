# head (Lodash Compatibility)

::: warning Use [`head`](../../array/head.md) from `es-toolkit`

This `head` function operates slowly due to `ArrayLike` object processing and array conversion process.

Instead, use the faster and more modern [`head`](../../array/head.md) from `es-toolkit`.

:::

Returns the first element of an array.

```typescript
const firstElement = head(array);
```

## Reference

### `head(array)`

Returns the first element of an array or array-like object. Returns `undefined` if the array is empty or invalid.

```typescript
import { head } from 'es-toolkit/compat';

// First element of number array
const numbers = [1, 2, 3, 4];
const first = head(numbers);
// first is 1

// First element of string array
const strings = ['a', 'b', 'c'];
const firstChar = head(strings);
// firstChar is 'a'

// Array-like object
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const firstItem = head(arrayLike);
// firstItem is 'x'
```

Empty arrays or invalid inputs return `undefined`.

```typescript
import { head } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const noElement = head(emptyArray);
// noElement is undefined

head(null); // undefined
head(undefined); // undefined
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array or array-like object to get the first element from.

#### Returns

(`T | undefined`): Returns the first element of the array, or `undefined` if the array is empty or invalid.
