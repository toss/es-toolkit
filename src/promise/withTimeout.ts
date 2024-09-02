import { timeout } from './timeout.ts';

/**
 * Executes an async function and enforces a timeout.
 *
 * If the promise does not resolve within the specified time,
 * the timeout will trigger and the returned promise will be rejected.
 *
 *
 * @template T
 * @param run - A function that returns a promise to be executed.
 * @param ms - The timeout duration in milliseconds.
 * @returns A promise that resolves with the result of the `run` function or rejects if the timeout is reached.
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
