/**
 * An object with unknown keys and unknown values.
 *
 * Use it instead of `{}`, which accepts every non-nullish value including numbers
 * and strings. Values are `unknown`, so reading one forces a check first.
 *
 * Only types with an index signature are assignable. An `interface` declares its
 * keys one by one and is rejected, so accept `object` when the caller may pass
 * one, or spread it at the call site.
 *
 * @example
 * function log(data: UnknownRecord) {
 *   if (typeof data.id === 'string') {
 *     console.log(data.id);
 *   }
 * }
 *
 * log({ id: '1' }); // ok
 * log(42); // error, while `{}` would have allowed it
 */
export type UnknownRecord = Record<PropertyKey, unknown>;
