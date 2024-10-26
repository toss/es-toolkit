import { flatten } from './flatten.ts';
import { last } from './last.ts';
import { difference as differenceToolkit } from '../../array/difference.ts';
import { differenceBy as differenceByToolkit } from '../../array/differenceBy.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

type Iteratee<T> = PropertyKey | Partial<T> | ((value: T) => unknown);

export function differenceBy<T1, T2>(
  array: ArrayLike<T1> | null | undefined,
  values: ArrayLike<T2>,
  iteratee: Iteratee<T1 | T2>
): T1[];

export function differenceBy<T1, T2, T3>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  iteratee: Iteratee<T1 | T2 | T3>
): T1[];

export function differenceBy<T1, T2, T3, T4>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  iteratee: Iteratee<T1 | T2 | T3 | T4>
): T1[];

export function differenceBy<T1, T2, T3, T4, T5>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  values4: ArrayLike<T5>,
  iteratee: Iteratee<T1 | T2 | T3 | T4 | T5>
): T1[];

export function differenceBy<T>(array: ArrayLike<T> | null | undefined, ...values: Array<ArrayLike<T>>): T[];

export function differenceBy<T>(arr: ArrayLike<T> | null | undefined, ...values: any[]): T[] {
  if (!isArrayLikeObject(arr)) {
    return [];
  }

  const iteratee = last(values);

  if (isArrayLikeObject(iteratee)) {
    return differenceToolkit(Array.from(arr), flatten(values));
  }

  return differenceByToolkit(Array.from(arr), flatten(values.slice(0, -1)), createIteratee(iteratee));
}
