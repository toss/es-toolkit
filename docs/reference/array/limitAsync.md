# limitAsync

Creates a new function that limits the maximum number of concurrent executions of an async function.

```typescript
const limitedFunc = limitAsync(asyncFunc, concurrency);
```

## Reference

### `limitAsync(callback, concurrency)`

Use `limitAsync` when you want to limit the number of concurrent executions of an async function that gets called multiple times. Only the specified number of executions run concurrently, and additional calls wait until running operations complete.

```typescript
import { limitAsync } from 'es-toolkit/array';

// Limit to at most 3 concurrent requests.
const limitedFetch = limitAsync(async url => {
  return await fetch(url);
}, 3);

const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
await Promise.all(urls.map(url => limitedFetch(url)));
// The first 3 execute first, then the rest execute as they complete.
```

It's useful for controlling load on resource-intensive operations like external API calls or database queries. It's especially effective when working with rate-limited APIs or managing server load.

```typescript
import { limitAsync } from 'es-toolkit/array';

// Process heavy computations at most 2 at a time.
const processItem = async item => {
  return await heavyComputation(item);
};

const limitedProcess = limitAsync(processItem, 2);
const items = [1, 2, 3, 4, 5];
await Promise.all(items.map(item => limitedProcess(item)));
// Only 2 items are processed concurrently at most.
```

#### Parameters

- `callback` (`F extends (...args: any[]) => Promise<any>`): The async function to limit concurrent executions for.
- `concurrency` (`number`): Maximum number of concurrent operations.

#### Returns

(`F`): A new function with concurrency limiting applied. It has the same interface as the original function.
