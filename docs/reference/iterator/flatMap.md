# flatMap (for `Iterator`s)

Creates a function that lazily maps each element of an iterator to an iterable and flattens the results one level. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, flatMap(callback));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap): `source.flatMap(callback)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `flatMap(callback)`

`flatMap` maps each element to an iterable (or iterator) and yields that iterable's elements in place, one level deep. Each inner iterable is only walked when its elements are pulled, so the whole pipeline stays lazy. It delegates to the native `Iterator.prototype.flatMap`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { flatMap, toArray } from 'es-toolkit/fp/iterator';

// Expand each element into itself and its tenfold.
pipe(
  [1, 2].values(),
  flatMap(x => [x, x * 10]),
  toArray()
);
// Returns: [1, 10, 2, 20]
```

#### Parameters

- `callback` (`(value: T, index: number) => Iterator<U> | Iterable<U>`): Called with each element and its index; returns the iterable to flatten into the result.

#### Returns

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): A function that maps an iterator to a lazy iterator over the flattened elements.
