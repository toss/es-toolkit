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
 * @param {T} object - The target object.
 * @returns {T} The object itself.
 */
export function defaultsDeep<T extends object>(object: T): NonNullable<T>;

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
 * @template S - The type of the object that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S} source - The object that specifies the default values to apply.
 * @returns {NonNullable<T & S>} The `object` that has been updated with default values from `source`, recursively merging nested objects.
 */
export function defaultsDeep<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;

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
 * @template S1 - The type of the first source object providing default values.
 * @template S2 - The type of the second source object providing default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S1} source1 - The first source object providing default values.
 * @param {S2} source2 - The second source object providing default values.
 * @returns {NonNullable<T & S1 & S2>} The `object` that has been updated with default values from `source1` and `source2`, recursively merging nested objects.
 */
export function defaultsDeep<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
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
 * @param {T} object - The target object that will receive default values.
 * @param {S[]} sources - One or more source objects that specify default values to apply.
 * @returns {object} The `object` that has been updated with default values from all sources, recursively merging nested objects.
 *
 * @example
 * defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 }); // { a: { b: 2, c: 3 }, d: 4 }
 * defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } }); // { a: { b: 1 } }
 * defaultsDeep({ a: null }, { a: { b: 1 } }); // { a: null }
 */
export function defaultsDeep<T extends object, S extends object>(target: T, ...sources: S[]): object;
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
 * @param {T} object - The target object that will receive default values.
 * @param {S[]} sources - One or more source objects that specify default values to apply.
 * @returns {object} The `object` that has been updated with default values from all sources, recursively merging nested objects.
 *
 * @example
 * defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 }); // { a: { b: 2, c: 3 }, d: 4 }
 * defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } }); // { a: { b: 1 } }
 * defaultsDeep({ a: null }, { a: { b: 1 } }); // { a: null }
 */
export function defaultsDeep<T extends object, S extends object>(target: T, ...sources: S[]): object {
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

function defaultsDeepRecursive(
  target: Record<string, any>,
  source: Record<string, any>,
  stack: WeakMap<any, any>
): void {
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
    } else if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      const inStack = stack.has(sourceValue);
      if (!inStack || (inStack && stack.get(sourceValue) !== targetValue)) {
        stack.set(sourceValue, targetValue);
        defaultsDeepRecursive(targetValue, sourceValue, stack);
      }
    }
  }
}
