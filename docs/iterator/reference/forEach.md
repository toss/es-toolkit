# forEach (for `Iterator`s)

Creates a function that consumes an iterator and runs a callback for each element. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
pipe(source, forEach(callback));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach): `source.forEach(callback)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `forEach(callback)`

`forEach` is a terminal step for side effects: it pulls every element and runs `callback` on each. Because it consumes the whole iterator, it must not be used on an infinite iterator. It delegates to the native `Iterator.prototype.forEach`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, forEach } from 'es-toolkit/fp/iterator';

// Log each even number.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  forEach(x => console.log(x))
);
// Logs: 2, 4
```

#### Parameters

- `callback` (`(value: T, index: number) => void`): Called with each element and its index.

#### Returns

(`(source: Iterator<T>) => void`): A function that consumes an iterator and returns nothing.
