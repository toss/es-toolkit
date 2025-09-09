# Semaphore

A counting semaphore for async functions that manages available permits.
Semaphores are mainly used to limit the number of concurrent async tasks.

- Each `acquire` operation takes a permit or waits until one is available.
- Each `release` operation adds a permit, potentially allowing a waiting task to proceed.

The semaphore ensures fairness by maintaining a FIFO (First In, First Out) order for acquirers.

## Signature

```typescript
class Semaphore {
  public capacity: number;
  public available: number;

  constructor(capacity: number);

  acquire(): Promise<void>;
  release(): void;
}
```

## Properties

- `capacity` (`number`): The maximum number of concurrent operations allowed.
- `available` (`number`): The number of available permits.

## Methods

- `acquire` (`() => Promise<void>`): Acquires a semaphore, blocking if necessary until one is available.
- `release` (`() => void`): Releases a semaphore, allowing one more operation to proceed.

## Examples

```typescript
const sema = new Semaphore(2);

async function task() {
  await sema.acquire();
  try {
    // This code can only be executed by two tasks at the same time
  } finally {
    sema.release();
  }
}

task();
task();
task(); // This task will wait until one of the previous tasks releases the semaphore.
```
