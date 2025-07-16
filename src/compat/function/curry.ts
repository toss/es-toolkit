// eslint-disable-next-line @typescript-eslint/naming-convention
type __ = typeof curryPlaceholder;

interface CurriedFunction1<T1, R> {
  (): CurriedFunction1<T1, R>;
  (t1: T1): R;
}

interface CurriedFunction2<T1, T2, R> {
  (): CurriedFunction2<T1, T2, R>;
  (t1: T1): CurriedFunction1<T2, R>;
  (t1: __, t2: T2): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2): R;
}
interface CurriedFunction3<T1, T2, T3, R> {
  (): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1): CurriedFunction2<T2, T3, R>;
  (t1: __, t2: T2): CurriedFunction2<T1, T3, R>;
  (t1: T1, t2: T2): CurriedFunction1<T3, R>;
  (t1: __, t2: __, t3: T3): CurriedFunction2<T1, T2, R>;
  (t1: T1, t2: __, t3: T3): CurriedFunction1<T2, R>;
  (t1: __, t2: T2, t3: T3): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2, t3: T3): R;
}
interface CurriedFunction4<T1, T2, T3, T4, R> {
  (): CurriedFunction4<T1, T2, T3, T4, R>;
  (t1: T1): CurriedFunction3<T2, T3, T4, R>;
  (t1: __, t2: T2): CurriedFunction3<T1, T3, T4, R>;
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
  (t1: __, t2: __, t3: T3): CurriedFunction3<T1, T2, T4, R>;
  (t1: __, t2: __, t3: T3): CurriedFunction2<T2, T4, R>;
  (t1: __, t2: T2, t3: T3): CurriedFunction2<T1, T4, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;
  (t1: __, t2: __, t3: __, t4: T4): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1, t2: __, t3: __, t4: T4): CurriedFunction2<T2, T3, R>;
  (t1: __, t2: T2, t3: __, t4: T4): CurriedFunction2<T1, T3, R>;
  (t1: __, t2: __, t3: T3, t4: T4): CurriedFunction2<T1, T2, R>;
  (t1: T1, t2: T2, t3: __, t4: T4): CurriedFunction1<T3, R>;
  (t1: T1, t2: __, t3: T3, t4: T4): CurriedFunction1<T2, R>;
  (t1: __, t2: T2, t3: T3, t4: T4): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;
}
interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
  (): CurriedFunction5<T1, T2, T3, T4, T5, R>;
  (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
  (t1: __, t2: T2): CurriedFunction4<T1, T3, T4, T5, R>;
  (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
  (t1: __, t2: __, t3: T3): CurriedFunction4<T1, T2, T4, T5, R>;
  (t1: T1, t2: __, t3: T3): CurriedFunction3<T2, T4, T5, R>;
  (t1: __, t2: T2, t3: T3): CurriedFunction3<T1, T4, T5, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
  (t1: __, t2: __, t3: __, t4: T4): CurriedFunction4<T1, T2, T3, T5, R>;
  (t1: T1, t2: __, t3: __, t4: T4): CurriedFunction3<T2, T3, T5, R>;
  (t1: __, t2: T2, t3: __, t4: T4): CurriedFunction3<T1, T3, T5, R>;
  (t1: __, t2: __, t3: T3, t4: T4): CurriedFunction3<T1, T2, T5, R>;
  (t1: T1, t2: T2, t3: __, t4: T4): CurriedFunction2<T3, T5, R>;
  (t1: T1, t2: __, t3: T3, t4: T4): CurriedFunction2<T2, T5, R>;
  (t1: __, t2: T2, t3: T3, t4: T4): CurriedFunction2<T1, T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction1<T5, R>;
  (t1: __, t2: __, t3: __, t4: __, t5: T5): CurriedFunction4<T1, T2, T3, T4, R>;
  (t1: T1, t2: __, t3: __, t4: __, t5: T5): CurriedFunction3<T2, T3, T4, R>;
  (t1: __, t2: T2, t3: __, t4: __, t5: T5): CurriedFunction3<T1, T3, T4, R>;
  (t1: __, t2: __, t3: T3, t4: __, t5: T5): CurriedFunction3<T1, T2, T4, R>;
  (t1: __, t2: __, t3: __, t4: T4, t5: T5): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1, t2: T2, t3: __, t4: __, t5: T5): CurriedFunction2<T3, T4, R>;
  (t1: T1, t2: __, t3: T3, t4: __, t5: T5): CurriedFunction2<T2, T4, R>;
  (t1: T1, t2: __, t3: __, t4: T4, t5: T5): CurriedFunction2<T2, T3, R>;
  (t1: __, t2: T2, t3: T3, t4: __, t5: T5): CurriedFunction2<T1, T4, R>;
  (t1: __, t2: T2, t3: __, t4: T4, t5: T5): CurriedFunction2<T1, T3, R>;
  (t1: __, t2: __, t3: T3, t4: T4, t5: T5): CurriedFunction2<T1, T2, R>;
  (t1: T1, t2: T2, t3: T3, t4: __, t5: T5): CurriedFunction1<T4, R>;
  (t1: T1, t2: T2, t3: __, t4: T4, t5: T5): CurriedFunction1<T3, R>;
  (t1: T1, t2: __, t3: T3, t4: T4, t5: T5): CurriedFunction1<T2, R>;
  (t1: __, t2: T2, t3: T3, t4: T4, t5: T5): CurriedFunction1<T1, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}

