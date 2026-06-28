# multiply (Functional Programming)

Creates a function that multiplies its input by a number. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(value, multiply(multiplicand));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`multiply` returns a function that multiplies its input by `multiplicand`. It is designed for composition: it can transform the value flowing through a [`pipe`](./pipe.md), or serve as the callback of a function such as [`map`](./map.md).

```typescript
import { map, multiply, pipe } from 'es-toolkit/fp';

// Transform the piped value.
pipe(3, multiply(2)); // => 6

// Use as a map callback.
pipe([1, 2, 3], map(multiply(3))); // => [3, 6, 9]
```

#### Parameters

- `multiplicand` (`number`): The number to multiply the input by.

#### Returns

(`(value: number) => number`): A function that maps `value` to `value * multiplicand`.
