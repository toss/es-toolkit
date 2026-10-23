# count (for `Iterator`s)

Creates a function that consumes an iterator and returns the number of elements it produces. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, count());
```

::: info

In ordinary code, prefer [`count`](../../../reference/iterator/count.md) from `es-toolkit/iterator`: `count(source)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `count()`

`count` is a terminal step of an iterator pipeline: it pulls every element and returns how many there were. Because it consumes the whole iterator, it must not be used on an infinite iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

// Count the even numbers.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// Returns: 2
```

#### Returns

(`(source: Iterator<T>) => number`): A function that consumes an iterator and returns the number of elements it produced.
