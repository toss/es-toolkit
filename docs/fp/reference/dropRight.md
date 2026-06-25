# dropRight

Creates a data-last dropRight operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, dropRight(2));
```

## Usage

`dropRight` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { dropRight, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], dropRight(2));
// [1, 2]
```

## API

### `dropRight(...)`

Returns: A function that accepts the piped input.
