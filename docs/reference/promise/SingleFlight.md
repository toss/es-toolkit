# SingleFlight

Ensures that only one asynchronous task is in flight at a time and shares its Promise with duplicate callers.

```typescript
const flight = new SingleFlight();
```

## Usage

### `SingleFlight()`

Use `SingleFlight` when several callers may start the same operation concurrently and only the first operation should run.

```typescript
import { SingleFlight } from 'es-toolkit';

const flight = new SingleFlight();

const first = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

const second = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

console.log(first === second); // true
```

The Promise is shared for both successful and failed tasks. Once the task settles, its result is not cached and the next call starts a new task.

#### Methods

- `run` (`(task: () => Promise<T>) => Promise<T>`): Runs the task or returns the Promise of the task that is already in flight.
