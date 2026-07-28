/**
 * Creates a union of all value types in `T`. The value-side counterpart to `keyof`.
 *
 * @template T - The object type to read values from.
 *
 * @example
 * const STATUS = { IDLE: 'idle', ERROR: 'error' } as const;
 * type Status = ValueOf<typeof STATUS>;
 * // => 'idle' | 'error'
 */
export type ValueOf<T> = T[keyof T];
