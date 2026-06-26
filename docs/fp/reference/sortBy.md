# sortBy (Functional Programming)

Creates a function that sorts an array of objects in ascending order by one or more criteria. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, sortBy(criteria));
```

::: info

Prefer the original es-toolkit [`sortBy`](../../reference/array/sortBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`sortBy` sorts an array of objects in ascending order. Each criterion is either an object key or a function that returns the value to compare. When two elements tie on a criterion, the next criterion breaks the tie. The sort is stable and does not mutate the input.

```typescript
import { pipe, sortBy } from 'es-toolkit/fp';

const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

// Sort by a single key.
pipe(users, sortBy(['age']));
// => [{ user: 'bar', age: 7 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }, { user: 'bar', age: 29 }]

// Sort by multiple criteria, breaking ties with the next one.
pipe(users, sortBy(['user', 'age']));
// => [{ user: 'bar', age: 7 }, { user: 'bar', age: 29 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }]

// A selector function can be used instead of a key.
pipe(users, sortBy([item => item.age]));
```

#### Parameters

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): The object keys and/or selector functions used for comparison, applied in order.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a new, sorted `T[]`.
