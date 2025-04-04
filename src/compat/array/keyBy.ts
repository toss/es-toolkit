import { reduce } from './reduce.ts';
import { identity } from '../../function';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isObjectLike } from '../predicate/isObjectLike.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

export function keyBy<T>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T> | null
): Record<string, T>;

export function keyBy<T extends object>(
  collection: T | null | undefined,
  iteratee?: ((value: T[keyof T]) => unknown) | PropertyKey | [keyof T[keyof T], unknown] | Partial<T[keyof T]> | null
): Record<string, T[keyof T]>;

export function keyBy<T>(
  collection: unknown,
  iteratee?: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T> | null
): Record<string, T> {
  if (!isArrayLike(collection) && !isObjectLike(collection)) {
    return {};
  }

  const keyFn = iteratee == null ? identity : createIteratee(iteratee);

  return reduce(
    collection,
    (result, value) => {
      const key = keyFn(value);
      result[key] = value;
      return result;
    },
    {} as Record<string, T>
  );
}
