/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {() => R} func - The function to curry.
 * @returns {() => R} A curried function.
 *
 * @example
 * function noArgFunc() {
 *  return 42;
 * }
 * const curriedNoArgFunc = curryRight(noArgFunc);
 * console.log(curriedNoArgFunc()); // 42
 */
export function curryRight<R>(func: () => R): () => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(p: P) => R} func - The function to curry.
 * @returns {(p: P) => R} A curried function.
 *
 * @example
 * function oneArgFunc(a: number) {
 *   return a * 2;
 * }
 * const curriedOneArgFunc = curryRight(oneArgFunc);
 * console.log(curriedOneArgFunc(5)); // 10
 */
export function curryRight<P, R>(func: (p: P) => R): (p: P) => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(p1: P1, p2: P2) => R} func - The function to curry.
 * @returns {(p1: P2) => (p2: P1) => R} A curried function.
 *
 * @example
 * function twoArgFunc(a: number, b: number) {
 *  return [a, b];
 * }
 * const curriedTwoArgFunc = curryRight(twoArgFunc);
 * const func = curriedTwoArgFunc(1);
 * console.log(func(2)); // [2, 1]
 */
export function curryRight<P1, P2, R>(func: (p1: P1, p2: P2) => R): (p1: P2) => (p2: P1) => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(p1: P1, p2: P2, p3: P3) => R} func - The function to curry.
 * @returns {(p1: P3) => (p2: P2) => (p3: P1) => R} A curried function.
 *
 * @example
 * function threeArgFunc(a: number, b: number, c: number) {
 *   return [a, b, c];
 * }
 * const curriedThreeArgFunc = curryRight(threeArgFunc);
 * const func = curriedThreeArgFunc(1);
 * const func2 = func(2);
 * console.log(func2(3)); // [3, 2, 1]
 */
export function curryRight<P1, P2, P3, R>(func: (p1: P1, p2: P2, p3: P3) => R): (p1: P3) => (p2: P2) => (p3: P1) => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(p1: P1, p2: P2, p3: P3, p4: P4) => R} func - The function to curry.
 * @returns {(p1: P4) => (p2: P3) => (p3: P2) => (p4: P1) => R} A curried function.
 *
 * @example
 * function fourArgFunc(a: number, b: number, c: number, d: number) {
 *  return [a, b, c, d];
 * }
 * const curriedFourArgFunc = curryRight(fourArgFunc);
 * const func = curriedFourArgFunc(1);
 * const func2 = func(2);
 * const func3 = func2(3);
 * console.log(func3(4)); // [4, 3, 2, 1]
 */
export function curryRight<P1, P2, P3, P4, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4) => R
): (p1: P4) => (p2: P3) => (p3: P2) => (p4: P1) => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R} func - The function to curry.
 * @returns {(p1: P5) => (p2: P4) => (p3: P3) => (p4: P2) => (p5: P1) => R} A curried function.
 *
 * @example
 * function fiveArgFunc(a: number, b: number, c: number, d: number, e: number) {
 *   return [a, b, c, d, e];
 * }
 * const curriedFiveArgFunc = curryRight(fiveArgFunc);
 * const func = curriedFiveArgFunc(1);
 * const func2 = func(2);
 * const func3 = func2(3);
 * const func4 = func3(4);
 * console.log(func4(5)); // [5, 4, 3, 2, 1]
 */
export function curryRight<P1, P2, P3, P4, P5, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R
): (p1: P5) => (p2: P4) => (p3: P3) => (p4: P2) => (p5: P1) => R;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(...args: any[]) => any} func - The function to curry.
 * @returns {(...args: any[]) => any} A curried function.
 *
 * @example
 * function sum(a: number, b: number, c: number) {
 *   return a + b + c;
 * }
 *
 * const curriedSum = curryRight(sum);
 *
 * // The parameter `c` should be given the value `10`.
 * const add10 = curriedSum(10);
 *
 * // The parameter `b` should be given the value `15`.
 * const add25 = add10(15);
 *
 * // The parameter `a` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
 * const result = add25(5);
 */
export function curryRight(func: (...args: any[]) => any): (...args: any[]) => any;
/**
 * Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
 * This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * @param {(...args: any[]) => any} func - The function to curry.
 * @returns {(...args: any[]) => any} A curried function.
 *
 * @example
 * function sum(a: number, b: number, c: number) {
 *   return a + b + c;
 * }
 *
 * const curriedSum = curryRight(sum);
 *
 * // The parameter `c` should be given the value `10`.
 * const add10 = curriedSum(10);
 *
 * // The parameter `b` should be given the value `15`.
 * const add25 = add10(15);
 *
 * // The parameter `a` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
 * const result = add25(5);
 */
export function curryRight(func: (...args: any[]) => any): (...args: any[]) => any {
  if (func.length === 0 || func.length === 1) {
    return func;
  }

  return function (arg: any) {
    return makeCurryRight(func, func.length, [arg]);
  } as any;
}

function makeCurryRight<F extends (...args: any) => any>(origin: F, argsLength: number, args: any[]) {
  if (args.length === argsLength) {
    return origin(...args);
  } else {
    const next = function (arg: Parameters<F>[0]) {
      return makeCurryRight(origin, argsLength, [arg, ...args]);
    };
    return next as any;
  }
}
