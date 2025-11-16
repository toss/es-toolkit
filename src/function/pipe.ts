/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R} f1 The function to invoke.
 * @returns {R} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 *
 * console.log(pipe(5, double)); // 10
 */
export function pipe<T, R>(value: T, f1: (a: T) => R): R;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @returns {R2} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 *
 * console.log(pipe(5, double, square)); // 100
 */
export function pipe<T, R1, R2>(value: T, f1: (a: T) => R1, f2: (a: R1) => R2): R2;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @returns {R3} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 *
 * console.log(pipe(5, double, square, tenth)); // 10
 */
export function pipe<T, R1, R2, R3>(value: T, f1: (a: T) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): R3;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @returns {R4} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 * const numToStr = (n: number) => n.toString();
 *
 * console.log(pipe(5, double, square, tenth, numToStr)); // '10'
 */
export function pipe<T, R1, R2, R3, R4>(
  value: T,
  f1: (a: T) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4
): R4;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @param {(a: R4) => R5} f5 The function to invoke.
 * @returns {R5} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 * const numToStr = (n: number) => n.toString();
 * const split = (s: string) => s.split('');
 *
 * console.log(pipe(5, double, square, tenth, numToStr, split)); // ['1', '0']
 */
export function pipe<T, R1, R2, R3, R4, R5>(
  value: T,
  f1: (a: T) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5
): R5;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @param {(a: R4) => R5} f5 The function to invoke.
 * @param {(a: R5) => R6} f6 The function to invoke.
 * @returns {R6} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 * const numToStr = (n: number) => n.toString();
 * const split = (s: string) => s.split('');
 * const first = <T,>(arr: T[]) => arr[0]
 *
 * console.log(pipe(5, double, square, tenth, numToStr, split, first)); // '1'
 */
export function pipe<T, R1, R2, R3, R4, R5, R6>(
  value: T,
  f1: (a: T) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6
): R6;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @param {(a: R4) => R5} f5 The function to invoke.
 * @param {(a: R5) => R6} f6 The function to invoke.
 * @param {(a: R6) => R7} f7 The function to invoke.
 * @returns {R7} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 * const numToStr = (n: number) => n.toString();
 * const split = (s: string) => s.split('');
 * const first = <T,>(arr: T[]) => arr[0]
 * const toNum = (s: string) => Number(s)
 *
 * console.log(pipe(5, double, square, tenth, numToStr, split, first, toNum)); // 1
 */
export function pipe<T, R1, R2, R3, R4, R5, R6, R7>(
  value: T,
  f1: (a: T) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7
): R7;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {T} value The base value.
 * @param {(a: T) => R1} f1 The function to invoke.
 * @param {(a: R1) => R2} f2 The function to invoke.
 * @param {(a: R2) => R3} f3 The function to invoke.
 * @param {(a: R3) => R4} f4 The function to invoke.
 * @param {(a: R4) => R5} f5 The function to invoke.
 * @param {(a: R5) => R6} f6 The function to invoke.
 * @param {(a: R6) => R7} f7 The function to invoke.
 * @param {(a: R7) => R8} f8 The function to invoke.
 * @returns {R8} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 * const tenth = (n: number) => n / 10;
 * const numToStr = (n: number) => n.toString();
 * const split = (s: string) => s.split('');
 * const first = <T,>(arr: T[]) => arr[0]
 * const toNum = (s: string) => Number(s)
 * const half = (n: number) => n / 2
 *
 * console.log(pipe(5, double, square, tenth, numToStr, split, first, toNum, half)); // 0.5
 */
export function pipe<T, R1, R2, R3, R4, R5, R6, R7, R8>(
  value: T,
  f1: (a: T) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7,
  f8: (a: R7) => R8
): R8;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {any} value The base value
 * @param {Array<(result: any) => any>} funcs The functions to invoke.
 * @returns {any} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 *
 * console.log(pipe(5, double, square)); // 100
 */
export function pipe(this: any, value: any, ...funcs: Array<(result: any) => any>): any;
/**
 * Runs the functions passed by passing the base value to the first one and the sequential results to the others, and returns the final one.
 *
 * The `this` context passed to the function is also passed to the functions provided as parameters.
 *
 * @param {any} value The base value
 * @param {Array<(result: any) => any>} funcs The functions to invoke.
 * @returns {any} Returns the final result after all function invocations.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const square = (n: number) => n * n;
 *
 * console.log(pipe(5, double, square)); // 100
 */
export function pipe(this: any, value: any, ...funcs: Array<(result: any) => any>): any {
  let result = value;

  for (let i = 0; i < funcs.length; i++) {
    result = funcs[i].call(this, result);
  }

  return result;
}
