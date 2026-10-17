import { isPrimitive } from '../../predicate/isPrimitive.ts';
import { getSymbols } from '../_internal/getSymbols.ts';
import { getTag } from '../_internal/getTag.ts';
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
} from '../_internal/tags.ts';
import { isBuffer } from '../predicate/isBuffer.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

const hasOwnProperty = Object.prototype.hasOwnProperty;

type CloneDeepWithCustomizer<TObject> = (
  value: any,
  key: number | string | undefined,
  object: TObject | undefined,
  stack: any
) => any;

/**
 * Creates a deep clone of the given value using a customizer function.
 *
 * @template T - The type of the value.
 * @param value - The value to clone.
 * @param customizer - A function to customize the cloning process.
 * @returns A deep clone of the given value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const clonedObj = cloneDeepWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2;
 *   }
 * });
 * // => { a: 2, b: 4 }
 */
export function cloneDeepWith<T>(value: T, customizer: CloneDeepWithCustomizer<T>): any;

/**
 * Creates a deep clone of the given value.
 *
 * @template T - The type of the value.
 * @param value - The value to clone.
 * @returns A deep clone of the given value.
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const clonedObj = cloneDeepWith(obj);
 * // => { a: 1, b: { c: 2 } }
 */
export function cloneDeepWith<T>(value: T): T;

/**
 * Creates a deep clone of the given object using a customizer function.
 *
 * @template T - The type of the object.
 * @param obj - The object to clone.
 * @param [cloneValue] - A function to customize the cloning process.
 * @returns A deep clone of the given object.
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
 *   if (typeof value === 'number') {
 *     return value + 1; // Increment each number
 *   }
 * });
 * console.log(clonedArr); // [2, 3, 4]
 * console.log(clonedArr === arr); // false
 */
export function cloneDeepWith<T>(obj: T, customizer?: CloneDeepWithCustomizer<T>): any | T {
  return cloneDeepWithImpl(obj, undefined, obj, new Map(), customizer);
}

// This is a standalone port of `cloneDeepWith` from `es-toolkit/object`, with the
// lodash-specific handling (objects without a constructor, wrapped primitives and
// `arguments` objects) folded in. It intentionally does not share code with the
// main implementation: `es-toolkit/compat` must run on Node.js 6, so nothing here
// may rely on APIs such as `structuredClone` that the main implementation uses.
function cloneDeepWithImpl<T>(
  valueToClone: any,
  keyToClone: PropertyKey | undefined,
  objectToClone: T,
  stack: Map<any, any>,
  customizer: CloneDeepWithCustomizer<T> | undefined
): any {
  if (customizer != null) {
    const cloned = customizer(valueToClone, keyToClone as any, objectToClone, stack);

    if (cloned !== undefined) {
      return cloned;
    }
  }

  if (isPrimitive(valueToClone)) {
    return valueToClone;
  }

  if (stack.has(valueToClone)) {
    return stack.get(valueToClone);
  }

  if (Array.isArray(valueToClone)) {
    const result: any = new Array(valueToClone.length);
    stack.set(valueToClone, result);

    for (let i = 0; i < valueToClone.length; i++) {
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, customizer);
    }

    // For RegExpArrays
    if (hasOwnProperty.call(valueToClone, 'index')) {
      result.index = (valueToClone as any).index;
    }
    if (hasOwnProperty.call(valueToClone, 'input')) {
      result.input = (valueToClone as any).input;
    }

    return result;
  }

  if (valueToClone instanceof Date) {
    return new Date(valueToClone.getTime());
  }

  if (valueToClone instanceof RegExp) {
    const result = new RegExp(valueToClone.source, valueToClone.flags);

    result.lastIndex = valueToClone.lastIndex;

    return result;
  }

  if (valueToClone instanceof Map) {
    const result = new Map();
    stack.set(valueToClone, result);

    valueToClone.forEach((value, key) => {
      result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, customizer));
    });

    return result;
  }

  if (valueToClone instanceof Set) {
    const result = new Set();
    stack.set(valueToClone, result);

    valueToClone.forEach(value => {
      result.add(cloneDeepWithImpl(value, undefined, objectToClone, stack, customizer));
    });

    return result;
  }

  if (isBuffer(valueToClone)) {
    return valueToClone.subarray();
  }

  if (isTypedArray(valueToClone)) {
    const result = new (Object.getPrototypeOf(valueToClone).constructor)(valueToClone.length);
    stack.set(valueToClone, result);

    for (let i = 0; i < valueToClone.length; i++) {
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, customizer);
    }

    return result;
  }

  if (
    valueToClone instanceof ArrayBuffer ||
    // eslint-disable-next-line compat/compat, es-x/no-shared-array-buffer -- guarded by the typeof check
    (typeof SharedArrayBuffer !== 'undefined' && valueToClone instanceof SharedArrayBuffer)
  ) {
    return valueToClone.slice(0);
  }

  if (valueToClone instanceof DataView) {
    const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, customizer);

    return result;
  }

  // For legacy NodeJS support
  if (typeof File !== 'undefined' && valueToClone instanceof File) {
    const result = new File([valueToClone], valueToClone.name, {
      type: valueToClone.type,
    });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, customizer);

    return result;
  }

  // For environments that don't support Blob, like mini-programs
  if (typeof Blob !== 'undefined' && valueToClone instanceof Blob) {
    const result = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, customizer);

    return result;
  }

  if (valueToClone instanceof Error) {
    const result = Object.create(Object.getPrototypeOf(valueToClone));
    stack.set(valueToClone, result);

    // Native errors keep these as own non-enumerable properties, so mirror
    // that shape instead of turning them into enumerable keys.
    const errorKeys = ['message', 'stack', 'cause'];

    for (let i = 0; i < errorKeys.length; i++) {
      const key = errorKeys[i];

      if (key in valueToClone) {
        Object.defineProperty(result, key, {
          value: (valueToClone as any)[key],
          writable: true,
          configurable: true,
          enumerable: false,
        });
      }
    }

    copyProperties(result, valueToClone, objectToClone, stack, customizer);

    return result;
  }

  const tag = getTag(valueToClone);

  switch (tag) {
    case numberTag:
    case stringTag:
    case booleanTag: {
      const result = new valueToClone.constructor(valueToClone.valueOf());
      stack.set(valueToClone, result);
      copyProperties(result, valueToClone, objectToClone, stack, customizer);
      return result;
    }

    case argumentsTag: {
      const result: any = {};
      stack.set(valueToClone, result);

      copyProperties(result, valueToClone, objectToClone, stack, customizer);

      result.length = valueToClone.length;
      result[Symbol.iterator] = valueToClone[Symbol.iterator];

      return result;
    }
  }

  if (typeof valueToClone === 'object' && isCloneableObject(tag)) {
    // Objects without a `constructor` (e.g. `Object.create(null)`) become plain objects, like lodash.
    const result =
      tag === objectTag && typeof valueToClone.constructor !== 'function'
        ? {}
        : Object.create(Object.getPrototypeOf(valueToClone));

    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, customizer);

    return result;
  }

  return valueToClone;
}

function copyProperties<T>(
  target: any,
  source: any,
  objectToClone: T,
  stack: Map<any, any>,
  customizer: CloneDeepWithCustomizer<T> | undefined
): void {
  const keys: PropertyKey[] = (Object.keys(source) as PropertyKey[]).concat(getSymbols(source));

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (descriptor == null || descriptor.writable) {
      target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, customizer);
    }
  }
}

function isCloneableObject(tag: string) {
  switch (tag) {
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
