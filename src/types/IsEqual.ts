/**
 * Resolves to `true` when `A` and `B` are exactly the same type, `false` otherwise.
 *
 * Unlike a plain conditional type, this tells `any` apart from every other type,
 * which makes it useful for catching an accidental `any` in type-level tests.
 *
 * @template A - The first type to compare.
 * @template B - The second type to compare.
 *
 * @example
 * type A = IsEqual<{ a: string }, { a: string }>; // true
 * type B = IsEqual<string, 'literal'>;            // false
 * type C = IsEqual<unknown, any>;                 // false
 */
export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;
