// oxlint-disable-next-line no-shadow-restricted-names -- deliberately shadows the global with the polyfilled one
import { globalThis } from '../../_internal/globalThis.ts';

// oxlint-disable-next-line typescript/unbound-method -- always invoked through .call below
const functionToString = Function.prototype.toString;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const REGEXP_SYNTAX_CHARS = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect if a method is native. */
const IS_NATIVE_FUNCTION_REGEXP = RegExp(
  `^${functionToString
    // oxlint-disable-next-line typescript/unbound-method -- passed as a value to read its source text
    .call(Object.prototype.hasOwnProperty)
    .replace(REGEXP_SYNTAX_CHARS, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')}$`
);

/**
 * Checks if a given value is a native function.
 *
 * This function tests whether the provided value is a native function implemented by the JavaScript engine.
 * It returns `true` if the value is a native function, and `false` otherwise.
 *
 * @param value - The value to test for native function.
 * @returns `true` if the value is a native function, `false` otherwise.
 *
 * @example
 * const value1 = Array.prototype.push;
 * const value2 = () => {};
 * const result1 = isNative(value1); // true
 * const result2 = isNative(value2); // false
 */
export function isNative(value: any): value is (...args: any[]) => any {
  if (typeof value !== 'function') {
    return false;
  }

  if ((globalThis as any)?.['__core-js_shared__'] != null) {
    throw new Error('Unsupported core-js use. Try https://npms.io/search?q=ponyfill.');
  }

  return IS_NATIVE_FUNCTION_REGEXP.test(functionToString.call(value));
}
