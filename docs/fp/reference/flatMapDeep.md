# flatMapDeep (Functional Programming)

Creates a function that maps each value and deeply flattens the result. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flatMapDeep(iteratee));
```

::: info

Prefer the original es-toolkit [`flatMapDeep`](../../reference/array/flatMapDeep.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`flatMapDeep` calls `iteratee` for each value in the piped array and recursively flattens the returned arrays.

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
); // => [1, 1, 2, 2]
```

#### Parameters

- `iteratee` (`(item: T, index: number) => U`): The function that maps each value before deep flattening.

#### Returns

(`(array: readonly T[]) => Array<ExtractNestedArrayType<U>>`): A function that maps a `readonly T[]` to a deeply flattened array.
