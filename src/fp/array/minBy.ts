import { minBy as minByToolkit } from '../../array/minBy.ts';

type MinByResult<T, A extends readonly T[]> = A extends readonly [unknown, ...unknown[]] ? T : T | undefined;

/**
 * Creates a function that returns the element with the minimum selected number.
 *
 * If the selector returns NaN, the element that produced NaN is returned, matching
 * the main {@link minBy} behavior.
 *
 * @template T - The type of elements in the array.
 * @template A - The type of the input array.
 * @param getValue - Selects a numeric value from each element, index, and array.
 * @returns A function that maps a readonly array to the minimum element, or undefined.
 *
 * @example
 * import { minBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([{ score: 10 }, { score: 20 }] as const, minBy(item => item.score));
 * // => { score: 10 }
 */
export function minBy<T, A extends readonly T[]>(
  getValue: (element: A[number], index: number, array: ReadonlyArray<A[number]>) => number
): (array: A) => MinByResult<A[number], A>;

/**
 * Creates a function that returns the element with the minimum selected number.
 *
 * Empty arrays return undefined. If the selector returns NaN, the element that
 * produced NaN is returned, matching the main {@link minBy} behavior.
 *
 * @template T - The type of elements in the array.
 * @param getValue - Selects a numeric value from each element, index, and array.
 * @returns A function that maps a readonly array to the minimum element, or undefined.
 *
 * @example
 * import { minBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([] as Array<{ score: number }>, minBy(item => item.score));
 * // => undefined
 */
export function minBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): <A extends readonly T[]>(array: A) => MinByResult<T, A>;

export function minBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): (array: readonly [T, ...T[]]) => T;
export function minBy<T>(
  getValue: (element: T, index: number, array: readonly T[]) => number
): (array: readonly T[]) => T | undefined {
  return function (array: readonly T[]): T | undefined {
    return minByToolkit(array, getValue);
  };
}
