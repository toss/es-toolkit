# zip (for `Iterator`s)

Creates a function that lazily pairs the elements of an iterator with those of another iterator. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, zip(other));
```

::: info

In ordinary code, prefer [`zip`](../../../reference/iterator/zip.md) from `es-toolkit/iterator`: `zip(source, other)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `zip(other)`

`zip` takes one other iterator and returns a function that pairs the elements of the piped iterator with the elements of `other`, one by one. Iteration stops as soon as either iterator runs out.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

// Pair each number with a letter.
pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### Parameters

- `other` (`Iterator<U>`): The iterator to pair with the piped one.

#### Returns

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): A function that maps an iterator to a lazy iterator over `[element, otherElement]` pairs.
