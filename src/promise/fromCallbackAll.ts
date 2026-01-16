/**
 * A Node.js-style callback function type used by fromCallbackAll.
 */
type FromCallbackAllCallback<T> = (err: Error | null, result: T) => void;

/**
 * Options for the fromCallbackAll function.
 */
export interface FromCallbackAllOptions {
  /**
   * An array of method names to exclude from conversion.
   */
  exclude?: string[];
  /**
   * An array of method names to strictly include. If provided, only these will be converted.
   */
  include?: string[];
  /**
   * The suffix to append to the converted methods. Defaults to 'Async'.
   */
  suffix?: string;
  /**
   * The `this` context to bind the methods to. Defaults to the object itself.
   */
  context?: object;
}

/**
 * Extracts only the callback-style function properties from a type.
 */
type CallbackFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: infer _Args) => void ? K : never;
}[keyof T];

/**
 * Extracts the promisified return type from a callback-style function.
 */
type PromisifyFromCallbackMethod<T> = T extends (
  ...args: [...infer Args, FromCallbackAllCallback<infer R>]
) => void
  ? (...args: Args) => Promise<R>
  : never;

/**
 * The return type with appended async methods.
 */
type FromCallbackAllResult<T extends object, S extends string> = T & {
  [K in CallbackFunctionKeys<T> as `${string & K}${S}`]: PromisifyFromCallbackMethod<T[K]>;
};

/**
 * Converts all callback-style functions in an object to Promise-based functions.
 *
 * For each function in the object that follows the Node.js callback pattern
 * `(args..., callback) => void`, a new method is created with the specified
 * suffix (default: 'Async') that returns a Promise.
 *
 * This is similar to `promisifyAll` but uses the `fromCallback` pattern internally.
 *
 * @template T - The type of the input object.
 * @template Suffix - The suffix string type.
 * @param {T} object - The object containing callback-style functions to convert.
 * @param {FromCallbackAllOptions} [options] - Configuration options.
 * @returns {FromCallbackAllResult<T, Suffix>} The object with added Promise-based methods.
 *
 * @example
 * // Basic usage
 * import { fromCallbackAll } from 'es-toolkit/promise';
 *
 * const fs = {
 *   readFile(path: string, callback: (err: Error | null, data: string) => void) {
 *     callback(null, 'file content');
 *   },
 *   writeFile(path: string, data: string, callback: (err: Error | null) => void) {
 *     callback(null);
 *   }
 * };
 *
 * const asyncFs = fromCallbackAll(fs);
 *
 * // Original methods still work
 * asyncFs.readFile('test.txt', (err, data) => console.log(data));
 *
 * // New async methods are available
 * const data = await asyncFs.readFileAsync('test.txt');
 * console.log(data); // 'file content'
 *
 * @example
 * // With custom suffix
 * const asyncFs = fromCallbackAll(fs, { suffix: 'Promise' });
 * const data = await asyncFs.readFilePromise('test.txt');
 */
export function fromCallbackAll<T extends object, Suffix extends string = 'Async'>(
  object: T,
  options?: FromCallbackAllOptions
): FromCallbackAllResult<T, Suffix> {
  const suffix = options?.suffix ?? 'Async';
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

    const asyncKey = `${key}${suffix}`;

    if (!(asyncKey in object)) {
      const originalFn = descriptor.value;

      // Create a promisified version using fromCallback pattern
      const promisifiedFn = function (...args: unknown[]): Promise<unknown> {
        return new Promise((resolve, reject) => {
          const callback = (err: Error | null, result: unknown) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          };

          originalFn.call(context, ...args, callback);
        });
      };

      Object.defineProperty(object, asyncKey, {
        value: promisifiedFn,
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

  return object as FromCallbackAllResult<T, Suffix>;
}
