# forEachAsync

Executes an async function for each element in an array.

```typescript
await forEachAsync(array, callback);
```

## Reference

### `forEachAsync(array, callback, options?)`

Use `forEachAsync` to perform async operations with side effects for each element in an array. Unlike regular `forEach`, it returns a promise that resolves when all async operations complete.

```typescript
import { forEachAsync } from 'es-toolkit/array';

// Update all user information.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
await forEachAsync(users, async (user) => {
  await updateUser(user.id);
});
// All user updates completed.

// Limit concurrency.
const items = [1, 2, 3, 4, 5];
await forEachAsync(
  items,
  async (item) => await processItem(item),
  { concurrency: 2 }
);
// Only 2 items are processed concurrently at most.
```

The `concurrency` option allows you to limit concurrent executions to control load on servers or databases. It's useful for operations that don't return values, like logging, file uploads, or database updates.

```typescript
import { forEachAsync } from 'es-toolkit/array';

// Upload files sequentially.
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
await forEachAsync(
  files,
  async (file) => await uploadFile(file),
  { concurrency: 1 }
);
// Only one file is uploaded at a time.
```

#### Parameters

- `array` (`readonly T[]`): The array to iterate over.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<void>`): An async function to execute for each element.
- `options` (`ForEachAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

### Returns

(`Promise<void>`): A promise that resolves when all operations complete.
