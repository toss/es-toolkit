/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * @param {(...args: A) => R} func - The function to curry.
 * @returns {Curried<A, R>} A curried function
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
/* eslint-disable @typescript-eslint/no-explicit-any */
type Curried<A extends any[], R> = A extends []
  ? () => R
  : A extends [infer P]
    ? (p: P) => R
    : A extends [infer P, ...infer Rest]
      ? (p: P) => Curried<Rest, R>
      : never;
export function curry<A extends any[], R>(func: (...args: A) => R): Curried<A, R> {
  if (func.length === 0 || func.length === 1) {
    return func as Curried<A, R>;
  }

  return function (arg) {
    return makeCurry(func, func.length, [arg]);
  } as Curried<A, R>;
}

function makeCurry<F extends (...args: any) => any>(origin: F, argsLength: number, args: any[]) {
  if (args.length === argsLength) {
    return origin(...args);
  } else {
    const next = function (arg: Parameters<F>[0]) {
      return makeCurry(origin, argsLength, [...args, arg]);
    };

    return next as any;
  }
}
