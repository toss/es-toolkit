# tail

Creates a data-last tail operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, tail());
```

## Usage

`tail` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, tail } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], tail());
// [2, 3]
```

## API

### `tail(...)`

Returns: A function that accepts the piped input.
