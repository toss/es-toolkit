# unary (Lodash Compatibility)

::: warning Use `ary` from `es-toolkit` instead

This `unary` function is implemented as a special case of the `ary` function. If you need more control, it's more efficient to use [ary](../../function/ary.md) from `es-toolkit` directly.

Use faster, more modern [ary](../../function/ary.md) from `es-toolkit` instead.

:::

Limits a function to accept at most one argument.

```typescript
const limitedFunc = unary(func);
```

## Usage

### `unary(func)`

Use `unary` when you want to limit a function to accept at most one argument. Any additional arguments passed will be ignored.

```typescript
import { unary } from 'es-toolkit/compat';

function greet(name, greeting, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// Convert to a function that accepts only the first argument
const greetOne = unary(greet);
greetOne('Alice', 'Hello', '!'); // Works the same as greet('Alice')

// Useful when used with array's map function
const numbers = ['1', '2', '3'];
numbers.map(parseInt); // [1, NaN, NaN] - unexpected result
numbers.map(unary(parseInt)); // [1, 2, 3] - correct result
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function to limit arguments for.

#### Returns

(`(...args: any[]) => any`): Returns a new function that accepts at most one argument.
