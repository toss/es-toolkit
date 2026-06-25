# drop

Creates a data-last drop operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, drop(2));
```

## Usage

`drop` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { drop, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], drop(2));
// [3, 4]
```

## API

### `drop(...)`

Returns: A function that accepts the piped input.
