import { timeout } from './timeout';

/**
 * If it responds later than the specified time, it is treated as a `TimeoutError` error.
 *
 * This function returns a Promise that resolves after the specified timeout, allowing you to use it
 * with async/await to timeout execution.
 *
 * @template T The type of promise run.
 * @param {T} run - The type of promise run.
 * @param {number} ms - The number of milliseconds to timeout.
 * @returns {Promise<Awaited<T>>} A Promise that resolves after the specified timeout.
 *
 * @example
 * try {
 *   await withTimeout(() => {}, 1000); // Timeout exception after 1 second
 * } catch (error) {
 *   console.error(error); // Will log 'TimeoutError'
 * }
 */
export async function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T> {
  return Promise.race([run(), timeout(ms) as T]);
}
