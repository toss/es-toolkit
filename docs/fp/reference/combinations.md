# combinations

Creates a data-last combinations operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, combinations(2));
```

## Usage

`combinations` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], combinations(2));
// [[1, 2], [1, 3], [2, 3]]
```

## API

### `combinations(...)`

Returns: A function that accepts the piped input.
