/**
 * Creates a union of all value types in `T`.
 *
 * The value-side counterpart to `keyof`: `keyof T` gives the keys, `ValueOf<T>`
 * gives the values. Handy for deriving a union from a `const` object.
 *
 * @template T - The object type to read values from.
 *
 * @example
 * const STATUS = { IDLE: 'idle', ERROR: 'error' } as const;
 * type Status = ValueOf<typeof STATUS>;
 * // => 'idle' | 'error'
 */
export type ValueOf<T> = T[keyof T];
