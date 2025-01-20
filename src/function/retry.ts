import { isNumber as isNumberToolkit } from '../compat';
import { delay as delayToolkit } from '../promise';

interface RetryOptions {
  /**
   * The minimum delay in milliseconds before starting retries.
   * @default 0
   */
  retryMinDelay?: number;

  /**
   * The maximum delay in milliseconds between retries.
   * @default Infinity
   */
  retryMaxDelay?: number;

  /**
   * The exponential factor to use for increasing retry delay.
   * @default 2
   */
  factor?: number;

  /**
   * Whether to randomize the retry delay by a factor between 1 and 2.
   * @default false
   */
  randomize?: boolean;

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

const DEFAULT_RETRIES = Number.POSITIVE_INFINITY;
const DEFAULT_MIN_DELAY = 0;
const DEFAULT_MAX_DELAY = Number.POSITIVE_INFINITY;
const DEFAULT_FACTOR = 2;
const DEFAULT_RANDOMIZE = false;

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
 * @param {number} [options.retries=Infinity] - The number of retries to attempt. Default is Infinity.
 * @param {number} [options.retryMinDelay=0] - The minimum delay in milliseconds between retry attempts. Default is 0.
 * @param {number} [options.retryMaxDelay=Infinity] - The maximum delay in milliseconds between retry attempts. Default is Infinity.
 * @param {number} [options.factor=2] - The exponential factor to use for increasing retry delay. Default is 2.
 * @param {boolean} [options.randomize=false] - Whether to randomize the retry delay by a factor between 1 and 2. Default is false.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel the retry operation.
 * @returns {Promise<T>} A promise that resolves with the value of the successful function call.
 *
 * @example
 * // Retry a function with fixed delay of 1000ms and no exponential backoff
 * retry(() => fetchData(), { retryMinDelay: 1000, retryMaxDelay: 1000, factor: 1, retries: 3 })
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
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
  let retries: number;
  let signal: AbortSignal | undefined;
  let retryMinDelay: number;
  let retryMaxDelay: number;
  let factor: number;
  let randomize: boolean;

  if (isNumberToolkit(_options)) {
    retries = _options;
    retryMinDelay = DEFAULT_MIN_DELAY;
    retryMaxDelay = DEFAULT_MAX_DELAY;
    factor = DEFAULT_FACTOR;
    randomize = DEFAULT_RANDOMIZE;
    signal = undefined;
  } else {
    retries = _options?.retries ?? DEFAULT_RETRIES;
    retryMinDelay = _options?.retryMinDelay ?? DEFAULT_MIN_DELAY;
    retryMaxDelay = _options?.retryMaxDelay ?? DEFAULT_MAX_DELAY;
    factor = _options?.factor ?? DEFAULT_FACTOR;
    randomize = _options?.randomize ?? DEFAULT_RANDOMIZE;
    signal = _options?.signal;
  }

  let error;

  for (let attempt = 0; attempt < retries; attempt++) {
    if (signal?.aborted) {
      throw error ?? new Error(`The retry operation was aborted due to an abort signal.`);
    }

    try {
      return await func();
    } catch (err) {
      error = err;

      const random = randomize ? Math.random() + 1 : 1;

      const delay = Math.min(Math.round(random * retryMinDelay * Math.pow(factor, attempt)), retryMaxDelay);

      await delayToolkit(delay);
    }
  }

  throw error;
}
