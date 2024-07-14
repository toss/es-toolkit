import type { LinearSubArray, RemoveHead, RemoveHeads, RemoveRest, OptionalToNullable } from '../_internal/types';

type CurriedFunction<F extends (...args: any) => any> = (
  arg: Parameters<F>[0]
) => RemoveRest<OptionalToNullable<Parameters<F>>>['length'] extends 1
  ? ReturnType<F>
  : CurriedFunction<(...args: RemoveHead<Parameters<F>>) => ReturnType<F>> & { run: () => ReturnType<F> };

type CurriedFunctionResult<F extends (...args: any) => any> = RemoveRest<
  OptionalToNullable<Parameters<F>>
>['length'] extends 1
  ? ReturnType<F>
  : CurriedFunction<(...args: RemoveHead<Parameters<F>>) => ReturnType<F>> & { run: () => ReturnType<F> };

/**
 * Translate a function that takes multiple arguments into a sequence of families of functions, each taking a single argument.
 *
 * @param {F} func - The function to curry.
 * @returns {(arg: Parameters<F>[0]) => CurriedFunctionResult<F>} A curried function that could be called in sequence of families of functions.
 *
 * @example
 * const sum = function(a, b, c) {
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
export function curry<F extends (...args: any) => any>(func: F) {
  if (func.length === 0) {
    throw new Error('`func` must have at least one argument that is not a rest parameter.');
  }

  return function (arg: Parameters<F>[0]) {
    return makeCurry(func, func.length, [arg]);
  };
}

function makeCurry<F extends (...args: any) => any>(
  origin: F,
  requireArgumentsCount: number,
  memoizedArgs: any[]
): CurriedFunctionResult<F> {
  if (memoizedArgs.length === requireArgumentsCount) {
    return origin(...memoizedArgs);
  } else {
    const next = function (arg: Parameters<F>[0]) {
      return makeCurry(origin, requireArgumentsCount, [...memoizedArgs, arg]);
    };

    next.run = () => {
      return origin(...memoizedArgs);
    };

    return next as any;
  }
}

type MatchCurriedFunctionResult<F extends (...args: any) => any, S extends LinearSubArray<Parameters<F>>> = RemoveRest<
  OptionalToNullable<S>
>['length'] extends RemoveRest<OptionalToNullable<Parameters<F>>>['length']
  ? ReturnType<F>
  : FlexibleCurriedFunction<(...args: RemoveHeads<Parameters<F>, S>) => ReturnType<F>> & { run: () => ReturnType<F> };

// FlexibleCurriedFunction 타입 선언에서 유틸리티 타입을 사용
type FlexibleCurriedFunction<F extends (...args: any) => any> = <S extends LinearSubArray<Parameters<F>>>(
  ...args: S
) => MatchCurriedFunctionResult<F, S>;

// FlexibleCurriedFunctionResult 타입 선언에서 같은 유틸리티 타입을 사용
type FlexibleCurriedFunctionResult<
  F extends (...args: any) => any,
  S extends LinearSubArray<Parameters<F>>,
> = MatchCurriedFunctionResult<F, S>;

/**
 * Translate a function that takes multiple arguments into a sequence of families of functions.
 * Differently to each functions by `curry`, each functions by `curry.flexible` can receive multiple arguments, not only single argument.
 *
 * @param {F} func - The function to curry.
 * @returns {<S extends LinearSubArray<Parameters<F>>>(...args: S) => FlexibleCurriedFunctionResult<F, S>} A curried function that could be called in sequence of families of functions.
 *
 * @example
 * const sum = function(a, b, c, d, e, f) {
 *   return a + b + c + d + e + f;
 * }
 *
 * const curriedSum = curry(sum);
 *
 * // The parameter `a` should be given the value `10`.
 * const sum10 = curriedSum(10);
 *
 * // The parameter `b` should be given the value `15`, `c` the value `7`, and `d` the value `1`.
 * const sum33 = sum10(15, 7, 1);
 *
 * // The parameter `e` should be given the value `2`, `f` the value `5`. The function 'sum' has received all its arguments and will now return a value.
 * const result = sum32(2, 5);
 */
function flexibleCurry<F extends (...args: any) => any>(func: F) {
  if (func.length === 0) {
    throw new Error('`func` must have at least one argument that is not a rest parameter.');
  }

  return function <S extends LinearSubArray<Parameters<F>>>(...args: S): FlexibleCurriedFunctionResult<F, S> {
    return makeflexibleCurry(func, func.length, [], args);
  };
}

function makeflexibleCurry<F extends (...args: any) => any, S extends LinearSubArray<Parameters<F>>>(
  origin: F,
  requireArgumentsCount: number,
  memoizedArgs: any[],
  args: S
): FlexibleCurriedFunctionResult<F, S> {
  if (args.length === requireArgumentsCount) {
    return origin(...memoizedArgs, ...args);
  } else {
    const next = function (...newArgs: RemoveHeads<Parameters<F>, S>) {
      return makeflexibleCurry(origin, requireArgumentsCount - args.length, [...memoizedArgs, ...args], newArgs as any);
    };

    next.run = () => {
      return origin(...memoizedArgs, ...args);
    };

    return next as any;
  }
}

curry.flexible = flexibleCurry;
