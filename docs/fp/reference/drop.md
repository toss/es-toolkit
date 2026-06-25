# drop (Functional Programming)

Creates a function that drops values from the beginning of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, drop(count));
```

## Usage

`drop` removes the first `count` values from the piped array. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { drop, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], drop(2)); // => [3, 4]
```

#### Parameters

- `count` (`number`): The number of values to drop from the beginning.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the remaining values.
