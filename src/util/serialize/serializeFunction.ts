/**
 * Serializes a function into a string of the form `name:source`.
 *
 * Native functions have no meaningful source, so they are serialized as
 * `name:[native]`. For other functions, newlines and their surrounding
 * whitespace are collapsed so that formatting differences do not change
 * the output.
 *
 * @param value - The function to serialize.
 * @returns The serialized string.
 *
 * @example
 * function sum(a, b) {
 *   return a + b;
 * }
 * serializeFunction(sum); // "sum:function sum(a, b) {return a + b;}"
 * serializeFunction(Math.max); // "max:[native]"
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function serializeFunction(value: Function): string {
  const source = Function.prototype.toString.call(value);

  if (source.endsWith('[native code] }')) {
    return `${value.name}:[native]`;
  }

  return `${value.name}:${source.replace(/\s*\n\s*/g, '')}`;
}
