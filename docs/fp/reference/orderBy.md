# orderBy

Creates a data-last orderBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, orderBy(['age'], ['asc']));
```

## Usage

`orderBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { name: 'a', age: 2 },
    { name: 'b', age: 1 },
  ],
  orderBy(['age'], ['asc'])
);
// [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

## API

### `orderBy(...)`

Returns: A function that accepts the piped input.
