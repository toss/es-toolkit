import { serializeValue } from './serialize.ts';

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
export function compareValues(a: unknown, b: unknown, refs: Map<object, string>): number {
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
