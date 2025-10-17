# throttle

Limits a function to be executed at most once per specified time interval.

```typescript
const throttledFunc = throttle(func, throttleMs, options);
```

## Reference

### `throttle(func, throttleMs, options?)`

Use `throttle` when you want to limit function calls to a specific time interval. This is useful for optimizing performance when handling frequently occurring events like scrolling, resizing, or mouse movement.

Unlike `debounce`, throttle ensures the function is executed at least once during the specified time period.

```typescript
import { throttle } from 'es-toolkit/function';

// Basic usage (execute at most once per second)
const throttledLog = throttle(() => {
  console.log('Function executed!');
}, 1000);

// First call: executes immediately
throttledLog(); // Logs 'Function executed!'

// Additional calls within 1 second: ignored
throttledLog();
throttledLog();

// After 1 second, the last call executes as trailing

// Scroll event optimization
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100); // At most once per 100ms

window.addEventListener('scroll', handleScroll);

// API call optimization
const searchThrottled = throttle(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`);
  console.log('Search results:', await results.json());
}, 300);

// Even if called on every input, actual search executes only every 300ms
searchThrottled('hello');
searchThrottled('hello w');
searchThrottled('hello world');
```

You can adjust the leading and trailing options.

```typescript
import { throttle } from 'es-toolkit/function';

// Enable only leading (execute only at start)
const leadingOnly = throttle(
  () => console.log('Leading only'),
  1000,
  { edges: ['leading'] }
);

// Enable only trailing (execute only at end)
const trailingOnly = throttle(
  () => console.log('Trailing only'),
  1000,
  { edges: ['trailing'] }
);

leadingOnly(); // Executes immediately
leadingOnly(); // Ignored
leadingOnly(); // Ignored

trailingOnly(); // Does not execute immediately
trailingOnly(); // Ignored
trailingOnly(); // Executes after 1 second
```

You can also control it manually.

```typescript
import { throttle } from 'es-toolkit/function';

const throttledFunc = throttle(
  () => console.log('executed'),
  1000
);

throttledFunc(); // Executes immediately
throttledFunc(); // Waiting

// Immediately process pending execution
throttledFunc.flush();

// Cancel pending execution
throttledFunc.cancel();
```

#### Parameters

- `func` (`F`): The function to throttle.
- `throttleMs` (`number`): The time interval (in milliseconds) to throttle execution.
- `options` (`ThrottleOptions`, optional): Additional options.
  - `signal` (`AbortSignal`, optional): A signal that can cancel function execution.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): Determines when to execute the function. Defaults to `['leading', 'trailing']`.

#### Returns

(`ThrottledFunction<F>`): Returns a new throttled function with `cancel` and `flush` methods.
