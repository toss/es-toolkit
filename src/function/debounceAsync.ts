/**
 * Creates a debounced async function that delays invoking `func` until after
 * `debounceMs` milliseconds have elapsed since the last call. Multiple calls
 * within the window coalesce: `func` is invoked once with the LATEST arguments,
 * and every coalesced caller's returned Promise resolves with that single result
 * (or rejects with its error). See issue #898.
 *
 * The returned function also exposes `.cancel()` which clears the pending
 * timer and rejects all pending Promises with `new Error('Cancelled')`.
 *
 * @template F - The async function type.
 * @param func - The async function to debounce.
 * @param debounceMs - The debounce delay in milliseconds.
 * @param options - Optional `{ signal }` to cancel via an AbortSignal.
 * @returns A debounced function returning a Promise, with a `cancel` method.
 *
 * @example
 * const debounced = debounceAsync(async (x: number) => x * 2, 100)
 * const a = debounced(1) // pending
 * const b = debounced(2) // pending; the prior call is coalesced
 * // after ~100ms, func is called once with 2; both a and b resolve to 4
 *
 * @group function
 */
export interface DebouncedAsyncFunction<F extends (...args: any[]) => Promise<any>> {
  (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>>;
  cancel: () => void;
}

export function debounceAsync<F extends (...args: any[]) => Promise<any>>(
  func: F,
  debounceMs: number,
  options: { signal?: AbortSignal } = {}
): DebouncedAsyncFunction<F> {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let latestArgs: Parameters<F> | null = null;
  let pending: Array<{
    resolve: (value: any) => void;
    reject: (error: unknown) => void;
  }> = [];

  const run = (): void => {
    timerId = null;
    const args = latestArgs as Parameters<F>;
    latestArgs = null;
    const resolvers = pending;
    pending = [];
    func(...args).then(
      value => {
        resolvers.forEach(({ resolve }) => resolve(value));
      },
      error => {
        resolvers.forEach(({ reject }) => reject(error));
      }
    );
  };

  const debounced = (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
    latestArgs = args;
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    const promise = new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      pending.push({ resolve, reject });
    });
    timerId = setTimeout(run, debounceMs);
    return promise;
  };

  debounced.cancel = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    latestArgs = null;
    const resolvers = pending;
    pending = [];
    resolvers.forEach(({ reject }) => reject(new Error('Cancelled')));
  };

  if (options.signal?.aborted) {
    debounced.cancel();
  } else if (options.signal) {
    options.signal.addEventListener('abort', debounced.cancel, { once: true });
  }

  return debounced;
}
