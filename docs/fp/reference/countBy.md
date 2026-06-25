# countBy

Creates a data-last countBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  countBy(value => value.length)
);
```

## Usage

`countBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  ['a', 'bb', 'c'],
  countBy(value => value.length)
);
// { 1: 2, 2: 1 }
```

## API

### `countBy(...)`

Returns: A function that accepts the piped input.
