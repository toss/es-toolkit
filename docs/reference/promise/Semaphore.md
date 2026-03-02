# Semaphore

Limits the number of asynchronous tasks that can execute simultaneously.

```typescript
const semaphore = new Semaphore(capacity);
```

## Usage

### `Semaphore(capacity)`

Use `Semaphore` when you want to limit the number of asynchronous tasks that can execute concurrently. It's particularly useful in situations where you need to control resource usage, such as database connection pools, API call rate limiting, or file download limits.

```typescript
import { Semaphore } from 'es-toolkit';

const semaphore = new Semaphore(3);

// API call rate limiting example (maximum 3 concurrent executions)
async function callAPI(id: number) {
  await semaphore.acquire();
  try {
    console.log(`Starting API call: ${id}`);
    const response = await fetch(`/api/data/${id}`);
    return response.json();
  } finally {
    semaphore.release();
    console.log(`Completed API call: ${id}`);
  }
}

// File download limiting example
async function downloadFile(url: string) {
  await semaphore.acquire();
  try {
    console.log(`Starting download: ${url}`);
    // File download logic
    await fetch(url);
  } finally {
    semaphore.release();
    console.log(`Completed download: ${url}`);
  }
}

// Even if 5 tasks are called simultaneously, only 3 execute concurrently
callAPI(1);
callAPI(2);
callAPI(3);
callAPI(4); // Waits until one of the previous tasks completes
callAPI(5); // Waits until one of the previous tasks completes
```

#### Parameters

- `capacity` (`number`): The maximum number of tasks that can execute concurrently. Must be an integer greater than 1.

#### Properties

- `capacity` (`number`): The maximum number of tasks that can execute concurrently.
- `available` (`number`): The number of currently available permits. If `0`, all permits are in use.

#### Methods

- `acquire` (`() => Promise<void>`): Acquires permission to execute an asynchronous task, or waits until permission is granted.
- `release` (`() => void`): Returns permission so that the next waiting task can execute.
