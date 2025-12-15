/**
 * A Node.js-style callback function type.
 *
 * @template Result - The type of the result value on success.
 */
export type NodeStyleCallback<Result> = (err: Error | null, result: Result) => void;

/**
 * Options for the asCallback function.
 */
export interface AsCallbackOptions {
  /**
   * If true, errors thrown in the callback won't be re-thrown.
   * @default false
   */
  suppressErrors?: boolean;
}

/**
 * Registers a Node.js-style callback on a promise.
 *
 * This function attaches a callback to a promise, invoking it when the promise
 * settles. On success, the callback receives `(null, result)`. On failure, it
 * receives `(error, undefined)`.
 *
 * @template Result - The type of the resolved value.
 * @param {Promise<Result>} promise - The promise to attach the callback to.
 * @param {NodeStyleCallback<Result>} callback - The Node.js-style callback function.
 * @returns {Promise<Result>} The original promise (for chaining).
 *
 * @example
 * // Basic usage
 * import { asCallback } from 'es-toolkit/promise';
 *
 * const promise = Promise.resolve(42);
 * asCallback(promise, (err, result) => {
 *   if (err) {
 *     console.error('Error:', err);
 *   } else {
 *     console.log('Result:', result); // Result: 42
 *   }
 * });
 *
 * @example
 * // Error handling
 * const failingPromise = Promise.reject(new Error('Something went wrong'));
 * asCallback(failingPromise, (err, result) => {
 *   if (err) {
 *     console.error('Error:', err.message); // Error: Something went wrong
 *   }
 * });
 */
export function asCallback<Result>(
  promise: Promise<Result>,
  callback: NodeStyleCallback<Result>
): Promise<Result> {
  promise.then(
    result => {
      queueMicrotask(() => callback(null, result));
    },
    err => {
      const error = err instanceof Error ? err : new Error(String(err));
      queueMicrotask(() => callback(error, undefined as Result));
    }
  );
  return promise;
}

/**
 * Alias for asCallback.
 *
 * @see {@link asCallback}
 */
export const nodeify = asCallback;
