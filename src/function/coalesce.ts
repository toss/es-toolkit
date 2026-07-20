/**
 * Coalesces concurrent calls that share a `key` into a single in-flight
 * execution. If a call with `key` is already in flight, returns that promise;
 * otherwise invokes `fn()` and stores its promise so concurrent callers await
 * the same result. The entry is removed once the promise settles, so a later
 * call re-runs `fn`.
 *
 * `fn` is invoked on a microtask AFTER the entry is stored, which avoids the
 * re-entrancy bug present in naive implementations (where the factory re-runs
 * before its promise is stored). See issue #1608.
 *
 * @template T - The resolved value type.
 * @param key - The deduplication key.
 * @param fn - The factory to run (sync or async).
 * @returns A promise resolving with the (shared) result, or rejecting with its
 * error.
 *
 * @example
 * const a = coalesce('fetch-user', () => fetch('/me').then(r => r.json()))
 * const b = coalesce('fetch-user', () => fetch('/me').then(r => r.json()))
 * // fetch is called only once; a === b resolves to the same payload
 *
 * @group function
 */
const inflight = new Map<string, Promise<unknown>>();

export function coalesce<T>(key: string, fn: () => T | PromiseLike<T>): Promise<T> {
  const existing = inflight.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  // Defer invoking fn to a microtask AFTER the entry is stored, so a
  // re-entrant coalesce(key, ...) inside fn returns the stored promise
  // instead of re-running fn and racing.
  const promise = new Promise<T>((resolve, reject) => {
    Promise.resolve()
      .then(() => fn())
      .then(resolve, reject);
  });

  inflight.set(key, promise);
  promise.finally(() => {
    if (inflight.get(key) === promise) {
      inflight.delete(key);
    }
  });

  return promise;
}
