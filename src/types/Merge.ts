import type { Simplify } from './Simplify.ts';

/**
 * The result of deeply merging the source type `S` into the target type `T`,
 * matching what `merge(target, source)` returns at runtime.
 *
 * Keys present on only one side are kept as-is. When both sides have a plain
 * object at the same key, the merge recurses; tuples merge index by index, and
 * other arrays merge into an array of both element types. If the source value
 * can be `undefined`, the target type is kept because `merge` skips
 * `undefined` source values. Values that are not plain objects or arrays
 * (functions, `Date`, `RegExp`, `Map`, `Set`, etc.) are not merged into;
 * the source value replaces the target value. When an array meets a plain
 * object, `merge` keeps the target and assigns the source's properties onto
 * it, so both property sets are kept (`T & S`).
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * type Target = { a: number; b: { x: number; y: number } };
 * type Source = { b: { y: string; z: boolean }; c: string };
 * type Result = Merge<Target, Source>;
 * // => { a: number; b: { x: number; y: string; z: boolean }; c: string }
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

// prettier-ignore
type MergeDefined<T, S> =
  S extends readonly unknown[] ? (
    T extends readonly unknown[] ? MergeArrays<T, S> :
    T extends NonMergeable ? S :
    T extends object ? T & S :
    S
  ) :
  S extends NonMergeable ? S :
  S extends object ? (
    T extends readonly unknown[] ? T & S :
    T extends NonMergeable ? S :
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
type MergeRecords<T extends object, S extends object> = Simplify<
  Omit<T, keyof S> &
  Omit<S, keyof T> &
  { [K in keyof T & keyof S]: Merge<T[K], S[K]> }
>;
