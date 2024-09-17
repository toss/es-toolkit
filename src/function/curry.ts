type RequiredArray<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

type RemoveOptionalProcessor<A extends any[], B extends any[], Result extends any[] = []> = B extends [
  infer Head,
  ...infer Rest,
]
  ? A[Result['length']] extends B[0]
    ? RemoveOptionalProcessor<A, Rest, [...Result, Head]>
    : RemoveOptionalProcessor<A, Rest, Result>
  : Result;

type RemoveOptional<T extends any[]> = RemoveOptionalProcessor<T, RequiredArray<T>>;

type CurryResult<
  F extends (...args: any) => any,
  Origin extends (...args: any) => any = F,
> = Parameters<Origin>['length'] extends 0
  ? F
  : RemoveOptional<Parameters<F>> extends [infer First, ...infer Rest]
    ? (arg: First) => CurryResult<(...args: Rest) => ReturnType<F>, Origin>
    : ReturnType<F>;

/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * @param {F} func - The function to curry.
 * @returns {CurryResult<F>} A curried function that can be called with a single argument at a time.
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
  if (func.length === 0 || func.length === 1) {
    return func as any;
  }

  return function (arg: any) {
    return makeCurry(func, func.length, [arg]);
  } as any;
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
