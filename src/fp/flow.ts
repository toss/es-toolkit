import { pipe } from './pipe.ts';

/**
 * Creates a reusable function from a single function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @returns A function with the same parameters as `fn1` that returns its result.
 */
export function flow<A extends any[], R1>(fn1: (...args: A) => R1): (...args: A) => R1;
/**
 * Composes `fn1` and `fn2` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn2`.
 */
export function flow<A extends any[], R1, R2>(fn1: (...args: A) => R1, fn2: (input: R1) => R2): (...args: A) => R2;
/**
 * Composes `fn1` through `fn3` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn3`.
 */
export function flow<A extends any[], R1, R2, R3>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3
): (...args: A) => R3;
/**
 * Composes `fn1` through `fn4` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn4`.
 */
export function flow<A extends any[], R1, R2, R3, R4>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4
): (...args: A) => R4;
/**
 * Composes `fn1` through `fn5` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn5`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5
): (...args: A) => R5;
/**
 * Composes `fn1` through `fn6` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn6`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6
): (...args: A) => R6;
/**
 * Composes `fn1` through `fn7` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn7`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7
): (...args: A) => R7;
/**
 * Composes `fn1` through `fn8` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn8`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8
): (...args: A) => R8;
/**
 * Composes `fn1` through `fn9` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn9`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9
): (...args: A) => R9;
/**
 * Composes `fn1` through `fn10` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn10`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10
): (...args: A) => R10;
/**
 * Composes `fn1` through `fn11` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @param fn11 - Applied to the result of `fn10`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn11`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10,
  fn11: (input: R10) => R11
): (...args: A) => R11;
/**
 * Composes `fn1` through `fn12` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @param fn11 - Applied to the result of `fn10`.
 * @param fn12 - Applied to the result of `fn11`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn12`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10,
  fn11: (input: R10) => R11,
  fn12: (input: R11) => R12
): (...args: A) => R12;
/**
 * Composes `fn1` through `fn13` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @param fn11 - Applied to the result of `fn10`.
 * @param fn12 - Applied to the result of `fn11`.
 * @param fn13 - Applied to the result of `fn12`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn13`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10,
  fn11: (input: R10) => R11,
  fn12: (input: R11) => R12,
  fn13: (input: R12) => R13
): (...args: A) => R13;
/**
 * Composes `fn1` through `fn14` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @param fn11 - Applied to the result of `fn10`.
 * @param fn12 - Applied to the result of `fn11`.
 * @param fn13 - Applied to the result of `fn12`.
 * @param fn14 - Applied to the result of `fn13`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn14`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10,
  fn11: (input: R10) => R11,
  fn12: (input: R11) => R12,
  fn13: (input: R12) => R13,
  fn14: (input: R13) => R14
): (...args: A) => R14;
/**
 * Composes `fn1` through `fn15` left-to-right into a single reusable function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the result of `fn1`.
 * @param fn3 - Applied to the result of `fn2`.
 * @param fn4 - Applied to the result of `fn3`.
 * @param fn5 - Applied to the result of `fn4`.
 * @param fn6 - Applied to the result of `fn5`.
 * @param fn7 - Applied to the result of `fn6`.
 * @param fn8 - Applied to the result of `fn7`.
 * @param fn9 - Applied to the result of `fn8`.
 * @param fn10 - Applied to the result of `fn9`.
 * @param fn11 - Applied to the result of `fn10`.
 * @param fn12 - Applied to the result of `fn11`.
 * @param fn13 - Applied to the result of `fn12`.
 * @param fn14 - Applied to the result of `fn13`.
 * @param fn15 - Applied to the result of `fn14`.
 * @returns A function with the same parameters as `fn1` that returns the result of `fn15`.
 */
export function flow<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  fn1: (...args: A) => R1,
  fn2: (input: R1) => R2,
  fn3: (input: R2) => R3,
  fn4: (input: R3) => R4,
  fn5: (input: R4) => R5,
  fn6: (input: R5) => R6,
  fn7: (input: R6) => R7,
  fn8: (input: R7) => R8,
  fn9: (input: R8) => R9,
  fn10: (input: R9) => R10,
  fn11: (input: R10) => R11,
  fn12: (input: R11) => R12,
  fn13: (input: R12) => R13,
  fn14: (input: R13) => R14,
  fn15: (input: R14) => R15
): (...args: A) => R15;
/**
 * Performs left-to-right function composition, returning a **reusable function**
 * instead of running immediately. The first function may take any number of
 * arguments; every later function is unary and receives the previous result.
 *
 * `flow` is the deferred sibling of {@link pipe}: where `pipe(value, ...fns)`
 * threads a concrete value through the functions right away, `flow(...fns)`
 * builds a function you can call later (and reuse) with the data. Internally it
 * delegates to `pipe`, so lazy-capable functions (`map`, `filter`, `take`, …)
 * are fused exactly the same way and benefit from early termination.
 *
 * @param functions - The functions to compose. The first may be variadic; the
 *   rest are unary, each receiving the previous function's output.
 * @returns A function that, when called, applies every function left-to-right.
 *
 * @example
 * import { flow } from 'es-toolkit/fp';
 *
 * const addThenSquare = flow(
 *   (x: number, y: number) => x + y,
 *   n => n * n
 * );
 *
 * addThenSquare(1, 2); // => 9
 *
 * @example
 * import { flow, map, filter, take } from 'es-toolkit/fp';
 *
 * // A reusable lazy pipeline. Only the first two even squares are computed.
 * const firstTwoEvenSquares = flow(
 *   map((x: number) => x * x),
 *   filter(x => x % 2 === 0),
 *   take(2)
 * );
 *
 * firstTwoEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
 */
export function flow(...functions: Array<(...args: any[]) => any>): (...args: any[]) => any {
  // `pipe` is variadically typed through overloads; widen it here so we can
  // forward an arbitrary number of functions.
  const run = pipe as (value: unknown, ...fns: Array<(input: any) => any>) => unknown;

  return function (this: any, ...args: any[]): any {
    if (functions.length === 0) {
      return args[0];
    }

    // With a single argument the first function is just another unary step, so
    // we let `pipe` apply it too — this keeps a leading lazy operator inside the
    // fused run instead of forcing an eager call.
    if (args.length <= 1) {
      return run(args[0], ...functions);
    }

    // The first function is the only one allowed to be variadic, so it must be
    // invoked directly with all arguments; the rest go through `pipe`.
    const [first, ...rest] = functions;
    return run(first.apply(this, args), ...rest);
  };
}
