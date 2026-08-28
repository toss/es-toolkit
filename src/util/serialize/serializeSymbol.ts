/**
 * Serializes a symbol into a string using its description.
 *
 * Note that two different symbols with the same description serialize
 * to the same string, since a symbol's identity cannot be captured in a string.
 *
 * @param value - The symbol to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeSymbol(Symbol('test')); // "Symbol(test)"
 * serializeSymbol(Symbol()); // "Symbol()"
 */
export function serializeSymbol(value: symbol): string {
  return String(value);
}
