/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {() => R} f The function to invoke.
 * @returns {() => R} Returns the new composite function.
 *
 * @example
 * function noArgFunc() {
 *  return 42;
 * }
 *
 * const combined = flow(noArgFunc);
 * console.log(combined()); // 42
 */
export function flow<R>(f: () => R): () => R;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {(...args: A) => R} f1 The function to invoke.
 * @returns {(...args: A) => R} Returns the new composite function.
 *
 * @example
 * function oneArgFunc(a: number) {
 *   return a * 2;
 * }
 *
 * const combined = flow(oneArgFunc);
 * console.log(combined(5)); // 10
 */
export function flow<A extends any[], R>(f1: (...args: A) => R): (...args: A) => R;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {(...args: A) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @returns {(...args: A) => R2} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 *
 * const combined = flow(add, square);
 * console.log(combined(1, 2)); // 9
 */
export function flow<A extends any[], R1, R2>(f1: (...args: A) => R1, f2: (a: R1) => R2): (...args: A) => R2;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {(...args: A) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @returns {(...args: A) => R3} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 * const double = (n: number) => n * 2;
 *
 * const combined = flow(add, square, double);
 * console.log(combined(1, 2)); // 18
 */
export function flow<A extends any[], R1, R2, R3>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3
): (...args: A) => R3;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {(...args: A) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @returns {(...args: A) => R4} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 * const double = (n: number) => n * 2;
 * const toStr = (n: number) => n.toString();
 *
 * const combined = flow(add, square, double, toStr);
 * console.log(combined(1, 2)); // '18'
 */
export function flow<A extends any[], R1, R2, R3, R4>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4
): (...args: A) => R4;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {(...args: A) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @param {(a: R4) => R5} f5 The function to invoke.
 * @returns {(...args: A) => R5} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 * const double = (n: number) => n * 2;
 * const toStr = (n: number) => n.toString();
 * const split = (s: string) => s.split('');
 *
 * const combined = flow(add, square, double, toStr, split);
 * console.log(combined(1, 2)); // ['1', '8']
 */
export function flow<A extends any[], R1, R2, R3, R4, R5>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5
): (...args: A) => R5;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {Array<(...args: any[]) => any>} funcs The functions to invoke.
 * @returns {(...args: any[]) => any} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 *
 * const combined = flow(add, square);
 * console.log(combined(1, 2)); // 9
 */
export function flow(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * @param {Array<(...args: any[]) => any>} funcs The functions to invoke.
 * @returns {(...args: any[]) => any} Returns the new composite function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const square = (n: number) => n * n;
 *
 * const combined = flow(add, square);
 * console.log(combined(1, 2)); // 9
 */
export function flow(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any {
  return function (this: any, ...args: any[]) {
    let result = funcs.length ? funcs[0].apply(this, args) : args[0];

    for (let i = 1; i < funcs.length; i++) {
      result = funcs[i].call(this, result);
    }

    return result;
  };
}
