# wrap (Lodash Compatibility)

::: warning Use higher-order functions instead

This `wrap` function simply wraps a function. In most cases, it's clearer to use simpler higher-order functions or closures.

Use faster, more modern closures or direct function definitions instead.

:::

Creates a new function that wraps the given value or function.

```typescript
const wrappedFunc = wrap(value, wrapper);
```

## Usage

### `wrap(value, wrapper)`

Use `wrap` when you want to apply additional logic to a value or function. You can define new behavior through a wrapper function that receives the original value as its first argument.

```typescript
import { wrap } from 'es-toolkit/compat';

// Wrap a function to add logging functionality
const greet = (name: string) => `Hi, ${name}`;
const loggedGreet = wrap(greet, (originalFunc, name) => {
  const result = originalFunc(name);
  console.log(`[LOG] ${result}`);
  return result;
});

loggedGreet('Alice'); // Logs "[LOG] Hi, Alice" to console and returns "Hi, Alice"
```

You can also wrap non-function values. The value is passed as the first argument to the wrapper function.

```typescript
import { wrap } from 'es-toolkit/compat';

// Create a function that wraps a string in HTML tags
const htmlWrapper = wrap('Hello World', (text, tag) => `<${tag}>${text}</${tag}>`);
console.log(htmlWrapper('h1')); // "<h1>Hello World</h1>"

// Create a function that uses a number in calculations
const calculate = wrap(10, (baseValue, multiplier) => baseValue * multiplier);
console.log(calculate(5)); // 50
```

Here's a more complex function wrapping example.

```typescript
import { wrap } from 'es-toolkit/compat';

const add = (a: number, b: number) => a + b;

// Create a function with performance measurement
const timedAdd = wrap(add, (originalAdd, a, b) => {
  const start = Date.now();
  const result = originalAdd(a, b);
  const end = Date.now();
  console.log(`Execution time: ${end - start}ms`);
  return result;
});

timedAdd(3, 7); // Logs execution time to console and returns 10
```

#### Parameters

- `value` (`T`): The value or function to wrap.
- `wrapper` (`(value: T, ...args: U[]) => V`): The function that receives the original value as its first argument and applies additional logic.

#### Returns

(`(...args: U[]) => V`): Returns a new function with the wrapper function applied.
