import { isFunction } from '../../predicate/isFunction.ts';

/**
 * Creates a new function that passes the original function `value` as the first argument to the `wrapper`.
 * This allows you to decorate or extend the behavior of the original function in a flexible way.
 *
 * @param {T} value - A function to wrap.
 * @param {(value: T, ...args: Parameters<T>) => ReturnType<T>} wrapper - A wrapper function that receives the original function and its arguments.
 *
 * @example
 * const greet = (name: string) => `Hi, ${name}`;
 * const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
 * wrapped('Bob'); // => "[LOG] Hi, Bob"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrap<T extends (...args: any[]) => any>(
  value: T,
  wrapper: (value: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T>;

/**
 * Creates a new function that passes the original value `value` as the first argument to the `wrapper`.
 * This allows you to decorate or extend the behavior of the original value in a flexible way.
 *
 * @param {T} value - A non-function value to wrap.
 * @param {(value: T, ...args: TArgs) => TResult} wrapper - A wrapper function that receives the value and arguments.
 *
 * @example
 * const wrapped = wrap('value', v => `<p>${v}</p>`);
 * wrapped(); // => "<p>value</p>"
 */
export function wrap<T, TArgs extends unknown[], TResult>(
  value: T,
  wrapper: (value: T, ...args: TArgs) => TResult
): (...args: TArgs) => TResult;

/**
 * Creates a new function that passes the original function or value `value` as the first argument to the `wrapper`.
 * This allows you to decorate or extend the behavior of the original value in a flexible way.
 *
 * @example
 * // Wrap a function
 * const greet = (name: string) => `Hi, ${name}`;
 * const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
 * wrapped('Bob'); // => "[LOG] Hi, Bob"
 *
 * @example
 * // Wrap a primitive value
 * const wrapped = wrap('value', v => `<p>${v}</p>`);
 * wrapped(); // => "<p>value</p>"
 */
export function wrap(value: unknown, wrapper: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
  return function (this: unknown, ...args: unknown[]): unknown {
    const wrapFn = isFunction(wrapper)
      ? wrapper
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (fn: unknown, ..._args: unknown[]) => fn;

    return wrapFn.apply(this, [value, ...args]);
  };
}
