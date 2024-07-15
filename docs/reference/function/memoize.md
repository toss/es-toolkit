# memoize

Memoizes a given function by caching its result based on the arguments provided.

## Signature

```typescript
function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  resolver?: (...args: Parameters<T>) => K,
  cache?: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> };

function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  cache?: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> };

interface Cache<K, T> {
  set: (key: K, value: T) => void;
  get: (key: K) => T | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean | void;
  clear: () => void;
  size: number;
}
```

# Parameters

• `fn (T)`: The function to memoize.
• `resolver ((...args: Parameters<T>) => K, optional)`: A function to resolve the cache key. If not provided, the first argument of the memoized function will be used as the key.
• `cache (Cache<K, ReturnType<T>>, optional)`: An optional cache object to store results. Defaults to a new Map instance.

# Returns

`(T & { cache: Cache<K, ReturnType> })`: The memoized function with a cache property.

# Examples

```typescript
import { memoize } from './memoize';

// Example using the default cache
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3, retrieved from cache
console.log(memoizedAdd.cache.size); // 1

// Example using a custom resolver
const resolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithResolver = memoize(add, resolver);
console.log(memoizedAddWithResolver(1, 2)); // 3
console.log(memoizedAddWithResolver(1, 2)); // 3, retrieved from cache
console.log(memoizedAddWithResolver.cache.size); // 1

// Example using a custom cache implementation
class CustomCache<K, T> implements Cache<K, T> {
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
const memoizedAddWithCustomCache = memoize(add, customCache);
console.log(memoizedAddWithCustomCache(1, 2)); // 3
console.log(memoizedAddWithCustomCache(1, 2)); // 3, retrieved from cache
console.log(memoizedAddWithCustomCache.cache.size); // 1

// Example using both a custom resolver and custom cache
const customResolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithBoth = memoize(add, customResolver, customCache);
console.log(memoizedAddWithBoth(1, 2)); // 3
console.log(memoizedAddWithBoth(1, 2)); // 3, retrieved from cache
console.log(memoizedAddWithBoth.cache.size); // 1

// Example using `this` binding
const obj = {
  b: 2,
  memoizedAdd: memoize(
    function (a: number) {
      return a + this.b;
    },
    function (a: number) {
      return `${a}-${this.b}`;
    }
  ),
};
console.log(obj.memoizedAdd(1)); // 3
obj.b = 3;
console.log(obj.memoizedAdd(1)); // 4
```
