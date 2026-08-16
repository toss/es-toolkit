# flip (Lodash Compatibility)

::: warning Use direct argument reversal
This `flip` function simply reverses the order of function arguments. In most cases, it can be replaced with simpler approaches.

Instead, use the faster and more modern `(...args) => func(...args.reverse())` or direct argument passing.
:::

Creates a function that reverses the order of arguments for the given function.

```typescript
const flippedFunc = flip(func);
```

## Usage

### `flip(func)`

Use `flip` when you want to create a new function by reversing the order of arguments. It changes the function to receive arguments from the last one first instead of the original order from the first one.

```typescript
import { flip } from 'es-toolkit/compat';

function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const flipped = flip(greet);
flipped('John', 'Hello'); // 'Hello, John!'

// The original function takes (greeting, name) order
// But the flipped function takes (name, greeting) order
```

For functions that accept multiple arguments, all arguments are reversed.

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('1', '2', '3', '4'); // ['4', '3', '2', '1']
```

#### Parameters

- `func` (`F`): The function to reverse arguments for.

#### Returns

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): Returns a new function with reversed arguments.
