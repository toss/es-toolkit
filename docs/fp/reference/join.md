# join

Creates a data-last join operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, join('-'));
```

## Usage

`join` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { join, pipe } from 'es-toolkit/fp';

const result = pipe(['a', 'b', 'c'], join('-'));
// 'a-b-c'
```

## API

### `join(...)`

Returns: A function that accepts the piped input.
