# partition (for `Iterator`s)

Creates a function that consumes an iterator and splits its elements into two arrays by a predicate. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, partition(predicate));
```

::: info

In ordinary code, prefer [`partition`](../../../reference/iterator/partition.md) from `es-toolkit/iterator`: `partition(source, predicate)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `partition(predicate)`

`partition` is a terminal step of an iterator pipeline: it pulls every element and puts it in the first array when `predicate` returns a truthy value, or in the second array otherwise. Because it consumes the whole iterator, it must not be used on an infinite iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

// Split the numbers into even and odd.
pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// Returns: [[2, 4], [1, 3]]
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): Called with each element and its index; a truthy return sends the element to the first array.

#### Returns

(`(source: Iterator<T>) => [T[], T[]]`): A function that consumes an iterator and returns a tuple of `[matched, unmatched]` arrays.
