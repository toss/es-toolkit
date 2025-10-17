# sample (Lodash Compatibility)

::: warning Use `es-toolkit`'s [sample](../../array/sample.md)

This `sample` function operates slowly due to `null` or `undefined` handling, object value processing, etc.

Instead, use the faster and more modern `es-toolkit`'s [sample](../../array/sample.md).

:::

Gets a random element from an array or object.

```typescript
const randomItem = sample(collection);
```

## Reference

### `sample(collection)`

Use `sample` to select a random element from an array or object. For arrays, it returns a random element, and for objects, it returns a random value.

```typescript
import { sample } from 'es-toolkit/compat';

// Get a random element from an array
sample([1, 2, 3, 4, 5]);
// Returns a random number between 1 and 5

// Get a random value from an object
sample({ a: 1, b: 2, c: 3 });
// Returns a random value among 1, 2, 3

// Handles strings as well
sample('hello');
// Returns a random character among 'h', 'e', 'l', 'l', 'o'
```

`null` or `undefined` returns `undefined`.

```typescript
import { sample } from 'es-toolkit/compat';

sample(null); // undefined
sample(undefined); // undefined
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to sample from.

#### Returns

(`T | string | undefined`): Returns a randomly selected element from the array or object. Returns `undefined` if the collection is empty or `null`, `undefined`.
