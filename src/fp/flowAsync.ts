/**
 * Creates a reusable async function from a single function.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @returns An async function with the same parameters as `fn1` that resolves to its awaited result.
 */
export function flowAsync<A extends any[], R1>(fn1: (...args: A) => R1): (...args: A) => Promise<Awaited<R1>>;
/**
 * Composes `fn1` and `fn2` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn2`.
 */
export function flowAsync<A extends any[], R1, R2>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2
): (...args: A) => Promise<Awaited<R2>>;
/**
 * Composes `fn1` through `fn3` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn3`.
 */
export function flowAsync<A extends any[], R1, R2, R3>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3
): (...args: A) => Promise<Awaited<R3>>;
/**
 * Composes `fn1` through `fn4` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn4`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4
): (...args: A) => Promise<Awaited<R4>>;
/**
 * Composes `fn1` through `fn5` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn5`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5
): (...args: A) => Promise<Awaited<R5>>;
/**
 * Composes `fn1` through `fn6` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn6`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6
): (...args: A) => Promise<Awaited<R6>>;
/**
 * Composes `fn1` through `fn7` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn7`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7
): (...args: A) => Promise<Awaited<R7>>;
/**
 * Composes `fn1` through `fn8` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn8`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8
): (...args: A) => Promise<Awaited<R8>>;
/**
 * Composes `fn1` through `fn9` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn9`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9
): (...args: A) => Promise<Awaited<R9>>;
/**
 * Composes `fn1` through `fn10` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn10`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10
): (...args: A) => Promise<Awaited<R10>>;
/**
 * Composes `fn1` through `fn11` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @param fn11 - Applied to the awaited result of `fn10`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn11`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10,
  fn11: (input: Awaited<R10>) => R11
): (...args: A) => Promise<Awaited<R11>>;
/**
 * Composes `fn1` through `fn12` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @param fn11 - Applied to the awaited result of `fn10`.
 * @param fn12 - Applied to the awaited result of `fn11`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn12`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10,
  fn11: (input: Awaited<R10>) => R11,
  fn12: (input: Awaited<R11>) => R12
): (...args: A) => Promise<Awaited<R12>>;
/**
 * Composes `fn1` through `fn13` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @param fn11 - Applied to the awaited result of `fn10`.
 * @param fn12 - Applied to the awaited result of `fn11`.
 * @param fn13 - Applied to the awaited result of `fn12`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn13`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10,
  fn11: (input: Awaited<R10>) => R11,
  fn12: (input: Awaited<R11>) => R12,
  fn13: (input: Awaited<R12>) => R13
): (...args: A) => Promise<Awaited<R13>>;
/**
 * Composes `fn1` through `fn14` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @param fn11 - Applied to the awaited result of `fn10`.
 * @param fn12 - Applied to the awaited result of `fn11`.
 * @param fn13 - Applied to the awaited result of `fn12`.
 * @param fn14 - Applied to the awaited result of `fn13`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn14`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10,
  fn11: (input: Awaited<R10>) => R11,
  fn12: (input: Awaited<R11>) => R12,
  fn13: (input: Awaited<R12>) => R13,
  fn14: (input: Awaited<R13>) => R14
): (...args: A) => Promise<Awaited<R14>>;
/**
 * Composes `fn1` through `fn15` left-to-right into a single reusable async function, awaiting each result.
 *
 * @param fn1 - The first function, which may take any number of arguments.
 * @param fn2 - Applied to the awaited result of `fn1`.
 * @param fn3 - Applied to the awaited result of `fn2`.
 * @param fn4 - Applied to the awaited result of `fn3`.
 * @param fn5 - Applied to the awaited result of `fn4`.
 * @param fn6 - Applied to the awaited result of `fn5`.
 * @param fn7 - Applied to the awaited result of `fn6`.
 * @param fn8 - Applied to the awaited result of `fn7`.
 * @param fn9 - Applied to the awaited result of `fn8`.
 * @param fn10 - Applied to the awaited result of `fn9`.
 * @param fn11 - Applied to the awaited result of `fn10`.
 * @param fn12 - Applied to the awaited result of `fn11`.
 * @param fn13 - Applied to the awaited result of `fn12`.
 * @param fn14 - Applied to the awaited result of `fn13`.
 * @param fn15 - Applied to the awaited result of `fn14`.
 * @returns An async function with the same parameters as `fn1` that resolves to the awaited result of `fn15`.
 */
export function flowAsync<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  fn1: (...args: A) => R1,
  fn2: (input: Awaited<R1>) => R2,
  fn3: (input: Awaited<R2>) => R3,
  fn4: (input: Awaited<R3>) => R4,
  fn5: (input: Awaited<R4>) => R5,
  fn6: (input: Awaited<R5>) => R6,
  fn7: (input: Awaited<R6>) => R7,
  fn8: (input: Awaited<R7>) => R8,
  fn9: (input: Awaited<R8>) => R9,
  fn10: (input: Awaited<R9>) => R10,
  fn11: (input: Awaited<R10>) => R11,
  fn12: (input: Awaited<R11>) => R12,
  fn13: (input: Awaited<R12>) => R13,
  fn14: (input: Awaited<R13>) => R14,
  fn15: (input: Awaited<R14>) => R15
): (...args: A) => Promise<Awaited<R15>>;
/**
 * Performs left-to-right async function composition, returning a **reusable
 * async function** instead of running immediately. The first function may take
 * any number of arguments; every later function is unary and receives the
 * awaited result of the previous one.
 *
 * `flowAsync` is the promise-aware sibling of {@link flow}: where `flow` passes
 * each raw return value straight to the next function (so a returned `Promise`
 * arrives unresolved), `flowAsync` awaits every step, letting synchronous and
 * asynchronous functions mix freely in one chain. The composed function always
 * returns a `Promise`.
 *
 * @param functions - The functions to compose. The first may be variadic; the
 *   rest are unary, each receiving the awaited output of the previous function.
 * @returns An async function that, when called, applies every function
 *   left-to-right, awaiting each result.
 *
 * @example
 * import { flowAsync } from 'es-toolkit/fp';
 *
 * const fetchUser = async (id: number) => ({ id, name: 'Alice' });
 * const getName = (user: { name: string }) => user.name;
 *
 * const getUserName = flowAsync(fetchUser, getName);
 * await getUserName(1); // => 'Alice'
 */
export function flowAsync(...functions: Array<(...args: any[]) => any>): (...args: any[]) => Promise<any> {
  return async function (this: any, ...args: any[]): Promise<any> {
    if (functions.length === 0) {
      return args[0];
    }

    let result = await functions[0].apply(this, args);

    for (let i = 1; i < functions.length; i++) {
      result = await functions[i].call(this, result);
    }

    return result;
  };
}
