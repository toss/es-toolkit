# at

Creates a data-last at operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, at([0, -1]));
```

## Usage

`at` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { at, pipe } from 'es-toolkit/fp';

const result = pipe(['a', 'b', 'c'], at([0, -1]));
// ['a', 'c']
```

## API

### `at(...)`

Returns: A function that accepts the piped input.
