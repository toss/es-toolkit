# initial

Creates a data-last initial operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, initial());
```

## Usage

`initial` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { initial, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], initial());
// [1, 2]
```

## API

### `initial(...)`

Returns: A function that accepts the piped input.
