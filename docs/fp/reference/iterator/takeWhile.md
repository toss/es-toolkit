# takeWhile (for `Iterator`s)

Creates a function that lazily yields the leading elements of an iterator while a predicate holds. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, takeWhile(shouldContinue));
```

::: info

In ordinary code, prefer [`takeWhile`](../../../reference/iterator/takeWhile.md) from `es-toolkit/iterator`: `takeWhile(source, shouldContinue)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `takeWhile(shouldContinue)`

`takeWhile` takes a predicate and returns a function that yields elements while it returns a truthy value. Iteration stops at the first element for which it returns a falsy value, and the rest of the source is never pulled, so it can bound an infinite iterator. To stop after a fixed number of elements instead, use [`take`](./take.md).

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

// Take the leading numbers below 3.
pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// Returns: [1, 2]
```

#### Parameters

- `shouldContinue` (`(value: T, index: number) => boolean`): Called with each element and its index; iteration stops once it returns a falsy value.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over the leading run of matching elements.
