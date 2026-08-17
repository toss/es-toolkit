# find (Functional Programming)

Creates a function that returns the first element of an iterator matching a predicate. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, find(predicate));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find): `source.find(predicate)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `find(predicate)`

`find` is a terminal step: it consumes the iterator until `predicate` returns a truthy value and returns that element, or `undefined` if none match. It stops pulling at the first match and closes the source, so it is safe on an infinite iterator as long as a match appears. It delegates to the native `Iterator.prototype.find`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { find } from 'es-toolkit/fp/iterator';

// Return the first element above the threshold.
pipe([1, 2, 3, 4].values(), find(x => x > 2));
// Returns: 3

// No match yields undefined.
pipe([1, 2].values(), find(x => x > 10));
// Returns: undefined
```

#### Parameters

- `predicate` (`(value: T, index: number) => unknown`): Called with each element and its index; a truthy return selects the element.

#### Returns

(`(source: Iterator<T>) => T | undefined`): A function that consumes an iterator and returns the first matching element, or `undefined`.
