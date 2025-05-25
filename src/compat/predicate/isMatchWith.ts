import { isObject } from './isObject.ts';
import { isPrimitive } from '../../predicate/isPrimitive.ts';
import { eq } from '../util/eq.ts';

/**
 * This method is like `isMatch` except that it accepts `customizer` which is invoked
 * to compare values. If `customizer` returns `undefined`, comparisons are handled
 * by the method instead. The `customizer` is invoked with five arguments:
 * (objValue, srcValue, index|key, object, source).
 *
 * @param {unknown} target - The object to inspect.
 * @param {unknown} source - The object of property values to match.
 * @param {Function} [customizer] - The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 *
 * @example
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, srcValue) {
 *   if (isGreeting(objValue) && isGreeting(srcValue)) {
 *     return true;
 *   }
 * }
 *
 * const object = { 'greeting': 'hello' };
 * const source = { 'greeting': 'hi' };
 *
 * isMatchWith(object, source, customizer);
 * // => true
 */
export function isMatchWith(
  target: unknown,
  source: unknown,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown
): boolean {
  const actualCustomizer = typeof customizer === 'function' ? customizer : undefined;
  return isMatchInternal(target, source, actualCustomizer, new Map());
}

export function isMatchInternal(
  target: any,
  source: any,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown,
  stack?: Map<any, any>
): boolean {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      if (source == null) {
        return true;
      }

      if (Array.isArray(source)) {
        return isArrayMatch(target, source, customizer, stack);
      }

      if (source instanceof Map) {
        return isMapMatch(target, source, customizer, stack);
      }

      if (source instanceof Set) {
        return isSetMatch(target, source, customizer, stack);
      }

      const keys = Object.keys(source as any);

      if (target == null) {
        return keys.length === 0;
      }

      if (customizer && keys.length === 0 && isPrimitive(target)) {
        return false;
      }

      if (keys.length === 0) {
        return true;
      }

      if (stack && stack.has(source)) {
        return stack.get(source) === target;
      }

      if (stack) {
        stack.set(source, target);
      }

      try {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          if (!isPrimitive(target) && !(key in target)) {
            return false;
          }

          if (source[key] === undefined && target[key] !== undefined) {
            return false;
          }

          if (source[key] === null && target[key] !== null) {
            return false;
          }

          if (customizer) {
            const compareResult = customizer(target[key], source[key], key, target, source, stack);
            if (compareResult !== undefined) {
              if (!compareResult) {
                return false;
              }
            } else if (!isMatchInternal(target[key], source[key], customizer, stack)) {
              return false;
            }
          } else if (!isMatchInternal(target[key], source[key], undefined, stack)) {
            return false;
          }
        }

        return true;
      } finally {
        if (stack) {
          stack.delete(source);
        }
      }
    }
    case 'function': {
      const sourceKeys = Object.keys(source);

      if (sourceKeys.length > 0) {
        return isMatchInternal(target, { ...source }, customizer, stack);
      }

      return eq(target, source);
    }
    default: {
      if (!isObject(target)) {
        return eq(target, source);
      }

      return !source || typeof source !== 'string' || source === '';
    }
  }
}

export function isMapMatch(
  target: unknown,
  source: Map<any, any>,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown,
  stack?: Map<any, any>
): boolean {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Map)) {
    return false;
  }

  for (const [key, value] of source.entries()) {
    if (customizer) {
      const targetValue = target.get(key);
      const compareResult = customizer(targetValue, value, key, target, source, stack);
      if (compareResult !== undefined) {
        if (!compareResult) {
          return false;
        }
      } else if (!isMatchInternal(targetValue, value, customizer, stack)) {
        return false;
      }
    } else if (!isMatchInternal(target.get(key), value, undefined, stack)) {
      return false;
    }
  }

  return true;
}

export function isArrayMatch(
  target: unknown,
  source: readonly unknown[],
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown,
  stack?: Map<any, any>
): boolean {
  if (source.length === 0) {
    return true;
  }

  if (!Array.isArray(target)) {
    return false;
  }

  const countedIndex = new Set<number>();

  for (let i = 0; i < source.length; i++) {
    const sourceItem = source[i];
    let found = false;

    for (let j = 0; j < target.length; j++) {
      if (countedIndex.has(j)) {
        continue;
      }

      const targetItem = target[j];
      let matches = false;

      if (customizer) {
        const compareResult = customizer(targetItem, sourceItem, i, target, source, stack);
        if (compareResult !== undefined) {
          matches = Boolean(compareResult);
        } else {
          matches = isMatchInternal(targetItem, sourceItem, customizer, stack);
        }
      } else {
        matches = isMatchInternal(targetItem, sourceItem, undefined, undefined);
      }

      if (matches) {
        countedIndex.add(j);
        found = true;
        break;
      }
    }

    if (!found) {
      return false;
    }
  }

  return true;
}

export function isSetMatch(
  target: unknown,
  source: Set<any>,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown,
  stack?: Map<any, any>
): boolean {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Set)) {
    return false;
  }

  return isArrayMatch([...target], [...source], customizer, stack);
}
