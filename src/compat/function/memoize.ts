import { eq } from '../util/eq.ts';

/**
 * A simple hash table implementation for caching with string keys.
 * @private
 */
class Hash {
  /**
   * The hasOwnProperty reference for efficient property checks
   */
  private static hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * The internal data structure storing key-value pairs
   */
  __data__: Record<string, any> = {};

  /**
   * The number of entries in the hash
   */
  size = 0;

  /**
   * Creates a new hash instance.
   * @param entries - Optional initial key-value pairs to cache
   */
  constructor(entries: Array<[any, any]> = []) {
    if (entries && entries.length) {
      const length = entries.length;

      for (let i = 0; i < length; i++) {
        const [key, value] = entries[i];
        this.set(key, value);
      }
    }
  }

  /**
   * Removes all key-value entries from the hash.
   */
  clear(): void {
    this.__data__ = {};
    this.size = 0;
  }

  /**
   * Removes a key and its value from the hash.
   * @param key - The key of the value to remove
   * @returns `true` if the entry was removed, else `false`
   */
  delete(key: any): boolean {
    const hasKey = this.has(key);
    if (hasKey) {
      delete this.__data__[key as string];
      this.size--;
    }
    return hasKey;
  }

  /**
   * Gets the value for a key from the hash.
   * @param key - The key of the value to get
   * @returns The stored value or undefined if not found
   */
  get(key: any): any {
    const data = this.__data__;
    return Hash.hasOwnProperty.call(data, key as PropertyKey) ? data[key as string] : undefined;
  }

  /**
   * Checks if a value exists for the given key.
   * @param key - The key to check
   * @returns `true` if an entry for the key exists, else `false`
   */
  has(key: any): boolean {
    return Hash.hasOwnProperty.call(this.__data__, key as PropertyKey);
  }

  /**
   * Sets a value for the given key in the hash.
   * @param key - The key to set
   * @param value - The value to store
   * @returns The hash instance for chaining
   */
  set(key: any, value: any): this {
    const hadKey = this.has(key);
    this.__data__[key as string] = value === undefined ? '__lodash_hash_undefined__' : value;

    if (!hadKey) {
      this.size++;
    }

    return this;
  }
}

/**
 * A cache implementation using an array to store key-value pairs.
 */
class ListCache {
  /** The internal data structure storing key-value pairs */
  __data__: Array<[any, any]> = [];

  /** The number of entries in the cache */
  size = 0;

