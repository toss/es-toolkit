# memoize

Creates a memoized version of the provided function. The memoized function caches
results based on the argument it receives, so if the same argument is passed again,
it returns the cached result instead of recomputing it.

This works with functions that take zero or one argument. If your function takes
multiple arguments, you should refactor it to accept a single object or array
that combines those arguments.

If the argument is not primitive (e.g., arrays or objects), provide a
`getCacheKey` function to generate a unique cache key for proper caching.

## Signature

```typescript
function memoize<F extends (...args: any) => any>(
  fn: F,
  options: {
    cache?: MemoizeCache<any, ReturnType<F>>;
    getCacheKey?: (args: Parameters<F>[0]) => unknown;
  } = {}
): F & { cache: MemoizeCache<any, ReturnType<F>> };

interface MemoizeCache<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean | void;
  clear(): void;
  size: number;
}
```

### Parameters

- `fn` (`F`) - The function to be memoized, which takes zero or just one argument.
- `options`: Optional configuration for the memoization.
  - `options.cache` (`MemoizeCache<any, ReturnType<F>>`): The cache object used to store results. Defaults to a new `Map`.
  - `options.getCacheKey` (`(args: A) => unknown`): An optional function to generate a unique cache key for each argument.

### Returns

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): The memoized function with an additional `cache` property that exposes the internal cache.

## Examples

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

// Example using the default cache
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15
console.log(memoizedAdd(5)); // 15 (cached result)
console.log(memoizedAdd.cache.size); // 1

// Example using a custom resolver
const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);
const memoizedSum = memoize(sum, { getCacheKey: (arr: number[]) => arr.join(',') });
console.log(memoizedSum([1, 2])); // 3
console.log(memoizedSum([1, 2])); // 3 (cached result)
console.log(memoizedSum.cache.size); // 1

// Example using a custom cache implementation
class CustomCache<K, T> implements MemoizeCache<K, T> {
  private cache = new Map<K, T>();
  set(key: K, value: T): void {
    this.cache.set(key, value);
  }
  get(key: K): T | undefined {
    return this.cache.get(key);
  }
  has(key: K): boolean {
    return this.cache.has(key);
  }
  delete(key: K): boolean {
    return this.cache.delete(key);
  }
  clear(): void {
    this.cache.clear();
  }
  get size(): number {
    return this.cache.size;
  }
}
const customCache = new CustomCache<string, number>();
const memoizedSumWithCustomCache = memoize(sum, { cache: customCache });
console.log(memoizedSumWithCustomCache([1, 2])); // 3
console.log(memoizedSumWithCustomCache([1, 2])); // 3 (cached result)
console.log(memoizedAddWithCustomCache.cache.size); // 1
```
