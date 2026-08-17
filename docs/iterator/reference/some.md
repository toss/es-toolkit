# some (Functional Programming)

Creates a function that reports whether any element of an iterator matches a predicate. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, some(predicate));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some): `source.some(predicate)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `some(predicate)`

`some` is a terminal step: it consumes the iterator until `predicate` returns a truthy value and reports whether any element matched. It stops pulling at the first match, so it can complete on an infinite iterator as long as a matching element appears. It delegates to the native `Iterator.prototype.some`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { some } from 'es-toolkit/fp/iterator';

// Stops as soon as an even number is found.
pipe([1, 3, 4, 5].values(), some(x => x % 2 === 0));
// Returns: true

pipe([1, 3, 5].values(), some(x => x % 2 === 0));
// Returns: false
```

#### Parameters

- `predicate` (`(value: T, index: number) => unknown`): Called with each element and its index; a truthy return short-circuits to `true`.

#### Returns

(`(source: Iterator<T>) => boolean`): A function that consumes an iterator and returns whether any element matched.
