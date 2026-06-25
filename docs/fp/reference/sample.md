# sample (Functional Programming)

Creates a function that returns a random value from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, sample());
```

## Usage

`sample` returns one random value from the piped array.

```typescript
import { sample, pipe } from 'es-toolkit/fp';

const value = pipe([1, 2, 3], sample());
// value is one of 1, 2, or 3.
```

#### Parameters

This function takes no arguments; call it as `sample()`.

#### Returns

(`(array: readonly T[]) => T`): A function that maps a `readonly T[]` to one random value.
