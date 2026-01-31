/**
 * A Node.js-style callback function type used by fromCallback.
 *
 * @template T - The type of the result value on success.
 */
type FromCallbackCallback<T> = (err: Error | null, result: T) => void;

/**
 * Creates a Promise from a function that takes a Node.js-style callback.
 *
 * This utility function wraps callback-based APIs and returns a Promise that:
 * - Resolves with the result when the callback is called with `(null, result)`
 * - Rejects with the error when the callback is called with `(error, ...)`
 *
 * @template T - The type of the resolved value.
 * @param {(callback: FromCallbackCallback<T>) => void} fn - A function that accepts a Node.js-style callback.
 * @returns {Promise<T>} A Promise that resolves or rejects based on the callback invocation.
 *
 * @example
 * // Basic usage
 * import { fromCallback } from 'es-toolkit/promise';
 *
 * const result = await fromCallback<string>(callback => {
 *   // Simulating an async operation
 *   setTimeout(() => callback(null, 'success'), 100);
 * });
 * console.log(result); // 'success'
 *
 * @example
 * // Error handling
 * try {
 *   await fromCallback(callback => {
 *     callback(new Error('Something went wrong'), null);
 *   });
 * } catch (error) {
 *   console.error(error.message); // 'Something went wrong'
 * }
 *
 * @example
 * // Wrapping Node.js-style APIs
 * import { readFile } from 'fs';
 *
 * const content = await fromCallback<Buffer>(callback => {
 *   readFile('example.txt', callback);
 * });
 */
export function fromCallback<T>(fn: (callback: FromCallbackCallback<T>) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
