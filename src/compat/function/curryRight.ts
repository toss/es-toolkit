/**
 * Creates a function that accepts arguments of `func` and either invokes `func` returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments, and so on.
 * The arity of `func` may be specified if `func.length` is not sufficient.
 *
 * Unlike `curry`, this function curries the function from right to left.
 *
 * The `curryRight.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of curried functions.
 *
 * @param {(...args: any[]) => any} func - The function to curry.
 * @param {number=func.length} arity - The arity of func.
 * @param {unknown} guard - Enables use as an iteratee for methods like `Array#map`.
 * @returns {((...args: any[]) => any) & { placeholder: typeof curryRight.placeholder }} - Returns the new curried function.
 *
 * @example
 * const abc = function(a, b, c) {
 *   return Array.from(arguments);
 * };
 *
 * let curried = curryRight(abc);
 *
 * curried(3)(2)(1);
 * // => [1, 2, 3]
 *
 * curried(2, 3)(1);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(3)(curryRight.placeholder, 2)(1);
 * // => [1, 2, 3]
 *
 * // Curried with arity.
 * curried = curryRight(abc, 2);
 *
 * curried(2)(1);
 * // => [1, 2]
 */
export function curryRight(
  func: (...args: any[]) => any,
  arity: number = func.length,
  guard?: unknown
): ((...args: any[]) => any) & { placeholder: typeof curryRight.placeholder } {
  arity = guard ? func.length : arity;
  arity = Number.parseInt(arity as any, 10);
  if (Number.isNaN(arity) || arity < 1) {
    arity = 0;
  }

  const wrapper = function (this: any, ...partialArgs: any[]) {
    const holders = partialArgs.filter(item => item === curryRight.placeholder);
    const length = partialArgs.length - holders.length;
    if (length < arity) {
      return makeCurryRight(func, arity - length, partialArgs);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...partialArgs);
    }
    return func.apply(this, partialArgs);
  };

  wrapper.placeholder = curryRightPlaceholder;

  return wrapper;
}

function makeCurryRight(
  func: (...args: any[]) => any,
  arity: number,
  partialArgs: any[]
): ((...args: any[]) => any) & { placeholder: typeof curryRight.placeholder } {
  function wrapper(this: any, ...providedArgs: any[]) {
    const holders = providedArgs.filter(item => item === curryRight.placeholder);
    const length = providedArgs.length - holders.length;
    providedArgs = composeArgs(providedArgs, partialArgs);
    if (length < arity) {
      return makeCurryRight(func, arity - length, providedArgs);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...providedArgs);
    }
    return func.apply(this, providedArgs);
  }
  wrapper.placeholder = curryRightPlaceholder;
  return wrapper;
}

function composeArgs(providedArgs: any[], partialArgs: any[]): any[] {
  const placeholderLength = partialArgs.filter(arg => arg === curryRight.placeholder).length;
  const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
  const args: any[] = [];

  let providedIndex = 0;
  for (let i = 0; i < rangeLength; i++) {
    args.push(providedArgs[providedIndex++]);
  }
  for (let i = 0; i < partialArgs.length; i++) {
    const arg = partialArgs[i];

    if (arg === curryRight.placeholder) {
      if (providedIndex < providedArgs.length) {
        args.push(providedArgs[providedIndex++]);
      } else {
        args.push(arg);
      }
    } else {
      args.push(arg);
    }
  }
  return args;
}

const curryRightPlaceholder: unique symbol = Symbol('curryRight.placeholder');
curryRight.placeholder = curryRightPlaceholder;
