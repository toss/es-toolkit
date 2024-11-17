import { cloneDeep } from '../../object';

type Parameter<T> = T extends Promise<infer P> ? P : T;

type PipeReturnType<T, Last = any, Promised = false> = T extends [infer First, ...infer Last]
  ? Promised extends true
    ? PipeReturnType<Last, First, true>
    : First extends Promise<any>
      ? PipeReturnType<Last, First, true>
      : PipeReturnType<Last, First, false>
  : Last extends Promise<any>
    ? Last
    : Promised extends true
      ? Promise<Last>
      : Last;

/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @returns {PipeReturnType<[T1, T2]>} A processed value - return value of 1st function.
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
export function pipe<T1, T2>(initial: T1, fn1: (arg: Parameter<T1>) => T2): PipeReturnType<[T1, T2]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3]>} A processed value - return value of 2nd function.
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
export function pipe<T1, T2, T3>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3
): PipeReturnType<[T1, T2, T3]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4]>} A processed value - return value of 3rd function.
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
export function pipe<T1, T2, T3, T4>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4
): PipeReturnType<[T1, T2, T3, T4]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5]>} A processed value - return value of 4th function.
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
export function pipe<T1, T2, T3, T4, T5>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5
): PipeReturnType<[T1, T2, T3, T4, T5]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6]>} A processed value - return value of 5th function.
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
export function pipe<T1, T2, T3, T4, T5, T6>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6
): PipeReturnType<[T1, T2, T3, T4, T5, T6]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7]>} A processed value - return value of 6th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8]>} A processed value - return value of 7th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>} A processed value - return value of 8th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>} A processed value - return value of 9th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>} A processed value - return value of 10th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>} A processed value - return value of 11th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>} A processed value - return value of 12th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>} A processed value - return value of 13th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>} A processed value - return value of 14th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>} A processed value - return value of 15th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]>} A processed value - return value of 16th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {(arg: Parameter<T17>) => T18} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18]>} A processed value - return value of 17th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17,
  fn17: (arg: Parameter<T17>) => T18
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {(arg: Parameter<T17>) => T18} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @param {(arg: Parameter<T18>) => T19} fn18 - 18th function that receives return value of 17th function as its parameter.
 * @returns {PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19]>} A processed value - return value of 18th function.
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
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19>(
  initial: T1,
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17,
  fn17: (arg: Parameter<T17>) => T18,
  fn18: (arg: Parameter<T18>) => T19
): PipeReturnType<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19]>;

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
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2]>} A processed value - return value of 1st function.
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
function pipeLazy<T1, T2>(
  fn1: (arg: Parameter<T1>) => T2
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3]>} A processed value - return value of 2nd function.
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
function pipeLazy<T1, T2, T3>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4]>} A processed value - return value of 3rd function.
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
function pipeLazy<T1, T2, T3, T4>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5]>} A processed value - return value of 4th function.
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
function pipeLazy<T1, T2, T3, T4, T5>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6]>} A processed value - return value of 5th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7]>} A processed value - return value of 6th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8]>} A processed value - return value of 7th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9]>} A processed value - return value of 8th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10]>} A processed value - return value of 9th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>} A processed value - return value of 10th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>} A processed value - return value of 11th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>} A processed value - return value of 12th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13
): <I extends T1 | Promise<T1>>(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>} A processed value - return value of 13th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>} A processed value - return value of 14th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>} A processed value - return value of 15th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]>} A processed value - return value of 16th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {(arg: Parameter<T17>) => T18} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18]>} A processed value - return value of 17th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17,
  fn17: (arg: Parameter<T17>) => T18
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18]>;
/**
 * Processes the value as it passes through pipe. It is useful for declaratively writing code that transforms a value through multiple stages.
 *
 * When using `pipe.lazy`, do not pass the initial value as first argument of 'first function'.
 * "pipe.lazy implements lazy execution by calling a function twice.
 * Provide the functions that process the value in order when calling the first function,
 * and pass the initial value to the function when calling the second function.
 *
 * @param {T1} initial - The initial value to be processed.
 * @param {(arg: Parameter<T1>) => T2} fn1 - 1st function that receives initial value as its parameter.
 * @param {(arg: Parameter<T2>) => T3} fn2 - 2nd function that receives return value of 1st function as its parameter.
 * @param {(arg: Parameter<T3>) => T4} fn3 - 3rd function that receives return value of 2nd function as its parameter.
 * @param {(arg: Parameter<T4>) => T5} fn4 - 4th function that receives return value of 3rd function as its parameter.
 * @param {(arg: Parameter<T5>) => T6} fn5 - 5th function that receives return value of 4th function as its parameter.
 * @param {(arg: Parameter<T6>) => T7} fn6 - 6th function that receives return value of 5th function as its parameter.
 * @param {(arg: Parameter<T7>) => T8} fn7 - 7th function that receives return value of 6th function as its parameter.
 * @param {(arg: Parameter<T8>) => T9} fn8 - 8th function that receives return value of 7th function as its parameter.
 * @param {(arg: Parameter<T9>) => T10} fn9 - 9th function that receives return value of 8th function as its parameter.
 * @param {(arg: Parameter<T10>) => T11} fn10 - 10th function that receives return value of 9th function as its parameter.
 * @param {(arg: Parameter<T11>) => T12} fn11 - 11th function that receives return value of 10th function as its parameter.
 * @param {(arg: Parameter<T12>) => T13} fn12 - 12th function that receives return value of 11th function as its parameter.
 * @param {(arg: Parameter<T13>) => T14} fn13 - 13th function that receives return value of 12th function as its parameter.
 * @param {(arg: Parameter<T14>) => T15} fn14 - 14th function that receives return value of 13th function as its parameter.
 * @param {(arg: Parameter<T15>) => T16} fn15 - 15th function that receives return value of 14th function as its parameter.
 * @param {(arg: Parameter<T16>) => T17} fn16 - 16th function that receives return value of 15th function as its parameter.
 * @param {(arg: Parameter<T17>) => T18} fn17 - 17th function that receives return value of 16th function as its parameter.
 * @param {(arg: Parameter<T18>) => T19} fn18 - 18th function that receives return value of 17th function as its parameter.
 * @returns {(initial: I) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19]>} A processed value - return value of 18th function.
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
function pipeLazy<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19>(
  fn1: (arg: Parameter<T1>) => T2,
  fn2: (arg: Parameter<T2>) => T3,
  fn3: (arg: Parameter<T3>) => T4,
  fn4: (arg: Parameter<T4>) => T5,
  fn5: (arg: Parameter<T5>) => T6,
  fn6: (arg: Parameter<T6>) => T7,
  fn7: (arg: Parameter<T7>) => T8,
  fn8: (arg: Parameter<T8>) => T9,
  fn9: (arg: Parameter<T9>) => T10,
  fn10: (arg: Parameter<T10>) => T11,
  fn11: (arg: Parameter<T11>) => T12,
  fn12: (arg: Parameter<T12>) => T13,
  fn13: (arg: Parameter<T13>) => T14,
  fn14: (arg: Parameter<T14>) => T15,
  fn15: (arg: Parameter<T15>) => T16,
  fn16: (arg: Parameter<T16>) => T17,
  fn17: (arg: Parameter<T17>) => T18,
  fn18: (arg: Parameter<T18>) => T19
): <I extends T1 | Promise<T1>>(
  initial: I
) => PipeReturnType<[I, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19]>;

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
