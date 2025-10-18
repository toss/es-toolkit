# withTimeout

Sets a time limit on an asynchronous function, throwing a `TimeoutError` if it doesn't complete within the specified time.

```typescript
await withTimeout(run, ms);
```

## Reference

### `withTimeout(run, ms)`

Use `withTimeout` when you want to set a timeout on an asynchronous task. If the Promise doesn't complete within the specified time, it's rejected with a `TimeoutError`, preventing indefinite waiting.

```typescript
import { withTimeout } from 'es-toolkit/promise';

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

try {
  // Must complete within 1 second
  const data = await withTimeout(fetchData, 1000);
  console.log('Received data:', data);
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('Request timed out');
  }
}
```

You can also use it when you want to set a time limit on database queries.

```typescript
async function queryDatabase(query: string) {
  // Database query logic
  return await db.execute(query);
}

try {
  const result = await withTimeout(
    () => queryDatabase('SELECT * FROM users'),
    5000 // 5 second limit
  );
  console.log('Query result:', result);
} catch (error) {
  console.log('Query took too long and was cancelled');
}
```

You can also use it when you want to receive only the fastest response among multiple API calls.

```typescript
async function getFastestResponse() {
  const apis = [() => fetch('/api/server1'), () => fetch('/api/server2'), () => fetch('/api/server3')];

  try {
    // Set a 2 second limit on each API and receive only the fastest response
    const promises = apis.map(api => withTimeout(api, 2000));
    const result = await Promise.race(promises);
    return result.json();
  } catch (error) {
    console.log('All APIs timed out');
  }
}
```

#### Parameters

- `run` (`() => Promise<T>`): The asynchronous function to execute.
- `ms` (`number`): The amount of time in milliseconds until the timeout occurs.

#### Returns

(`Promise<T>`): Returns the result of the given asynchronous function, or a Promise that's rejected with a TimeoutError if it times out.

#### Errors

Throws `TimeoutError` if not completed within the specified time.
