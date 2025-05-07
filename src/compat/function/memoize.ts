interface MapCacheConstructor {
  new (): MapCache;
}

interface MemoizedFunction<T extends (...args: any) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  cache: MapCache;
}

type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

export interface MemoizeFunction {
  <T extends (...args: any) => any>(func: T, resolver?: (...args: Parameters<T>) => any): MemoizedFunction<T>;
  Cache: MapCacheConstructor;
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
function memoizeImpl<T extends (...args: any) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): MemoizedFunction<T> {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }

  const memoized = function (this: any, ...args: Parameters<T>) {
    const key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  } as MemoizedFunction<T>;

  const CacheConstructor = memoizeImpl.Cache || MapCache;
  memoized.cache = new CacheConstructor();
  return memoized;
}

// Cache 속성 할당
memoizeImpl.Cache = MapCache as unknown as MapCacheConstructor;

// 최종 export 할당
export const memoize: MemoizeFunction = memoizeImpl;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value: unknown) {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean'
    ? value !== '__proto__'
    : value === null;
}

/**
 * Creates a cache object to store key/value pairs.
 */
interface MapCache extends MapCacheConstructor {
  /**
   * The size of the map cache.
   */
  size: number;

  /**
   * The internal data structure.
   */
  __data__: any;

  /**
   * Removes all key-value entries from the map.
   */
  clear?: (() => void) | undefined;

  /**
   * Removes `key` and its value from the cache.
   * @param key The key of the value to remove.
   * @return Returns `true` if the entry was removed successfully, else `false`.
   */
  delete(key: any): boolean;
  /**
   * Gets the cached value for `key`.
   * @param key The key of the value to get.
   * @return Returns the cached value.
   */
  get(key: any): any;
  /**
   * Checks if a cached value for `key` exists.
   * @param key The key of the entry to check.
   * @return Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key: any): boolean;
  /**
   * Sets `value` to `key` of the cache.
   * @param key The key of the value to cache.
   * @param value The value to cache.
   * @return Returns the cache object.
   */
  set(key: any, value: any): this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(this: MapCache, entries: Array<[unknown, unknown]> = []) {
  let index = -1;
  const length = entries == null ? 0 : entries.length;

  this.clear?.();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear(this: MapCache) {
  this.size = 0;
  this.__data__ = {
    hash: new (Hash as any)(),
    map: new ((Map || ListCache) as any)(),
    string: new (Hash as any)(),
  };
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map: MapCache, key: any) {
  const data = map.__data__;
  return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(this: MapCache, key: any) {
  const result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(this: MapCache, key: any) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(this: MapCache, key: any) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(this: MapCache, key: any, value: any) {
  const data = getMapData(this, key),
    size = data.size;

  data.set(key, value);
  this.size += data.size === size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

// Hash 객체를 위한 인터페이스 정의
interface Hash {
  size: number;
  __data__: Record<string, any>;
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): unknown;
  has(key: unknown): boolean;
  set(key: unknown, value: unknown): Hash;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(this: Hash, entries: Array<[unknown, unknown]> = []) {
  let index = -1;
  const length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear(this: Hash): void {
  this.__data__ = {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(this: Hash, key: unknown): boolean {
  const result = this.has(key) && delete this.__data__[key as string];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;
// const nativeCreate = Object.create;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(this: Hash, key: unknown): unknown {
  const data = this.__data__;

  // if (nativeCreate) {
  //   const result = data[key];
  //   return result === '__lodash_hash_undefined__' ? undefined : result;
  // }
  return hasOwnProperty.call(data, key as PropertyKey) ? data[key as string] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(this: Hash, key: unknown): boolean {
  const data = this.__data__;
  // return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  return hasOwnProperty.call(data, key as PropertyKey);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(this: Hash, key: unknown, value: unknown): Hash {
  const data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  // data[key] = nativeCreate && value === undefined ? '__lodash_hash_undefined__' : value;
  data[key as string] = value === undefined ? '__lodash_hash_undefined__' : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

// ListCache 객체를 위한 인터페이스 정의
interface ListCache {
  size: number;
  __data__: Array<[unknown, unknown]>;
  clear(): void;
  delete(key: unknown): boolean;
  get(key: unknown): unknown;
  has(key: unknown): boolean;
  set(key: unknown, value: unknown): ListCache;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(this: ListCache, entries: Array<[unknown, unknown]> = []) {
  let index = -1;
  const length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear(this: ListCache): void {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(this: ListCache, key: unknown): boolean {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  const lastIndex = data.length - 1;
  if (index === lastIndex) {
    data.pop();
  } else {
    Array.prototype.splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(this: ListCache, key: unknown): unknown {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(this: ListCache, key: unknown): boolean {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(this: ListCache, key: unknown, value: unknown): ListCache {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array: Array<[unknown, unknown]>, key: unknown): number {
  let length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
