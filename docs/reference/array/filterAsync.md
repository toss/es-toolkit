# filterAsync

Filters an array using an async predicate function and returns a new array containing only the elements that satisfy the condition.

```typescript
const filtered = await filterAsync(array, predicate);
```

## Reference

### `filterAsync(array, predicate, options?)`

Use `filterAsync` to filter an array with async operations like API calls or database queries. Unlike regular `filter`, it supports async predicate functions and allows you to limit concurrency with the `concurrency` option.

```typescript
import { filterAsync } from 'es-toolkit/array';

// Filter for active users by checking their status via API.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const activeUsers = await filterAsync(users, async user => {
  return await checkUserStatus(user.id);
});
// Returns: Array containing only active users

// Limit concurrency to reduce server load.
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = await filterAsync(numbers, async n => await isEvenAsync(n), { concurrency: 2 });
// Only 2 operations run concurrently at most.
```

The `concurrency` option helps limit external API calls or manage system resources efficiently. If not specified, all operations run concurrently.

```typescript
import { filterAsync } from 'es-toolkit/array';

// Execute at most 3 API calls concurrently.
const items = await filterAsync(largeArray, async item => await validateItem(item), { concurrency: 3 });
```

#### Parameters

- `array` (`readonly T[]`): The array to filter.
- `predicate` (`(item: T, index: number, array: readonly T[]) => Promise<boolean>`): An async function that tests each element. If it returns a truthy value, the element is included in the result.
- `options` (`FilterAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

#### Returns

(`Promise<T[]>`): A promise that resolves to a new array containing only the elements for which the predicate function returned a truthy value.
