# tail (Functional Programming)

Creates a function that returns all values except the first one. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, tail());
```

## Usage

`tail` returns a new array without the first value of the piped array.

```typescript
import { tail, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### Parameters

This function takes no arguments; call it as `tail()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to all values except the first one.
