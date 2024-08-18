import type { OptionalToNullable } from '../_internal/types';

type CurryResult<F extends (...args: any) => any> =
  OptionalToNullable<Parameters<F>> extends [infer First, ...infer Rest]
    ? (arg: First) => CurryResult<(...args: Rest) => ReturnType<F>>
    : ReturnType<F>;

/**
 * Translate a function that takes multiple arguments into a sequence of families of functions, each taking a single argument.
 *
 * @param {F} func - The function to curry.
 * @returns {CurryResult<F>} A curried function that could be called in sequence of families of functions.
 *
 * @example
 * function sum(a: number, b: number, c: number) {
 *   return a + b + c;
 * }
 *
 * const curriedSum = curry(sum);
 *
 * // The parameter `a` should be given the value `10`.
 * const sum10 = curriedSum(10);
 *
 * // The parameter `b` should be given the value `15`.
 * const sum25 = sum10(15);
 *
 * // The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
 * const result = sum25(5);
 */
export function curry<F extends (...args: any) => any>(func: F): CurryResult<F> {
  if (func.length === 0) {
    throw new Error('`func` must have at least one argument that is not a rest parameter.');
  }

  return function (arg: Parameters<F>[0]) {
    return makeCurry(func, func.length, [arg]);
  } as CurryResult<F>;
}

function makeCurry<F extends (...args: any) => any>(origin: F, requireArgumentsCount: number, memoizedArgs: any[]) {
  if (memoizedArgs.length === requireArgumentsCount) {
    return origin(...memoizedArgs);
  } else {
    const next = function (arg: Parameters<F>[0]) {
      return makeCurry(origin, requireArgumentsCount, [...memoizedArgs, arg]);
    };

    return next as any;
  }
}
