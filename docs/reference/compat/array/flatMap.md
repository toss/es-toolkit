# flatMap

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Maps each element in the collection using the iteratee function and flattens the result by one level. The iteratee is invoked with three arguments: (value, index, array).

## Signature

```typescript
function flatMap<T, R>(
  collection: Array<T> | Record<string, T> | null | undefined,
  iteratee?: (
    value: T,
    index: number | string,
    collection: Array<T> | Record<string, T>
  ) => R | Array<R> | null | undefined
): Array<R>;
```

### Parameters

- `collection`: The collection to iterate over.
- `iteratee`: The function invoked per iteration. Defaults to `identity`.

### Returns

(`Array`): Returns the new flattened array.

## Examples

```typescript
import { flatMap } from 'es-toolkit/compat';

// Basic example with a function that returns arrays
function duplicate(n) {
  return [n, n];
}

flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]

// Using with property shorthand
const objects = [{ a: [1, 2] }, { a: [3, 4] }];
flatMap(objects, 'a');
// => [1, 2, 3, 4]

// With objects
flatMap({ a: 1, b: 2 }, n => [n, n]);
// => [1, 1, 2, 2]

// Working with arrays of arrays
flatMap([[1], [2, [3]], 4]);
// => [1, 2, [3], 4]
```
