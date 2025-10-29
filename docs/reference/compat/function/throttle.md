# throttle (Lodash Compatibility)

::: warning Use `throttle` from `es-toolkit` instead

This `throttle` function uses the debounce function internally for Lodash compatibility, making it somewhat complex. It also has more complex default and option handling.

Use faster, more modern [throttle](../../function/throttle.md) from `es-toolkit` instead.

:::

Limits function calls to execute at most once per specified time interval.

```typescript
const throttledFunc = throttle(func, wait, options);
```

## Reference

### `throttle(func, wait, options)`

Use `throttle` when you want to limit function calls to execute at most once per specified time interval. It's useful for limiting the frequency of event handlers or API calls.

```typescript
import { throttle } from 'es-toolkit/compat';

// Basic usage - execute at most once per second
const throttledLog = throttle(() => {
  console.log('Event occurred!');
}, 1000);

// Example with options
const throttledScroll = throttle(handleScroll, 100, {
  leading: true, // Execute immediately on first call
  trailing: false, // Don't execute on last call
});

window.addEventListener('scroll', throttledScroll);
```

It's essential for performance when handling rapidly occurring events like scroll or resize events.

#### Parameters

- `func` (`Function`): The function to throttle.
- `wait` (`number`, optional): The wait time in milliseconds. Default is `0`.
- `options` (`ThrottleSettings`, optional): Throttling options.
  - `leading` (`boolean`): Whether to execute on the first call. Default is `true`.
  - `trailing` (`boolean`): Whether to execute after the last call. Default is `true`.

#### Returns

(`DebouncedFunc`): Returns the throttled function. You can cancel pending executions with the `cancel()` method.
