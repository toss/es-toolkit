# without (Functional Programming)

Creates a function that removes specific values from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, without(...values));
```

## Usage

`without` removes every value from the piped array that is equal to one of `values`. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { without, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 2], without(2)); // => [1, 3]
```

#### Parameters

- `values` (`T[]`): The values to remove from the piped array.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to an array without `values`.
