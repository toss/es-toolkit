import { timeout } from './timeout.ts';

interface WithTimeoutOptions {
  signal?: AbortSignal;
}

/**
 * Executes an async function and enforces a timeout.
 *
 * If the promise does not resolve within the specified time,
 * the timeout will trigger and the returned promise will be rejected.
 *
 * @template T
 * @param {() => Promise<T>} run - A function that returns a promise to be executed.
 * @param {number} ms - The timeout duration in milliseconds.
 * @param {WithTimeoutOptions} options - The options object.
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the operation.
 * @returns {Promise<T>} A promise that resolves with the result of the `run` function or rejects if the timeout is reached.
 *
 * @example
 * async function fetchData() {
 *   const response = await fetch('https://example.com/data');
 *   return response.json();
 * }
 *
 * try {
 *   const data = await withTimeout(fetchData, 1000);
 *   console.log(data); // Logs the fetched data if resolved within 1 second.
 * } catch (error) {
 *   console.error(error); // Will log 'TimeoutError' if not resolved within 1 second.
 * }
 *
 * // With AbortSignal
 * const controller = new AbortController();
 * const { signal } = controller;
 * const data = await withTimeout(async () => {
 *   const response = await fetch('https://example.com/data', { signal });
 *   return response.json();
 * }, 5000, { signal });
 */
export async function withTimeout<T>(run: () => Promise<T>, ms: number, { signal }: WithTimeoutOptions = {}): Promise<T> {
  return Promise.race([run(), timeout(ms, { signal })]);
}
