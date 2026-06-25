# flatten

Creates a data-last flatten operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flatten(2));
```

## Usage

`flatten` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { flatten, pipe } from 'es-toolkit/fp';

const result = pipe([1, [2, [3]]], flatten(2));
// [1, 2, 3]
```

## API

### `flatten(...)`

Returns: A function that accepts the piped input.
