# each (Lodash Compatibility)

::: warning Use `Array.prototype.forEach`

This `each` function operates slowly due to complex type processing and support for various collection types.

Instead, use the faster and more modern `Array.prototype.forEach`.

:::

Performs an iteration operation on each element of an array or object.

```typescript
const result = each(collection, iteratee);
```

## Reference

### `each(collection, iteratee)`

Iterates through each element of an array, object, or string and executes the given function. For arrays, it iterates in index order; for objects, it iterates through enumerable properties.

```typescript
import { each } from 'es-toolkit/compat';

// Iterate array
each([1, 2, 3], (value, index) => console.log(value, index));
// Logs: 1 0, 2 1, 3 2

// Iterate object
each({ a: 1, b: 2 }, (value, key) => console.log(key, value));
// Logs: 'a' 1, 'b' 2

// Iterate string
each('hello', (char, index) => console.log(char, index));
// Logs: 'h' 0, 'e' 1, 'l' 2, 'l' 3, 'o' 4
```

If the function returns `false`, iteration stops.

```typescript
import { each } from 'es-toolkit/compat';

each([1, 2, 3, 4], value => {
  console.log(value);
  return value !== 2; // Stop at 2
});
// Logs: 1, 2
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): The collection to iterate over.
- `iteratee` (`(item: any, index: any, collection: any) => unknown`, optional): The function to execute for each element. Default is the `identity` function.

#### Returns

(`ArrayLike<T> | Record<any, any> | string | null | undefined`): Returns the original collection.
