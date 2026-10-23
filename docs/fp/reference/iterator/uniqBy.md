# uniqBy (for `Iterator`s)

Creates a function that lazily yields the elements of an iterator whose key has not been seen before. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, uniqBy(getKey));
```

::: info

In ordinary code, prefer [`uniqBy`](../../../reference/iterator/uniqBy.md) from `es-toolkit/iterator`: `uniqBy(source, getKey)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `uniqBy(getKey)`

`uniqBy` takes a key function and returns a function that yields each element whose key appears for the first time, keeping the original order. Keys are compared the same way a `Set` compares values.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

// Keep the first number for each integer part.
pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// Returns: [1.1, 2.3]
```

#### Parameters

- `getKey` (`(value: T) => K`): Maps an element to the key used to detect duplicates.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over the elements with duplicate keys removed.
