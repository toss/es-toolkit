import { debounce } from './debounce.ts';

interface ThrottleOptions {
  /**
   * An optional AbortSignal to cancel the debounced function.
   */
  signal?: AbortSignal;

  /**
   * An optional array specifying whether the function should be invoked on the leading edge, trailing edge, or both.
   * If `edges` includes "leading", the function will be invoked at the start of the delay period.
   * If `edges` includes "trailing", the function will be invoked at the end of the delay period.
   * If both "leading" and "trailing" are included, the function will be invoked at both the start and end of the delay period.
   * @default ["leading", "trailing"]
   */
  edges?: Array<'leading' | 'trailing'>;
}

/**
 * Creates a throttled function that only invokes the provided function at most once
 * per every `throttleMs` milliseconds. Subsequent calls to the throttled function
 * within the wait time will not trigger the execution of the original function.
 *
 * @template F - The type of function.
 * @param {F} func - The function to throttle.
 * @param {number} throttleMs - The number of milliseconds to throttle executions to.
 * @returns {(...args: Parameters<F>) => void} A new throttled function that accepts the same parameters as the original function.
 *
 * @example
 * const throttledFunction = throttle(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * // Will log 'Function executed' immediately
 * throttledFunction();
 *
 * // Will not log anything as it is within the throttle time
 * throttledFunction();
 *
 * // After 1 second
 * setTimeout(() => {
 *   throttledFunction(); // Will log 'Function executed'
 * }, 1000);
 */
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  throttleMs: number,
  { signal, edges = ['leading', 'trailing'] }: ThrottleOptions = {}
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
} {
  let pendingAt: number | null = null;

  const debounced = debounce(func, throttleMs, { signal, edges });

  const throttled = function (...args: Parameters<F>) {
    if (pendingAt == null) {
      pendingAt = Date.now();
    } else {
      if (Date.now() - pendingAt >= throttleMs) {
        debounced.cancel();
        debounced(...args);
      }
    }

    debounced(...args);
  };

  throttled.cancel = debounced.cancel;
  throttled.flush = debounced.flush;

  return throttled;
}
