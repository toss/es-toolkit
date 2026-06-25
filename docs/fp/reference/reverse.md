# reverse (Functional Programming)

Creates a function that returns a reversed copy of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, reverse());
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`reverse` returns a new array with the values of the piped array in reverse order. It does not mutate the input array.

```typescript
import { pipe, reverse } from 'es-toolkit/fp';

const array = [1, 2, 3];

pipe(array, reverse()); // => [3, 2, 1]
array; // => [1, 2, 3]
```

#### Parameters

This function takes no arguments; call it as `reverse()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a reversed copy.
