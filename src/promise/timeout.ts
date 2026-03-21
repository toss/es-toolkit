import { delay } from './delay.ts';
import { TimeoutError } from '../error/TimeoutError.ts';

interface TimeoutOptions {
  signal?: AbortSignal;
}

/**
 * Returns a promise that rejects with a `TimeoutError` after a specified delay.
 *
 * @param {number} ms - The delay duration in milliseconds.
 * @param {TimeoutOptions} options - The options object.
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the timeout.
 * @returns {Promise<never>} A promise that rejects with a `TimeoutError` after the specified delay.
 * @throws {TimeoutError} Throws a `TimeoutError` after the specified delay.
 *
 * @example
 * try {
 *   await timeout(1000); // Timeout exception after 1 second
 * } catch (error) {
 *   console.error(error); // Will log 'The operation was timed out'
 * }
 *
 * // With AbortSignal
 * const controller = new AbortController();
 * const { signal } = controller;
 * setTimeout(() => controller.abort(), 50);
 * try {
 *   await timeout(1000, { signal }); // Will be aborted after 50ms
 * } catch (error) {
 *   console.error(error); // Will log 'The operation was aborted'
 * }
 */
export async function timeout(ms: number, { signal }: TimeoutOptions = {}): Promise<never> {
  await delay(ms, { signal });
  throw new TimeoutError();
}
