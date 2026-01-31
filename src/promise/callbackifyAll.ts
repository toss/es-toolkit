import { callbackify, NodeCallback } from './callbackify';

/**
 * Options for the callbackifyAll function.
 */
export interface CallbackifyAllOptions {
  /**
   * An array of method names to exclude from callbackification.
   */
  exclude?: string[];
  /**
   * An array of method names to strictly include. If provided, only these will be callbackified.
   */
  include?: string[];
  /**
   * The suffix to append to the callbackified methods. Defaults to 'Callback'.
   */
  suffix?: string;
  /**
   * The `this` context to bind the methods to. Defaults to the object itself.
   */
  context?: object;
}

/**
 * Extracts only the function properties from a type.
 */
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: infer _Args) => Promise<infer _R> ? K : never;
}[keyof T];

/**
 * Creates the callbackified method type for a given async function.
 */
type CallbackifyMethod<T> = T extends (...args: infer Args) => Promise<infer R>
  ? (...args: [...Args, NodeCallback<R>]) => void
  : never;

/**
 * The return type with appended callback methods.
 */
type CallbackifyAllResult<T extends object, S extends string> = T & {
  [K in FunctionKeys<T> as `${string & K}${S}`]: CallbackifyMethod<T[K]>;
};

/**
 * Converts all async methods in an object to callback-style methods.
 *
 * For each async method in the object, a new method is created with the specified suffix
 * (default: 'Callback') that accepts a Node.js-style callback as its last argument.
 *
 * @template T - The type of the input object.
 * @template Suffix - The suffix string type.
 * @param {T} object - The object containing async methods to convert.
 * @param {CallbackifyAllOptions} [options] - Configuration options.
 * @returns {CallbackifyAllResult<T, Suffix>} The object with added callback-style methods.
 *
 * @example
 * // Basic usage
 * import { callbackifyAll } from 'es-toolkit/promise';
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
 * const callbackApi = callbackifyAll(api);
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
 * const callbackApi = callbackifyAll(api, { suffix: 'Cb' });
 * callbackApi.getUserCb(1, (err, user) => {
 *   console.log(user);
 * });
 *
 * @example
 * // With include filter
 * const callbackApi = callbackifyAll(api, { include: ['getUser'] });
 * // Only getUserCallback is created, saveUserCallback is not
 */
export function callbackifyAll<T extends object, Suffix extends string = 'Callback'>(
  object: T,
  options?: CallbackifyAllOptions
): CallbackifyAllResult<T, Suffix> {
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

    const descriptor = Object.getOwnPropertyDescriptor(object, key) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), key);

    if (!descriptor || typeof descriptor.value !== 'function') {
      return;
    }

    const callbackKey = `${key}${suffix}`;
    if (!(callbackKey in object)) {
      Object.defineProperty(object, callbackKey, {
        value: callbackify(descriptor.value, { context }),
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

  return object as CallbackifyAllResult<T, Suffix>;
}
