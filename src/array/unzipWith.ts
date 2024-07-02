import { isNil } from '../predicate';

export function unzipWith<T>(target: readonly T[][] | null | undefined): T[][];
export function unzipWith<T, R>(target: readonly T[][] | null | undefined, iteratee: (...args: T[]) => R): R[];
export function unzipWith<T, R>(
  target: readonly T[][] | null | undefined,
  iteratee?: (...args: T[]) => R
): R[] | T[][] {
  if (isNil(target) || target.length === 0) {
    return [];
  }

  const maxLength = Math.max(...target.map(innerArray => innerArray.length));

  const result = Array.from({ length: maxLength }) as R[] | T[][];

  for (let i = 0; i < maxLength; i++) {
    const group = target.map(innerArray => innerArray[i]);

    result[i] = iteratee ? iteratee(...group) : group;
  }

  return result;
}
