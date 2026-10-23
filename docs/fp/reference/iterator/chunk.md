# chunk (for `Iterator`s)

Creates a function that lazily groups the elements of an iterator into arrays of the given length. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, chunk(size));
```

::: info

In ordinary code, prefer [`chunk`](../../../reference/iterator/chunk.md) from `es-toolkit/iterator`: `chunk(source, size)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `chunk(size)`

`chunk` takes a length and returns a function that groups the elements of an iterator into arrays of that length. Each array is built only when it is pulled, and the last one may be shorter.

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

// Group the numbers in twos.
pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// Returns: [[1, 2], [3, 4], [5]]
```

#### Parameters

- `size` (`number`): The length of each chunk; must be an integer greater than zero.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T[], undefined>`): A function that maps an iterator to a lazy iterator over arrays of up to `size` elements.

#### Throws

Throws an error if `size` is not an integer greater than zero.
