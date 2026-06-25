# groupBy

Creates a data-last groupBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  groupBy(value => value.length)
);
```

## Usage

`groupBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  ['a', 'bb', 'c'],
  groupBy(value => value.length)
);
// { 1: ['a', 'c'], 2: ['bb'] }
```

## API

### `groupBy(...)`

Returns: A function that accepts the piped input.
