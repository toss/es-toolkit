interface ThrottleAsyncOptions {
  /**
   * An optional AbortSignal; when it aborts, the throttle lock is released so
   * the next call can run (the in-flight call is not cancelled).
   */
  signal?: AbortSignal;
}

/**
 * Creates a throttled version of an async function that only allows a new
 * invocation when the previous one has completed. While a call is in flight,
 * further calls resolve to `null` immediately (they are dropped, the classic
 * throttle "cooldown" behaviour for async). See issue #976.
 *
 * The returned function exposes a `.cancel()` method that releases the
 * throttle lock so subsequent calls can run even if a previous call is still
 * in flight (it does not cancel the in-flight call).
 *
 * @template F - The async function to throttle.
 * @param func - The async function to throttle.
 * @param options - Optional configuration.
 * @returns A throttled async function with a `.cancel` method.
 *
 * @example
 * const throttled = throttleAsync(async () => await fetch('/data'));
 * await throttled(); // runs fetch
 * await throttled(); // while the previous is in flight, resolves to null
 */
export function throttleAsync<F extends (...args: any[]) => Promise<any>>(
  func: F,
  { signal }: ThrottleAsyncOptions = {}
): ((...args: Parameters<F>) => Promise<ReturnType<F> | null>) & { cancel: () => void } {
  let pending: Promise<any> | null = null;

  const throttled = (...args: Parameters<F>): Promise<ReturnType<F> | null> => {
    if (pending != null) {
      return Promise.resolve(null);
    }

    pending = func(...args);
    const result = pending.then(
      value => {
        pending = null;
        return value as ReturnType<F>;
      },
      (error: unknown) => {
        pending = null;
        throw error;
      }
    );
    return result;
  };

  throttled.cancel = () => {
    pending = null;
  };

  if (signal) {
    signal.addEventListener('abort', throttled.cancel, { once: true });
  }

  return throttled;
}
