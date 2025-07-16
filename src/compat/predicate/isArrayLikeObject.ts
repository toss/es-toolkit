import { isArrayLike } from './isArrayLike.ts';
import { isObjectLike } from './isObjectLike.ts';

export function isArrayLikeObject<T extends { __lodashAnyHack: any }>(value: T): boolean;
export function isArrayLikeObject(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  value: ((...args: any[]) => any) | Function | string | boolean | number | null | undefined
): value is never;
export function isArrayLikeObject(value: any): value is object & { length: number };

/**
 * Checks if the given value is a non-primitive, array-like object.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is a non-primitive, array-like object, `false` otherwise.
 *
 * @example
 * isArrayLikeObject([1, 2, 3]); // true
 * isArrayLikeObject({ 0: 'a', length: 1 }); // true
 * isArrayLikeObject('abc'); // false
 * isArrayLikeObject(()=>{}); // false
 */
export function isArrayLikeObject(value?: any): boolean {
  return isObjectLike(value) && isArrayLike(value);
}
