# flattenDeep (Functional Programming)

Creates a function that recursively flattens nested arrays. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flattenDeep());
```

::: info

Prefer the original es-toolkit [`flattenDeep`](../../reference/array/flattenDeep.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`flattenDeep` recursively removes every nested array layer from the piped array. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { flattenDeep, pipe } from 'es-toolkit/fp';

pipe([1, [2, [3, [4]]]], flattenDeep()); // => [1, 2, 3, 4]
```

#### Parameters

This function takes no arguments; call it as `flattenDeep()`.

#### Returns

(`(array: readonly T[]) => Array<ExtractNestedArrayType<T>>`): A function that maps a nested array to a deeply flattened array.
