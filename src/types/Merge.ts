import type { IsAny } from './IsAny.ts';
import type { IsEqual } from './IsEqual.ts';
import type { IsUnknown } from './IsUnknown.ts';
import type { Primitive } from './Primitive.ts';
import type { Simplify } from './Simplify.ts';

/**
 * The result of deeply merging the source type `S` into the target type `T`,
 * matching what `merge(target, source)` returns at runtime.
 *
 * Merging a type with itself gives back the same type, so a union such as
 * `string | string[] | string[][]` stays intact instead of expanding into a
 * merge of every pair of its members.
 *
 * Plain objects are merged key by key: keys present on only one side are
 * kept, and keys present on both sides are merged the same way. A key that
 * exists only on the source is kept even when the source is a subtype of
 * the target.
 *
 * When two value types are related, the wider one is kept. Overriding a
 * default with a narrower value keeps the default's type, so a merged
 * configuration stays assignable to the original options type. When both
 * sides are assignable to each other, the target type is kept.
 *
 * Otherwise, tuples merge index by index, other arrays merge into an array
 * of both element types, and a source value that is not a plain object or an
 * array (primitives, `Date`, `RegExp`, `Map`, `Set`, functions, ...) replaces
 * the target value. A source value that can be `undefined` keeps the target
 * type as well, because `merge` skips `undefined` source values. When an
 * array meets a plain object, `merge` keeps the target and assigns the
 * source's properties onto it, so both property sets are kept (`T & S`).
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * type Target = { a: number; b: { x: number; y: number } };
 * type Source = { b: { y: string; z: boolean }; c: string };
 * type Result = Merge<Target, Source>;
 * // => { a: number; b: { x: number; y: string; z: boolean }; c: string }
 *
 * @example
 * type Options = { color: string | string[] | string[][] };
 * type Same = Merge<Options, Options>;
 * // => Options
 * type Override = Merge<Options, { color: string[] }>;
 * // => Options
 * type Extra = Merge<{ a: number }, { a: number; b: string }>;
 * // => { a: number; b: string }
 */
// prettier-ignore
export type Merge<T, S> =
  undefined extends S ? T | MergeDefined<T, Exclude<S, undefined>> :
  MergeDefined<T, S>;

/**
 * Values `merge` does not merge into: everything that is not a plain object
 * or an array. The source value replaces the target value instead.
 */
// prettier-ignore
type NonMergeable =
  | ((...args: any[]) => unknown)
  | Date | RegExp | Error | Promise<unknown>
  | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>
  | WeakMap<object, unknown> | WeakSet<object>;

/**
 * `true` when every member of `T` is a plain object type that `merge`
 * recurses into. Primitives are excluded explicitly because an intersection
 * like `string & {}` satisfies `extends object` even though it is a string at
 * runtime.
 */
// prettier-ignore
type IsPlainRecord<T> =
  T extends Primitive ? false :
  T extends readonly unknown[] ? false :
  T extends NonMergeable ? false :
  T extends object ? true :
  false;

// The `[X] extends [Y]` checks are deliberately non-distributive: they compare
// a union as a whole, which is what keeps `Merge<X, X>` and
// `Merge<A | B, A>` from expanding into every pair of union members.
// prettier-ignore
type MergeDefined<T, S> =
  IsEqual<T, S> extends true ? T :
  IsAny<T> extends true ? any :
  IsAny<S> extends true ? any :
  IsUnknown<T> extends true ? S :
  [T] extends [never] ? S :
  [S] extends [never] ? T :
  IsPlainRecord<T> extends true ? (
    IsPlainRecord<S> extends true ? MergeRecords<T, S> : MergeAssignable<T, S>
  ) :
  MergeAssignable<T, S>;

// prettier-ignore
type MergeAssignable<T, S> =
  [S] extends [T] ? T :
  [T] extends [S] ? S :
  MergeFallback<T, S>;

// prettier-ignore
type MergeFallback<T, S> =
  S extends Primitive ? S :
  S extends readonly unknown[] ? (
    T extends readonly unknown[] ? MergeArrays<T, S> :
    T extends Primitive | NonMergeable ? S :
    T extends object ? T & S :
    S
  ) :
  S extends NonMergeable ? S :
  S extends object ? (
    T extends readonly unknown[] ? T & S :
    T extends Primitive | NonMergeable ? S :
    T extends object ? MergeRecords<T, S> :
    S
  ) :
  S;

// prettier-ignore
type MergeArrays<T extends readonly unknown[], S extends readonly unknown[]> =
  T extends readonly [] ? S :
  S extends readonly [] ? T :
  T extends readonly [infer TH, ...infer TR]
    ? S extends readonly [infer SH, ...infer SR]
      ? [Merge<TH, SH>, ...MergeArrays<TR, SR>]
      : Array<T[number] | S[number]>
    : Array<T[number] | S[number]>;

// prettier-ignore
type MergeRecords<T, S> = Simplify<
  Omit<T, keyof S> &
  Omit<S, keyof T> &
  { [K in keyof T & keyof S]: Merge<T[K], S[K]> }
>;
