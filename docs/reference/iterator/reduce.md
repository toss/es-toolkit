# reduce (for `Iterator`s)

Creates a function that folds an iterator into a single value. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, reduce(callback, initial));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce): `source.reduce(callback, initial)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `reduce(callback, initial)`

`reduce` is a terminal step: it pulls every element, threading an accumulator through `callback`, and returns the final accumulator. Because it consumes the whole iterator, it must not be used on an infinite iterator. To keep every intermediate accumulator instead of only the final one, use [`scan`](./scan.md). It delegates to the native `Iterator.prototype.reduce`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, reduce } from 'es-toolkit/fp/iterator';

// Sum the doubled elements.
pipe(
  [1, 2, 3].values(),
  map(x => x * 2),
  reduce((acc, x) => acc + x, 0)
);
// Returns: 12
```

#### Parameters

- `callback` (`(accumulator: U, value: T, index: number) => U`): Called with the current accumulator, each element, and its index; returns the next accumulator.
- `initial` (`U`): The initial accumulator value.

#### Returns

(`(source: Iterator<T>) => U`): A function that consumes an iterator and returns the final accumulator.
