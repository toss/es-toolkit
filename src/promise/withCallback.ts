import { asCallback, NodeStyleCallback } from './asCallback';

/**
 * A dual-mode function that can be called with either a Promise return or a callback.
 *
 * @template Args - The tuple type of the function's arguments.
 * @template Result - The type of the resolved value.
 */
export interface DualModeFunction<Args extends unknown[], Result> {
  /**
   * Call without callback to get a Promise.
   */
  (...args: Args): Promise<Result>;
  /**
   * Call with callback for Node.js-style callback API.
   */
  (...args: [...Args, NodeStyleCallback<Result>]): void;
}

/**
 * Wraps a Promise-returning function to allow it to be called with an optional callback.
 *
 * This enables a Dual API where the function can be used either with Promises or
 * with Node.js-style callbacks. When called without a callback as the last argument,
 * it returns a Promise. When called with a callback, it invokes the callback with
 * the result.
 *
 * @template Args - The tuple type of the function's arguments.
 * @template Result - The type of the resolved value.
 * @param {(...args: Args) => Promise<Result>} fn - The async function to wrap.
 * @returns {DualModeFunction<Args, Result>} A function that supports both Promise and callback patterns.
 *
 * @example
 * // Basic usage
 * import { withCallback } from 'es-toolkit/promise';
 *
 * async function fetchUser(id: number): Promise<{ name: string }> {
 *   return { name: 'John' };
 * }
 *
 * const fetchUserDual = withCallback(fetchUser);
 *
 * // Use as Promise
 * const user = await fetchUserDual(1);
 * console.log(user.name); // 'John'
 *
 * // Use with callback
 * fetchUserDual(1, (err, user) => {
 *   if (err) {
 *     console.error(err);
 *   } else {
 *     console.log(user.name); // 'John'
 *   }
 * });
 *
 * @example
 * // Creating a library with dual API support
 * class UserService {
 *   private async fetchFromDb(id: number): Promise<User> {
 *     return db.users.find(id);
 *   }
 *
 *   getUser = withCallback(this.fetchFromDb.bind(this));
 * }
 *
 * const service = new UserService();
 *
 * // Consumers can use either style
 * const user = await service.getUser(1);
 * service.getUser(1, (err, user) => { ... });
 */
export function withCallback<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>
): DualModeFunction<Args, Result> {
  function dualMode(this: object, ...args: [...Args] | [...Args, NodeStyleCallback<Result>]): Promise<Result> | void {
    const lastArg = args[args.length - 1];

    if (typeof lastArg === 'function') {
      const callback = args.pop() as NodeStyleCallback<Result>;
      const promise = fn.apply(this, args as unknown as Args);
      asCallback(promise, callback);
      return;
    }

    return fn.apply(this, args as Args);
  }

  return dualMode as DualModeFunction<Args, Result>;
}
