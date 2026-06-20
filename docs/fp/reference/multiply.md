# multiply

Creates a data-last operator that multiplies its input by a number.

```typescript
const result = pipe(value, multiply(multiplicand));
```

## Usage

`multiply` returns a function that multiplies its input by `multiplicand`. It is designed for composition: it can transform the value flowing through a [`pipe`](/fp/reference/pipe), or serve as the callback of an operator such as [`map`](/fp/reference/map).

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

(`(value: number) => number`): A data-last operator that maps `value` to `value * multiplicand`.
