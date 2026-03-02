# noop

An empty function that does nothing.

```typescript
noop();
```

::: info [`asyncNoop`](./asyncNoop.md) function

If you need a function that asynchronously does nothing, use the `asyncNoop` function which immediately returns a `Promise<void>`.

:::

## Usage

### `noop()`

Use `noop` when you need a function that performs no operation.

This is useful as a default value where a function is required or when you want to disable a callback function. It's frequently used as a placeholder or during initialization.

```typescript
import { noop } from 'es-toolkit/function';

// Using as a default value for optional callbacks
interface EventHandlers {
  onSuccess?: () => void;
  onError?: () => void;
}

function processData({ onSuccess = noop, onError = noop }: EventHandlers = {}) {
  try {
    // Data processing logic
    console.log('Data processing complete');
    onSuccess(); // Safe to call
  } catch (error) {
    onError(); // Safe to call
  }
}

// Safe to use without undefined checks
processData({
  onSuccess: () => console.log('Success!'),
  // onError is handled as noop by default
});
```

It can also be used with array methods.

```typescript
import { noop } from 'es-toolkit/function';

// Conditionally execute functions
const operations = [
  () => console.log('First task'),
  shouldRunSecond ? () => console.log('Second task') : noop,
  () => console.log('Third task'),
];

operations.forEach(op => op()); // Execute all operations safely
```

#### Returns

(`void`): Returns nothing.
