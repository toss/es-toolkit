const MAX_SET_TIMEOUT_DELAY = 2147483647;

interface DebounceSettings {
  /**
   * If `true`, the function will be invoked on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean | undefined;
  /**
   * The maximum time `func` is allowed to be delayed before it's invoked.
   * @default Infinity
   */
  maxWait?: number | undefined;
  /**
   * If `true`, the function will be invoked on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean | undefined;
}

interface DebounceSettingsLeading extends DebounceSettings {
  leading: true;
}

export interface DebouncedFunc<T extends (...args: any[]) => any> {
  /**
   * Call the original function, but applying the debounce rules.
   *
   * If the debounced function can be run immediately, this calls it and returns its return
   * value.
   *
   * Otherwise, it returns the return value of the last invocation, or undefined if the debounced
   * function was not invoked yet.
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * Throw away any pending invocation of the debounced function.
   */
  cancel(): void;

  /**
   * If there is a pending invocation of the debounced function, invoke it immediately and return
   * its return value.
   *
   * Otherwise, return the value from the last invocation, or undefined if the debounced function
   * was never invoked.
   */
  flush(): ReturnType<T> | undefined;
}

export interface DebouncedFuncLeading<T extends (...args: any[]) => any> extends DebouncedFunc<T> {
  (...args: Parameters<T>): ReturnType<T>;
  flush(): ReturnType<T>;
}

