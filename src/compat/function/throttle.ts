import type { DebouncedFunc, DebouncedFuncLeading } from './debounce.ts';

interface ThrottleSettings {
  /**
   * If `true`, the function will be invoked on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean | undefined;
  /**
   * If `true`, the function will be invoked on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean | undefined;
}

type ThrottleSettingsLeading = (ThrottleSettings & { leading: true }) | Omit<ThrottleSettings, 'leading'>;

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
export function throttle<T extends (...args: any) => any>(
  func: T,
  throttleMs?: number,
  options?: ThrottleSettingsLeading
): DebouncedFuncLeading<T>;

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
export function throttle<T extends (...args: any) => any>(
  func: T,
  throttleMs?: number,
  options?: ThrottleSettings
): DebouncedFunc<T>;

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
  throttleMs = 0,
  options: ThrottleSettings = {}
): DebouncedFunc<F> {
  if (options == null || typeof options !== 'object') {
    options = {};
  }

  const { leading = true, trailing = true } = options;

  let result: ReturnType<F> | undefined = undefined;
  let lastArgs: Parameters<F> | undefined = undefined;
  let lastThis: unknown = undefined;
  let lastCallTime: number | undefined = undefined;
  let lastInvokeTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  const invoke = (time: number) => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args!);

    return result;
  };

  const shouldInvoke = (time: number) => {
    if (lastCallTime === undefined) {
      return true;
    }

    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return timeSinceLastCall >= throttleMs || timeSinceLastCall < 0 || timeSinceLastInvoke >= throttleMs;
  };

  const trailingEdge = (time: number) => {
    timeoutId = undefined;

    if (trailing && lastArgs != null) {
      return invoke(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  };

  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return Math.min(throttleMs - timeSinceLastCall, throttleMs - timeSinceLastInvoke);
  };

  const timerExpired = () => {
    const time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timeoutId = setTimeout(timerExpired, remainingWait(time));
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    timeoutId = setTimeout(timerExpired, throttleMs);

    if (leading) {
      return invoke(time);
    }

    return result;
  };

  const throttled = function (this: any, ...args: Parameters<F>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === undefined) {
        return leadingEdge(time);
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(timerExpired, throttleMs);

      return invoke(time);
    }

    if (timeoutId === undefined) {
      timeoutId = setTimeout(timerExpired, throttleMs);
    }

    return result;
  };

  throttled.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    lastInvokeTime = 0;
    lastArgs = undefined;
    lastCallTime = undefined;
    lastThis = undefined;
    timeoutId = undefined;
  };

  throttled.flush = () => {
    if (timeoutId === undefined) {
      return result;
    }

    return trailingEdge(Date.now());
  };

  return throttled;
}
