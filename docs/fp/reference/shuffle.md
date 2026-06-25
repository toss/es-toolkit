# shuffle

Creates a data-last shuffle operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, shuffle());
```

## Usage

`shuffle` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, shuffle } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], shuffle());
// a shuffled copy
```

## API

### `shuffle(...)`

Returns: A function that accepts the piped input.
