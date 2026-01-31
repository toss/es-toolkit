import { withCallback, DualModeFunction } from './withCallback';

/**
 * Options for the withCallbackAll function.
 */
export interface WithCallbackAllOptions {
  /**
   * An array of method names to exclude from wrapping.
   */
  exclude?: string[];
  /**
   * An array of method names to strictly include. If provided, only these will be wrapped.
   */
  include?: string[];
}

/**
 * The return type with wrapped dual-mode methods.
 */
type WithCallbackAllResult<T extends object> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => Promise<infer R> ? DualModeFunction<Args, R> : T[K];
};

/**
 * Wraps all async methods in an object with `withCallback` to support both Promise and callback APIs.
 *
 * Each async method will be replaced with a dual-mode function that can be called either:
 * - Without a callback: returns a Promise
 * - With a callback as the last argument: invokes the callback with the result
 *
 * @template T - The type of the input object.
 * @param {T} object - The object containing async methods to wrap.
 * @param {WithCallbackAllOptions} [options] - Configuration options.
 * @returns {WithCallbackAllResult<T>} The object with wrapped dual-mode methods.
 *
 * @example
 * // Basic usage
 * import { withCallbackAll } from 'es-toolkit/promise';
 *
 * const api = {
 *   async getUser(id: number) {
 *     return { id, name: 'John' };
 *   },
 *   async saveUser(user: { name: string }) {
 *     return { id: 1, ...user };
 *   }
 * };
 *
 * const dualApi = withCallbackAll(api);
 *
 * // Use as Promise
 * const user = await dualApi.getUser(1);
 *
 * // Use with callback
 * dualApi.getUser(1, (err, user) => {
 *   if (err) {
 *     console.error(err);
 *   } else {
 *     console.log(user); // { id: 1, name: 'John' }
 *   }
 * });
 *
 * @example
 * // With exclude filter
 * const dualApi = withCallbackAll(api, { exclude: ['saveUser'] });
 * // Only getUser is wrapped, saveUser remains Promise-only
 */
export function withCallbackAll<T extends object>(
  object: T,
  options?: WithCallbackAllOptions
): WithCallbackAllResult<T> {
  const exclude = new Set(options?.exclude ?? []);
  const include = options?.include ? new Set(options.include) : null;

  const processKey = (key: string) => {
    if (include && !include.has(key)) {
      return;
    }
    if (exclude.has(key)) {
      return;
    }
    if (key === 'constructor') {
      return;
    }

    const descriptor =
      Object.getOwnPropertyDescriptor(object, key) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), key);

    if (!descriptor || typeof descriptor.value !== 'function') {
      return;
    }

    const originalFn = descriptor.value;

    // Wrap the method with withCallback, binding to the object
    const wrappedFn = withCallback(originalFn.bind(object));

    Object.defineProperty(object, key, {
      value: wrappedFn,
      writable: true,
      enumerable: descriptor.enumerable,
      configurable: true,
    });
  };

  // Iterate own properties
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      processKey(key);
    }
  }

  // Iterate prototype properties (for class instances)
  const prototype = Object.getPrototypeOf(object);
  if (prototype && prototype !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(prototype)) {
      processKey(key);
    }
  }

  return object as WithCallbackAllResult<T>;
}
