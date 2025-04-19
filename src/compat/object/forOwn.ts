import { keys as keysToolkit } from './keys.ts';
import { identity } from '../../function/identity.ts';

/**
 * Iterates over an object's properties and calls the `iteratee` function for each property.
 *
 * It only iterates over the object's own properties, not including inherited properties or properties with `Symbol` keys.
 *
 * The `iteratee` function can terminate the iteration early by returning `false`.
 *
 * @template T - The type of the object.
 * @param {T} object The object to iterate over.
 * @param {(value: T[keyof T], key: string, collection: T) => any} [iteratee=identity] The function invoked per iteration. If not provided, the identity function will be used.
 * @return {T} Returns object.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * forOwn(new Foo(), function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
export function forOwn<T>(object: T, iteratee?: (value: T[keyof T], key: string, collection: T) => any): T;

/**
 * Iterates over an object's properties and calls the `iteratee` function for each property.
 *
 * It only iterates over the object's own properties, not including inherited properties or properties with `Symbol` keys.
 *
 * The `iteratee` function can terminate the iteration early by returning `false`.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} object The object to iterate over.
 * @param {(value: T[keyof T], key: string, collection: T) => any} [iteratee=identity] The function invoked per iteration. If not provided, the identity function will be used.
 * @return {T | null | undefined} Returns object.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * forOwn(new Foo(), function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
export function forOwn<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;

/**
 * Iterates over an object's properties and calls the `iteratee` function for each property.
 *
 * It only iterates over the object's own properties, not including inherited properties or properties with `Symbol` keys.
 *
 * The `iteratee` function can terminate the iteration early by returning `false`.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} object The object to iterate over.
 * @param {(value: T[keyof T], key: string, collection: T) => any} [iteratee=identity] The function invoked per iteration. If not provided, the identity function will be used.
 * @return {T | null | undefined} Returns object.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * forOwn(new Foo(), function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
export function forOwn<T>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => any = identity
): T | null | undefined {
  if (object == null) {
    return object;
  }

  const iterable = Object(object);
  const keys = keysToolkit(object);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }

  return object;
}
