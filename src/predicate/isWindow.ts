import { isBrowser } from './isBrowser.ts';

/**
 * Checks if the given element is a `Window` object.
 *
 * This function tests whether the provided element is a reference to the global `window` object.
 * It returns `false` when not in a browser environment.
 * It returns `true` if the element is the `window` object, and `false` otherwise.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Window`.
 *
 * @param {unknown} element - The element to test if it is the `Window` object.
 * @returns {element is Window} true if the element is the `Window` object, false otherwise.
 *
 * @example
 * isWindow(window); // true
 * isWindow(document); // false
 * isWindow({}); // false
 */
export function isWindow(element: unknown): element is Window {
  if (!isBrowser()) {
    return false;
  }

  return element === window;
}
