import { isPrimitive } from '../predicate/isPrimitive.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

interface CloneRule {
  /**
   * Check if obj needs a custom clone
   * @param {any} obj The object to check.
   * @returns {boolean} if the object needs a custom clone or not.
   */
  check: (obj: any) => boolean;
  /**
   * The function to clone the object.
   * @param obj The object to clone.
   * @returns The cloned object.
   */
  clone: (obj: any) => any;
}

interface Options {
  customRules?: CloneRule[];
}

/**
 * Creates a deep clone of the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @param {Options} [options] - The options object.
 * @param {CloneRule[]} [options.customRules] - custom cloning rules for customizing cloning behavior.
 * @returns {T} - A deep clone of the given object.
 *
 * @example
 * // Clone a primitive values
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num) ; // true
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an array with nested objects
 * const arr = [1, { a: 1 }, [1, 2, 3]];
 * const clonedArr = clone(arr);
 * arr[1].a = 2;
 * console.log(arr); // [2, { a: 2 }, [1, 2, 3]]
 * console.log(clonedArr); // [1, { a: 1 }, [1, 2, 3]]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an object with nested objects
 * const obj = { a: 1, b: { c: 1 } };
 * const clonedObj = clone(obj);
 * obj.b.c = 2;
 * console.log(obj); // { a: 1, b: { c: 2 } }
 * console.log(clonedObj); // { a: 1, b: { c: 1 } }
 * console.log(clonedObj === obj); // false
 */
export function cloneDeep<T>(obj: T, options?: Options): T {
  return cloneDeepImpl(obj, undefined, options);
}

function cloneDeepImpl<T>(obj: T, stack = new Map<any, any>(), options?: Options): T {
  if (options?.customRules?.length) {
    for (const rule of options.customRules) {
      if (rule.check(obj)) {
        return rule.clone(obj);
      }
    }
  }

  if (isPrimitive(obj)) {
    return obj as T;
  }

  if (stack.has(obj)) {
    return stack.get(obj) as T;
  }

  if (Array.isArray(obj)) {
    const result: any = new Array(obj.length);
    stack.set(obj, result);

    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeepImpl(obj[i], stack, options);
    }

    // For RegExpArrays
    if (Object.prototype.hasOwnProperty.call(obj, 'index')) {
      // eslint-disable-next-line
      // @ts-ignore
      result.index = obj.index;
    }
    if (Object.prototype.hasOwnProperty.call(obj, 'input')) {
      // eslint-disable-next-line
      // @ts-ignore
      result.input = obj.input;
    }

    return result as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof RegExp) {
    const result = new RegExp(obj.source, obj.flags);

    result.lastIndex = obj.lastIndex;

    return result as T;
  }

  if (obj instanceof Map) {
    const result = new Map();
    stack.set(obj, result);

    for (const [key, value] of obj.entries()) {
      result.set(key, cloneDeepImpl(value, stack, options));
    }

    return result as T;
  }

  if (obj instanceof Set) {
    const result = new Set();
    stack.set(obj, result);

    for (const value of obj.values()) {
      result.add(cloneDeepImpl(value, stack, options));
    }

    return result as T;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(obj)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return obj.subarray() as T;
  }

  if (isTypedArray(obj)) {
    const result = new (Object.getPrototypeOf(obj).constructor)(obj.length);
    stack.set(obj, result);

    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeepImpl(obj[i], stack, options);
    }

    return result as T;
  }

  if (obj instanceof ArrayBuffer || (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer)) {
    return obj.slice(0) as T;
  }

  if (obj instanceof DataView) {
    const result = new DataView(obj.buffer.slice(0));
    stack.set(obj, result);

    copyProperties(result, obj, stack, options);

    return result as T;
  }

  // For legacy NodeJS support
  if (typeof File !== 'undefined' && obj instanceof File) {
    const result = new File([obj], obj.name, { type: obj.type });
    stack.set(obj, result);

    copyProperties(result, obj, stack, options);

    return result as T;
  }

  if (obj instanceof Blob) {
    const result = new Blob([obj], { type: obj.type });
    stack.set(obj, result);

    copyProperties(result, obj, stack, options);

    return result as T;
  }

  if (obj instanceof Error) {
    const result = new (obj.constructor as { new (): Error })();
    stack.set(obj, result);

    result.message = obj.message;
    result.name = obj.name;
    result.stack = obj.stack;
    result.cause = obj.cause;

    copyProperties(result, obj, stack, options);

    return result as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    stack.set(obj, result);

    copyProperties(result, obj, stack, options);

    return result as T;
  }

  return obj;
}

// eslint-disable-next-line
export function copyProperties(target: any, source: any, stack?: Map<any, any>, options?: Options): void {
  const keys = Object.keys(source);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(source, key);

    if (descriptor?.writable || descriptor?.set) {
      target[key] = cloneDeepImpl(source[key], stack, options);
    }
  }
}
