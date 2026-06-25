# length (Functional Programming)

Creates a function that returns the length of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, length());
```

## Usage

`length` returns the number of values in the piped array.

```typescript
import { length, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], length()); // => 3
```

#### Parameters

This function takes no arguments; call it as `length()`.

#### Returns

(`(array: readonly T[]) => number`): A function that maps a `readonly T[]` to its length.
