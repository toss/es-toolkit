import { asCallback, NodeStyleCallback } from './asCallback';

/**
 * Options for the asCallbackAll function.
 */
export interface AsCallbackAllOptions {
  /**
   * An array of method names to exclude from conversion.
   */
  exclude?: string[];
  /**
   * An array of method names to strictly include. If provided, only these will be converted.
   */
  include?: string[];
  /**
   * The suffix to append to the callback-style methods. Defaults to 'Callback'.
   */
  suffix?: string;
  /**
   * The `this` context to bind the methods to. Defaults to the object itself.
   */
  context?: object;
}

/**
 * Extracts only the async function properties from a type.
 */
type AsyncFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: infer _Args) => Promise<infer _R> ? K : never;
}[keyof T];

/**
 * Creates the callback-style method type for a given async function.
 */
type AsCallbackMethod<T> = T extends (...args: infer Args) => Promise<infer R>
  ? (...args: [...Args, NodeStyleCallback<R>]) => void
  : never;

/**
 * The return type with appended callback methods.
 */
type AsCallbackAllResult<T extends object, S extends string> = T & {
  [K in AsyncFunctionKeys<T> as `${string & K}${S}`]: AsCallbackMethod<T[K]>;
};

/**
 * Converts all async methods in an object to callback-style methods using `asCallback`.
 *
 * For each async method in the object, a new method is created with the specified suffix
 * (default: 'Callback') that accepts a Node.js-style callback as its last argument.
 *
 * This is similar to `callbackifyAll` but uses `asCallback` internally, which means
 * the callback is attached to the promise rather than replacing the promise interface.
 *
 * @template T - The type of the input object.
 * @template Suffix - The suffix string type.
 * @param {T} object - The object containing async methods to convert.
 * @param {AsCallbackAllOptions} [options] - Configuration options.
 * @returns {AsCallbackAllResult<T, Suffix>} The object with added callback-style methods.
 *
 * @example
 * // Basic usage
 * import { asCallbackAll } from 'es-toolkit/promise';
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
 * const callbackApi = asCallbackAll(api);
 *
 * // Original methods still work
 * const user = await callbackApi.getUser(1);
 *
 * // New callback methods are available
 * callbackApi.getUserCallback(1, (err, user) => {
 *   if (err) {
 *     console.error(err);
 *   } else {
 *     console.log(user); // { id: 1, name: 'John' }
 *   }
 * });
 *
 * @example
 * // With custom suffix
 * const callbackApi = asCallbackAll(api, { suffix: 'Cb' });
 * callbackApi.getUserCb(1, (err, user) => {
 *   console.log(user);
 * });
 */
export function asCallbackAll<T extends object, Suffix extends string = 'Callback'>(
  object: T,
  options?: AsCallbackAllOptions
): AsCallbackAllResult<T, Suffix> {
  const suffix = options?.suffix ?? 'Callback';
  const exclude = new Set(options?.exclude ?? []);
  const include = options?.include ? new Set(options.include) : null;
  const context = options?.context ?? object;

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

    const callbackKey = `${key}${suffix}`;

    if (!(callbackKey in object)) {
      const originalFn = descriptor.value;

      // Create a callback-style version using asCallback
      const callbackFn = function (...args: unknown[]): void {
        const callback = args.pop() as NodeStyleCallback<unknown>;
        const promise = originalFn.apply(context, args) as Promise<unknown>;
        asCallback(promise, callback);
      };

      Object.defineProperty(object, callbackKey, {
        value: callbackFn,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    }
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

  return object as AsCallbackAllResult<T, Suffix>;
}
