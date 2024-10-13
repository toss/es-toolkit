# sample

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It provides the same functionalities as lodash's `sample`, as detailed [here](../../../compatibility.md).
:::

Returns a random element from a collection.

This function takes an array, object, or string and returns a single element selected randomly from the collection.

## Signature

```typescript
function sample<T>(collection: ArrayLike<T> | Record<string, T>): T | string | undefined;
```

### Parameters

- collection (ArrayLike<T> | Record<string, T>): The collection (array, string, or object) to sample from.

### Returns

(T | string | undefined): A random element from the collection. Returns undefined if the collection is empty or invalid.

## Examples

```typescript
import { sample } from 'es-toolkit/compat';

// Sampling an array
const array = [1, 2, 3];
const result = sample(array);
// Returns 1, 2, or 3 (randomly selected)

// Sampling a string
const str = 'hello';
const result = sample(str);
// Returns 'h', 'e', 'l', or 'o' (randomly selected)

// Sampling an object
const obj = { a: 1, b: 2, c: 3 };
const result = sample(obj);
// Returns 1, 2, or 3 (randomly selected)

// Sampling from an empty array
const emptyArray = [];
const result = sample(emptyArray);
// Returns undefined

```
