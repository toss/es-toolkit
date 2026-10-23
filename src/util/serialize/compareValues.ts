import { serializeValue } from './serialize.ts';

const OTHER = 4;

/**
 * Compares two values for sorting `Set` values and `Map` keys.
 *
 * Values are ordered by type first: strings, numbers, `NaN`, bigints, then
 * everything else. Within a type, strings are compared by code unit, numbers
 * and bigints numerically, and other values by the code unit order of their
 * serialized form, so the order is total and independent of insertion order.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param refs - The circular reference context shared with the surrounding serialization.
 * @returns A negative number if `a` sorts before `b`, a positive number if
 *   `a` sorts after `b`, and `0` if they are equal.
 */
export function compareValues(a: unknown, b: unknown, refs: Map<object, string>): number {
  const rankA = rankOf(a);
  const rankB = rankOf(b);

  if (rankA !== rankB) {
    return rankA - rankB;
  }

  let left = a as string | number | bigint;
  let right = b as string | number | bigint;

  if (rankA === OTHER) {
    left = serializeValue(a, refs);
    right = serializeValue(b, refs);
  }

  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}

function rankOf(value: unknown): number {
  switch (typeof value) {
    case 'string': {
      return 0;
    }
    case 'number': {
      // NaN is neither smaller nor larger than any number, so it gets a rank of its own.
      if (Number.isNaN(value)) {
        return 2;
      }

      return 1;
    }
    case 'bigint': {
      return 3;
    }
    default: {
      return OTHER;
    }
  }
}
