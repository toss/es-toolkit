# memoize

Caches function results so it runs faster when called again with the same arguments.

```typescript
const memoizedFunc = memoize(func, options);
```

## Usage

### `memoize(func, options?)`

Use `memoize` when you want to optimize performance by caching a function's execution results. When called again with the same arguments, it returns the cached result to avoid duplicate computations.

Use this with functions that take a single parameter. If your function takes multiple arguments, combine them into a single object or array.

If the argument is compared by reference, such as arrays or objects, you should provide a `getCacheKey` function to generate an appropriate cache key.

```typescript
import { memoize } from 'es-toolkit/function';

// Basic usage
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15 (computed)
console.log(memoizedAdd(5)); // 15 (cached result)
console.log(memoizedAdd.cache.size); // 1

// Providing a cache key for array arguments
const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0);
const memoizedSum = memoize(sum, {
  getCacheKey: (arr: number[]) => arr.join(','),
});

console.log(memoizedSum([1, 2, 3])); // 6 (computed)
console.log(memoizedSum([1, 2, 3])); // 6 (cached result)
```

You can also use a custom cache.

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

class LRUCache<K, V> implements MemoizeCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize = 100;

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
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

const customCache = new LRUCache<string, number>();
const memoizedWithCustomCache = memoize(expensiveFunction, {
  cache: customCache,
});
```

#### Parameters

- `func` (`F`): The function to memoize. It must accept only one argument.
- `options` (object, optional): Memoization configuration options.
  - `cache` (`MemoizeCache<any, ReturnType<F>>`, optional): The cache object to store results. Defaults to a new `Map`.
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, optional): A function to generate cache keys. Required when using non-primitive values as arguments.

#### Returns

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): Returns the memoized function. It includes a `cache` property to access the internal cache.
