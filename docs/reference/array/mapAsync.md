# mapAsync

Transforms each element in an array using an async function and returns a new array.

```typescript
const transformed = await mapAsync(array, callback);
```

## Reference

### `mapAsync(array, callback, options?)`

Use `mapAsync` to perform async transformation operations for each element in an array. It's useful when you need to process each element asynchronously, such as API calls or database queries.

```typescript
import { mapAsync } from 'es-toolkit/array';

// Fetch detailed information for each user.
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userDetails = await mapAsync(users, async user => {
  return await fetchUserDetails(user.id);
});
// Returns: [{ id: 1, name: '...' }, { id: 2, name: '...' }, { id: 3, name: '...' }]

// Limit concurrency.
const numbers = [1, 2, 3, 4, 5];
const results = await mapAsync(numbers, async n => await slowOperation(n), { concurrency: 2 });
// Only 2 operations run concurrently at most.
```

The `concurrency` option allows you to limit concurrent executions to control server load or respect API rate limits. If not specified, all operations run concurrently.

```typescript
import { mapAsync } from 'es-toolkit/array';

// Transform a large number of images, limiting concurrent processing to consider server load.
const imageUrls = [...]; // Many image URLs
const processedImages = await mapAsync(
  imageUrls,
  async (url) => await processImage(url),
  { concurrency: 5 }
);
// Only 5 images are processed at a time at most.
```

#### Parameters

- `array` (`readonly T[]`): The array to transform.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R>`): An async function that transforms each element.
- `options` (`MapAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

#### Returns

(`Promise<R[]>`): A promise that resolves to a new array of transformed values.
