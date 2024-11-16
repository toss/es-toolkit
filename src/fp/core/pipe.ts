import { cloneDeep } from '../../object';

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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * // Use pipe with async function
 * const asyncResult = await pipe(1, toStringAsync);
 * console.log(asyncResult); // 'string:1'
 *
 * // Use pipe with curried function
 * const mapKeyResult = await pipe(
 *   { a: 1, b: 2 },
 *   mapKeys((value, key) => key + value)
 * );
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
export function pipe<I, F1 extends NextFunction<I, 'initial'>>(initial: I, fn1: F1): PipeReturnType<[I, F1]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
export function pipe<I, F1 extends NextFunction<I, 'initial'>, F2 extends NextFunction<F1>>(
  initial: I,
  fn1: F1,
  fn2: F2
): PipeReturnType<[I, F1, F2]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3): PipeReturnType<[I, F1, F2, F3]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
export function pipe<
  I,
  F1 extends NextFunction<I, 'initial'>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4): PipeReturnType<[I, F1, F2, F3, F4]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
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
  const cloned = cloneDeep(initial);
  return getNextFunction(cloned, functions);
}

/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1]>} A processed value - return value of 1st function.
 *
 * @example
 * function toString(value: unknown) {
 *   return `string:${value}`;
 * }
 * function toStringAsync(value: unknown) {
 *   return Promise.resolve(`string:${value}`);
 * }
 *
 * const result = pipe.lazy(toString)(1);
 * console.log(result); // 'string:1'
 *
 * // Use pipe with async function
 * const pipedToStringAsync = pipe.lazy(toStringAsync);
 * const asyncResult = await pipedToStringAsync(1);
 * console.log(asyncResult); // 'string:1'
 *
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<F1 extends (args: any) => any>(
  fn1: F1
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2]>} A processed value - return value of 2nd function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<F1 extends (args: any) => any, F2 extends NextFunction<F1>>(
  fn1: F1,
  fn2: F2
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3]>} A processed value - return value of 3rd function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<F1 extends (args: any) => any, F2 extends NextFunction<F1>, F3 extends NextFunction<F2>>(
  fn1: F1,
  fn2: F2,
  fn3: F3
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4]>} A processed value - return value of 4th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
>(fn1: F1, fn2: F2, fn3: F3, fn4: F4): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5]>} A processed value - return value of 5th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
>(
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6]>} A processed value - return value of 6th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
>(
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7]>} A processed value - return value of 7th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
>(
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8]>} A processed value - return value of 8th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
>(
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9]>} A processed value - return value of 9th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
>(
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
 * @param {F2 extends NextFunction<F1>} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {F3 extends NextFunction<F2>} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {F4 extends NextFunction<F3>} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {F5 extends NextFunction<F4>} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {F6 extends NextFunction<F5>} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {F7 extends NextFunction<F6>} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {F8 extends NextFunction<F7>} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {F9 extends NextFunction<F8>} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {F10 extends NextFunction<F9>} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>} A processed value - return value of 10th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]>} A processed value - return value of 11th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): <I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]>} A processed value - return value of 12th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]>} A processed value - return value of 13th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]>} A processed value - return value of 14th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]>} A processed value - return value of 15th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]>} A processed value - return value of 16th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17]>} A processed value - return value of 17th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<[Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {I} initial - The initial value to be processed.
 * @param {F1 extends (args: any) => any} fn1 - 1st function that receives initial value as its parameter.
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
 * @returns {<I extends Parameters<F1>[0]>(initial: I) => PipeReturnType<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18]>} A processed value - return value of 18th function.
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
 * const result = pipe(toString, length)(1);
 * console.log(result); // 8
 
 * // Use pipe with async function
 * const pipedLength = pipe(toStringAsync, length);
 * const asyncResult = await pipedLength(1);
 * console.log(asyncResult); // 8
 * 
 * // Use pipe with curried function
 * const pipedMapKeys = pipe.lazy(
 *   mapKeys((value, key) => key + value)
 * );
 * const mapKeyResult = await pipedMapKeys({ a: 1, b: 2 });
 * console.log(mapKeyResult); // { a1: 1, b2: 2 }
 */
function pipeLazy<
  F1 extends (args: any) => any,
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
): (
  initial: Parameters<F1>[0]
) => PipeReturnType<
  [Parameters<F1>[0], F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18]
>;

function pipeLazy(...functions: Array<(arg: any) => any>) {
  return (initial: any) => {
    const cloned = cloneDeep(initial);
    return getNextFunction(cloned, functions);
  };
}

pipe.lazy = pipeLazy;

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
