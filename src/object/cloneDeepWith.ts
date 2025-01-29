import { getSymbols } from '../compat/_internal/getSymbols.ts';
import { getTag } from '../compat/_internal/getTag.ts';
import {
  argumentsTag,
  arrayBufferTag,
  arrayTag,
  booleanTag,
  dataViewTag,
  dateTag,
  float32ArrayTag,
  float64ArrayTag,
  int8ArrayTag,
  int16ArrayTag,
  int32ArrayTag,
  mapTag,
  numberTag,
  objectTag,
  regexpTag,
  setTag,
  stringTag,
  symbolTag,
  uint8ArrayTag,
  uint8ClampedArrayTag,
  uint16ArrayTag,
  uint32ArrayTag,
} from '../compat/_internal/tags.ts';
import { isPrimitive } from '../predicate/isPrimitive.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

/**
 * Deeply clones the given object.
 *
 * You can customize the deep cloning process using the `cloneValue` function.
 * The function takes the current value `value`, the property name `key`, and the entire object `obj` as arguments.
 * If the function returns a value, that value is used;
 * if it returns `undefined`, the default cloning method is used.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @param {Function} [cloneValue] - A function to customize the cloning process.
 * @returns {T} - A deep clone of the given object.
 *
 * @example
 * // Clone a primitive value
 * const num = 29;
 * const clonedNum = cloneDeepWith(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num); // true
 *
 * @example
 * // Clone an object with a customizer
 * const obj = { a: 1, b: 2 };
 * const clonedObj = cloneDeepWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2; // Double the number
 *   }
 * });
 * console.log(clonedObj); // { a: 2, b: 4 }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an array with a customizer
 * const arr = [1, 2, 3];
 * const clonedArr = cloneDeepWith(arr, (value) => {
 *   return value + 1; // Increment each value
 * });
 * console.log(clonedArr); // [2, 3, 4]
 * console.log(clonedArr === arr); // false
 */
export function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any
): T {
  return cloneDeepWithImpl(obj, undefined, obj, new Map(), cloneValue);
}

export function cloneDeepWithImpl<T>(
  valueToClone: any,
  keyToClone: PropertyKey | undefined,
  objectToClone: T,
  stack = new Map<any, any>(),
  cloneValue: ((value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any) | undefined = undefined
): T {
  const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);

  if (cloned != null) {
    return cloned;
  }

  if (isPrimitive(valueToClone)) {
    return valueToClone as T;
  }

  if (stack.has(valueToClone)) {
    return stack.get(valueToClone) as T;
  }

  if (Array.isArray(valueToClone)) {
    const result: any = new Array(valueToClone.length);
    stack.set(valueToClone, result);

    for (let i = 0; i < valueToClone.length; i++) {
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    }

    // For RegExpArrays
    if (Object.hasOwn(valueToClone, 'index')) {
      // eslint-disable-next-line
      // @ts-ignore
      result.index = valueToClone.index;
    }
    if (Object.hasOwn(valueToClone, 'input')) {
      // eslint-disable-next-line
      // @ts-ignore
      result.input = valueToClone.input;
    }

    return result as T;
  }

  if (valueToClone instanceof Date) {
    return new Date(valueToClone.getTime()) as T;
  }

  if (valueToClone instanceof RegExp) {
    const result = new RegExp(valueToClone.source, valueToClone.flags);

    result.lastIndex = valueToClone.lastIndex;

    return result as T;
  }

  if (valueToClone instanceof Map) {
    const result = new Map();
    stack.set(valueToClone, result);

    for (const [key, value] of valueToClone) {
      result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
    }

    return result as T;
  }

  if (valueToClone instanceof Set) {
    const result = new Set();
    stack.set(valueToClone, result);

    for (const value of valueToClone) {
      result.add(cloneDeepWithImpl(value, undefined, objectToClone, stack, cloneValue));
    }

    return result as T;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(valueToClone)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return valueToClone.subarray() as T;
  }

  if (isTypedArray(valueToClone)) {
    const result = new (Object.getPrototypeOf(valueToClone).constructor)(valueToClone.length);
    stack.set(valueToClone, result);

    for (let i = 0; i < valueToClone.length; i++) {
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    }

    return result as T;
  }

  if (
    valueToClone instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' && valueToClone instanceof SharedArrayBuffer)
  ) {
    return valueToClone.slice(0) as T;
  }

  if (valueToClone instanceof DataView) {
    const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);

    return result as T;
  }

  // For legacy NodeJS support
  if (typeof File !== 'undefined' && valueToClone instanceof File) {
    const result = new File([valueToClone], valueToClone.name, {
      type: valueToClone.type,
    });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);

    return result as T;
  }

  if (valueToClone instanceof Blob) {
    const result = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);

    return result as T;
  }

  if (valueToClone instanceof Error) {
    const result = new (valueToClone.constructor as { new (): Error })();
    stack.set(valueToClone, result);

    result.message = valueToClone.message;
    result.name = valueToClone.name;
    result.stack = valueToClone.stack;
    result.cause = valueToClone.cause;

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);

    return result as T;
  }

  if (typeof valueToClone === 'object' && isCloneableObject(valueToClone)) {
    const result = Object.create(Object.getPrototypeOf(valueToClone));

    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);

    return result as T;
  }

  return valueToClone;
}

export function copyProperties<T>(
  target: any,
  source: any,
  objectToClone: T = target,
  stack?: Map<any, any> | undefined,
  cloneValue?: ((value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any) | undefined
): void {
  const keys = [...Object.keys(source), ...getSymbols(source)];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (descriptor == null || descriptor.writable) {
      target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
    }
  }
}

function isCloneableObject(object: object) {
  switch (getTag(object)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag: {
      return true;
    }
    default: {
      return false;
    }
  }
}
