import type { MemoizeCache } from './memoize.ts';

type MemoizedPromise<F extends (arg: any) => Promise<any>> = F & {
  cache: MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>>;
};

/**
 * Creates a memoized version of an async (Promise-returning) function.
 *
 * Concurrent calls with the same argument share the same in-flight Promise. Once
 * the Promise resolves, only its resolved value is kept in the cache. This avoids
 * retaining settled Promise objects, which can cause memory leaks. Rejected
 * Promises are not cached, so a failed call is retried on the next invocation.
 *
 * Like {@link memoize}, this works with functions that take zero or just one
 * argument; provide a `getCacheKey` for non-primitive arguments.
 *
 * @template F - The async function to memoize.
 * @param fn - The async function to memoize.
 * @param [options={}] - Optional configuration.
 * @param [options.cache] - The cache used to store in-flight Promises and resolved values. Defaults to a new `Map`.
 * @param [options.getCacheKey] - An optional function to generate a unique cache key for each argument.
 * @returns The memoized async function with an additional `cache` property that exposes its cache.
 *
 * @example
 * const fetchUser = async (id: number) => api.load(id);
 * const memoized = memoizePromise(fetchUser);
 *
 * const first = memoized(1);
 * const second = memoized(1);
 * console.log(first === second); // true (while the request is in flight)
 * await first;
 * await memoized(1); // uses the cached resolved value
 *
 * @example
 * // Rejected Promises are not cached
 * const fetchData = memoizePromise(async () => {
 *   return await fetchDataFromApi();
 * });
 *
 * await fetchData(); // If this rejects, the next call tries again
 */
export function memoizePromise<F extends (arg: any) => Promise<any>>(
  fn: F,
  options: {
    cache?: MemoizeCache<any, ReturnType<F> | Awaited<ReturnType<F>>>;
    getCacheKey?: (arg: Parameters<F>[0]) => unknown;
  } = {}
): MemoizedPromise<F> {
  const cache = options.cache ?? new Map<unknown, ReturnType<F> | Awaited<ReturnType<F>>>();
  const { getCacheKey } = options;

  const memoizedFn = function (this: unknown, arg: Parameters<F>[0]): ReturnType<F> {
    const key = getCacheKey ? getCacheKey(arg) : arg;

    if (cache.has(key)) {
      return Promise.resolve(cache.get(key)) as ReturnType<F>;
    }

    const promise = fn.call(this, arg).then(
      value => {
        cache.set(key, value);
        return value;
      },
      error => {
        cache.delete(key);
        throw error;
      }
    ) as ReturnType<F>;

    cache.set(key, promise);

    return promise;
  };

  memoizedFn.cache = cache;

  return memoizedFn as unknown as MemoizedPromise<F>;
}
