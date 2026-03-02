# eachRight (Lodash Compatibility)

::: warning Use `forEachRight` from `es-toolkit`

This `eachRight` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, support for various predicate function formats, etc.

Instead, use the faster and more modern [`forEachRight`](../../array/forEachRight.md) from `es-toolkit`.

:::

Performs an iteration operation from right to left on each element of an array or object.

```typescript
const result = eachRight(collection, iteratee);
```

## Usage

### `eachRight(collection, iteratee)`

Iterates through each element of an array, object, or string from right to left and executes the given function. For arrays, it iterates in reverse order from the last index; for objects, it iterates through enumerable properties in reverse order.

```typescript
import { eachRight } from 'es-toolkit/compat';

// Iterate array in reverse order
eachRight([1, 2, 3], (value, index) => console.log(value, index));
// Logs: 3 2, 2 1, 1 0

// Iterate object in reverse order
eachRight({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// Logs: 'b' 2, 'a' 1

// Iterate string in reverse order
eachRight('hello', (char, index) => console.log(char, index));
// Logs: 'o' 4, 'l' 3, 'l' 2, 'e' 1, 'h' 0
```

If the function returns `false`, iteration stops.

```typescript
import { eachRight } from 'es-toolkit/compat';

eachRight([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // Stop at 2
});
// Logs: 4, 3, 2
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): The collection to iterate over.
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, optional): The function to execute for each element. Default is the `identity` function.

#### Returns

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): Returns the original collection.
