/**
 * Creates a new function that always returns `value`.
 *
 * @template T - The type of the value to return.
 * @param {T} value - The value to return from the new function.
 * @returns {() => T} Returns the new constant function.
 */
export function constant<T>(value: T): () => T;

/**
 * Creates a new function that always returns `value`.
 *
 * @template T - The type of the value to return.
 * @param {T} value - The value to return from the new function.
 * @returns {() => T | undefined} Returns the new constant function.
 *
 * @example
 * const object = { a: 1 };
 * const returnsObject = constant(object);
 *
 * returnsObject(); // => { a: 1 }
 * returnsObject() === object; // => true
 */
export function constant<T>(value?: T): () => T | undefined {
  return () => value;
}
