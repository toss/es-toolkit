import { AbortError, TimeoutError } from '../error';

interface TimeoutOptions {
  signal?: AbortSignal;
}

/**
 * If it responds later than the specified time, it is treated as a `TimeoutError` error.
 *
 * This function returns a Promise that resolves after the specified timeout, allowing you to use it
 * with async/await to timeout execution.
 *
 * @template T The type of promise value.
 * @param {T} value - The type of promise value.
 * @param {number} ms - The number of milliseconds to timeout.
 * @param {TimeoutOptions} options - The options object.
 * @param {AbortSignal} options.signal - An optional AbortSignal to cancel the timeout.
 * @returns {Promise<Awaited<T>>} A Promise that resolves after the specified timeout.
 *
 * @example
 * try {
 *  await timeout(
 *    new Promise(() => {}),
 *    1000,
 *   ); // Timeout exception after 1 second
 * } catch (error) {
 *   console.error(error); // Will log 'TimeoutError'
 * }
 *
 * // With AbortSignal
 * const controller = new AbortController();
 * const { signal } = controller;
 *
 * setTimeout(() => controller.abort(), 50); // Will cancel the timeout after 50ms
 * try {
 *   await timeout(
 *    new Promise(() => {}),
 *    1000,
 *    { signal }
 *   );
 *  } catch (error) {
 *   console.error(error); // Will log 'AbortError'
 *  }
 * }
 */
export async function timeout<T>(value: T, ms: number, { signal }: TimeoutOptions = {}): Promise<Awaited<T>> {
  return new Promise<Awaited<T>>((resolve, reject) => {
    const abortError = () => {
      reject(new AbortError());
    };

    const abortHandler = () => {
      clearTimeout(timeoutId);
      abortError();
    };

    if (signal?.aborted) {
      return abortError();
    }

    const timeoutId = setTimeout(() => {
      reject(new TimeoutError());
    }, ms);

    (async () => {
      const result = await value;

      clearTimeout(timeoutId);

      resolve(result);
    })();

    signal?.addEventListener('abort', abortHandler, { once: true });
  });
}