/**
 * Creates a curried function that accepts a single argument.
 * @param {(t1: T1) => R} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {CurriedFunction1<T1, R>} - Returns the new curried function.
 * @example
 * const greet = (name: string) => `Hello ${name}`;
 * const curriedGreet = curry(greet);
 * curriedGreet('John'); // => 'Hello John'
 */
export function curry<T1, R>(func: (t1: T1) => R, arity?: number): CurriedFunction1<T1, R>;

/**
 * Creates a curried function that accepts two arguments.
 * @param {(t1: T1, t2: T2) => R} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {CurriedFunction2<T1, T2, R>} - Returns the new curried function.
 * @example
 * const add = (a: number, b: number) => a + b;
 * const curriedAdd = curry(add);
 * curriedAdd(1)(2); // => 3
 * curriedAdd(1, 2); // => 3
 */
export function curry<T1, T2, R>(func: (t1: T1, t2: T2) => R, arity?: number): CurriedFunction2<T1, T2, R>;

/**
 * Creates a curried function that accepts three arguments.
 * @param {(t1: T1, t2: T2, t3: T3) => R} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {CurriedFunction3<T1, T2, T3, R>} - Returns the new curried function.
 * @example
 * const volume = (l: number, w: number, h: number) => l * w * h;
 * const curriedVolume = curry(volume);
 * curriedVolume(2)(3)(4); // => 24
 * curriedVolume(2, 3)(4); // => 24
 * curriedVolume(2, 3, 4); // => 24
 */
export function curry<T1, T2, T3, R>(
  func: (t1: T1, t2: T2, t3: T3) => R,
  arity?: number
): CurriedFunction3<T1, T2, T3, R>;

/**
 * Creates a curried function that accepts four arguments.
 * @param {(t1: T1, t2: T2, t3: T3, t4: T4) => R} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {CurriedFunction4<T1, T2, T3, T4, R>} - Returns the new curried function.
 * @example
 * const fn = (a: number, b: number, c: number, d: number) => a + b + c + d;
 * const curriedFn = curry(fn);
 * curriedFn(1)(2)(3)(4); // => 10
 * curriedFn(1, 2)(3, 4); // => 10
 * curriedFn(1, 2, 3, 4); // => 10
 */
export function curry<T1, T2, T3, T4, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4) => R,
  arity?: number
): CurriedFunction4<T1, T2, T3, T4, R>;

