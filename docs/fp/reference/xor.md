# xor

Creates a data-last xor operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, xor([2, 3]));
```

## Usage

`xor` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, xor } from 'es-toolkit/fp';

const result = pipe([1, 2], xor([2, 3]));
// [1, 3]
```

## API

### `xor(...)`

Returns: A function that accepts the piped input.
