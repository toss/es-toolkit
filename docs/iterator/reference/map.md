# map (Functional Programming)

Creates a function that lazily transforms each element of an iterator. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, map(callback));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map): `source.map(callback)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `map(callback)`

`map` takes a transform function and returns a function that maps an iterator lazily: each element is transformed only when it is pulled, so it composes with short-circuiting steps without doing extra work. It delegates to the native `Iterator.prototype.map`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// Transform lazily; only the two consumed elements are computed.
pipe([1, 2, 3, 4].values(), map(x => x * 10), take(2), toArray());
// Returns: [10, 20]
```

#### Parameters

- `callback` (`(value: T, index: number) => U`): Called with each element and its index; returns the transformed element.

#### Returns

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): A function that maps an iterator to a lazy iterator over the transformed elements.
