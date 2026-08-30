import { serializeString } from './serializeString.ts';

/**
 * Serializes a symbol into a string using its description.
 *
 * The description is quoted like any other string, so a symbol without a
 * description (`Symbol()`) is distinguishable from one with an empty
 * description (`Symbol('')`). Note that two different symbols with the same
 * description still serialize to the same string, since a symbol's identity
 * cannot be captured in a string.
 *
 * @param value - The symbol to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeSymbol(Symbol('test')); // "Symbol('test')"
 * serializeSymbol(Symbol()); // "Symbol()"
 */
export function serializeSymbol(value: symbol): string {
  return value.description === undefined ? 'Symbol()' : `Symbol(${serializeString(value.description)})`;
}
