# nth (Lodash Compatibility)

::: warning Use array index access
This `nth` function operates slowly due to handling `null` or `undefined` and integer conversion.

Use the faster and more modern array index access (`array[index]` or `array.at(index)`) instead.
:::

Gets the element at the specified index of an array.

```typescript
const element = nth(array, index);
```

## Reference

### `nth(array, index)`

Returns the element at the specified index of an array. If the index is negative, it counts from the end of the array. If the index is out of range, it returns `undefined`.

```typescript
import { nth } from 'es-toolkit/compat';

const array = [1, 2, 3, 4, 5];

// Positive index
nth(array, 1);
// => 2

// Negative index (from end)
nth(array, -1);
// => 5

nth(array, -2);
// => 4

// Out of range index
nth(array, 10);
// => undefined

nth(array, -10);
// => undefined
```

`null` or `undefined` are treated as `undefined`.

```typescript
import { nth } from 'es-toolkit/compat';

nth(null, 0); // undefined
nth(undefined, 0); // undefined
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to query.
- `index` (`number`, optional): The index of the element to get. If negative, it counts from the end. Defaults to `0`.

#### Returns

(`T | undefined`): Returns the element at the specified index. If the index is out of range, it returns `undefined`.
