# takeRight

Creates a data-last takeRight operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeRight(2));
```

## Usage

`takeRight` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, takeRight } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], takeRight(2));
// [3, 4]
```

## API

### `takeRight(...)`

Returns: A function that accepts the piped input.
