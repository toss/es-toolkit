interface DebounceOptions {
  signal?: AbortSignal;
}

type Cancel = () => void;

/**
 * Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
 * method to cancel any pending execution.
 *
 * @param {F} func - The function to debounce.
 * @param {number} debounceMs - The number of milliseconds to delay.
 * @param {DebounceOptions} options - The options object.
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the debounced function.
 * @returns {F & { cancel: () => void }} A new debounced function with a `cancel` method.
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
  { signal }: DebounceOptions = {}
): F & { cancel: Cancel } {
  let timeoutId: number | NodeJS.Timeout | null = null;

  const debounced = function (...args: Parameters<F>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (signal?.aborted) {
      return;
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, debounceMs);
  } as F & { cancel: Cancel };

  const onAbort = function () {
    debounced.cancel();
  };

  debounced.cancel = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    signal?.removeEventListener('abort', onAbort);
  } as Cancel;

  signal?.addEventListener('abort', onAbort);

  return debounced;
}
