/**
 * Memoizes a given function by caching its result based on the arguments provided.
 *
 * @template T - The type of the function to memoize.
 * @template R - The type of the resolver function.
 * @template K - The type of the cache key.
 * @param resolver
 * @param {T} fn - The function to memoize.
 * @param {R | Cache<K, ReturnType<T>>} [resolverOrCache] - A function to resolve the cache key or a custom cache object. If a cache is provided, the default resolver is used.
 * @param {Cache<K, ReturnType<T>>} [cache] - An optional cache object to store results. This is used only if a resolver is provided in the second argument.
 * @returns {T & { cache: Cache<K, ReturnType<T>> }} - The memoized function with a cache property.
 *
 * @throws {TypeError} If the provided function, resolver, or cache is not valid.
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
 * const memoizedAddWithResolver = memoize(add, resolver);
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
 * const memoizedAddWithCustomCache = memoize(add, customCache);
 * console.log(memoizedAddWithCustomCache(1, 2)); // 3
 * console.log(memoizedAddWithCustomCache.cache.size); // 1
 *
 * @example
 * // Using both custom resolver and custom cache
 * const resolver = (...args) => args.join('-');
 * const customCache = new CustomCache();
 * const memoizedAddWithBoth = memoize(add, resolver, customCache);
 * console.log(memoizedAddWithBoth(1, 2)); // 3
 * console.log(memoizedAddWithBoth.cache.size); // 1
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  resolver?: (...args: Parameters<T>) => K
): T & { cache: Cache<K, ReturnType<T>> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  cache: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<T extends (...args: any[]) => any, R extends (...args: any[]) => any, K>(
  fn: T,
  resolverOrCache?: R | Cache<K, ReturnType<T>>,
  cache?: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> } {
  if (
    typeof fn !== 'function' ||
    (resolverOrCache != null && typeof resolverOrCache !== 'function' && typeof resolverOrCache !== 'object')
  ) {
    throw new TypeError('Expected a function or cache object');
  }

  let resolver: R | undefined;
  if (typeof resolverOrCache === 'function') {
    resolver = resolverOrCache;
  } else if (typeof resolverOrCache === 'object') {
    cache = resolverOrCache as Cache<K, ReturnType<T>>;
  }

  if (!cache) {
    cache = new Map() as unknown as Cache<K, ReturnType<T>>;
  }

  const memoizedFn = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : (args[0] as unknown as K);
    if (cache!.has(key)) {
      return cache!.get(key) as ReturnType<T>;
    }
    const result = fn.apply(this, args);
    cache!.set(key, result);
    return result;
  };

  memoizedFn.cache = cache;

  return memoizedFn as T & { cache: Cache<K, ReturnType<T>> };
}

export interface Cache<K, T> {
  set: (key: K, value: T) => void;
  get: (key: K) => T | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean | void;
  clear: () => void;
  size: number;
}
