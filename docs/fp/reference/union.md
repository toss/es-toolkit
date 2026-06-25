# union

Creates a data-last union operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, union([2, 3]));
```

## Usage

`union` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, union } from 'es-toolkit/fp';

const result = pipe([1, 2], union([2, 3]));
// [1, 2, 3]
```

## API

### `union(...)`

Returns: A function that accepts the piped input.
