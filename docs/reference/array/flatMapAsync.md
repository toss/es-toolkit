# flatMapAsync

Transforms each element in an array using an async function and flattens the result by one level to return a new array.

```typescript
const result = await flatMapAsync(array, callback);
```

## Reference

### `flatMapAsync(array, callback, options?)`

Use `flatMapAsync` when performing async transformations where each element returns multiple values. It's equivalent to calling `mapAsync` followed by `flat()`, but more efficient.

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// Fetch posts for each user and combine into a single array.
const users = [{ id: 1 }, { id: 2 }];
const allPosts = await flatMapAsync(users, async user => {
  return await fetchUserPosts(user.id);
});
// Returns: [post1, post2, post3, ...] (all users' posts in a single array)

// Limit concurrency.
const numbers = [1, 2, 3];
const results = await flatMapAsync(numbers, async n => await fetchRelatedItems(n), { concurrency: 2 });
// Only 2 operations run concurrently at most.
```

Each callback function must return an array, and all returned arrays are merged into a single array. The `concurrency` option allows you to limit concurrent executions to manage server load.

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// Fetch product lists for each category and combine into a single array.
const categories = ['electronics', 'books', 'clothing'];
const products = await flatMapAsync(categories, async category => await fetchProducts(category), { concurrency: 2 });
// Returns: A single array containing products from all categories
```

#### Parameters

- `array` (`readonly T[]`): The array to transform.
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R[]>`): An async function that transforms each element into an array.
- `options` (`FlatMapAsyncOptions`, optional): Options to control concurrency.
  - `concurrency` (`number`, optional): Maximum number of concurrent operations. If not specified, all operations run concurrently.

### Returns

(`Promise<R[]>`): A promise that resolves to an array of transformed values flattened by one level.
