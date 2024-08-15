/**
 * Memoizes a given function by caching its result based on the arguments provided.
 *
 * @template F - The type of the function to memoize.
 * @template K - The type of the cache key.
 * @param func
 * @param {F} fn - The function to memoize.
 * @param {MemoizeOptions<K, ReturnType<F>>} [options] - An options object with a resolver function and/or a custom cache object.
 * @returns {F & { cache: Cache<K, ReturnType<F>> }} - The memoized function with a cache property.
 *
 * @throws {TypeError} If the provided function or resolver is not valid.
 *
 * @example
 * // Basic usage with default cache
 * const add = (a, b) => a + b;
 * const memoizedAdd = memoize(add);
 * console.log(memoizedAdd(1, 2)); // 3
 * console.log(memoizedAdd.cache.size); // 1
 *
 * @example
 * // Using a custom resolver
 * const resolver = (...args) => args.join('-');
 * const memoizedAddWithResolver = memoize(add, { resolver });
 * console.log(memoizedAddWithResolver(1, 2)); // 3
 * console.log(memoizedAddWithResolver.cache.size); // 1
 *
 * @example
 * // Using a custom cache
 * class CustomCache {
 *   constructor() {
 *     this.store = {};
 *   }
 *   set(key, value) {
 *     this.store[key] = value;
 *   }
 *   get(key) {
 *     return this.store[key];
 *   }
 *   has(key) {
 *     return key in this.store;
 *   }
 *   delete(key) {
 *     delete this.store[key];
 *   }
 *   clear() {
 *     this.store = {};
 *   }
 *   get size() {
 *     return Object.keys(this.store).length;
 *   }
 * }
 * const customCache = new CustomCache();
 * const memoizedAddWithCustomCache = memoize(add, { cache: customCache });
 * console.log(memoizedAddWithCustomCache(1, 2)); // 3
 * console.log(memoizedAddWithCustomCache.cache.size); // 1
 *
 * @example
 * // Using both custom resolver and custom cache
 * const resolver = (...args) => args.join('-');
 * const customCache = new CustomCache();
 * const memoizedAddWithBoth = memoize(add, { resolver, cache: customCache });
 * console.log(memoizedAddWithBoth(1, 2)); // 3
 * console.log(memoizedAddWithBoth.cache.size); // 1
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<F extends (...args: any[]) => any, K = Parameters<F>[0]>(
  fn: F,
  options: MemoizeOptions<K, ReturnType<F>> = {}
): F & { cache: Cache<K, ReturnType<F>> } {
  const { cache = new Map<K, ReturnType<F>>(), resolver } = options;

  if (typeof fn !== 'function' || (resolver && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function and an optional resolver function');
  }

  const memoizedFn = function (this: unknown, ...args: Parameters<F>): ReturnType<F> {
    const key = resolver ? resolver.apply(this, args) : (args[0] as K);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  memoizedFn.cache = cache;
  return memoizedFn as F & { cache: Cache<K, ReturnType<F>> };
}

export interface MemoizeOptions<K, V> {
  cache?: Cache<K, V>;
  resolver?: (...args: any[]) => K;
}

export interface Cache<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean | void;
  clear(): void;
  size: number;
}
