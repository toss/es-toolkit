# compact

Creates a data-last compact operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, compact());
```

## Usage

`compact` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { compact, pipe } from 'es-toolkit/fp';

const result = pipe([0, 1, false, 2, '', 3], compact());
// [1, 2, 3]
```

## API

### `compact(...)`

Returns: A function that accepts the piped input.
