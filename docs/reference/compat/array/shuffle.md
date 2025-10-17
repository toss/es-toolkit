# shuffle (Lodash Compatibility)

::: warning Use `es-toolkit`'s `shuffle`

This `shuffle` function includes additional processing for Lodash compatibility and operates slowly.

Instead, use the faster and more modern `es-toolkit`'s [shuffle](../../array/shuffle.md).

:::

Shuffles the elements of an array or object randomly and returns a new array.

```typescript
const result = shuffle(collection);
```

## Reference

### `shuffle(collection)`

Uses the Fisher-Yates algorithm to randomly shuffle the elements of an array or object and returns a new array. The original is not modified.

```typescript
import { shuffle } from 'es-toolkit/compat';

// Shuffle a number array
const numbers = [1, 2, 3, 4, 5];
const shuffled1 = shuffle(numbers);
// Returns: for example [3, 1, 5, 2, 4] (different order each time)

// Shuffle a string array
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffled2 = shuffle(fruits);
// Returns: for example ['cherry', 'apple', 'date', 'banana']

// Shuffle object values
const obj = { a: 1, b: 2, c: 3, d: 4 };
const shuffled3 = shuffle(obj);
// Returns: for example [3, 1, 4, 2] (object values are randomly shuffled)
```

`null` or `undefined` is handled as an empty array.

```typescript
import { shuffle } from 'es-toolkit/compat';

shuffle(null);
// Returns: []

shuffle(undefined);
// Returns: []
```

#### Parameters

- `collection` (`ArrayLike<T> | T | null | undefined`): The array or object to shuffle.

#### Returns

(`T[]`): Returns a new array with elements randomly shuffled.
