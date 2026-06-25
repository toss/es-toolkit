# reverse (Functional Programming)

Creates a function that returns a reversed copy of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, reverse());
```

## Usage

`reverse` returns a new array with the values of the piped array in reverse order. It does not mutate the input array.

```typescript
import { reverse, pipe } from 'es-toolkit/fp';

const array = [1, 2, 3];

pipe(array, reverse()); // => [3, 2, 1]
array; // => [1, 2, 3]
```

#### Parameters

This function takes no arguments; call it as `reverse()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a reversed copy.
