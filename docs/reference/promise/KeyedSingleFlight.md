# KeyedSingleFlight

Ensures that only one asynchronous task is in flight for each key and shares its Promise with duplicate callers.

```typescript
const flight = new KeyedSingleFlight<string>();
```

## Usage

### `KeyedSingleFlight<K>()`

Use `KeyedSingleFlight` when operations should be deduplicated independently by a key. Tasks with different keys can run concurrently.

```typescript
import { KeyedSingleFlight } from 'es-toolkit';

const flight = new KeyedSingleFlight<string>();

const first = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const second = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const other = flight.run('user:2', async () => {
  const response = await fetch('/api/users/2');
  return response.json();
});

console.log(first === second); // true
console.log(first === other); // false
```

The Promise is shared for both successful and failed tasks. Once a task settles, its result is not cached and the next call for the same key starts a new task. Keys use `Map` equality, so object keys are compared by reference.

#### Parameters

- `K` (`unknown`): The type of keys used to identify tasks.

#### Methods

- `run` (`(key: K, task: () => Promise<T>) => Promise<T>`): Runs the task or returns the Promise of the task already in flight for the key.
