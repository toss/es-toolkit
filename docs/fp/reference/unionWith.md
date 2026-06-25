# unionWith (Functional Programming)

Creates a function that combines arrays using a custom equality function. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, unionWith(secondArray, areItemsEqual));
```

## Usage

`unionWith` keeps the first value from the combined arrays for which `areItemsEqual` does not match an already kept value.

```typescript
import { unionWith, pipe } from 'es-toolkit/fp';

pipe([{ id: 1 }, { id: 2 }], unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to combine after the piped array.
- `areItemsEqual` (`(item: T, other: T) => boolean`): The function that decides whether two values are equal.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a union by custom equality.
