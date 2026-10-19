/**
 * Every primitive value in JavaScript. Anything that is not a primitive is an object.
 *
 * Writing this union by hand usually misses `bigint` or `symbol`.
 *
 * @example
 * function isPrimitive(value: unknown): value is Primitive {
 *   return value === null || (typeof value !== 'object' && typeof value !== 'function');
 * }
 */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;
