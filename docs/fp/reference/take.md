# take (Functional Programming)

Creates a function that returns the first `count` elements of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, take(count));
```

::: info

Prefer the original es-toolkit [`take`](../../reference/array/take.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`take` returns the first `count` elements. If `count` is greater than the array length, the whole array is returned. For a non-negative integer `count` it is **lazy-capable**: inside a [`pipe`](./pipe.md) it ends the walk as soon as `count` elements have been collected, so preceding lazy operations never process the rest of the input.

```typescript
import { map, pipe, take } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], take(3)); // => [1, 2, 3]

// `count` larger than the length returns the whole array.
pipe([1, 2, 3], take(5)); // => [1, 2, 3]

// Early termination: `map` only runs three times.
pipe([1, 2, 3, 4, 5], map(expensiveTransform), take(3));
```

#### Parameters

- `count` (`number`): The number of elements to take from the front of the array. A negative `count` follows `es-toolkit`'s `take` and drops from the end instead.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a new `T[]` with at most `count` elements.
