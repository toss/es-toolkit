import { serializeValue } from './serialize.ts';

/**
 * Compares two values for sorting `Set` values and `Map` keys.
 *
 * Values are first grouped by type: strings, then numbers, then bigints, then
 * everything else. Strings are compared by code unit, numbers and bigints
 * numerically with `NaN` after every other number, and any other values by the
 * code unit order of their serialized form. Comparing by type first keeps the
 * order total, so the result does not depend on the insertion order.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param refs - The circular reference context shared with the surrounding serialization.
 * @returns A negative number if `a` sorts before `b`, a positive number if
 *   `a` sorts after `b`, and `0` if they are equal.
 */
export function compareValues(a: unknown, b: unknown, refs: Map<object, string>): number {
  const rankA = typeRank(a);
  const rankB = typeRank(b);

  if (rankA !== rankB) {
    return rankA - rankB;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return compareStrings(a, b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return compareNumbers(a, b);
  }

  if (typeof a === 'bigint' && typeof b === 'bigint') {
    return compareBigInts(a, b);
  }

  return compareStrings(serializeValue(a, refs), serializeValue(b, refs));
}

function typeRank(value: unknown): number {
  switch (typeof value) {
    case 'string': {
      return 0;
    }
    case 'number': {
      return 1;
    }
    case 'bigint': {
      return 2;
    }
    default: {
      return 3;
    }
  }
}

function compareStrings(a: string, b: string): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function compareNumbers(a: number, b: number): number {
  if (Number.isNaN(a)) {
    if (Number.isNaN(b)) {
      return 0;
    }

    return 1;
  }

  if (Number.isNaN(b)) {
    return -1;
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function compareBigInts(a: bigint, b: bigint): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}
