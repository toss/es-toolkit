/**
 * An object with no properties.
 *
 * Pairs with the `isEmptyObject` guard. Assigning an object that has any property
 * fails, because every value would have to be `never`.
 *
 * @example
 * const a: EmptyObject = {}; // ok
 * const b: EmptyObject = { a: 1 }; // error
 *
 * @example
 * // Useful for a step that carries no data.
 * interface StepContext {
 *   intro: EmptyObject;
 *   form: { amount: number };
 * }
 */
export type EmptyObject = Record<PropertyKey, never>;
