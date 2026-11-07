import type { IsAny } from './IsAny.ts';
import type { IsEqual } from './IsEqual.ts';
import type { IsUnknown } from './IsUnknown.ts';
import type { Primitive } from './Primitive.ts';
import type { Simplify } from './Simplify.ts';

/**
 * The result of deeply merging the source type `S` into the target type `T`,
 * matching what `merge(target, source)` returns at runtime.
 *
 * Two plain objects are merged key by key, and two arrays are merged index by
 * index: tuples element by element, other arrays into an array of both element
 * types. For every other key present in both objects the second object's type
 * becomes the result: primitives, `Date`, `Map`, `Set`, functions and other
 * values that are not plain objects use the second value's type, and a value
 * that could be `null` or `undefined` in the first object disappears when the
 * second object has a value for it. A source value that can be `undefined`
 * keeps the target type, because `merge` skips `undefined` source values.
 * Merging a type with itself gives back the same type.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * // Nested plain objects are merged key by key.
 * type Result = Merge<{ a: number; b: { x: number } }, { b: { y: string } }>;
 * // => { a: number; b: { x: number; y: string } }
 *
 * @example
 * // Arrays are merged index by index.
 * type Tuple = Merge<[1, 2, 3], ['a']>;
 * // => ['a', 2, 3]
 * type List = Merge<{ list: number[] }, { list: string[] }>;
 * // => { list: Array<string | number> }
 *
 * @example
 * // Values that are not plain objects use the second value's type.
 * type Result = Merge<{ createdAt: Date; label: string }, { createdAt: string; label: 'a' | 'b' }>;
 * // => { createdAt: string; label: 'a' | 'b' }
 *
 * @example
 * // A nullable value in the first object disappears when the second object has a value.
 * type Result = Merge<{ retry?: { count: number }; tags: string[] | null }, { retry: { count: number }; tags: string[] }>;
 * // => { retry: { count: number }; tags: string[] }
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
 * `true` when `T` is a plain object type that `merge` recurses into.
 * Primitives are excluded explicitly because an intersection like
 * `string & {}` satisfies `extends object` even though it is a string at
 * runtime.
 */
// prettier-ignore
type IsPlainRecord<T> =
  T extends Primitive ? false :
  T extends readonly unknown[] ? false :
  T extends NonMergeable ? false :
  T extends object ? true :
  false;

// prettier-ignore
type MergeDefined<T, S> =
  IsEqual<T, S> extends true ? T :
  IsAny<T> extends true ? any :
  IsAny<S> extends true ? any :
  IsUnknown<T> extends true ? S :
  [T] extends [never] ? S :
  [S] extends [never] ? T :
  MergeEach<T, S>;

// Both conditions test a naked type parameter, so every member of `S` is
// merged into every member of `T` and the results are unioned.
// prettier-ignore
type MergeEach<T, S> =
  S extends unknown ? (T extends unknown ? MergePair<T, S> : never) : never;

// `T` and `S` are single union members here, and `S` is defined because
// `Merge` handles `undefined` sources. Two plain objects merge key by key, an
// array and a plain object keep both property sets, and everything else
// (including a `null` or `undefined` target) is replaced by the source.
// prettier-ignore
type MergePair<T, S> =
  IsPlainRecord<S> extends true ? (
    IsPlainRecord<T> extends true ? CollapseInto<MergeRecords<T, S>, S> :
    T extends readonly unknown[] ? T & S :
    S
  ) :
  S extends readonly unknown[] ? (
    IsPlainRecord<T> extends true ? T & S :
    T extends readonly unknown[] ? MergeArrays<T, S> :
    S
  ) :
  S;

// Tuples are merged index by index. Any other pair of arrays becomes an array
// of both element types, because `merge` overwrites the leading indices with
// the source and keeps the target's remaining elements.
// prettier-ignore
type MergeArrays<T extends readonly unknown[], S extends readonly unknown[]> =
  T extends readonly [] ? S :
  S extends readonly [] ? T :
  T extends readonly [infer TH, ...infer TR]
    ? S extends readonly [infer SH, ...infer SR]
      ? [Merge<TH, SH>, ...MergeArrays<TR, SR>]
      : Array<T[number] | S[number]>
    : Array<T[number] | S[number]>;

// A merged object that is identical to the source becomes `S` itself, so
// that `Merge<X | string, X>` is `X` instead of a union of two structurally
// identical object types.
// prettier-ignore
type CollapseInto<R, S> =
  IsEqual<R, S> extends true ? S : R;

// prettier-ignore
type MergeRecords<T, S> = Simplify<
  Omit<T, keyof S> &
  Omit<S, keyof T> &
  { [K in keyof T & keyof S]: Merge<T[K], S[K]> }
>;
