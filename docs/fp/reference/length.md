# length

Creates a data-last length operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, length());
```

## Usage

`length` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { length, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], length());
// 3
```

## API

### `length(...)`

Returns: A function that accepts the piped input.
