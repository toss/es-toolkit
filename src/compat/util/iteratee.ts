import { identity } from '../../function/identity.ts';
import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Returns the provided function as-is when it is a function type.
 *
 * @template F - The function type
 * @param {F} func - The function to return
 * @returns {F} Returns the provided function unchanged
 *
 * @example
 * const fn = (x: number) => x * 2;
 * const iterateeFn = iteratee(fn);
 * iterateeFn(4); // => 8
 */
export function iteratee<F extends (...args: any[]) => any>(func: F): F;

/**
 * Creates an iteratee function based on the provided property key or object.
 * If given a property key, returns a function that gets that property from objects.
 * If given an object, returns a function that matches objects against the provided one.
 *
 * @param {PropertyKey | object} func - The value to convert to an iteratee
 * @returns {Function} Returns the iteratee function
 *
 * @example
 * // With property key
 * const getLength = iteratee('length');
 * getLength([1,2,3]); // => 3
 *
 * // With object
 * const matchObj = iteratee({ x: 1, y: 2 });
 * matchObj({ x: 1, y: 2, z: 3 }); // => true
 */
export function iteratee(func: PropertyKey | object): (...args: any[]) => any;

/**
 * Creates a function that returns a value from an element in a collection.
 *
 * You can call `iteratee` with the following types of arguments:
 *
 * - **Function**: Returns the function as-is, which will be called with the element from the collection.
 * - **Property name**: Returns the value of the specified property from the element.
 * - **Property-value pair**: Returns a boolean indicating whether the element's property matches the given value.
 * - **Partial object**: Returns a boolean indicating whether the element matches the properties of the partial object.
 *
 * If you don't provide any arguments or pass `null`, this function will return a function that simply returns its input unchanged.
 *
 * @param {symbol | number | string | object | null | ((...args: any[]) => any)} value - The value to convert to an iteratee.
 * @returns {(...args: any[]) => unknown} - Returns the new iteratee function.
 * @example
 * const func = iteratee();
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]
 *
 * const func = iteratee((object) => object.a);
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
 *
 * const func = iteratee('a');
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
 *
 * const func = iteratee({ a: 1 });
 * [{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }
 *
 * const func = iteratee(['a', 1]);
 * [{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }
 */
export function iteratee(
  value?: symbol | number | string | object | null | ((...args: any[]) => unknown)
): (...args: any[]) => any {
  if (value == null) {
    return identity;
  }

  switch (typeof value) {
    case 'function': {
      return value as any;
    }
    case 'object': {
      if (Array.isArray(value) && value.length === 2) {
        return matchesProperty(value[0], value[1]);
      }

      return matches(value);
    }
    case 'string':
    case 'symbol':
    case 'number': {
      return property(value);
    }
  }
}
