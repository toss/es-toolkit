interface ExponentialBackoffOptions {
  /**
   * The base delay in milliseconds for the first attempt.
   * @default 100
   */
  baseDelay?: number;
  /**
   * The maximum delay in milliseconds. The computed delay is capped at this
   * value.
   * @default Infinity
   */
  maxDelay?: number;
  /**
   * The multiplier applied to the delay for each subsequent attempt.
   * @default 2
   */
  multiplier?: number;
}

type DelayFn = (attempts: number) => number;

/**
 * Creates an exponential backoff delay function for use with {@link retry}.
 *
 * The returned function computes `baseDelay * multiplier^attempt`, capped at
 * `maxDelay`. See issue #1565.
 *
 * @param options - Backoff options.
 * @returns A delay function `(attempt) => milliseconds`.
 *
 * @example
 * import { retry, exponentialBackoff } from 'es-toolkit/function';
 * retry(() => fetchData(), { delay: exponentialBackoff(), retries: 5 });
 */
export function exponentialBackoff({
  baseDelay = 100,
  maxDelay = Number.POSITIVE_INFINITY,
  multiplier = 2,
}: ExponentialBackoffOptions = {}): DelayFn {
  return (attempt: number) => {
    const delay = baseDelay * Math.pow(multiplier, attempt);
    return Math.min(delay, maxDelay);
  };
}

/**
 * Wraps a delay function with full jitter: the returned delay is a uniformly
 * random value between 0 and the wrapped function's delay. See issue #1565.
 *
 * @param delayFn - The base delay function (e.g. from {@link exponentialBackoff}).
 * @returns A jittered delay function.
 */
export function withJitter(delayFn: DelayFn): DelayFn {
  return (attempt: number) => Math.random() * delayFn(attempt);
}

/**
 * Wraps a delay function with equal jitter: the returned delay is
 * `delay/2 + random(0, delay/2)`, guaranteeing a minimum of `delay/2`. See
 * issue #1565.
 *
 * @param delayFn - The base delay function.
 * @returns A jittered delay function.
 */
export function withEqualJitter(delayFn: DelayFn): DelayFn {
  return (attempt: number) => {
    const delay = delayFn(attempt);
    return delay / 2 + Math.random() * (delay / 2);
  };
}

/**
 * Creates a decorrelated jitter delay function (AWS Architecture Blog
 * pattern). Maintains internal state across calls: each delay is
 * `min(maxDelay, random(baseDelay, prev * 3))`, starting with `prev = baseDelay`.
 * See issue #1565.
 *
 * @param baseDelay - The base (minimum) delay in milliseconds. @default 100
 * @param maxDelay - The maximum delay in milliseconds. @default 30000
 * @returns A stateful delay function.
 *
 * @example
 * import { retry, withDecorrelatedJitter } from 'es-toolkit/function';
 * retry(() => fetchData(), { delay: withDecorrelatedJitter(100, 30000), retries: 5 });
 */
export function withDecorrelatedJitter(baseDelay = 100, maxDelay = 30000): DelayFn {
  let prev = baseDelay;
  return () => {
    const next = Math.min(maxDelay, baseDelay + Math.random() * (prev * 3 - baseDelay));
    prev = next;
    return next;
  };
}
