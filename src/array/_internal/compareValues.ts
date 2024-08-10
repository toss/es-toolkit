type Order = 'asc' | 'desc';

/**
 * Compares two values and returns a number indicating their order.
 *
 * This function can handle the following cases:
 * - If types of `a` and `b` are the same
 * - If types of `a` and `b` are not the same, but can convert to numbers(result is not NaN)
 * - If types of `a` and `b` are not the same, but one of them is a string and the other is a number
 *
 * If none of the above cases are met, it returns 0.
 *
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @param {Order} order - The order direction ('asc' for ascending or 'desc' for descending).
 * @returns {number} - A number indicating the order of the two values.
 */
export function compareValues(a: any, b: any, order: Order) {
  // If type of a and b are the same or they can be converted to numbers(not NaN), compare them.
  if (a === b) {
    return 0;
  }

  if (a < b) {
    return order === 'desc' ? 1 : -1;
  }

  if (a > b) {
    return order === 'desc' ? -1 : 1;
  }

  // Type of a and b are not the same.
  // We only handle the case where a and b is string or number.
  if (typeof a === 'string' && typeof b === 'number') {
    b = b.toString();
    return compareValues(a, b, order);
  }

  if (typeof a === 'number' && typeof b === 'string') {
    a = a.toString();
    return compareValues(a, b, order);
  }

  // If a and b are not comparable, return 0
  return 0;
}
