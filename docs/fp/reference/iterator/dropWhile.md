# dropWhile (for `Iterator`s)

Creates a function that lazily skips the leading elements of an iterator while a predicate holds, then yields the rest. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, dropWhile(shouldDrop));
```

::: info

In ordinary code, prefer [`dropWhile`](../../../reference/iterator/dropWhile.md) from `es-toolkit/iterator`: `dropWhile(source, shouldDrop)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `dropWhile(shouldDrop)`

`dropWhile` takes a predicate and returns a function that skips elements while it returns a truthy value. Starting from the first element for which it returns a falsy value, every remaining element is yielded.

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

// Skip the leading numbers below 3.
pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// Returns: [3, 1]
```

#### Parameters

- `shouldDrop` (`(value: T, index: number) => boolean`): Called with each element and its index; elements are skipped while it returns a truthy value.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over the elements after the skipped leading run.
