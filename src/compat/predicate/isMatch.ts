import { isPrimitive } from '../../predicate';
import { isArrayMatch } from '../_internal/isArrayMatch';
import { isMapMatch } from '../_internal/isMapMatch';
import { isSetMatch } from '../_internal/isSetMatch';

/**
 * Checks if the target matches the source by comparing their structures and values.
 * This function supports deep comparison for objects, arrays, maps, and sets.
 * 
 * @param {unknown} target - The target value to match against.
 * @param {unknown} source - The source value to match with.
 * @returns {boolean} - Returns `true` if the target matches the source, otherwise `false`.
 *
 * @example
 * // Basic usage
 * isMatch({ a: 1, b: 2 }, { a: 1 }); // true
 *
 * @example
 * // Matching arrays
 * isMatch([1, 2, 3], [1, 2, 3]); // true
 *
 * @example
 * // Matching maps
 * const targetMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * const sourceMap = new Map([['key1', 'value1']]);
 * isMatch(targetMap, sourceMap); // true
 *
 * @example
 * // Matching sets
 * const targetSet = new Set([1, 2, 3]);
 * const sourceSet = new Set([1, 2]);
 * isMatch(targetSet, sourceSet); // true
 */
export function isMatch(target: unknown, source: unknown);
export function isMatch(target: any, source: any) {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      if (source == null) {
        return true;
      }

      source = source ?? {};

      const keys = Object.keys(source as any);

      if (target == null) {
        if (keys.length === 0) {
          return true;
        }

        return false;
      }

      if (Array.isArray(source)) {
        return isArrayMatch(target, source);
      }

      if (source instanceof Map) {
        return isMapMatch(target, source);
      }

      if (source instanceof Set) {
        return isSetMatch(target, source);
      }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!isPrimitive(target) && !(key in target)) {
          return false;
        }

        if (source[key] === undefined && target[key] !== undefined) {
          return false;
        }

        if (!isMatch(target[key], source[key])) {
          return false;
        }
      }

      return true;
    }
    case 'function': {
      if (Object.keys(source).length > 0) {
        return isMatch(target, { ...source });
      }

      return false;
    }
    default: {
      return !source;
    }
  }
}
