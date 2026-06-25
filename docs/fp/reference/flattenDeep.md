# flattenDeep

Creates a data-last flattenDeep operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flattenDeep());
```

## Usage

`flattenDeep` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { flattenDeep, pipe } from 'es-toolkit/fp';

const result = pipe([1, [2, [3]]], flattenDeep());
// [1, 2, 3]
```

## API

### `flattenDeep(...)`

Returns: A function that accepts the piped input.
