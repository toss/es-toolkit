function compareAscending(a: any, b: any): number {
  if (a === b) {
    return 0;
  }

  const aIsNullish = a == null;
  const bIsNullish = b == null;

  // Nullish values are always ordered after non-nullish ones, with `null` before `undefined`.
  if (aIsNullish || bIsNullish) {
    if (!aIsNullish) {
      return -1;
    }
    if (!bIsNullish) {
      return 1;
    }
    return a === null ? -1 : 1;
  }

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Compares two values for sorting.
 *
 * Nullish values are placed last in ascending order (and first in descending order),
 * with `null` ordered before `undefined`.
 *
 * @returns A negative number, `0`, or a positive number, as expected by `Array.prototype.sort`.
 */
export function compareValues(a: any, b: any, order: 'asc' | 'desc'): number {
  const result = compareAscending(a, b);
  return order === 'asc' ? result : -result;
}
