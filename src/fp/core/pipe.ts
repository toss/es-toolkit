type NextFunction<T, Type extends 'none' | 'initial' = 'none'> = Type extends 'initial'
  ? (arg: T) => any
  : T extends (args: any) => Promise<infer R>
    ? (arg: R) => any
    : T extends (args: any) => any
      ? (arg: ReturnType<T>) => any
      : never;

type PipeReturnType<T, Last = any, Promised = false, Initial = true> = T extends [infer First, ...infer Last]
  ? Promised extends true
    ? PipeReturnType<Last, First, true, false>
    : Initial extends true
      ? First extends Promise<any>
        ? PipeReturnType<Last, First, true, false>
        : PipeReturnType<Last, First, false, false>
      : First extends (args: any) => infer R
        ? R extends Promise<any>
          ? PipeReturnType<Last, First, true, false>
          : PipeReturnType<Last, First, false, false>
        : never
  : Last extends (args: any) => infer R
    ? R extends Promise<any>
      ? R
      : Promised extends true
        ? Promise<R>
        : R
    : never;

/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @returns {PipeReturnType<[I, F1]>} A processed value - return value of 1st function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 *
 * const result = pipe(1, toString);
 * console.log(result); // 'string:1'
 *
 * const asyncResult = await pipe(1, toStringAsync);
 * console.log(asyncResult); // 'string:1'
 */
export function pipe<I, F1 extends NextFunction<I, 'initial'>>(initial: I, fn1: F1): PipeReturnType<[I, F1]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2]>} A processed value - return value of 2nd function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<I, F1 extends NextFunction<I, 'initial'>, F2 extends NextFunction<F1>>(
  initial: I,
  fn1: F1,
  fn2: F2
): PipeReturnType<[I, F1, F2]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3]>} A processed value - return value of 3rd function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3): PipeReturnType<[I, F1, F2, F3]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4]>} A processed value - return value of 4th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4): PipeReturnType<[I, F1, F2, F3, F4]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5]>} A processed value - return value of 5th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4, fn5: F5): PipeReturnType<[I, F1, F2, F3, F4, F5]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6]>} A processed value - return value of 6th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4, fn5: F5, fn6: F6): PipeReturnType<[I, F1, F2, F3, F4, F5, F6]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7]>} A processed value - return value of 7th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8]>} A processed value - return value of 8th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9]>} A processed value - return value of 9th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>} A processed value - return value of 10th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]>} A processed value - return value of 11th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]>} A processed value - return value of 12th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]>} A processed value - return value of 13th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {F14 extends NextFunction<F13>} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]>} A processed value - return value of 14th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {F14 extends NextFunction<F13>} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {F15 extends NextFunction<F14>} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]>} A processed value - return value of 15th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {F14 extends NextFunction<F13>} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {F15 extends NextFunction<F14>} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {F16 extends NextFunction<F15>} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]>} A processed value - return value of 16th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {F14 extends NextFunction<F13>} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {F15 extends NextFunction<F14>} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {F16 extends NextFunction<F15>} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {F17 extends NextFunction<F16>} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17]>} A processed value - return value of 17th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
  F17 extends NextFunction<F16>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16,
  fn17: F17
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17]>;
/**
 * Process a value through pipe.
 * The first parameter of the `pipe` function is the initial value, and from the second parameter onward, it receives functions.
 * The first function receives the initial value as its parameter, while each subsequent function receives the return value of the previous function as its parameter,
 * executing all the way to the last function. Ultimately, the pipe function returns the return value of the last function.
 * The pipe function can also handle async functions during the value processing.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends NextFunction<I, 'initial'>} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {F11 extends NextFunction<F10>} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {F12 extends NextFunction<F11>} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {F13 extends NextFunction<F12>} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {F14 extends NextFunction<F13>} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {F15 extends NextFunction<F14>} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {F16 extends NextFunction<F15>} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {F17 extends NextFunction<F16>} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @param {F18 extends NextFunction<F17>} fn18 - 18th function that receives return value of 17th function as its parameter.
 * @returns {PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18]>} A processed value - return value of 18th function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 * function length(value: string) {
 *   return value.length;
 * }
 *
 * const result = pipe(1, toString, length);
 * console.log(result); // 8
 *
 * const asyncResult = await pipe(1, toStringAsync, length);
 * console.log(asyncResult); // 8
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
  F17 extends NextFunction<F16>,
  F18 extends NextFunction<F17>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16,
  fn17: F17,
  fn18: F18
): PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18]>;

export function pipe(initial: any, ...functions: Array<(arg: any) => any>): any {
  return getNextFunction(initial, functions);
}

function getNextFunction(prop: any, functions: Array<(arg: any) => any>) {
  if (functions.length === 0) {
    return prop;
  }

  const [currentFunction, ...nextFunctions] = functions;

  if (prop instanceof Promise) {
    prop.then(value => chainToNextFunction(value, currentFunction, nextFunctions));
  }

  return chainToNextFunction(prop, currentFunction, nextFunctions);
}

function chainToNextFunction(
  prop: any,
  currentFunction: (arg: any) => any,
  nextFunctions: Array<(arg: any) => any>
): any {
  const returnValue = currentFunction(prop);

  if (returnValue instanceof Promise) {
    return returnValue.then((value: any): any => getNextFunction(value, nextFunctions));
  } else {
    return getNextFunction(returnValue, nextFunctions);
  }
}
