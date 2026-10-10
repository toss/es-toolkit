# head (for `Iterator`s)

Creates a function that returns the first element of an iterator, or `undefined` if it is empty. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, head());
```

::: info

In ordinary code, prefer [`head`](../../../reference/iterator/head.md) from `es-toolkit/iterator`: `head(source)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `head()`

`head` is a terminal step of an iterator pipeline: it pulls a single element and then closes the source iterator through its `return` method, so it is safe to use on an infinite iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

// Get the first even number.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// Returns: 2
```

#### Returns

(`(source: Iterator<T>) => T | undefined`): A function that returns the first element of an iterator, or `undefined` when the iterator yields nothing.
