import { promisify, Callback } from './promisify';

/**
 * Options for the promisifyAll function.
 */
export interface PromisifyAllOptions {
  /**
   * An array of method names to exclude from promisification.
   */
  exclude?: string[];
  /**
   * An array of method names to strictly include. If provided, only these will be promisified.
   */
  include?: string[];
  /**
   * The suffix to append to the promisified methods. Defaults to 'Async'.
   */
  suffix?: string;
  /**
   * The `this` context to bind the methods to. Defaults to the object itself.
   */
  context?: object;
}

/**
 * Extracts only the function properties from a type that follow the callback pattern.
 */
type CallbackFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: infer _Args) => void ? K : never;
}[keyof T];

/**
 * Extracts the promisified return type from a callback-style function.
 */
type PromisifyMethod<T> = T extends (...args: [...infer Args, Callback<infer R>]) => void
  ? (...args: Args) => Promise<R>
  : T extends (...args: [...infer Args, (err: Error | null) => void]) => void
    ? (...args: Args) => Promise<void>
    : never;

/**
 * The return type with appended async methods.
 */
type PromisifyAllResult<T extends object, S extends string> = T & {
  [K in CallbackFunctionKeys<T> as `${string & K}${S}`]: PromisifyMethod<T[K]>;
};

/**
 * Promisifies all callback-style functions in an object.
 *
 * For each function in the object that follows the Node.js callback pattern
 * `(args..., callback) => void`, a new method is created with the specified
 * suffix (default: 'Async') that returns a Promise.
 *
 * @template T - The type of the input object.
 * @template Suffix - The suffix string type.
 * @param {T} object - The object containing callback-style functions to promisify.
 * @param {PromisifyAllOptions} [options] - Configuration options.
 * @returns {PromisifyAllResult<T, Suffix>} The object with added Promise-based methods.
 *
 * @example
 * // Basic usage
 * import { promisifyAll } from 'es-toolkit/promise';
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
 * const asyncFs = promisifyAll(fs);
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
 * const asyncFs = promisifyAll(fs, { suffix: 'Promise' });
 * const data = await asyncFs.readFilePromise('test.txt');
 *
 * @example
 * // With include filter
 * const asyncFs = promisifyAll(fs, { include: ['readFile'] });
 * // Only readFileAsync is created, writeFileAsync is not
 */
export function promisifyAll<T extends object, Suffix extends string = 'Async'>(
  object: T,
  options?: PromisifyAllOptions
): PromisifyAllResult<T, Suffix> {
  const suffix = options?.suffix ?? 'Async';
  const exclude = new Set(options?.exclude ?? []);
  const include = options?.include ? new Set(options.include) : null;
  const context = options?.context ?? object;

  const processKey = (key: string) => {
    // 1. Check Filters
    if (include && !include.has(key)) {
      return;
    }
    if (exclude.has(key)) {
      return;
    }
    if (key === 'constructor') {
      return;
    }

    // 2. Check value type
    const descriptor =
      Object.getOwnPropertyDescriptor(object, key) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), key);

    if (!descriptor || typeof descriptor.value !== 'function') {
      return;
    }

    // 3. Generate new key
    const asyncKey = `${key}${suffix}`;

    // 4. Promisify if not exists
    if (!(asyncKey in object)) {
      Object.defineProperty(object, asyncKey, {
        value: promisify(descriptor.value, { context }),
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

  return object as PromisifyAllResult<T, Suffix>;
}
