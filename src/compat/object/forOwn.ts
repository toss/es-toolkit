import { keys as keysToolkit } from './keys.ts';
import { identity } from '../../function/identity.ts';

/**
 * Iterates over own enumerable properties of an object invoking iteratee for each property. The iteratee is
 * invoked with three arguments: (value, key, object). Iteratee functions may exit
 * iteration early by explicitly returning false.
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iteratee: (value: T[keyof T], key: string, collection: T) => any = identity
): T | null | undefined {
  if (!object) {
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
