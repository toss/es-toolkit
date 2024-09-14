import { isPrimitive } from '../../predicate/isPrimitive.ts';

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
export function isMatch(target: unknown, source: unknown): boolean;
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
export function isMatch(target: any, source: any): boolean {
  if (source === target) {
    return true;
  }

  switch (typeof source) {
    case 'object': {
      if (source == null) {
        return true;
      }

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

export function isMapMatch(target: unknown, source: Map<any, any>) {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Map)) {
    return false;
  }

  for (const [key, value] of source.entries()) {
    if (!isMatch(target.get(key), value)) {
      return false;
    }
  }

  return true;
}

export function isArrayMatch(target: unknown, source: readonly unknown[]) {
  if (source.length === 0) {
    return true;
  }

  if (!Array.isArray(target)) {
    return false;
  }

  const countedIndex = new Set<number>();

  for (let i = 0; i < source.length; i++) {
    const sourceItem = source[i];
    const index = target.findIndex((targetItem, index) => {
      return isMatch(targetItem, sourceItem) && !countedIndex.has(index);
    });

    if (index === -1) {
      return false;
    }

    countedIndex.add(index);
  }

  return true;
}

export function isSetMatch(target: unknown, source: Set<any>) {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Set)) {
    return false;
  }

  return isArrayMatch([...target], [...source]);
}
