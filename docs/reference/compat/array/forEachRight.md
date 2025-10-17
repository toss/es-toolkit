# forEachRight (Lodash Compatibility)

::: warning Use `forEachRight` from `es-toolkit`

This `forEachRight` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, support for various predicate function formats, etc.

Instead, use the faster and more modern [`forEachRight`](../../array/forEachRight.md) from `es-toolkit`.

:::

Iterates over elements of an array or object from right to left and executes a function for each element.

```typescript
forEachRight(collection, callback);
```

## Reference

### `forEachRight(collection, callback)`

Iterates through each element of an array, object, or string from right to left and executes the given callback function. The iteration stops if the callback returns `false`.

```typescript
import { forEachRight } from 'es-toolkit/compat';

// Iterate array in reverse order
forEachRight([1, 2, 3], (value, index) => {
  console.log(value, index);
});
// Output: 3 2, 2 1, 1 0

// Iterate string in reverse order
forEachRight('abc', (char, index) => {
  console.log(char, index);
});
// Output: 'c' 2, 'b' 1, 'a' 0

// Iterate object in reverse order
forEachRight({ a: 1, b: 2, c: 3 }, (value, key) => {
  console.log(value, key);
});
// Output: 3 'c', 2 'b', 1 'a'
```

`null` or `undefined` are returned as is.

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight(null, value => console.log(value)); // null
forEachRight(undefined, value => console.log(value)); // undefined
```

The iteration stops if the callback returns `false`.

```typescript
import { forEachRight } from 'es-toolkit/compat';

forEachRight([1, 2, 3, 4], value => {
  console.log(value);
  if (value === 2) {
    return false; // Stop iteration
  }
});
// Output: 4, 3, 2
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): The collection to iterate over. Can be an array, object, string, or null/undefined.
- `callback` (`(item: any, index: any, arr: any) => unknown`, optional): The function to execute for each element. Returns `false` to stop iteration. Default is the `identity` function.

#### Returns

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): Returns the original collection as is.
