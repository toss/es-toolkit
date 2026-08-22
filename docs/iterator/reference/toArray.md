# toArray (for `Iterator`s)

Creates a function that collects the elements of an iterator into an array. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, toArray());
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.toArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray): `source.toArray()`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `toArray()`

`toArray` is the most common terminal step of an iterator pipeline: it pulls every element and returns them as an array. Because it consumes the whole iterator, it must not be used on an infinite iterator — bound the pipeline with [`take`](./take.md) or [`takeWhile`](./takeWhile.md) first. It delegates to the native `Iterator.prototype.toArray`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, toArray } from 'es-toolkit/fp/iterator';

// Materialize the transformed elements.
pipe(
  [1, 2, 3].values(),
  map(x => x * 2),
  toArray()
);
// Returns: [2, 4, 6]
```

#### Returns

(`(source: Iterator<T>) => T[]`): A function that consumes an iterator and returns its elements as an array.
