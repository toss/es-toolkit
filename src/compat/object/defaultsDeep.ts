import { isObject } from '../compat.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * Recursively assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * Similar to `defaults` but recursively applies default values to nested objects.
 * Source objects are applied in order from left to right, and once a property has been assigned a value,
 * any subsequent values for that property will be ignored.
 *
 * Note: This function modifies the first argument, `object`.
 *
 * @template T - The type of the object being processed.
 * @param {any} target - The target object that will receive default values.
 * @param {any[]} sources - One or more source objects that specify default values to apply.
 * @returns {any} The `object` that has been updated with default values from all sources, recursively merging nested objects.
 *
 * @example
 * defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 }); // { a: { b: 2, c: 3 }, d: 4 }
 * defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } }); // { a: { b: 1 } }
 * defaultsDeep({ a: null }, { a: { b: 1 } }); // { a: null }
 */
export function defaultsDeep(target: any, ...sources: any[]): any {
  target = Object(target);

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (source != null) {
      const stack = new WeakMap();
      defaultsDeepRecursive(target, source, stack);
    }
  }

  return target;
}

function defaultsDeepRecursive(target: any, source: any, stack: WeakMap<any, any>): void {
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];
    const targetHasKey = Object.hasOwn(target, key);
    if (!targetHasKey || targetValue === undefined) {
      if (stack.has(sourceValue)) {
        target[key] = stack.get(sourceValue);
      } else if (isPlainObject(sourceValue)) {
        const newObj = {};
        stack.set(sourceValue, newObj);
        target[key] = newObj;
        defaultsDeepRecursive(newObj, sourceValue, stack);
      } else {
        target[key] = sourceValue;
      }
    } else {
      const inStack = stack.has(sourceValue);
      if (!inStack || (inStack && stack.get(sourceValue) !== targetValue)) {
        if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
          stack.set(sourceValue, targetValue);
          defaultsDeepRecursive(targetValue, sourceValue, stack);
        } else if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
          stack.set(sourceValue, targetValue);
          const targetLength = targetValue.length;
          const sourceLength = sourceValue.length;
          const leastLength = Math.min(sourceLength, targetLength);
          for (let i = 0; i < leastLength; i++) {
            if (isObject(targetValue) && isObject(sourceValue)) {
              defaultsDeepRecursive(targetValue[i], sourceValue[i], stack);
            }
          }
          if (sourceLength > targetLength) {
            targetValue.push(...sourceValue.slice(targetLength));
          }
        }
      }
    }
  }
}
