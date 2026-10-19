/**
 * Any value that `JSON.parse` can produce.
 *
 * Functions, `Date`, `undefined`, and class instances are excluded, because they
 * do not survive a JSON round trip.
 *
 * @example
 * declare function parse(text: string): JSONValue;
 *
 * const value = parse('{"a":[1,null]}');
 * if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
 *   const a = value.a; // JSONValue
 * }
 *
 * @example
 * // Use `Record` when you want to accept a JSON object specifically.
 * declare function send(body: Record<string, JSONValue>): void;
 */
export type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };
