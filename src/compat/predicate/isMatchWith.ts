import { isObject } from './isObject.ts';
import { isPrimitive } from '../../predicate/isPrimitive.ts';
import type { IsMatchWithCustomizer } from '../_internal/IsMatchWithCustomizer.ts';
import { eq } from '../util/eq.ts';

/**
 * Performs a deep comparison between a target value and a source pattern to determine if they match,
 * using a custom comparison function for fine-grained control over the matching logic.
 *
 * @param {object} target - The value to be tested for matching
 * @param {object} source - The pattern/template to match against
 * @param {IsMatchWithCustomizer} compare - Custom comparison function for fine-grained control
 * @returns {boolean} `true` if the target matches the source pattern, `false` otherwise
 *
 * @example
 * // Basic matching with custom comparator
 * const caseInsensitiveCompare = (objVal, srcVal) => {
 *   if (typeof objVal === 'string' && typeof srcVal === 'string') {
 *     return objVal.toLowerCase() === srcVal.toLowerCase();
 *   }
 *   return undefined;
 * };
 *
 * isMatchWith(
 *   { name: 'JOHN', age: 30 },
 *   { name: 'john' },
 *   caseInsensitiveCompare
 * ); // true
 */
export function isMatchWith(target: object, source: object, compare: IsMatchWithCustomizer): boolean;

/**
 * Performs a deep comparison between a target value and a source pattern to determine if they match,
 * using a custom comparison function for fine-grained control over the matching logic.
 *
 * This function recursively traverses both values, calling the custom compare function for each
 * property/element pair. If the compare function returns a boolean, that result is used directly.
 * If it returns undefined, the default matching behavior continues recursively.
 *
 * The matching behavior varies by data type:
 * - **Objects**: Matches if all properties in the source exist in the target and match
 * - **Arrays**: Matches if all elements in the source array can be found in the target array (order-independent)
 * - **Maps**: Matches if all key-value pairs in the source Map exist and match in the target Map
 * - **Sets**: Matches if all elements in the source Set can be found in the target Set
 * - **Functions**: Matches using strict equality, or object comparison if the function has properties
 * - **Primitives**: Matches using strict equality
 *
 * Special cases:
 * - Empty objects, arrays, Maps, and Sets always match any target
 * - `null` and `undefined` source values have specific matching rules
 * - Circular references are handled using an internal stack to prevent infinite recursion
 *
 * @param {object} target - The value to be tested for matching
 * @param {object} source - The pattern/template to match against
 * @param {function} [compare] - Optional custom comparison function that receives:
 *   - `objValue` - The value from the target at the current path
 *   - `srcValue` - The value from the source at the current path
 *   - `key` - The property key or array index being compared
 *   - `object` - The parent object/array from the target
 *   - `source` - The parent object/array from the source
 *   - `stack` - Internal Map used for circular reference detection
 *   Should return `true` for a match, `false` for no match, or `undefined` to continue with default behavior
 *
 * @returns {boolean} `true` if the target matches the source pattern, `false` otherwise
 *
 * @example
 * // Basic matching without custom comparator
 * isMatchWith({ a: 1, b: 2 }, { a: 1 }); // true
 * isMatchWith([1, 2, 3], [1, 3]); // true
 *
 * @example
 * // Custom comparison for case-insensitive string matching
 * const caseInsensitiveCompare = (objVal, srcVal) => {
 *   if (typeof objVal === 'string' && typeof srcVal === 'string') {
 *     return objVal.toLowerCase() === srcVal.toLowerCase();
 *   }
 *   return undefined; // Use default behavior for non-strings
 * };
 *
 * isMatchWith(
 *   { name: 'JOHN', age: 30 },
 *   { name: 'john' },
 *   caseInsensitiveCompare
 * ); // true
 *
 * @example
 * // Custom comparison for range matching
 * const rangeCompare = (objVal, srcVal, key) => {
 *   if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
 *     return objVal >= srcVal.min && objVal <= srcVal.max;
 *   }
 *   return undefined;
 * };
 *
 * isMatchWith(
 *   { name: 'John', age: 25 },
 *   { age: { min: 18, max: 30 } },
 *   rangeCompare
 * ); // true
 */
export function isMatchWith(
  target: object,
  source: object,
  compare: (
    value: any,
    other: any,
    indexOrKey: PropertyKey,
    object: object,
    source: object,
    stack?: Map<any, any>
  ) => boolean | undefined
): boolean {
  if (typeof compare !== 'function') {
    return isMatchWith(target, source, () => undefined);
  }

  return isMatchWithInternal(
    target,
    source,
    function doesMatch(objValue, srcValue, key, object, source, stack): boolean | undefined {
      const isEqual = compare(objValue, srcValue, key, object, source, stack);

      if (isEqual !== undefined) {
        return Boolean(isEqual);
      }

      return isMatchWithInternal(objValue, srcValue, doesMatch, stack);
    },
    new Map()
  );
}

function isMatchWithInternal(
  target: any,
  source: any,
  compare: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => boolean | undefined,
  stack?: Map<any, any>
): boolean {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      return isObjectMatch(target, source, compare, stack);
    }
    case 'function': {
      const sourceKeys = Object.keys(source);

      if (sourceKeys.length > 0) {
        return isMatchWithInternal(target, { ...source }, compare, stack);
      }

      return eq(target, source);
    }
    default: {
      if (!isObject(target)) {
        return eq(target, source);
      }

      if (typeof source === 'string') {
        return source === '';
      }

      return true;
    }
  }
}

function isObjectMatch(
  target: any,
  source: any,
  compare: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => boolean | undefined,
  stack: Map<any, any> | undefined
): boolean {
  if (source == null) {
    return true;
  }

  if (Array.isArray(source)) {
    return isArrayMatch(target, source, compare, stack);
  }

  if (source instanceof Map) {
    return isMapMatch(target, source, compare, stack);
  }

  if (source instanceof Set) {
    return isSetMatch(target, source, compare, stack);
  }

  const keys = Object.keys(source as any);

  if (target == null) {
    return keys.length === 0;
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

      const isEqual = compare(target[key], source[key], key, target, source, stack);

      if (!isEqual) {
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

function isMapMatch(
  target: unknown,
  source: Map<any, any>,
  compare: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => boolean | undefined,
  stack: Map<any, any> | undefined
): boolean {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Map)) {
    return false;
  }

  for (const [key, sourceValue] of source.entries()) {
    const targetValue = target.get(key);

    const isEqual = compare(targetValue, sourceValue, key, target, source, stack);

    if (isEqual === false) {
      return false;
    }
  }

  return true;
}

function isArrayMatch(
  target: unknown,
  source: readonly unknown[],
  compare: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => boolean | undefined,
  stack: Map<any, any> | undefined
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

      const isEqual = compare(targetItem, sourceItem, i, target, source, stack);

      if (isEqual) {
        matches = true;
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
  compare: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => boolean | undefined,
  stack?: Map<any, any>
): boolean {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Set)) {
    return false;
  }

  return isArrayMatch([...target], [...source], compare, stack);
}
