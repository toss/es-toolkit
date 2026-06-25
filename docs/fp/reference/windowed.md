# windowed (Functional Programming)

Creates a function that returns sliding windows from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, windowed(size, step, options));
```

## Usage

`windowed` returns sub-arrays of length `size`, moving forward by `step` each time. Full-window mode is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { windowed, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], windowed(2)); // => [[1, 2], [2, 3], [3, 4]]

pipe([1, 2, 3, 4], windowed(2, 2)); // => [[1, 2], [3, 4]]
```

#### Parameters

- `size` (`number`): The length of each window.
- `step` (`number, optional`): The number of positions to move between windows. Defaults to `1`.
- `options` (`WindowedOptions, optional`): Options such as whether to include partial trailing windows.

#### Returns

(`(array: readonly T[]) => T[][]`): A function that maps a `readonly T[]` to sliding windows.

#### Throws

Throws an error if `size` or `step` is not a positive integer.
