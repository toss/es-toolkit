# cartesianProduct

Creates a data-last cartesianProduct operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, cartesianProduct(['a', 'b']));
```

## Usage

`cartesianProduct` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2], cartesianProduct(['a', 'b']));
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

## API

### `cartesianProduct(...)`

Returns: A function that accepts the piped input.
