/**
 * Creates a union of the keys of `T` as they are returned by `Object.keys`:
 * numeric keys are converted to strings and symbol keys are excluded. The key-side
 * counterpart to `ValueOf`.
 *
 * @template T - The object type to read keys from.
 *
 * @example
 * type Keys = ObjectKeys<{ a: number; 1: string }>;
 * // => 'a' | '1'
 *
 * const obj = { a: 1, b: 2 };
 * const keys = Object.keys(obj) as Array<ObjectKeys<typeof obj>>;
 * // => Array<'a' | 'b'>
 */
export type ObjectKeys<T> = `${Exclude<keyof T, symbol>}`;
