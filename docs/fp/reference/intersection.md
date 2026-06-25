# intersection

Creates a data-last intersection operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, intersection([2, 4]));
```

## Usage

`intersection` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { intersection, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], intersection([2, 4]));
// [2]
```

## API

### `intersection(...)`

Returns: A function that accepts the piped input.
