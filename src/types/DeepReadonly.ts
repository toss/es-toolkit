/**
 * Makes all properties of `T` readonly recursively, unlike the built-in
 * `Readonly` which only affects the first level.
 *
 * Designed for immutable state and function parameters that must not be
 * mutated. Arrays and tuples become readonly, and `Map`/`Set` become
 * `ReadonlyMap`/`ReadonlySet` so mutation methods like `set` and `add`
 * disappear. Functions, `Date`, and `RegExp` pass through unchanged.
 *
 * @template T - The type to make deeply readonly.
 *
 * @example
 * type State = { user: { name: string; tags: string[] } };
 * type FrozenState = DeepReadonly<State>;
 * // => { readonly user: { readonly name: string; readonly tags: readonly string[] } }
 *
 * declare const state: FrozenState;
 * state.user.name = 'x'; // error: name is readonly
 */
// prettier-ignore
export type DeepReadonly<T> =
  T extends ((...args: any[]) => unknown) | Date | RegExp ? T :
  T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> :
  T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>> :
  T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } :
  T;
