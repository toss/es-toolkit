type RequiredArray<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};

type OptionalToNullableTranslator<A extends any[], B extends any[], Result extends any[] = []> = B extends [
  infer Head,
  ...infer Rest,
]
  ? A[Result['length']] extends B[0]
    ? OptionalToNullableTranslator<A, Rest, [...Result, Head]>
    : OptionalToNullableTranslator<A, Rest, [...Result, Head | void]>
  : Result;

export type OptionalToNullable<T extends any[]> = OptionalToNullableTranslator<T, RequiredArray<T>>;

type FullParameters<F extends (...args: any) => any> = OptionalToNullable<Parameters<F>>;

type CurryResult<
  F extends (...args: any) => any,
  A extends number,
  C extends any[] = [],
  Origin extends (...args: any) => any = F,
> = FullParameters<Origin>['length'] extends 0
  ? F
  : C['length'] extends A
    ? ReturnType<F>
    : FullParameters<F> extends [infer First, ...infer Rest]
      ? (arg: First) => CurryResult<(...args: Rest) => ReturnType<F>, A, [0, ...C], Origin>
      : ReturnType<F>;

/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * @param {F} func - The function to curry.
 * @param {A} artiy - The number of arguments to be received
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
export function curry<F extends (...args: any) => any, A extends number = FullParameters<F>['length']>(
  func: F,
  arity: A = func.length as A
): CurryResult<F, A> {
  if (arity === 0 || arity === 1) {
    return func as any;
  }

  return function (arg: any) {
    return makeCurry(func, arity, [arg]);
  } as any;
}

function makeCurry<F extends (...args: any) => any>(origin: F, arity: number, args: any[]) {
  if (args.length === arity) {
    return origin(...args);
  } else {
    const next = function (arg: Parameters<F>[0]) {
      return makeCurry(origin, arity, [...args, arg]);
    };

    return next as any;
  }
}
