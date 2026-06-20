# add

Creates a data-last operator that adds a number to its input.

```typescript
const result = pipe(value, add(addend));
```

## Usage

`add` returns a function that adds `addend` to its input. It is designed for composition: it can transform the value flowing through a [`pipe`](/fp/reference/pipe), or serve as the callback of an operator such as [`map`](/fp/reference/map).

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// Transform the piped value.
pipe(3, add(2)); // => 5

// Use as a map callback.
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### Parameters

- `addend` (`number`): The number to add to the input.

#### Returns

(`(value: number) => number`): A data-last operator that maps `value` to `value + addend`.
