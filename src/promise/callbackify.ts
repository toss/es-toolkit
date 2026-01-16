/**
 * A Node.js-style callback function type.
 *
 * @template Result - The type of the result value on success.
 */
export type NodeCallback<Result> = (err: Error | null, result: Result) => void;

/**
 * Options for the callbackify function.
 */
export interface CallbackifyOptions {
  /**
   * The `this` context to bind the function to.
   * If not provided, the context from the call site will be used.
   */
  context?: object;
}

/**
 * Converts a function that returns a promise into a function that accepts a Node.js-style callback.
 *
 * This is the inverse of `promisify`. It takes an async function and returns a new function
 * that accepts a callback `(error, result) => void` as its last argument.
 *
 * @template Args - The tuple type of the function's arguments.
 * @template Result - The type of the resolved value.
 * @param {(...args: Args) => Promise<Result>} fn - The async function to convert.
 * @param {CallbackifyOptions} [options] - Configuration options.
 * @returns {(...args: [...Args, NodeCallback<Result>]) => void} A new function that accepts a callback.
 *
 * @example
 * // Basic usage
 * import { callbackify } from 'es-toolkit/promise';
 *
 * async function fetchData(id: number): Promise<string> {
 *   return `Data for ${id}`;
 * }
 *
 * const fetchDataCallback = callbackify(fetchData);
 *
 * fetchDataCallback(123, (err, result) => {
 *   if (err) {
 *     console.error('Error:', err);
 *   } else {
 *     console.log('Result:', result); // Result: Data for 123
 *   }
 * });
 *
 * @example
 * // With context binding
 * const service = {
 *   baseUrl: 'https://api.example.com',
 *   async fetch(endpoint: string): Promise<string> {
 *     return `${this.baseUrl}/${endpoint}`;
 *   }
 * };
 *
 * const fetchWithCallback = callbackify(service.fetch, { context: service });
 *
 * fetchWithCallback('users', (err, result) => {
 *   console.log(result); // https://api.example.com/users
 * });
 */
export function callbackify<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  options?: CallbackifyOptions
): (...args: [...Args, NodeCallback<Result>]) => void {
  return function (this: object, ...args: [...Args, NodeCallback<Result>]) {
    const callback = args.pop() as NodeCallback<Result>;
    const params = args as unknown as Args;
    const context = options?.context ?? this;

    fn.apply(context, params)
      .then(val => callback(null, val))
      .catch((err: unknown) => callback(err instanceof Error ? err : new Error(String(err)), undefined as Result));
  };
}
