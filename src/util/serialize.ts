import { isArrayBuffer } from '../predicate/isArrayBuffer.ts';
import { isDate } from '../predicate/isDate.ts';
import { isError } from '../predicate/isError.ts';
import { isMap } from '../predicate/isMap.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';
import { isRegExp } from '../predicate/isRegExp.ts';
import { isSet } from '../predicate/isSet.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

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
function serializeValue(value: unknown, refs: Map<object, string>): string {
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

/**
 * Serializes a string into a single-quoted string literal.
 *
 * The string is not escaped; the output is intended for hashing and
 * change detection, not for parsing or re-evaluation.
 *
 * @param value - The string to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeString('abc'); // "'abc'"
 */
function serializeString(value: string): string {
  return `'${value}'`;
}

/**
 * Serializes a number into a string.
 *
 * `-0` is serialized as `0`, and `NaN` and `Infinity` are serialized
 * as their string representations.
 *
 * @param value - The number to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeNumber(1); // "1"
 * serializeNumber(-0); // "0"
 * serializeNumber(NaN); // "NaN"
 * serializeNumber(Infinity); // "Infinity"
 */
function serializeNumber(value: number): string {
  return String(value);
}

/**
 * Serializes a bigint into a string with an `n` suffix, like a bigint literal.
 *
 * @param value - The bigint to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeBigInt(123n); // "123n"
 */
function serializeBigInt(value: bigint): string {
  return `${value}n`;
}

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
function serializeSymbol(value: symbol): string {
  return value.description === undefined ? 'Symbol()' : `Symbol(${serializeString(value.description)})`;
}

/**
 * Serializes a function into a string of the form `name:source`.
 *
 * Native functions have no meaningful source, so they are serialized as
 * `name:[native]`. The whitespace inside `{ [native code] }` differs between
 * engines, so it is matched loosely to keep the output platform independent. For other functions, newlines and their surrounding
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
function serializeFunction(value: Function): string {
  const source = Function.prototype.toString.call(value);

  if (/\{\s*\[native code\]\s*\}$/.test(source)) {
    return `${value.name}:[native]`;
  }

  return `${value.name}:${source.replace(/\s*\n\s*/g, '')}`;
}

/**
 * Serializes an object, handling circular references and repeated references.
 *
 * The first time an object is visited, it is registered as `#ref{n}` where `n`
 * is the visit order; if the object is reached again while it is still being
 * serialized, the back-reference is emitted instead. Once completed, the
 * serialized string is memoized so that repeated references serialize
 * in constant time.
 *
 * @param value - The object to serialize, or `null`.
 * @param refs - The circular reference context shared across one serialization.
 * @returns The serialized string.
 * @throws {TypeError} If the object cannot be serialized.
 */
function serializeObject(value: object | null, refs: Map<object, string>): string {
  if (value === null) {
    return 'null';
  }

  const cached = refs.get(value);

  if (cached !== undefined) {
    return cached;
  }

  refs.set(value, `#ref${refs.size}`);

  const result = serializeObjectImpl(value, refs);

  refs.set(value, result);

  return result;
}

function serializeObjectImpl(value: object, refs: Map<object, string>): string {
  if (Array.isArray(value)) {
    return serializeArray(value, refs);
  }

  if (isPlainObject(value)) {
    return serializePlainObject(value, refs);
  }

  if (isDate(value)) {
    return Number.isNaN(value.getTime()) ? 'Date(null)' : `Date(${serializeString(value.toISOString())})`;
  }

  if (isRegExp(value)) {
    return `RegExp(${value.toString()})`;
  }

  if (isSet(value)) {
    const values = Array.from(value).sort((a, b) => compareValues(a, b, refs));
    return `Set${serializeArray(values, refs)}`;
  }

  if (isMap(value)) {
    return serializeEntries('Map', value.entries(), refs);
  }

  if (isTypedArray(value)) {
    const name = (value as unknown as Record<symbol, string>)[Symbol.toStringTag];

    if (name === 'BigInt64Array' || name === 'BigUint64Array') {
      return `${name}[${value.join('n,')}${value.length > 0 ? 'n' : ''}]`;
    }

    return `${name}[${value.join(',')}]`;
  }

  if (isArrayBuffer(value)) {
    return `ArrayBuffer[${new Uint8Array(value).join(',')}]`;
  }

  if (isError(value)) {
    return `Error(${value.name}: ${serializeString(value.message)})`;
  }

  const tag = Object.prototype.toString.call(value).slice(8, -1);

  if (tag === 'Object') {
    return serializeClassInstance(value, refs);
  }

  if (typeof (value as { entries?: unknown }).entries === 'function') {
    return serializeEntries(tag, (value as { entries: () => Iterable<[unknown, unknown]> }).entries(), refs);
  }

  throw new TypeError(`Cannot serialize ${tag}`);
}

