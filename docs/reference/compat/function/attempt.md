# attempt (Lodash Compatibility)

::: warning Use `es-toolkit`'s [`attempt`](../../util/attempt.md) function or try-catch blocks instead

This `attempt` function can be confusing because it returns both errors and return values without distinction.

Instead, use the more direct and clear [`attempt`](../../util/attempt.md) function or try-catch blocks.

:::

A function that executes a function and returns an error object if an error occurs.

```typescript
const result = attempt(func, ...args);
```

## Usage

### `attempt(func, ...args)`

Use `attempt` when you want to safely execute a function. It's useful when executing a function that may throw errors, preventing the program from crashing and handling errors as return values.

```typescript
import { attempt } from 'es-toolkit/compat';

// Basic usage - successful case
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // 5

// Error case
const errorResult = attempt(() => {
  throw new Error('Something went wrong');
});
console.log(errorResult); // Error: Something went wrong
```

Here's the difference compared to using try-catch blocks.

```typescript
// Using attempt
import { attempt } from 'es-toolkit/compat';

const result = attempt(riskyFunction, arg1, arg2);
if (result instanceof Error) {
  console.log('Error occurred:', result.message);
} else {
  console.log('Result:', result);
}

// Using try-catch (more direct)
try {
  const result = riskyFunction(arg1, arg2);
  console.log('Result:', result);
} catch (error) {
  console.log('Error occurred:', error.message);
}
```

#### Parameters

- `func` (`Function`): The function to execute.
- `args` (`...any[]`): The arguments to pass to the function.

#### Returns

(`ReturnType<F> | Error`): Returns the return value if the function succeeds, or an Error object if an error occurs.
