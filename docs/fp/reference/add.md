# add (Functional Programming)

Creates a function that adds a number to its input. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(value, add(addend));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`add` returns a function that adds `addend` to its input. It is designed for composition: it can transform the value flowing through a [`pipe`](./pipe.md), or serve as the callback of a function such as [`map`](./map.md).

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

(`(value: number) => number`): A function that maps `value` to `value + addend`.
