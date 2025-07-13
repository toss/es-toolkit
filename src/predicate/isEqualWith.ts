import { isPlainObject } from './isPlainObject.ts';
import { getSymbols } from '../_internal/getSymbols.ts';
import { getTag } from '../_internal/getTag.ts';
import {
  argumentsTag,
  arrayBufferTag,
  arrayTag,
  bigInt64ArrayTag,
  bigUint64ArrayTag,
  booleanTag,
  dataViewTag,
  dateTag,
  errorTag,
  float32ArrayTag,
  float64ArrayTag,
  functionTag,
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

declare let Buffer:
  | {
      isBuffer: (a: any) => boolean;
    }
  | undefined;

/**
 * Compares two values for equality using a custom comparison function.
 *
 * The custom function allows for fine-tuned control over the comparison process. If it returns a boolean, that result determines the equality. If it returns undefined, the function falls back to the default equality comparison.
 *
 * This function also uses the custom equality function to compare values inside objects,
 * arrays, maps, sets, and other complex structures, ensuring a deep comparison.
 *
 * This approach provides flexibility in handling complex comparisons while maintaining efficient default behavior for simpler cases.
 *
 * The custom comparison function can take up to six parameters:
 * - `x`: The value from the first object `a`.
 * - `y`: The value from the second object `b`.
 * - `property`: The property key used to get `x` and `y`.
 * - `xParent`: The parent of the first value `x`.
 * - `yParent`: The parent of the second value `y`.
 * - `stack`: An internal stack (Map) to handle circular references.
 *
 * @param {unknown} a - The first value to compare.
 * @param {unknown} b - The second value to compare.
 * @param {(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void} areValuesEqual - A function to customize the comparison.
 *   If it returns a boolean, that result will be used. If it returns undefined,
 *   the default equality comparison will be used.
 * @returns {boolean} `true` if the values are equal according to the customizer, otherwise `false`.
 *
 * @example
 * const customizer = (a, b) => {
 *   if (typeof a === 'string' && typeof b === 'string') {
 *     return a.toLowerCase() === b.toLowerCase();
 *   }
 * };
 * isEqualWith('Hello', 'hello', customizer); // true
 * isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true
 * isEqualWith([1, 2, 3], [1, 2, 3], customizer); // true
 */
export function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean {
  return isEqualWithImpl(a, b, undefined, undefined, undefined, undefined, areValuesEqual);
}

function isEqualWithImpl(
  a: any,
  b: any,
  property: PropertyKey | undefined,
  aParent: any,
  bParent: any,
  stack: Map<any, any> | undefined,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean {
  const result = areValuesEqual(a, b, property, aParent, bParent, stack);

  if (result !== undefined) {
    return result;
  }

  if (typeof a === typeof b) {
    switch (typeof a) {
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'symbol':
      case 'undefined': {
        return a === b;
      }
      case 'number': {
        return a === b || Object.is(a, b);
      }
      case 'function': {
        return a === b;
      }
      case 'object': {
        return areObjectsEqual(a, b, stack, areValuesEqual);
      }
    }
  }

  return areObjectsEqual(a, b, stack, areValuesEqual);
}

function areObjectsEqual(
  a: any,
  b: any,
  stack: Map<any, any> | undefined,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
) {
  if (Object.is(a, b)) {
    return true;
  }

  let aTag = getTag(a);
  let bTag = getTag(b);

  if (aTag === argumentsTag) {
    aTag = objectTag;
  }

  if (bTag === argumentsTag) {
    bTag = objectTag;
  }

  if (aTag !== bTag) {
    return false;
  }

  switch (aTag) {
    case stringTag:
      return a.toString() === b.toString();

    case numberTag: {
      const x = a.valueOf();
      const y = b.valueOf();

      return x === y || (Number.isNaN(x) && Number.isNaN(y));
    }

    case booleanTag:
    case dateTag:
    case symbolTag:
      return Object.is(a.valueOf(), b.valueOf());

    case regexpTag: {
      return a.source === b.source && a.flags === b.flags;
    }

    case functionTag: {
      return a === b;
    }
  }

  stack = stack ?? new Map();

  const aStack = stack.get(a);
  const bStack = stack.get(b);

  if (aStack != null && bStack != null) {
    return aStack === b;
  }

  stack.set(a, b);
  stack.set(b, a);

  try {
    switch (aTag) {
      case mapTag: {
        if (a.size !== b.size) {
          return false;
        }

        for (const [key, value] of a.entries()) {
          if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) {
            return false;
          }
        }

        return true;
      }

      case setTag: {
        if (a.size !== b.size) {
          return false;
        }

        const aValues = Array.from(a.values());
        const bValues = Array.from(b.values());

        for (let i = 0; i < aValues.length; i++) {
          const aValue = aValues[i];
          const index = bValues.findIndex(bValue => {
            return isEqualWithImpl(aValue, bValue, undefined, a, b, stack, areValuesEqual);
          });

          if (index === -1) {
            return false;
          }

          bValues.splice(index, 1);
        }

        return true;
      }

      case arrayTag:
      case uint8ArrayTag:
      case uint8ClampedArrayTag:
      case uint16ArrayTag:
      case uint32ArrayTag:
      case bigUint64ArrayTag:
      case int8ArrayTag:
      case int16ArrayTag:
      case int32ArrayTag:
      case bigInt64ArrayTag:
      case float32ArrayTag:
      case float64ArrayTag: {
        // Buffers are also treated as [object Uint8Array]s.
        if (typeof Buffer !== 'undefined' && Buffer.isBuffer(a) !== Buffer.isBuffer(b)) {
          return false;
        }

        if (a.length !== b.length) {
          return false;
        }

        for (let i = 0; i < a.length; i++) {
          if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) {
            return false;
          }
        }

        return true;
      }

      case arrayBufferTag: {
        if (a.byteLength !== b.byteLength) {
          return false;
        }

        return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
      }

      case dataViewTag: {
        if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) {
          return false;
        }

        return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
      }

      case errorTag: {
        return a.name === b.name && a.message === b.message;
      }

      case objectTag: {
        const areEqualInstances =
          areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) ||
          (isPlainObject(a) && isPlainObject(b));

        if (!areEqualInstances) {
          return false;
        }

        const aKeys = [...Object.keys(a), ...getSymbols(a)];
        const bKeys = [...Object.keys(b), ...getSymbols(b)];

        if (aKeys.length !== bKeys.length) {
          return false;
        }

        for (let i = 0; i < aKeys.length; i++) {
          const propKey = aKeys[i];
          const aProp = (a as any)[propKey];

          if (!Object.hasOwn(b, propKey)) {
            return false;
          }

          const bProp = (b as any)[propKey];

          if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) {
            return false;
          }
        }

        return true;
      }
      default: {
        return false;
      }
    }
  } finally {
    stack.delete(a);
    stack.delete(b);
  }
}
