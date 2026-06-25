# last

Creates a data-last last operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, last());
```

## Usage

`last` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { last, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], last());
// 3
```

## API

### `last(...)`

Returns: A function that accepts the piped input.
