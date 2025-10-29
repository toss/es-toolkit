# memoize (Lodash Compatibility)

::: warning Use `es-toolkit`'s `memoize`
This `memoize` function operates slowly due to `null` checks in the `resolver` function, complex type handling for the `MapCache` interface, and additional overhead for Lodash compatibility.

Instead, use the faster and more modern `es-toolkit`'s [memoize](../../function/memoize.md).
:::

Caches function results to improve performance when called with the same arguments.

```typescript
const memoizedFunc = memoize(func, resolver);
```

## Reference

### `memoize(func, resolver)`

Use `memoize` when you want to memoize function results to reuse previous results when called with the same arguments. It's useful for expensive calculations or API calls.

```typescript
import { memoize } from 'es-toolkit/compat';

// Basic usage
function expensiveCalculation(n) {
  console.log('Calculating...', n);
  return n * n;
}

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(5)); // 'Calculating... 5', 25
console.log(memoizedCalc(5)); // 25 (cached result, no calculation)
console.log(memoizedCalc(10)); // 'Calculating... 10', 100

// Using custom resolver
function fetchUserData(userId, includeProfile) {
  console.log('Fetching user data...', userId, includeProfile);
  return { id: userId, profile: includeProfile ? 'Profile data' : null };
}

// Generate cache key considering all arguments
const memoizedFetch = memoize(fetchUserData, (userId, includeProfile) => {
  return `${userId}_${includeProfile}`;
});

memoizedFetch(1, true); // 'Fetching user data... 1 true'
memoizedFetch(1, true); // Uses cached result
memoizedFetch(1, false); // 'Fetching user data... 1 false' (different cache key)

// Accessing and modifying cache
console.log(memoizedCalc.cache.get(5)); // 25
memoizedCalc.cache.set(7, 49); // Manually set cache
console.log(memoizedCalc(7)); // 49 (uses cached value without calculation)
```

In most cases, it uses a basic hash map, but you can also use custom cache implementations as needed.

#### Parameters

- `func` (`Function`): The function to memoize.
- `resolver` (`Function`, optional): The function to determine the cache key. If not provided, uses the first argument as the key.

#### Returns

(`Function & { cache: MapCache }`): Returns the memoized function. The returned function has a `cache` property for direct cache access.
