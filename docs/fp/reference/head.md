# head

Creates a data-last head operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, head());
```

## Usage

`head` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { head, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], head());
// 1
```

## API

### `head(...)`

Returns: A function that accepts the piped input.
