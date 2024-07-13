import { LinearSubArray } from "../_internal/types/linear-sub-array";
import { RemoveHeads } from "../_internal/types/remove-heads";

type CurriedFunction<
  F extends (...args: any) => any, 
> = <S extends LinearSubArray<Parameters<F>>>(...args: S) => S['length'] extends Parameters<F>['length'] ? ReturnType<F> : CurriedFunction<(...args: RemoveHeads<Parameters<F>, S>) => ReturnType<F>>;

type CurriedFunctionResult<F extends (...args: any) => any, S extends LinearSubArray<Parameters<F>>> = S['length'] extends Parameters<F>['length'] ? ReturnType<F> : CurriedFunction<(...args: RemoveHeads<Parameters<F>, S>) => ReturnType<F>>

/**
 * Translate a function that takes multiple arguments into a sequence of families of functions.
 * 
 * @param {F} func - The function to curry.
 * @returns {<S extends LinearSubArray<Parameters<F>>>(...args: S) => CurriedFunctionResult<F, S>} A curried function that could be called in sequence of families of functions.
 * 
 * @example
 * const sum = function(a, b, c, d, e, f) {
 *   return a + b + c + d + e + f;
 * }
 * 
 * const curriedSum = curry(sum);
 * 
 * // The argument `a` should be given the value `10`.
 * const sum10 = curriedSum(10);
 * 
 * // The argument `b` should be given the value `15`, `c` the value `7`, and `d` the value `1`.
 * const sum33 = sum10(15, 7, 1);
 * 
 * // The argument `e` should be given the value `2`, `f` the value `5`. The function 'sum' has received all its arguments and will now return a value.
 * const result = sum32(2, 5);
 */
export function curry<F extends (...args: any) => any>(func: F) {
  return function <S extends LinearSubArray<Parameters<F>>>(...args: S): CurriedFunctionResult<F, S> {
    return makeCurry(func, func.length, [], args);
  }
}

function makeCurry<
  F extends (...args: any) => any, 
  S extends LinearSubArray<Parameters<F>>
>(origin: F, requireArgumentsCount: number, memoizedArgs: any[], args: S): CurriedFunctionResult<F, S> {
  if(args.length === requireArgumentsCount) {
    return origin(...memoizedArgs, ...args);
  } else {
    return function (...newArgs: RemoveHeads<Parameters<F>, S>) {
      return makeCurry(origin, requireArgumentsCount - args.length, [...memoizedArgs, ...args], newArgs as any);
    } as any
  }
}

function hello(a: string, b: number, c: boolean) { return `${a}${b}${c}` }

const h = curry(hello);

const e = h("a");

const l = e(1, true);
