import { delay } from './delay';
import { TimeoutError } from '../error';

/**
 * If it responds later than the specified time, it is treated as a `TimeoutError` error.
 *
 * This function returns a Promise that resolves after the specified timeout, allowing you to use it
 * with async/await to timeout execution.
 *
 * @param {number} ms - The number of milliseconds to timeout.
 * @returns {Promise<void>} A Promise that resolves after the specified timeout.
 *
 * @example
 * try {
 *   await timeout(1000); // Timeout exception after 1 second
 * } catch (error) {
 *   console.error(error); // Will log 'TimeoutError'
 * }
 */
export async function timeout(ms: number): Promise<void> {
  await delay(ms);
  throw new TimeoutError();
}
