/**
 * A Node.js-style callback function type.
 *
 * @template Result - The type of the result value on success.
 */
export type Callback<Result> = (err: Error | null, result: Result) => void;

/**
 * Options for the promisify function.
 */
export interface PromisifyOptions {
  /**
   * The `this` context to bind when calling the function.
   * Useful for object methods that depend on `this`.
   */
  context?: object;
}

/**
 * Converts a callback-based function to a Promise-based function.
 *
 * Takes a function that accepts a Node.js-style callback `(error, result) => void` as its
 * last argument and returns a new function that returns a Promise. This is useful for
 * modernizing legacy codebases that use callback patterns.
 *
 * @template Args - The tuple type of the function's arguments (excluding the callback).
 * @template Result - The type of the result value.
 * @param {(...args: [...Args, Callback<Result>]) => void} fn - The callback-based function to convert.
 * @param {PromisifyOptions} [options] - Configuration options.
 * @returns {(...args: Args) => Promise<Result>} A new function that returns a Promise.
 *
 * @example
 * // Basic usage
 * import { promisify } from 'es-toolkit/promise';
 *
 * function readFile(path: string, callback: (err: Error | null, data: string) => void) {
 *   setTimeout(() => callback(null, 'file content'), 100);
 * }
 *
 * const readFileAsync = promisify(readFile);
 * const data = await readFileAsync('example.txt');
 * console.log(data); // 'file content'
 *
 * @example
 * // With context binding
 * const redis = {
 *   host: 'localhost',
 *   get(key: string, callback: (err: Error | null, value: string) => void) {
 *     callback(null, `value from ${this.host}`);
 *   },
 * };
 *
 * const redisGet = promisify(redis.get, { context: redis });
 * const value = await redisGet('myKey');
 * console.log(value); // 'value from localhost'
 */
export function promisify<Args extends unknown[], Result>(
  fn: (...args: [...Args, Callback<Result>]) => void,
  options?: PromisifyOptions
): (...args: Args) => Promise<Result> {
  return function (this: object, ...args: Args): Promise<Result> {
    const context = options?.context ?? this;

    return new Promise<Result>((resolve, reject) => {
      const callback: Callback<Result> = (err: Error | null, result: Result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };

      fn.call(context, ...args, callback);
    });
  };
}
