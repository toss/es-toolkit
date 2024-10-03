import { debounce } from './debounce.ts';

interface ThrottleOptions {
  /**
   * An optional AbortSignal to cancel the function invocation on the trailing edge.
   */
  signal?: AbortSignal;

  /**
   * If `true`, the function will be invoked on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean;

  /**
   * If `true`, the function will be invoked on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean;
}

/**
 * Creates a throttled function that only invokes the provided function at most once
 * per every `throttleMs` milliseconds. Subsequent calls to the throttled function
 * within the wait time will not trigger the execution of the original function.
 *
 * @template F - The type of function.
 * @param {F} func - The function to throttle.
 * @param {number} throttleMs - The number of milliseconds to throttle executions to.
 * @param {ThrottleOptions} options - The options object
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the throttled function.
 * @param {boolean} options.leading - If `true`, the function will be invoked on the leading edge of the timeout.
 * @param {boolean} options.trailing - If `true`, the function will be invoked on the trailing edge of the timeout.
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
export function throttle<F extends (...args: any[]) => any>(
  func: F,
  throttleMs: number = 0,
  options: ThrottleOptions = {}
): ((...args: Parameters<F>) => ReturnType<F> | undefined) & {
  cancel: () => void;
  flush: () => void;
} {
  if (typeof options !== 'object') {
    options = {};
  }

  const { leading = true, trailing = true, signal } = options;

  return debounce(func, throttleMs, { leading, trailing, signal, maxWait: throttleMs });
}
