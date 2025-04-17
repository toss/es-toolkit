import { isFunction } from '../../predicate/isFunction.ts';

/**
 * Creates a new function that passes the original function `value` as the first argument to the `wrapper`.
 * This allows you to decorate or extend the behavior of the original function in a flexible way.
 *
 * @example
 * const greet = (name: string) => `Hi, ${name}`;
 * const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
 * wrapped('Bob'); // => "[LOG] Hi, Bob"
 *
 * @example
 * // Wrapping to modify arguments
 * const multiply = (a: number, b: number) => a * b;
 * const doubleFirst = wrap(multiply, (value, a, b) => value(a * 2, b));
 * doubleFirst(3, 4); // => 24
 *
 * @param {T} value - The original function to wrap.
 * @param {(value: T, ...args: Parameters<T>) => ReturnType<T>} wrapper - A function that receives the original function and its arguments, and returns the result.
 * @returns A new function with the same signature as `value`, but wrapped by `wrapper`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrap<T extends (...args: any[]) => any>(
  value: T,
  wrapper: (value: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T> {
  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const wrapFn = isFunction(wrapper)
      ? wrapper
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (fn: T, ..._args: Parameters<T>) => fn as unknown as ReturnType<T>;

    return wrapFn.apply(this, [value, ...args] as [T, ...Parameters<T>]);
  };
}
