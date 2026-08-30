import { serializeBigInt } from './serializeBigInt.ts';
import { serializeFunction } from './serializeFunction.ts';
import { serializeNumber } from './serializeNumber.ts';
import { serializeObject } from './serializeObject.ts';
import { serializeString } from './serializeString.ts';
import { serializeSymbol } from './serializeSymbol.ts';

/**
 * Serializes any value into a stable string.
 *
 * Two values with the same structure always serialize to the same string,
 * regardless of key insertion order, so the output is suitable for hashing,
 * cache keys, and change detection. It is not designed for security purposes;
 * intentional collisions can be crafted from user input.
 *
 * Plain object keys, `Map` keys, and `Set` values are sorted, so the output
 * does not depend on insertion order. String keys are always quoted, so a
 * string key never collides with a key of another type. Circular references
 * are serialized as `#ref{n}` back-references, where `n` is the order in
 * which the object was first visited.
 *
 * Objects that cannot be serialized meaningfully, such as `Promise`, `WeakMap`,
 * or `Blob`, throw a `TypeError`.
 *
 * @param value - The value to serialize.
 * @returns The serialized string.
 * @throws {TypeError} If the value contains an object that cannot be serialized.
 *
 * @example
 * serialize({ b: 2, a: 1 }); // "{'a':1,'b':2}"
 * serialize([1, 2n, 'a', { k: 1 }]); // "[1,2n,'a',{'k':1}]"
 * serialize(new Set([3, 1, 2])); // "Set[1,2,3]"
 * serialize(new Date(0)); // "Date('1970-01-01T00:00:00.000Z')"
 *
 * const obj = {};
 * obj.self = obj;
 * serialize(obj); // "{'self':#ref0}"
 */
export function serialize(value: unknown): string {
  return serializeValue(value, new Map());
}

/**
 * Serializes a value with a shared circular reference context.
 *
 * @param value - The value to serialize.
 * @param refs - Objects that are being serialized or have been serialized,
 *   mapped to their back-reference placeholder or completed serialization.
 * @returns The serialized string.
 */
export function serializeValue(value: unknown, refs: Map<object, string>): string {
  switch (typeof value) {
    case 'string': {
      return serializeString(value);
    }
    case 'number': {
      return serializeNumber(value);
    }
    case 'bigint': {
      return serializeBigInt(value);
    }
    case 'symbol': {
      return serializeSymbol(value);
    }
    case 'function': {
      return serializeFunction(value);
    }
    case 'object': {
      return serializeObject(value, refs);
    }
    case 'boolean': {
      return String(value);
    }
    case 'undefined': {
      return 'undefined';
    }
  }
}
