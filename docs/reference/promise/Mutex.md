# Mutex

A mutex (mutual exclusion lock) for async functions.
It allows only one async task to access a critical section at a time.

## Signature

```typescript
class Mutex {
  isLocked: boolean;

  acquire(): Promise<void>;
  release(): void;
}
```

## Properties

- `isLocked` (`boolean`): Checks if the mutex is currently locked.

## Methods

- `acquire` (`() => Promise<void>`): Acquires the mutex, blocking if necessary until it is available.
- `release` (`() => void`): Releases the mutex, allowing another waiting task to proceed.

## Examples

```typescript
const mutex = new Mutex();

async function criticalSection() {
  await mutex.acquire();
  try {
    // This code section cannot be executed simultaneously
  } finally {
    mutex.release();
  }
}

criticalSection();
criticalSection(); // This call will wait until the first call releases the mutex.
```
