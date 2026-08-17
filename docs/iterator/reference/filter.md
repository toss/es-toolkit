# filter (for `Iterator`s)

Creates a function that lazily keeps the elements of an iterator matching a predicate. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, filter(predicate));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter): `source.filter(predicate)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `filter(predicate)`

`filter` takes a predicate and returns a function that lazily keeps the elements for which the predicate returns a truthy value. When the predicate is a type guard (`(value): value is S`), the element type is narrowed accordingly. It delegates to the native `Iterator.prototype.filter`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, toArray } from 'es-toolkit/fp/iterator';

// Keep only even numbers.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  toArray()
);
// Returns: [2, 4]
```

#### Parameters

- `predicate` (`(value: T, index: number) => unknown`): Called with each element and its index; a truthy return keeps the element.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over the kept elements.
