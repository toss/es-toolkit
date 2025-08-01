import { delay as delayToolkit } from '../promise/delay.ts';

interface RetryOptions<E> {
  /**
   * Delay between retries. Can be a static number (milliseconds) or a function
   * that computes delay dynamically based on the current attempt.
   *
   * @default 0
   * @example
   * delay: (attempts) => attempt * 50
   */
  delay?: number | ((attempts: number) => number);

  /**
   * The number of retries to attempt.
   * @default Number.POSITIVE_INFINITY
   */
  retries?: number;

  /**
   * An AbortSignal to cancel the retry operation.
   */
  signal?: AbortSignal;

  /**
   * A function that determines whether to retry the operation.
   * @default () => true
   */
  shouldRetry?: (error: E) => boolean;
}

const DEFAULT_DELAY = 0;
const DEFAULT_RETRIES = Number.POSITIVE_INFINITY;

/**
 * Retries a function that returns a promise until it resolves successfully.
 *
 * @template T - The type of the result of the function.
 * @param {() => Promise<T>} func - The function to retry.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 *
 * @example
 * // Basic usage with default retry options
 * retry(() => fetchData()).then(data => console.log(data));
 */
export async function retry<T>(func: () => Promise<T>): Promise<T>;

/**
 * Retries a function that returns a promise a specified number of times.
 *
 * @template T - The type of the result of the function.
 * @param {() => Promise<T>} func - The function to retry. It should return a promise.
 * @param {number} retries - The number of retries to attempt. Default is Infinity.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 *
 * @example
 * // Retry a function up to 3 times
 * retry(() => fetchData(), 3).then(data => console.log(data));
 */
export async function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;

/**
 * Retries a function that returns a promise with specified options.
 *
 * @template T - The type of the result of the function.
 * @template E - The type of the error thrown by the function.
 * @param {() => Promise<T>} func - The function to retry. It should return a promise.
 * @param {RetryOptions<E>} options - Options to configure the retry behavior.
 * @param {number | ((attempts: number) => number)} [options.delay=0] - Delay(milliseconds) between retries.
 * @param {number} [options.retries=Infinity] - The number of retries to attempt.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel the retry operation.
 * @param {(error: E) => boolean} [options.shouldRetry] - A function that determines whether to retry the operation.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 *
 * @example
 * // Retry a function with a delay of 1000ms between attempts
 * retry(() => fetchData(), { delay: 1000, times: 5 }).then(data => console.log(data));
 *
 * @example
 * // Retry a function with a fixed delay
 * retry(() => fetchData(), { delay: 1000, retries: 5 });
 *
 * // Retry a function with a delay increasing linearly by 50ms per attempt
 * retry(() => fetchData(), { delay: (attempts) => attempt * 50, retries: 5 });
 *
 * @example
 * // Retry a function with exponential backoff + jitter (max delay 10 seconds)
 * retry(() => fetchData(), {
 *   delay: (attempts) => Math.min(Math.random() * 100 * 2 ** attempts, 10000),
 *   retries: 5
 * });
 */
export async function retry<T, E>(func: () => Promise<T>, options: RetryOptions<E>): Promise<T>;

/**
 * Retries a function that returns a promise with specified options.
 *
 * @template T - The type of the value returned by the function.
 * @param {() => Promise<T>} func - The function to retry. It should return a promise.
 * @param {number | RetryOptions} [_options] - Either the number of retries or an options object.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 */
export async function retry<T, E>(func: () => Promise<T>, _options?: number | RetryOptions<E>): Promise<T> {
  let delay: number | ((attempts: number) => number);
  let retries: number;
  let signal: AbortSignal | undefined;
  let shouldRetry: (error: E) => boolean;

  if (typeof _options === 'number') {
    delay = DEFAULT_DELAY;
    retries = _options;
    signal = undefined;
    shouldRetry = () => true;
  } else {
    delay = _options?.delay ?? DEFAULT_DELAY;
    retries = _options?.retries ?? DEFAULT_RETRIES;
    signal = _options?.signal;
    shouldRetry = _options?.shouldRetry ?? (() => true);
  }

  let error;

  for (let attempts = 0; attempts < retries; attempts++) {
    if (signal?.aborted) {
      throw error ?? new Error(`The retry operation was aborted due to an abort signal.`);
    }

    try {
      return await func();
    } catch (err) {
      error = err;

      if (!shouldRetry(err as E)) {
        throw error ?? new Error(`The retry operation was aborted due to shouldRetry returning false.`);
      }

      const currentDelay = typeof delay === 'function' ? delay(attempts) : delay;
      await delayToolkit(currentDelay);
    }
  }

  throw error;
}
