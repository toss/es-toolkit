# unzip (Functional Programming)

Creates a function that regroups zipped arrays by position. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, unzip());
```

## Usage

`unzip` takes an array of grouped values and returns arrays that collect the values at each position.

```typescript
import { unzip, pipe } from 'es-toolkit/fp';

pipe([[1, 'a'], [2, 'b']], unzip()); // => [[1, 2], ['a', 'b']]
```

#### Parameters

This function takes no arguments; call it as `unzip()`.

#### Returns

(`(zipped: ReadonlyArray<[...T]>) => Unzip<T>`): A function that maps zipped rows to arrays grouped by position.
