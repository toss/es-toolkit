# memoize

Memoizes a given function by caching its result based on the arguments provided.

## Signature

```typescript
function memoize<F extends (...args: any[]) => any, K = Parameters<F>[0]>(
  fn: F,
  options: MemoizeOptions<K, ReturnType<F>> = {}
): F & { cache: Cache<K, ReturnType<F>> };

interface MemoizeOptions<K, V> {
  cache?: Cache<K, V>;
  resolver?: (...args: any[]) => K;
}

interface Cache<K, V> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean | void;
  clear: () => void;
  size: number;
}
```

### Parameters

- `fn (T)`: The function to be memoized.
- `options` (MemoizeOptions<K, ReturnType<F>>, optional): Includes a function to generate the cache key and an object to store the results.
  - `resolver ((...args: any[]) => K, optional)`: A function to generate the cache key. If not provided, the first argument of the memoized function is used as the key.
  - `cache (Cache<K, ReturnType<F>>, optional)`: The cache object to store the results. The default is a new Map instance.

### Returns

`(F & { cache: Cache<K, ReturnType<F>> })`: The memoized function with a cache property.

## Examples

```typescript
import { memoize } from 'es-toolkit/function';

// Example using the default cache
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3, returns cached value
console.log(memoizedAdd.cache.size); // 1

// Example using a custom resolver
const resolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithResolver = memoize(add, { resolver });
console.log(memoizedAddWithResolver(1, 2)); // 3
console.log(memoizedAddWithResolver(1, 2)); // 3, returns cached value
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
const memoizedAddWithCustomCache = memoize(add, { cache: customCache });
console.log(memoizedAddWithCustomCache(1, 2)); // 3
console.log(memoizedAddWithCustomCache(1, 2)); // 3, returns cached value
console.log(memoizedAddWithCustomCache.cache.size); // 1

// Example using both a custom resolver and cache
const customResolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithBoth = memoize(add, { resolver: customResolver, cache: customCache });
console.log(memoizedAddWithBoth(1, 2)); // 3
console.log(memoizedAddWithBoth(1, 2)); // 3, returns cached value
console.log(memoizedAddWithBoth.cache.size); // 1

// Example using `this` binding
const obj = {
  b: 2,
  memoizedAdd: memoize(
    function (a: number) {
      return a + this.b;
    },
    {
      resolver: function (a: number) {
        return `${a}-${this.b}`;
      },
    }
  ),
};
console.log(obj.memoizedAdd(1)); // 3
obj.b = 3;
console.log(obj.memoizedAdd(1)); // 4
```
