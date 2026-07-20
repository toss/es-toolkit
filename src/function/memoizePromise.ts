import type { MemoizeCache } from './memoize.ts';

/**
 * Creates a memoized version of an async (Promise-returning) function.
 *
 * Unlike {@link memoize}, which caches the resolved value, `memoizePromise`
 * caches the **in-flight Promise** itself, so concurrent calls with the same
 * argument share a single execution. Crucially, when a Promise rejects the
 * cache entry is deleted, so a failed call is retried on the next invocation
 * instead of caching the rejection forever (which would leak memory and
 * freeze the cache — see issue #1739).
 *
 * Like {@link memoize}, this works with functions that take zero or just one
 * argument; provide a `getCacheKey` for non-primitive arguments.
 *
 * @template F - The async function to memoize.
 * @param fn - The async function to memoize.
 * @param [options={}] - Optional configuration.
 * @param [options.cache] - The cache object. Defaults to a new `Map`.
 * @param [options.getCacheKey] - An optional function to generate a cache key.
 * @returns The memoized async function with a `.cache` property.
 *
 * @example
 * const fetchUser = async (id: number) => api.load(id);
 * const memoized = memoizePromise(fetchUser);
 * await memoized(1); // calls api.load(1)
 * await memoized(1); // returns the cached promise (api.load not called again)
 * console.log(memoized.cache.size); // 1
 */
export function memoizePromise<F extends (arg: any) => Promise<any>>(
  fn: F,
  options: {
    cache?: MemoizeCache<any, ReturnType<F>>;
    getCacheKey?: (args: Parameters<F>[0]) => unknown;
  } = {}
): F & { cache: MemoizeCache<any, ReturnType<F>> } {
  const { cache = new Map<unknown, ReturnType<F>>(), getCacheKey } = options;

  const memoizedFn = function (this: unknown, arg: Parameters<F>[0]): ReturnType<F> {
    const key = getCacheKey ? getCacheKey(arg) : arg;

    if (cache.has(key)) {
      return cache.get(key)! as ReturnType<F>;
    }

    // Cache the in-flight promise, and clear the entry on rejection so a
    // failed call is retried next time instead of being cached forever.
    const promise = fn.call(this, arg).then(
      (value: any) => value,
      (error: unknown) => {
        cache.delete(key);
        throw error;
      }
    ) as ReturnType<F>;

    cache.set(key, promise);

    return promise;
  };

  memoizedFn.cache = cache;

  return memoizedFn as unknown as F & { cache: MemoizeCache<any, ReturnType<F>> };
}
