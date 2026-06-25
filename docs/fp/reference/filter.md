# filter (Functional Programming)

Creates a function that keeps only the elements that pass a test, equivalent to `Array.prototype.filter`. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, filter(predicate));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`filter` keeps the elements for which `predicate` returns a truthy value. A type predicate narrows the element type of the result. It is **lazy-capable**: inside a [`pipe`](./pipe.md) it is fused with adjacent lazy operations.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

// Keep even numbers.
pipe(
  [1, 2, 3, 4],
  filter(x => x % 2 === 0)
); // => [2, 4]

// The index is available as the second argument.
pipe(
  [10, 20, 30, 40],
  filter((_value, index) => index % 2 === 0)
); // => [10, 30]
```

A type guard narrows the result type.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 'a', 2, 'b'],
  filter((x): x is string => typeof x === 'string')
);
// result is typed as string[] and equals ['a', 'b']
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): A function called for each element; return `true` to keep the element. A type guard (`value is S`) narrows the result.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a filtered array. With a type guard, the result is `S[]`.
