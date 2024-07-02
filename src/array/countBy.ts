/**
 * Count the occurrences of each item in an array
 * based on a transformation function.
 *
 * This function takes an array and a transformation function
 * that converts each item in the array to a string. It then
 * counts the occurrences of each transformed item and returns
 * an object with the transformed items as keys and the counts
 * as values.
 *
 * @template T - The type of the items in the input array.
 *
 * @param {T[]} arr - The input array to count occurrences.
 * @param {(item: T) => string} transformer - The transformation function that converts each item
 * in the input array to a string.
 * @returns {Record<string, number>} An object containing the transformed items as keys and the
 * counts as values.
 */
export function countBy<T>(arr: T[], transformer: (item: T) => string): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = transformer(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}
