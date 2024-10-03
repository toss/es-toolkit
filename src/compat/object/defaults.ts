import { eq } from '../util/eq.ts';

/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @param {T} object - The destination object.
 * @returns {NonNullable<T>} Returns `object`, ensuring that the destination object is not `null` or `undefined`.
 */
export function defaults<T extends object>(object: T): NonNullable<T>;
/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @template S - The source object type.
 * @param {T} object - The destination object.
 * @param {S} source - The source object.
 * @returns {NonNullable<T & S>} Returns the merged object, ensuring that the destination object is not `null` or `undefined`.
 */

export function defaults<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @template S1 - The first source object type.
 * @template S2 - The second source object type.
 * @param {T} object - The destination object.
 * @param {S1} source1 - The first source object.
 * @param {S2} source2 - The second source object.
 * @returns {NonNullable<T & S1 & S2>} Returns the merged object, ensuring that the destination object is not `null` or `undefined`.
 */

export function defaults<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @template S1 - The first source object type.
 * @template S2 - The second source object type.
 * @template S3 - The third source object type.
 * @param {T} object - The destination object.
 * @param {S1} source1 - The first source object.
 * @param {S2} source2 - The second source object.
 * @param {S3} source3 - The third source object.
 * @returns {NonNullable<T & S1 & S2 & S3>} Returns the merged object, ensuring that the destination object is not `null` or `undefined`.
 */

export function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @template S1 - The first source object type.
 * @template S2 - The second source object type.
 * @template S3 - The third source object type.
 * @template S4 - The fourth source object type.
 * @param {T} object - The destination object.
 * @param {S1} source1 - The first source object.
 * @param {S2} source2 - The second source object.
 * @param {S3} source3 - The third source object.
 * @param {S4} source4 - The fourth source object.
 * @returns {NonNullable<T & S1 & S2 & S3 & S4>} Returns the merged object, ensuring that the destination object is not `null` or `undefined`.
 */

export function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
/**
 * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 *
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 * It ensures that the destination object is not `null` or `undefined`.
 *
 * Note: This method mutates a first argument `object`.
 *
 * @template T - The destination object type.
 * @template S - The source object type.
 * @param {T} object - The destination object.
 * @param {S[]} sources - The source objects.
 * @returns {object} Returns the merged object, ensuring that the destination object is not `null` or `undefined`.
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

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const keys = Object.keys(source) as Array<keyof S>;

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const value = (object as any)[key];

      if (
        value === undefined ||
        (!Object.hasOwn(object, key) && eq(value, objectProto[key as keyof typeof objectProto]))
      ) {
        (object as any)[key] = source[key];
      }
    }
  }

  return object;
}
