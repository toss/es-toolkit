# Mutex

Ensures that multiple asynchronous tasks do not execute simultaneously.

```typescript
const mutex = new Mutex();
```

## Reference

### `Mutex()`

Use `Mutex` when you want to prevent multiple asynchronous tasks from running concurrently. It's useful in situations where you need to control concurrency, such as database connections, file system access, or API call rate limiting.

```typescript
import { Mutex } from 'es-toolkit';

const mutex = new Mutex();

// API call rate limiting example
async function callAPI() {
  await mutex.acquire();
  try {
    // Prevents multiple API calls from happening simultaneously
    const response = await fetch('/api/data');
    return response.json();
  } finally {
    mutex.release();
  }
}

// File system access example
async function writeToFile(data: string) {
  await mutex.acquire();
  try {
    // Prevents concurrent writes to the same file
    await fs.writeFile('data.txt', data);
    console.log('File write completed');
  } finally {
    mutex.release();
  }
}

// Even if multiple tasks are called simultaneously, they execute sequentially
callAPI();
callAPI(); // Waits until the first task completes
writeToFile(); // Waits until all previous tasks complete
```

#### Properties

- `isLocked` (`boolean`): Whether the mutex is currently in use. If `true`, it means there's already an asynchronous task running.

#### Methods

- `acquire` (`() => Promise<void>`): Acquires permission to execute an asynchronous task, or waits until permission is granted.
- `release` (`() => void`): Allows the next waiting task to execute.
