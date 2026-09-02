import {
  CUSTOM_TAG_BRANDED,
  CUSTOM_TAG_INHERITED,
  CUSTOM_TAG_OWN,
  CUSTOM_TAG_UNCLONEABLE,
  getCustomToStringTagType,
} from '../_internal/getCustomToStringTagType.ts';
import { getSymbols } from '../compat/_internal/getSymbols.ts';
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
import { isBuffer } from '../predicate/isBuffer.ts';
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
export function cloneDeepWith<T>(
  obj: T,
  cloneValue: (value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any
): T {
  return cloneDeepWithImpl(obj, undefined, obj, new Map(), cloneValue, false);
}

export function cloneDeepWithImpl<T>(
  valueToClone: any,
  keyToClone: PropertyKey | undefined,
  objectToClone: T,
  stack = new Map<any, any>(),
  cloneValue: ((value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any) | undefined = undefined,
  isLodashCompat = false
): T {
  const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);

  if (cloned !== undefined) {
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
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue, isLodashCompat);
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
      result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue, isLodashCompat));
    }

    return result as T;
  }

  if (valueToClone instanceof Set) {
    const result = new Set();
    stack.set(valueToClone, result);

    for (const value of valueToClone) {
      result.add(cloneDeepWithImpl(value, undefined, objectToClone, stack, cloneValue, isLodashCompat));
    }

    return result as T;
  }

  if (isBuffer(valueToClone)) {
    return (valueToClone as any).subarray() as T;
  }

  if (isTypedArray(valueToClone)) {
    const result = new (Object.getPrototypeOf(valueToClone).constructor)(valueToClone.length);
    stack.set(valueToClone, result);

    for (let i = 0; i < valueToClone.length; i++) {
      result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue, isLodashCompat);
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

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);

    return result as T;
  }

  // For legacy NodeJS support
  if (typeof File !== 'undefined' && valueToClone instanceof File) {
    const result = new File([valueToClone], valueToClone.name, {
      type: valueToClone.type,
    });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);

    return result as T;
  }

  // For environments that don't support Blob, like mini-programs
  if (typeof Blob !== 'undefined' && valueToClone instanceof Blob) {
    const result = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result);

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);

    return result as T;
  }

  if (valueToClone instanceof Error) {
    const result = structuredClone(valueToClone) as Error;
    stack.set(valueToClone, result);

    result.message = valueToClone.message;
    result.name = valueToClone.name;
    result.stack = valueToClone.stack;
    result.cause = valueToClone.cause;
    result.constructor = valueToClone.constructor;

    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);

    return result as T;
  }

  if (valueToClone instanceof Boolean) {
    const result = new Boolean(valueToClone.valueOf()) as T;
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);
    return result;
  }

  if (valueToClone instanceof Number) {
    const result = new Number(valueToClone.valueOf()) as T;
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);
    return result;
  }

  if (valueToClone instanceof String) {
    const result = new String(valueToClone.valueOf()) as T;
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);
    return result;
  }

  if (typeof valueToClone === 'object') {
    const cloneableObjectType = getCloneableObjectType(valueToClone, isLodashCompat);

    if (cloneableObjectType) {
      const useObjectPrototype =
        isLodashCompat && cloneableObjectType === 2 && typeof valueToClone.constructor !== 'function';
      const prototype = Object.getPrototypeOf(valueToClone);
      const stagePrototype = useObjectPrototype || Object.hasOwn(valueToClone, '__proto__');
      const result = Object.create(stagePrototype ? null : prototype);

      stack.set(valueToClone, result);

      copyProperties(result, valueToClone, objectToClone, stack, cloneValue, isLodashCompat);

      if (stagePrototype) {
        Object.setPrototypeOf(result, useObjectPrototype ? Object.prototype : prototype);
      }

      return result as T;
    }
  }

  return (
    isLodashCompat && valueToClone === objectToClone && typeof valueToClone === 'object' ? {} : valueToClone
  ) as T;
}

export function copyProperties<T>(
  target: any,
  source: any,
  objectToClone: T = target,
  stack?: Map<any, any> | undefined,
  cloneValue?: ((value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any) | undefined,
  isLodashCompat = false
): void {
  const keys = [...Object.keys(source), ...getSymbols(source)];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (descriptor == null || descriptor.writable) {
      const cloned = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue, isLodashCompat);

      if (key === Symbol.toStringTag) {
        if (!Reflect.set(target, key, cloned) && !isLodashCompat) {
          Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            value: cloned,
            writable: true,
          });
        }
      } else {
        target[key] = cloned;
      }
    }
  }
}

export function getCloneableObjectType(object: object, isLodashCompat: boolean): number | boolean {
  try {
    const tag = Object.prototype.toString.call(object);

    if (!(Symbol.toStringTag in object)) {
      return isCloneableTag(tag);
    }

    const cloneableTag = isCloneableTag(tag);
    const customTagType = getCustomToStringTagType(object, tag, cloneableTag);

    if (customTagType === CUSTOM_TAG_UNCLONEABLE) {
      return 0;
    }

    if ((customTagType & CUSTOM_TAG_BRANDED) !== 0 && !isLodashCompat) {
      return 0;
    }

    if (cloneableTag) {
      return (customTagType & (CUSTOM_TAG_OWN | CUSTOM_TAG_INHERITED)) !== 0 &&
        (customTagType & CUSTOM_TAG_UNCLONEABLE) === 0
        ? 2
        : 1;
    }

    if (customTagType === 0 || (customTagType & CUSTOM_TAG_UNCLONEABLE) !== 0) {
      return 0;
    }

    return !isLodashCompat ||
      (customTagType & CUSTOM_TAG_OWN) !== 0 ||
      ((customTagType & CUSTOM_TAG_INHERITED) !== 0 && Object.isExtensible(object))
      ? 2
      : 0;
  } catch {
    return 0;
  }
}

function isCloneableTag(tag: string) {
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
