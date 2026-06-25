# isSubset

Creates a data-last isSubset operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, isSubset([1, 2, 3]));
```

## Usage

`isSubset` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { isSubset, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2], isSubset([1, 2, 3]));
// true
```

## API

### `isSubset(...)`

Returns: A function that accepts the piped input.