  /**
   * Creates a new list cache instance.
   * @param entries - Optional initial key-value pairs to cache
   */
  constructor(entries: Array<[any, any]> = []) {
    if (entries && entries.length) {
      const length = entries.length;

      for (let i = 0; i < length; i++) {
        const [key, value] = entries[i];
        this.set(key, value);
      }
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   */
  clear(): void {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Removes an entry by key from the list cache.
   * @param key - The key of the value to remove
   * @returns `true` if the entry was removed, else `false`
   */
  delete(key: any): boolean {
    const index = this.findIndex(key);

    if (index < 0) {
      return false;
    }

    this.__data__.splice(index, 1);
    this.size--;
    return true;
  }

  /**
   * Gets the cached value for a key.
   * @param key - The key of the value to get
   * @returns The cached value or undefined if not found
   */
  get(key: any): any {
    const index = this.findIndex(key);
    return index < 0 ? undefined : this.__data__[index][1];
  }

  /**
   * Checks if a value exists for the given key.
   * @param key - The key to check
   * @returns `true` if a value exists, else `false`
   */
  has(key: any): boolean {
    return this.findIndex(key) >= 0;
  }

  /**
   * Sets a value for the given key in the cache.
   * @param key - The key to set
   * @param value - The value to store
   * @returns The list cache instance for chaining
   */
  set(key: any, value: any): this {
    const index = this.findIndex(key);

    if (index < 0) {
      this.__data__.push([key, value]);
      this.size++;
    } else {
      this.__data__[index][1] = value;
    }

    return this;
  }

  /**
   * Internal helper to find the index of a key in the data array.
   * @private
   */
  private findIndex(key: any): number {
    const data = this.__data__;
    let length = data.length;

    while (length--) {
      if (eq(data[length][0], key)) {
        return length;
      }
    }

    return -1;
  }
}

/**
 * Interface defining a cache implementation for the memoize function.
 * Provides methods for storing, retrieving, and managing cached values.
 *
 * @example
 * ```typescript
 * // Implementing a simple MemoizeCache
 * class SimpleCache implements MemoizeCache {
 *   private entries = new Map<any, any>();
 *
 *   delete(key: any): boolean {
 *     return this.entries.delete(key);
 *   }
 *
 *   get(key: any): any {
 *     return this.entries.get(key);
 *   }
 *
 *   has(key: any): boolean {
 *     return this.entries.has(key);
 *   }
 *
 *   set(key: any, value: any): this {
 *     this.entries.set(key, value);
 *     return this;
 *   }
 *
 *   clear(): void {
 *     this.entries.clear();
 *   }
 * }
 * ```
 */
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
 * A specialized cache implementation that optimizes storage based on key types.
 * This cache uses different internal storage mechanisms depending on the key:
 * - String keys: Uses a string-optimized hash table
 * - Primitive keys (number, symbol, boolean): Uses a regular hash table
 * - Complex keys (objects, arrays, etc.): Uses Map or a list-based fallback
 *
 * Used primarily by the memoize function to efficiently store computed results.
 *
 * @private
 * @see Hash - Used for string and primitive key storage
 * @see ListCache - Fallback when Map is unavailable
 */
class MapCache {
  /**
   * The total number of entries across all internal caches
   */
  size = 0;

  /**
   * The composite data structure containing specialized caches:
   * - hash: For number, boolean, and symbol primitive keys
   * - string: For string primitive keys (most common use case)
   * - map: For complex keys like objects and arrays
   */
  __data__: {
    hash: Hash; // Hash instance for non-string primitives
    map: Map<any, any> | ListCache; // Map or ListCache for reference types
    string: Hash; // Hash instance optimized for strings
  } = {
    hash: new Hash(),
    map: typeof Map !== 'undefined' ? new Map() : new ListCache(),
    string: new Hash(),
  };

  /**
   * Creates a new map cache instance
   * @param entries - Optional initial key-value pairs to cache
   * @example
   * ```typescript
   * // Empty cache
   * const cache = new MapCache();
   *
   * // Initialize with entries
   * const cache = new MapCache([['key1', 'value1'], ['key2', 'value2']]);
   * ```
   */
  constructor(entries: Array<[any, any]> = []) {
    if (entries && entries.length) {
      const length = entries.length;

      for (let i = 0; i < length; i++) {
        const [key, value] = entries[i];
        this.set(key, value);
      }
    }
  }

  /**
   * Removes all key-value entries from the map and resets all internal caches
   */
  clear(): void {
    this.size = 0;
    this.__data__ = {
      hash: new Hash(),
      map: typeof Map !== 'undefined' ? new Map() : new ListCache(),
      string: new Hash(),
    };
  }

  /**
   * Removes a key and its value from the map
   * @param key - The key of the value to remove
   * @returns True if the entry was removed, else false (if key didn't exist)
   * @example
   * ```typescript
   * cache.set('key', 'value');
   * cache.delete('key'); // true
   * cache.delete('key'); // false (already removed)
   * ```
   */
  delete(key: any): boolean {
    const result = this.getMapData(key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the cached value for a key
   * @param key - The key of the value to get
   * @returns The cached value or undefined if not found
   * @example
   * ```typescript
   * cache.set('key', 'value');
   * cache.get('key'); // 'value'
   * cache.get('missing'); // undefined
   * ```
   */
  get(key: any): any {
    return this.getMapData(key).get(key);
  }

  /**
   * Checks if a cached value for a key exists
   * @param key - The key of the entry to check
   * @returns True if an entry for the key exists, else false
   * @example
   * ```typescript
   * cache.set('key', 'value');
   * cache.has('key'); // true
   * cache.has('missing'); // false
   * ```
   */
  has(key: any): boolean {
    return this.getMapData(key).has(key);
  }

  /**
   * Sets a value to a key in the cache
   * @param key - The key of the value to cache (any type)
   * @param value - The value to cache (any type)
   * @returns The map cache instance for method chaining
   * @example
   * ```typescript
   * cache.set('key', 'value')
   *      .set({complex: 'key'}, 'objectValue');
   * ```
   */
  set(key: any, value: any): this {
    const data = this.getMapData(key);
    const size = data.size;

    data.set(key, value);
    this.size += data.size === size ? 0 : 1;
    return this;
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  private isKeyable(value: any) {
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean'
      ? value !== '__proto__'
      : value === null;
  }

  /**
   * Gets the appropriate internal cache object based on the key type:
   * - String keys → string cache (Hash)
   * - Primitive keys → hash cache (Hash)
   * - Complex keys → map cache (Map or ListCache)
   *
   * @private
   * @param key - The key to determine the appropriate cache for
   * @returns The appropriate cache object for the key type
   */
  private getMapData(key: any) {
    const data = this.__data__;
    return this.isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
  }
}

/**
 * Creates a function that memoizes the result of func. If resolver is provided it determines the cache key for
 * storing the result based on the arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is coerced to a string and used as the cache key. The func is invoked with
 * the this binding of the memoized function.
 *
 * @param func The function to have its output memoized.
 * @param resolver The function to resolve the cache key.
 * @return Returns the new memoizing function.
 */
export function memoize<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T> {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }

  const memoized = function (this: any, ...args: Parameters<T>) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  const CacheConstructor = memoize.Cache || MapCache;
  memoized.cache = new CacheConstructor();
  return memoized;
}

memoize.Cache = MapCache as unknown as MemoizeCacheConstructor;
