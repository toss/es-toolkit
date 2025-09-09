import { identity } from '../../function/identity.ts';
import { isFunction } from '../../predicate/isFunction.ts';

/**
 * Creates a new function that wraps the given function `func`.
 * In this process, you can apply additional logic defined in the `wrapper` function before and after the execution of the original function.
 *
 * If a `value` is provided instead of a function, this value is passed as the first argument to the `wrapper` function.
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
export function wrap<T, U, V>(value: T, wrapper: (value: T, ...args: U[]) => V): (...args: U[]) => V {
  return function (this: unknown, ...args: any[]): any {
    const wrapFn = isFunction(wrapper) ? (wrapper as (value: unknown, ...args: unknown[]) => unknown) : identity;

    return wrapFn.apply(this, [value, ...args]);
  };
}