function serializeArray(array: readonly unknown[], refs: Map<object, string>): string {
  let result = '[';

  for (let i = 0; i < array.length; i++) {
    if (i > 0) {
      result += ',';
    }

    result += serializeValue(array[i], refs);
  }

  return result + ']';
}

function serializeEntries(tag: string, entries: Iterable<[unknown, unknown]>, refs: Map<object, string>): string {
  const sortedEntries = Array.from(entries).sort((a, b) => compareValues(a[0], b[0], refs));

  let result = `${tag}{`;

  for (let i = 0; i < sortedEntries.length; i++) {
    const [key, value] = sortedEntries[i];

    if (i > 0) {
      result += ',';
    }

    result += `${serializeValue(key, refs)}:${serializeValue(value, refs)}`;
  }

  return result + '}';
}

function serializeClassInstance(value: object, refs: Map<object, string>): string {
  const constructor = value.constructor;
  const name = constructor === Object || constructor === undefined ? '' : constructor.name;

  if ('toJSON' in value && typeof value.toJSON === 'function') {
    const json = value.toJSON();

    if (json !== null && typeof json === 'object') {
      return name + serializeObject(json, refs);
    }

    return `${name}(${serializeValue(json, refs)})`;
  }

  return name + serializePlainObject(value, refs);
}

/**
 * Serializes the own enumerable string-keyed properties of an object
 * into a `{'key':value}` string.
 *
 * Keys are sorted by code unit so that the output does not depend on
 * property insertion order, and always quoted so that a key containing
 * `:` or `,` cannot be confused with the surrounding structure. Symbol
 * keys and non-enumerable properties are ignored.
 *
 * @param object - The object to serialize.
 * @param refs - The circular reference context shared with the surrounding serialization.
 * @returns The serialized string.
 *
 * @example
 * serializePlainObject({ b: 2, a: 1 }, new Map()); // "{'a':1,'b':2}"
 */
function serializePlainObject(object: object, refs: Map<object, string>): string {
  const keys = Object.keys(object).sort();

  let result = '{';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i > 0) {
      result += ',';
    }

    result += `${serializeString(key)}:${serializeValue((object as Record<string, unknown>)[key], refs)}`;
  }

  return result + '}';
}

/**
 * Compares two values for sorting `Set` values and `Map` keys.
 *
 * The comparison is a total order, so the sorted result does not depend on
 * the insertion order. Values are grouped by type: strings first, then
 * numbers and bigints, then everything else. Strings are compared by code
 * unit. Numbers and bigints are compared numerically with each other;
 * `NaN` sorts after every other number, and a number sorts before a bigint
 * of the same value. Every other value is compared by the code unit order
 * of its serialized string.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param refs - The circular reference context shared with the surrounding serialization.
 * @returns A negative number if `a` sorts before `b`, a positive number if
 *   `a` sorts after `b`, and `0` if they are equal.
 */
function compareValues(a: unknown, b: unknown, refs: Map<object, string>): number {
  const rankA = getTypeRank(a);
  const rankB = getTypeRank(b);

  if (rankA !== rankB) {
    return rankA - rankB;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return compareStrings(a, b);
  }

  if (rankA === NUMERIC_RANK) {
    return compareNumeric(a as number | bigint, b as number | bigint);
  }

  return compareStrings(serializeValue(a, refs), serializeValue(b, refs));
}

const STRING_RANK = 0;
const NUMERIC_RANK = 1;
const OTHER_RANK = 2;

function getTypeRank(value: unknown): number {
  switch (typeof value) {
    case 'string': {
      return STRING_RANK;
    }
    case 'number':
    case 'bigint': {
      return NUMERIC_RANK;
    }
    default: {
      return OTHER_RANK;
    }
  }
}

function compareStrings(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

function compareNumeric(a: number | bigint, b: number | bigint): number {
  const isNaNA = typeof a === 'number' && Number.isNaN(a);
  const isNaNB = typeof b === 'number' && Number.isNaN(b);

  if (isNaNA || isNaNB) {
    return Number(isNaNA) - Number(isNaNB);
  }

  // Relational operators compare numbers and bigints by their mathematical values.
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  if (typeof a === typeof b) {
    return 0;
  }

  return typeof a === 'number' ? -1 : 1;
}
