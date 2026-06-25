# takeRight (Functional Programming)

Creates a function that returns values from the end of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeRight(count));
```

## Usage

`takeRight` returns the last `count` values from the piped array.

```typescript
import { takeRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], takeRight(2)); // => [3, 4]
```

#### Parameters

- `count` (`number`): The number of values to take from the end.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the last `count` values.