/**
 * Creates a curried function that accepts five arguments.
 * @param {(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {CurriedFunction5<T1, T2, T3, T4, T5, R>} - Returns the new curried function.
 * @example
 * const fn = (a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e;
 * const curriedFn = curry(fn);
 * curriedFn(1)(2)(3)(4)(5); // => 15
 * curriedFn(1, 2)(3, 4)(5); // => 15
 * curriedFn(1, 2, 3, 4, 5); // => 15
 */
export function curry<T1, T2, T3, T4, T5, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R,
  arity?: number
): CurriedFunction5<T1, T2, T3, T4, T5, R>;

/**
 * Creates a curried function that accepts any number of arguments.
 * @param {(...args: any[]) => any} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @returns {(...args: any[]) => any} - Returns the new curried function.
 * @example
 * const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0);
 * const curriedSum = curry(sum);
 * curriedSum(1, 2, 3); // => 6
 * curriedSum(1)(2, 3); // => 6
 * curriedSum(1)(2)(3); // => 6
 */
export function curry(func: (...args: any[]) => any, arity?: number): (...args: any[]) => any;

/**
 * Creates a function that accepts arguments of `func` and either invokes `func` returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments, and so on.
 * The arity of `func` may be specified if `func.length` is not sufficient.
 *
 * The `curry.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of curried functions.
 *
 * @param {(...args: any[]) => any} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @param {unknown} guard - Enables use as an iteratee for methods like `Array#map`.
 * @returns {((...args: any[]) => any) & { placeholder: typeof curry.placeholder }} - Returns the new curried function.
 *
 * @example
 * const abc = function(a, b, c) {
 *   return Array.from(arguments);
 * };
 *
 * let curried = curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(curry.placeholder, 3)(2);
 * // => [1, 2, 3]
 *
 * // Curried with arity.
 * curried = curry(abc, 2);
 *
 * curried(1)(2);
 * // => [1, 2]
 */
export function curry(
  func: (...args: any[]) => any,
  arity: number = func.length,
  guard?: unknown
): ((...args: any[]) => any) & { placeholder: typeof curry.placeholder } {
  arity = guard ? func.length : arity;
  arity = Number.parseInt(arity as any, 10);
  if (Number.isNaN(arity) || arity < 1) {
    arity = 0;
  }

  const wrapper = function (this: any, ...partialArgs: any[]) {
    const holders = partialArgs.filter(item => item === curry.placeholder);
    const length = partialArgs.length - holders.length;
    if (length < arity) {
      return makeCurry(func, arity - length, partialArgs);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...partialArgs);
    }
    return func.apply(this, partialArgs);
  };

  wrapper.placeholder = curryPlaceholder;

  return wrapper;
}

function makeCurry(
  func: (...args: any[]) => any,
  arity: number,
  partialArgs: any[]
): ((...args: any[]) => any) & { placeholder: typeof curry.placeholder } {
  function wrapper(this: any, ...providedArgs: any[]) {
    const holders = providedArgs.filter(item => item === curry.placeholder);
    const length = providedArgs.length - holders.length;
    providedArgs = composeArgs(providedArgs, partialArgs);
    if (length < arity) {
      return makeCurry(func, arity - length, providedArgs);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...providedArgs);
    }
    return func.apply(this, providedArgs);
  }
  wrapper.placeholder = curryPlaceholder;
  return wrapper;
}

function composeArgs(providedArgs: any[], partialArgs: any[]): any[] {
  const args = [];
  let startIndex = 0;
  for (let i = 0; i < partialArgs.length; i++) {
    const arg = partialArgs[i];

    if (arg === curry.placeholder && startIndex < providedArgs.length) {
      args.push(providedArgs[startIndex++]);
    } else {
      args.push(arg);
    }
  }
  for (let i = startIndex; i < providedArgs.length; i++) {
    args.push(providedArgs[i]);
  }
  return args;
}

const curryPlaceholder: unique symbol = Symbol('curry.placeholder');
curry.placeholder = curryPlaceholder;
