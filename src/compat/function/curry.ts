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

  const wrapper = function (this: any, ...partials: any[]) {
    const holders = replaceHolders(partials);
    const length = partials.length - holders.length;
    if (length < arity) {
      return makeCurry(func, holders, arity - length, partials);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...partials);
    }
    return func.apply(this, partials);
  };

  wrapper.placeholder = curryPlaceholder;

  return wrapper;
}

function makeCurry(
  func: (...args: any[]) => any,
  holders: any[],
  arity: number,
  partials: any[]
): ((...args: any[]) => any) & { placeholder: typeof curry.placeholder } {
  function wrapper(this: any, ...args: any[]) {
    const holdersCount = args.filter(item => item === curry.placeholder).length;
    const length = args.length - holdersCount;
    args = composeArgs(args, partials, holders);
    if (length < arity) {
      const newHolders = replaceHolders(args);
      return makeCurry(func, newHolders, arity - length, args);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...args);
    }
    return func.apply(this, args);
  }
  wrapper.placeholder = curryPlaceholder;
  return wrapper;
}

function replaceHolders(args: any[]): number[] {
  const result = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === curry.placeholder) {
      result.push(i);
    }
  }
  return result;
}

function composeArgs(args: any[], partials: any[], holders: number[]): any[] {
  const result = [...partials];
  const argsLength = args.length;
  const holdersLength = holders.length;
  let argsIndex = -1,
    leftIndex = partials.length,
    rangeLength = Math.max(argsLength - holdersLength, 0);
  while (++argsIndex < holdersLength) {
    if (argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

const curryPlaceholder: unique symbol = Symbol('curry.placeholder');
curry.placeholder = curryPlaceholder;
