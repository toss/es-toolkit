import { delay as delayToolkit } from '../promise';

interface RetryOptions {
  /**
   * The number of milliseconds to interval delay.
   * @default 0
   */
  delay?: number;

  /**
   * The number of retries to attempt.
   * @default Number.POSITIVE_INFINITY
   */
  retries?: number;

  /**
   * An AbortSignal to cancel the retry operation.
   */
  signal?: AbortSignal;
}

const DEFAULT_DELAY = 0;
const DEFAULT_RETRIES = Number.POSITIVE_INFINITY;

/**
 * Retries a function that returns a promise until it resolves successfully.
 *
 * @template T
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
 * @template T
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
 * @template T
 * @param {() => Promise<T>} func - The function to retry. It should return a promise.
 * @param {RetryOptions} options - Options to configure the retry behavior.
 * @param {number} [options.delay=0] - The number of milliseconds to wait between retries.
 * @param {number} [options.retries=Infinity] - The number of retries to attempt.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel the retry operation.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 *
 * @example
 * // Retry a function with a delay of 1000ms between attempts
 * retry(() => fetchData(), { delay: 1000, times: 5 }).then(data => console.log(data));
 */
export async function retry<T>(func: () => Promise<T>, options: RetryOptions): Promise<T>;

/**
 * Retries a function that returns a promise with specified options.
 *
 * @template T
 * @param {() => Promise<T>} func - The function to retry. It should return a promise.
 * @param {number | RetryOptions} [_options] - Either the number of retries or an options object.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 */
export async function retry<T>(func: () => Promise<T>, _options?: number | RetryOptions): Promise<T> {
  let delay: number;
  let retries: number;
  let signal: AbortSignal | undefined;

  if (typeof _options === 'number') {
    delay = DEFAULT_DELAY;
    retries = _options;
    signal = undefined;
  } else {
    delay = _options?.delay ?? DEFAULT_DELAY;
    retries = _options?.retries ?? DEFAULT_RETRIES;
    signal = _options?.signal;
  }

  let error;

  for (let i = 0; i < retries; i++) {
    if (signal?.aborted) {
      throw error ?? new Error(`The retry operation was aborted due to an abort signal.`);
    }

    try {
      return await func();
    } catch (err) {
      error = err;
      await delayToolkit(delay);
    }
  }

  throw error;
}
