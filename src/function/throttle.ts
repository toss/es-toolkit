/**
 * Creates a throttled function that only invokes the provided function at most once
 * per every `throttleMs` milliseconds. Subsequent calls to the throttled function
 * within the wait time will not trigger the execution of the original function.
 *
 * @template F - The type of function.
 * @param {F} func - The function to throttle.
 * @param {number | undefined} throttleMs - The number of milliseconds to throttle executions to, but if not provided and `func` returns a Promise, the function creates a Promise-based throttled function.
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
export function throttle<F extends (...args: Parameters<F>) => void>(
  func: F,
  throttleMs: number
): (...args: Parameters<F>) => void;
export function throttle<F extends (...args: Parameters<F>) => Promise<unknown>>(
  func: F
): (...args: Parameters<F>) => void;
export function throttle<F extends (...args: Parameters<F>) => void | Promise<unknown>>(
  func: F,
  throttleMs?: number
): (...args: Parameters<F>) => void {
  let lastCallTime: number | null = null;

  if (throttleMs == null) {
    // If `throttleMs` is not provided and the function returns a Promise, create a Promise-based throttled function
    return function (...args: Parameters<F>) {
      if (lastCallTime == null) {
        lastCallTime = Number.MAX_SAFE_INTEGER;
        func(...args)?.finally(() => {
          lastCallTime = null;
        });
      }
    };
  } else {
    // Create a time-based throttled function
    return function (...args: Parameters<F>) {
      const now = Date.now();
      if (lastCallTime == null || now - lastCallTime >= throttleMs) {
        lastCallTime = now;
        func(...args);
      }
    };
  }
}
