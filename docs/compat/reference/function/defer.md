# defer (Lodash Compatibility)

::: warning Use `setTimeout` instead

This `defer` function is a simple wrapper that internally calls `setTimeout(func, 1, ...args)`.

Use the more direct and modern `setTimeout` instead.

:::

Defers the execution of a function to the next event loop.

```typescript
const timerId = defer(func, ...args);
```

## Usage

### `defer(func, ...args)`

Use `defer` when you want to execute a function after the current call stack has ended. You can defer the function's execution to the next event loop while passing additional arguments to the function.

```typescript
import { defer } from 'es-toolkit/compat';

// Defer console output
defer(console.log, 'deferred message');
// Outputs 'deferred message' after the current call stack ends

// Defer execution with function and arguments
const greet = (name: string, greeting: string) => {
  console.log(`${greeting}, ${name}!`);
};

defer(greet, 'John', 'Hello');
// Outputs 'Hello, John!' after the current call stack ends
```

Internally, it uses `setTimeout(func, 1, ...args)` to execute the function after 1 millisecond.

```typescript
import { defer } from 'es-toolkit/compat';

// These two codes work identically
defer(console.log, 'message');
setTimeout(console.log, 1, 'message');
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function to defer execution.
- `...args` (`any[]`): The arguments to pass to the function.

#### Returns

(`number`): Returns the timer ID returned from `setTimeout`. You can cancel execution with `clearTimeout`.
