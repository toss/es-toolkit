# scan (for `Iterator`s)

Creates a function that lazily yields the running accumulation of an iterator. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, scan(callback, initial));
```

::: info

In ordinary code, prefer [`scan`](../../../reference/iterator/scan.md) from `es-toolkit/iterator`: `scan(source, callback, initial)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `scan(callback, initial)`

`scan` takes a callback and an initial value and returns a function that yields `initial` first, then the accumulator after each element. It works like a [`reduce`](./reduce.md) that also yields every intermediate result.

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

// Yield the running total.
pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// Returns: [0, 1, 3, 6]
```

#### Parameters

- `callback` (`(accumulator: U, value: T, index: number) => U`): Called with the current accumulator, each element, and its index; returns the next accumulator.
- `initial` (`U`): The initial accumulator, yielded as the first value.

#### Returns

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): A function that maps an iterator to a lazy iterator over the initial value and each next accumulator.
