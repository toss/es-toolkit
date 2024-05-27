/**
 * Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
 * method to cancel any pending execution.
 *
 * @param {() => void} func - The function to debounce.
 * @param {number} debounceMs - The number of milliseconds to delay.
 * @returns {{ (): void; cancel: () => void }} A new debounced function with a `cancel` method.
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
 */
export function debounce(func: () => void, debounceMs: number): { (): void; cancel: () => void } {
  let timeoutId: number | NodeJS.Timeout | null = null;

  const debounced = function () {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    
    
    timeoutId = setTimeout(() => {
      func();
    }, debounceMs);
  };

  debounced.cancel = function () {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  }  

  return debounced;
}