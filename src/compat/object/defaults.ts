import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { eq } from '../util/eq.ts';

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @template T - The type of the object being processed.
 * @template S - The type of the object that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S} source - The object that specifies the default values to apply.
 * @returns {NonNullable<S & T>} The `object` that has been updated with default values from `source`.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
 * defaults({ a: undefined }, { a: 1 }); // { a: 1 }
 */
export function defaults<T, S>(object: T, source: S): NonNullable<S & T>;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @template T - The type of the object being processed.
 * @template S1 - The type of the first object that provides default values.
 * @template S2 - The type of the second object that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S1} source1 - The first object that specifies the default values to apply.
 * @param {S2} source2 - The second object that specifies the default values to apply.
 * @returns {NonNullable<S2 & S1 & T>} The `object` that has been updated with default values from `source1` and `source2`.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
 * defaults({ a: undefined }, { a: 1 }, { b: 2 }); // { a: 1, b: 2 }
 */
export function defaults<T, S1, S2>(object: T, source1: S1, source2: S2): NonNullable<S2 & S1 & T>;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @template T - The type of the object being processed.
 * @template S1 - The type of the first object that provides default values.
 * @template S2 - The type of the second object that provides default values.
 * @template S3 - The type of the third object that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S1} source1 - The first object that specifies the default values to apply.
 * @param {S2} source2 - The second object that specifies the default values to apply.
 * @param {S3} source3 - The third object that specifies the default values to apply.
 * @returns {NonNullable<S3 & S2 & S1 & T>} The `object` that has been updated with default values from `source1`, `source2`, and `source3`.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
 * defaults({ a: undefined }, { a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
 */
export function defaults<T, S1, S2, S3>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<S3 & S2 & S1 & T>;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @template T - The type of the object being processed.
 * @template S1 - The type of the first object that provides default values.
 * @template S2 - The type of the second object that provides default values.
 * @template S3 - The type of the third object that provides default values.
 * @template S4 - The type of the fourth object that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S1} source1 - The first object that specifies the default values to apply.
 * @param {S2} source2 - The second object that specifies the default values to apply.
 * @param {S3} source3 - The third object that specifies the default values to apply.
 * @param {S4} source4 - The fourth object that specifies the default values to apply.
 * @returns {NonNullable<S4 & S3 & S2 & S1 & T>} The `object` that has been updated with default values from `source1`, `source2`, `source3`, and `source4`.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }); // { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * defaults({ a: undefined }, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
 */
export function defaults<T, S1, S2, S3, S4>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<S4 & S3 & S2 & S1 & T>;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @template T - The type of the object being processed.
 * @param {T} object - The target object that will receive default values.
 * @returns {NonNullable<T>} The `object` that has been updated with default values.
 *
 * @example
 * defaults({ a: 1 }); // { a: 1 }
 * defaults({ a: undefined }); // { a: undefined }
 */
export function defaults<T>(object: T): NonNullable<T>;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * @param {any} object - The target object that will receive default values.
 * @param {...any[]} sources - The objects that specify the default values to apply.
 * @returns {any} The `object` that has been updated with default values from `sources`.
 *
 * @example
 * defaults({}, { a: 1 }, { b: 2 }); // { a: 1, b: 2 }
 * defaults({ a: undefined }, { a: 1 }); // { a: 1 }
 */
export function defaults(object: any, ...sources: any[]): any;

/**
 * Assigns default values to an `object`, ensuring that certain properties do not remain `undefined`.
 * It sets default values for properties that are either `undefined` or inherited from `Object.prototype`.
 *
 * You can pass in multiple objects to define these default values,
 * and they will be applied in order from left to right.
 * Once a property has been assigned a value, any subsequent values for that property will be ignored.
 *
 * Note: This function modifies the first argument, `object`. If you want to keep `object` unchanged, consider using `toDefaulted` instead.
 *
 * @template T - The type of the object being processed.
 * @template S - The type of the objects that provides default values.
 * @param {T} object - The target object that will receive default values.
 * @param {S[]} source - The objects that specifies the default values to apply.
 * @returns {object} The `object` that has been updated with default values from `sources`, ensuring that all properties are defined and none are left as `undefined`.
 *
 * @example
 * defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
 * defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
 * defaults({ a: null }, { a: 1 }); // { a: null }
 * defaults({ a: undefined }, { a: 1 }); // { a: 1 }
 */
export function defaults<T extends object, S extends object>(object: T, ...sources: S[]): object {
  object = Object(object);
  const objectProto = Object.prototype;

  let length = sources.length;
  const guard = length > 2 ? sources[2] : undefined;
  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  for (let i = 0; i < length; i++) {
    const source = sources[i];
    const keys = Object.keys(source) as Array<keyof S>;

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const value = (object as any)[key];

      if (
        value === undefined ||
        // eslint-disable-next-line prefer-object-has-own
        (!Object.prototype.hasOwnProperty.call(object, key) && eq(value, objectProto[key as keyof typeof objectProto]))
      ) {
        (object as any)[key] = source[key];
      }
    }
  }

  return object;
}
