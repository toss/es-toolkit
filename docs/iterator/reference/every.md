# every (Functional Programming)

Creates a function that reports whether every element of an iterator matches a predicate. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, every(predicate));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every): `source.every(predicate)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `every(predicate)`

`every` is a terminal step: it consumes the iterator until `predicate` returns a falsy value and reports whether every element matched. It stops pulling at the first non-match, so it can complete on an infinite iterator as long as a non-matching element appears. It delegates to the native `Iterator.prototype.every`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { every } from 'es-toolkit/fp/iterator';

// All elements are even.
pipe([2, 4, 6].values(), every(x => x % 2 === 0));
// Returns: true

// Stops at the first odd element.
pipe([2, 3, 4].values(), every(x => x % 2 === 0));
// Returns: false
```

#### Parameters

- `predicate` (`(value: T, index: number) => unknown`): Called with each element and its index; a falsy return short-circuits to `false`.

#### Returns

(`(source: Iterator<T>) => boolean`): A function that consumes an iterator and returns whether every element matched.
