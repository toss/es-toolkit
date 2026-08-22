/**
 * Any value that `JSON.parse` can produce.
 *
 * Functions, `Date`, `undefined`, and class instances are excluded, because they
 * do not survive a JSON round trip.
 *
 * @example
 * declare function parse(text: string): JsonValue;
 *
 * const value = parse('{"a":[1,null]}');
 * if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
 *   const a = value.a; // JsonValue
 * }
 *
 * @example
 * // Use `Record` when you want to accept a JSON object specifically.
 * declare function send(body: Record<string, JsonValue>): void;
 */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
