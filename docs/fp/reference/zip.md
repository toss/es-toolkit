# zip (Functional Programming)

Creates a function that groups values from arrays by index. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, zip(...arrs));
```

## Usage

`zip` groups the value at each index from the piped array and the configured arrays. If arrays have different lengths, missing values are `undefined`.

```typescript
import { zip, pipe } from 'es-toolkit/fp';

pipe([1, 2], zip(['a', 'b'])); // => [[1, 'a'], [2, 'b']]

pipe([1, 2, 3], zip(['a'])); // => [[1, 'a'], [2, undefined], [3, undefined]]
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to zip with the piped array.

#### Returns

(`(array: readonly T[]) => T[][]`): A function that maps the piped array to grouped rows by index.
