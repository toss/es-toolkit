import { maxBy as maxByToolkit } from '../../array/maxBy.ts';

type MaxByResult<T, A extends readonly T[]> = A extends readonly [unknown, ...unknown[]] ? T : T | undefined;

/**
 * Creates a function that returns the element with the maximum selected number.
 *
 * If the selector returns NaN, the element that produced NaN is returned, matching
 * the main {@link maxBy} behavior.
 *
 * @template T - The type of elements in the array.
 * @template A - The type of the input array.
 * @param getValue - Selects a numeric value from each element, index, and array.
 * @returns A function that maps a readonly array to the maximum element, or undefined.
 *
 * @example
 * import { maxBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([{ score: 10 }, { score: 20 }] as const, maxBy(item => item.score));
 * // => { score: 20 }
 */
export function maxBy<T, A extends readonly T[]>(
  getValue: (element: A[number], index: number, array: ReadonlyArray<A[number]>) => number
): (array: A) => MaxByResult<A[number], A>;

/**
 * Creates a function that returns the element with the maximum selected number.
 *
 * Empty arrays return undefined. If the selector returns NaN, the element that
 * produced NaN is returned, matching the main {@link maxBy} behavior.
 *
 * @template T - The type of elements in the array.
 * @param getValue - Selects a numeric value from each element, index, and array.
 * @returns A function that maps a readonly array to the maximum element, or undefined.
 *
 * @example
 * import { maxBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([] as Array<{ score: number }>, maxBy(item => item.score));
 * // => undefined
 */
export function maxBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): <A extends readonly T[]>(array: A) => MaxByResult<T, A>;

export function maxBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): (array: readonly [T, ...T[]]) => T;
export function maxBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): (array: readonly T[]) => T | undefined {
  return function (array: readonly T[]): T | undefined {
    return maxByToolkit(array, getValue);
  };
}
