interface DebounceOptions {
  /**
   * An optional AbortSignal to cancel the debounced function.
   */
  signal?: AbortSignal;

  /**
   * An array specifying when the function should be called.
   * - `'leading'`: If included, the function will be called immediately on the first call.
   * - `'trailing'`: If included, the function will be called after `debounceMs` milliseconds have passed since the last call.
   * - If both `'leading'` and `'trailing'` are included, the function will be called at both the start and end of the delay period. However, it must be called at least twice within `debounceMs` milliseconds for this to happen, as one debounced function call cannot trigger the function twice.
   * @default ['trailing']
   */
  edges?: Array<'leading' | 'trailing'>;
}

/**
 * Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
 * method to cancel any pending execution.
 *
 * @template F - The type of function.
 * @param {F} func - The function to debounce.
 * @param {number} debounceMs - The number of milliseconds to delay.
 * @param {DebounceOptions} options - The options object
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the debounced function.
 * @returns A new debounced function with a `cancel` method.
 *
 * @example
 * const debouncedFunction = debounce(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * // Will log 'Function executed' after 1 second if not called again in that time
 * debouncedFunction();
 *
 * // Will not log anything as the previous call is canceled
 * debouncedFunction.cancel();
 *
 * // With AbortSignal
 * const controller = new AbortController();
 * const signal = controller.signal;
 * const debouncedWithSignal = debounce(() => {
 *  console.log('Function executed');
 * }, 1000, { signal });
 *
 * debouncedWithSignal();
 *
 * // Will cancel the debounced function call
 * controller.abort();
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  { signal, edges = ['trailing'] }: DebounceOptions = {}
): ((...args: Parameters<F>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Parameters<F> | null = null;

  const leading = edges.includes('leading');
  const trailing = edges.includes('trailing');

  const debounced = function (this: any, ...args: Parameters<F>) {
    if (signal?.aborted) {
      return;
    }

    if (leading && timeoutId === null) {
      func.apply(this, args);
    } else {
      pendingArgs = args;
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;

      if (trailing && pendingArgs != null) {
        func.apply(this, pendingArgs);
        pendingArgs = null;
      }
    }, debounceMs);
  };

  const onAbort = function () {
    debounced.cancel();
  };

  debounced.cancel = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  signal?.addEventListener('abort', onAbort, { once: true });

  return debounced;
}
