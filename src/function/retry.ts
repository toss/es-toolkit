import { delay } from '../promise';

interface RetryOptions {
  /**
   * The number of milliseconds to interval delay.
   */
  intervalMs: number;

  /**
   * The number of retries to attempt
   */
  retries: number;
}
/**
 * Function for asynchronous retry
 *
 * This function can set the retry interval and the number of retries, and throw an Error after the maximum number of retries is reached.
 *
 * @template F - The type of the function to be invoked.
 * @param {F} func - The function to be invoked.
 * @param {RetryOptions} options - The options object
 * @returns {Awaited<ReturnType<F>>} - Function return value
 * @throws {Error} - Throws an error if the maximum number of retries is exceeded.
 * @example
 *
 * async function getNumber() {
 *  return Promise.resolve(3);
 * }
 * async function getError() {
 *  return Promise.reject(new Error('MyFailed'));
 * }
 * // The result will be 3
 * await retry(getNumber, {
 *  intervalMs: 1000,
 *  retries: 2,
 * });
 * // After executing twice, an exception is thrown
 * await retry(getError, {
 *  intervalMs: 1000,
 *  retries: 2,
 * });
 */

export async function retry<T>(func: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { intervalMs, retries } = options;

  for (let i = 0; i < retries; i++) {
    try {
      return await func();
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      await delay(intervalMs);
    }
  }
  throw new Error('Failed after maximum retries');
}

/* async function getNumber() {
  return Promise.resolve(3);
}
async function getError() {
  return Promise.reject(new Error('MyFailed'));
}
// The result will be 3
await retry(getNumber, {
  intervalMs: 1000,
  retries: 2,
});
// After executing twice, an exception is thrown
await retry(getError, {
  intervalMs: 1000,
  retries: 2,
});

 */
