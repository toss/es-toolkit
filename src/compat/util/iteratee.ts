import { identity } from '../../function/identity.ts';
import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Returns a `identity` function when `value` is `null` or `undefined`.
 *
 * @param {null} [value] - The value to convert to an iteratee.
 * @returns {<T>(value: T) => T} - Returns a `identity` function.
 *
 * @example
 * const func = iteratee();
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]
 */
export function iteratee(value?: null): <T>(value: T) => T;

/**
 * Returns a given `func` function when `value` is a `function`.
 *
 * @template {(...args: any[]) => unknown} F - The function type.
 * @param {F} func - The function to return.
 * @returns {F} - Returns the given function.
 *
 * @example
 * const func = iteratee((object) => object.a);
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
 */
export function iteratee<F extends (...args: any[]) => unknown>(func: F): F;

/**
 * Creates a function that invokes `value` with the arguments of the created function.
 *
 * The created function returns the property value for a given element.
 *
 * @param {symbol | number | string | object} value - The value to convert to an iteratee.
 * @returns {(...args: any[]) => any} - Returns the new iteratee function.
 *
 * @example
 * const func = iteratee('a');
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
 */
export function iteratee(value: symbol | number | string | object): (...args: any[]) => any;

/**
 * Creates a function that invokes `value` with the arguments of the created function.
 *
 * - If `value` is a property name, the created function returns the property value for a given element.
 * - If `value` is an array or object, the created function returns `true` for elements that contain the equivalent source properties, otherwise `false`.
 *
 * @param {symbol | number | string | object | null | ((...args: any[]) => any)} value - The value to convert to an iteratee.
 * @returns {(...args: any[]) => unknown} - Returns the new iteratee function.
 * @example
 * const func = iteratee();
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]
 * @example
 * const func = iteratee((object) => object.a);
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
 * @example
 * const func = iteratee('a');
 *
 * [{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]
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
      return Array.isArray(value) ? matchesProperty(value[0], value[1]) : matches(value);
    }
  }
  return property(value);
}