/**
 * Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
 * method to cancel any pending execution.
 *
 * You can set the debounced function to run at the start (`leading`) or end (`trailing`) of the delay period.
 * If `leading` is true, the function runs immediately on the first call.
 * If `trailing` is true, the function runs after `debounceMs` milliseconds have passed since the last call.
 * If both `leading` and `trailing` are true, the function runs at both the start and end, but it must be called at least twice within `debounceMs` milliseconds for this to happen
 * (since one debounced function call cannot trigger the function twice).
 *
 * You can also set a `maxWait` time, which is the maximum time the function is allowed to be delayed before it is called.
 *
 * @template F - The type of function.
 * @param func - The function to debounce.
 * @param debounceMs - The number of milliseconds to delay.
 * @param options - The options object
 * @param options.signal - An optional AbortSignal to cancel the debounced function.
 * @param options.leading - If `true`, the function will be invoked on the leading edge of the timeout.
 * @param options.trailing - If `true`, the function will be invoked on the trailing edge of the timeout.
 * @param options.maxWait - The maximum time `func` is allowed to be delayed before it's invoked.
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
export function debounce<T extends (...args: any) => any>(
  func: T,
  wait: number | undefined,
  options: DebounceSettingsLeading
): DebouncedFuncLeading<T>;

/**
 * Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
 * method to cancel any pending execution.
 *
 * You can set the debounced function to run at the start (`leading`) or end (`trailing`) of the delay period.
 * If `leading` is true, the function runs immediately on the first call.
 * If `trailing` is true, the function runs after `debounceMs` milliseconds have passed since the last call.
 * If both `leading` and `trailing` are true, the function runs at both the start and end, but it must be called at least twice within `debounceMs` milliseconds for this to happen
 * (since one debounced function call cannot trigger the function twice).
 *
 * You can also set a `maxWait` time, which is the maximum time the function is allowed to be delayed before it is called.
 *
 * @template F - The type of function.
 * @param func - The function to debounce.
 * @param debounceMs - The number of milliseconds to delay.
 * @param options - The options object
 * @param options.signal - An optional AbortSignal to cancel the debounced function.
 * @param options.leading - If `true`, the function will be invoked on the leading edge of the timeout.
 * @param options.trailing - If `true`, the function will be invoked on the trailing edge of the timeout.
 * @param options.maxWait - The maximum time `func` is allowed to be delayed before it's invoked.
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
export function debounce<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: DebounceSettings
): DebouncedFunc<T>;

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  debounceMs = 0,
  options: DebounceSettings = {}
): DebouncedFunc<F> {
  if (typeof options !== 'object') {
    options = {};
  }

  const { leading = false, trailing = true } = options;
  const waitMs = debounceMs || 0;
  let maxWaitMs: number | undefined = undefined;

  if (options.maxWait !== undefined) {
    maxWaitMs = Math.max(options.maxWait || 0, waitMs);
  }

  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  let lastCalledAt: number | undefined = undefined;
  let maxWaitStartedAt = 0;
  const pendingCall: { thisArg: unknown; args: Parameters<F> | undefined } = { thisArg: undefined, args: undefined };
  let lastResult: ReturnType<F> | undefined = undefined;

  function debounced(this: unknown, ...args: Parameters<F>): ReturnType<F> | undefined {
    const now = Date.now();
    const isDue = isInvokeDue(now);
    const isTimerRunning = timer !== undefined;

    pendingCall.thisArg = this;
    pendingCall.args = args;
    lastCalledAt = now;

    if (isDue && !isTimerRunning) {
      return handleLeadingEdge(now);
    }

    // Calls in a tight loop never let the timer fire, so `maxWait` is enforced here too,
    // regardless of `leading` and `trailing` (as in Lodash).
    if (isDue && maxWaitMs !== undefined) {
      clearTimeout(timer);
      startTimer(now, waitMs);
      return invokePendingCall(now);
    }

    if (!isTimerRunning) {
      startTimer(now, waitMs);
    }

    return lastResult;
  }

  function cancel(): void {
    clearTimeout(timer);
    timer = undefined;
    lastCalledAt = undefined;
    maxWaitStartedAt = 0;
    clearPendingCall();
  }

  function flush(): ReturnType<F> | undefined {
    if (timer === undefined) {
      return lastResult;
    }

    // Like Lodash, the timer set before the flush keeps running.
    // Clearing it would change when the next `maxWait` invocation happens.
    return handleTrailingEdge(Date.now());
  }

  function onTimerExpired(dueAt: number): void {
    const now = Date.now();
    // Node.js timers can fire about 1ms before `Date.now()` reaches `dueAt`.
    const checkedAt = Math.max(now, dueAt);

    if (isInvokeDue(checkedAt)) {
      handleTrailingEdge(now);
      return;
    }

    startTimer(now, getRemainingWaitMs(checkedAt));
  }

  function isInvokeDue(time: number): boolean {
    if (lastCalledAt === undefined) {
      return true;
    }

    const msSinceLastCall = time - lastCalledAt;
    const isWaitOver = msSinceLastCall >= waitMs;
    const hasClockMovedBackward = msSinceLastCall < 0;
    const isMaxWaitOver = maxWaitMs !== undefined && time - maxWaitStartedAt >= maxWaitMs;

    return isWaitOver || hasClockMovedBackward || isMaxWaitOver;
  }

  function getRemainingWaitMs(time: number): number {
    const msUntilWaitEnds = waitMs - (time - (lastCalledAt as number));

    if (maxWaitMs === undefined) {
      return msUntilWaitEnds;
    }

    const msUntilMaxWaitEnds = maxWaitMs - (time - maxWaitStartedAt);

    return Math.min(msUntilWaitEnds, msUntilMaxWaitEnds);
  }

  function handleLeadingEdge(now: number): ReturnType<F> | undefined {
    maxWaitStartedAt = now;
    startTimer(now, waitMs);

    if (leading) {
      return invokePendingCall(now);
    }

    return lastResult;
  }

  function handleTrailingEdge(now: number): ReturnType<F> | undefined {
    const hasPendingCall = pendingCall.args !== undefined;

    timer = undefined;

    if (trailing && hasPendingCall) {
      return invokePendingCall(now);
    }

    clearPendingCall();
    return lastResult;
  }

  function invokePendingCall(now: number): ReturnType<F> {
    const thisArg = pendingCall.thisArg;
    const args = pendingCall.args as Parameters<F>;

    clearPendingCall();
    maxWaitStartedAt = now;

    const result: ReturnType<F> = func.apply(thisArg, args);

    lastResult = result;
    return result;
  }

  function clearPendingCall(): void {
    pendingCall.thisArg = undefined;
    pendingCall.args = undefined;
  }

  function startTimer(now: number, delayMs: number): void {
    const cappedDelayMs = Math.min(delayMs, MAX_SET_TIMEOUT_DELAY);
    const dueAt = now + cappedDelayMs;

    const nextTimer = setTimeout(() => onTimerExpired(dueAt), cappedDelayMs) as ReturnType<typeof setTimeout> & {
      unref?: () => void;
    };

    timer = nextTimer;

    // Without a trailing call the timer only tracks time, so it should not keep Node.js running.
    if (!trailing) {
      nextTimer.unref?.();
    }
  }

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}
