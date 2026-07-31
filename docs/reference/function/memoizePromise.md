# memoizePromise

Memoizes a Promise-returning function. Concurrent calls with the same argument share the same in-flight Promise. After the Promise resolves, the cache stores the resolved value instead of the settled Promise.

```typescript
const memoizedFunc = memoizePromise(func, options);
```

## Usage

### `memoizePromise(func, options?)`

Use `memoizePromise` when you want to avoid duplicate asynchronous work for the same argument, such as repeated API requests. Calls made while the first request is pending share the same Promise. Once it resolves, later calls use the cached value.

```typescript
import { memoizePromise } from 'es-toolkit/function';

const fetchUser = async (id: number) => {
  const response = await fetch(`/users/${id}`);
  return response.json();
};

const memoizedFetchUser = memoizePromise(fetchUser);

const first = memoizedFetchUser(1);
const second = memoizedFetchUser(1);

console.log(first === second); // true (while the request is in flight)
console.log(await first); // The request result
console.log(await memoizedFetchUser(1)); // The cached result
console.log(memoizedFetchUser.cache.get(1)); // The resolved value, not a Promise
```

Rejected Promises are not cached. If a call fails, the next call with the same key runs the function again.

```typescript
const memoizedFetch = memoizePromise(async (id: number) => {
  return fetchUser(id);
});

try {
  await memoizedFetch(1);
} catch {
  // The failed call is removed from the cache.
}

await memoizedFetch(1); // Tries again
```

You can provide a custom function to generate cache keys for non-primitive arguments.

```typescript
const memoizedFetch = memoizePromise(async (user: { id: number; name: string }) => fetchUser(user.id), {
  getCacheKey: user => user.id,
});

await memoizedFetch({ id: 1, name: 'Ada' });
await memoizedFetch({ id: 1, name: 'Grace' }); // Uses the cached result
```

#### Parameters

- `func` (`F`): The Promise-returning function to memoize. It must accept zero or one argument.
- `options` (`object`, optional): Options for configuring memoization.
  - `cache` (`MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>>`, optional): The cache used to store in-flight Promises and resolved values. Defaults to a new `Map`.
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, optional): A function that generates a cache key from the argument. By default, the argument itself is used as the key.

#### Returns

(`F & { cache: MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>> }`): The memoized function with a `cache` property containing in-flight Promises or resolved values.
