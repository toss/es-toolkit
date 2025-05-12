interface MemoizeCache {
  /**
   * Optional internal data structure for the cache implementation.
   * This is primarily used for testing and internal operations.
   */
  __data__?: any;

  /**
   * Removes the value associated with the specified key from the cache.
   *
   * @param key - The key of the value to remove
   * @returns `true` if an element was removed, `false` if the key wasn't found
   *
   * @example
   * ```typescript
   * cache.set('user', { id: 123, name: 'John' });
   * cache.delete('user'); // Returns true
   * cache.delete('unknown'); // Returns false
   * ```
   */
  delete(key: any): boolean;

  /**
   * Retrieves the value associated with the specified key from the cache.
   *
   * @param key - The key of the value to retrieve
   * @returns The cached value or undefined if not found
   *
   * @example
   * ```typescript
   * cache.set('user', { id: 123, name: 'John' });
   * cache.get('user'); // Returns { id: 123, name: 'John' }
   * cache.get('unknown'); // Returns undefined
   * ```
   */
  get(key: any): any;

  /**
   * Checks if the cache contains a value for the specified key.
   *
   * @param key - The key to check for existence
   * @returns `true` if the key exists in the cache, otherwise `false`
   *
   * @example
   * ```typescript
   * cache.set('user', { id: 123, name: 'John' });
   * cache.has('user'); // Returns true
   * cache.has('unknown'); // Returns false
   * ```
   */
  has(key: any): boolean;

  /**
   * Stores a value in the cache with the specified key.
   * If the key already exists, its value is updated.
   *
   * @param key - The key to associate with the value
   * @param value - The value to store in the cache
   * @returns The cache instance for method chaining
   *
   * @example
   * ```typescript
   * cache.set('user', { id: 123, name: 'John' })
   *      .set('settings', { theme: 'dark' });
   * ```
   */
  set(key: any, value: any): this;

  /**
   * Removes all key-value pairs from the cache.
   * This method is optional as some cache implementations may be immutable.
   *
   * @example
   * ```typescript
   * cache.set('user', { id: 123, name: 'John' });
   * cache.set('settings', { theme: 'dark' });
   * cache.clear(); // Cache is now empty
   * ```
   */
  clear?(): void;
}

/**
 * Interface for the constructor of cache implementations.
 * This allows for creating new cache instances with optional initial entries.
 *
 * @example
 * ```typescript
 * // Use a custom cache constructor with memoize
 * memoize.Cache = CustomCache;
 *
 * // Create a cache with initial entries
 * const cache = new CustomCache([
 *   ['key1', 'value1'],
 *   ['key2', 'value2']
 * ]);
 * ```
 */
interface MemoizeCacheConstructor {
  /**
   * Creates a new cache instance.
   *
   * @param entries - Optional array of key-value pairs to initialize the cache with
   * @returns A new cache instance
   */
  new (entries?: Array<[any, any]>): MemoizeCache;
}

/**
 * Represents a function that has been memoized.
 * A memoized function maintains the same signature as the original function
 * but adds a cache property to store previously computed results.
 *
 * @template T - The type of the original function being memoized
 */
interface MemoizedFunction<T extends (...args: any) => any> {
  /**
   * Calls the function with the provided arguments, using cached results when available
   *
   * @param {...Parameters<T>} args - The arguments to pass to the original function
   * @returns {ReturnType<T>} The result of the function call, either from cache or freshly computed
   */
  (...args: Parameters<T>): ReturnType<T>;

  /**
   * The cache storing previously computed results
   */
  cache: MemoizeCache;
}

/**
 * Creates a function that memoizes the result of func. If resolver is provided it determines the cache key for
 * storing the result based on the arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is coerced to a string and used as the cache key. The func is invoked with
 * the this binding of the memoized function.
 *
 * @template T - The type of the original function being memoized
 * @param {T} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @return {MemoizedFunction<T>} Returns the new memoizing function.
 */
export function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T> {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }

  const memoized = function (this: unknown, ...args: Parameters<T>) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  const CacheConstructor = memoize.Cache || Map;
  memoized.cache = new CacheConstructor();

  return memoized;
}

memoize.Cache = Map as unknown as MemoizeCacheConstructor;
