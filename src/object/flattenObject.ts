/**
 * Flattens a nested object into a single-level object with the paths as keys.
 *
 * This function takes a nested object and returns a new object with only one level of depth,
 * where each key is a string representing the path to the original nested value, joined by a specified separator.
 * It recursively explores the nested objects and constructs the keys for the flattened object accordingly.
 *
 * @param {object} obj - The input object to be flattened.
 * @param {string} separator - The separator used to join nested keys.
 * @returns {object} - A new, flattened object.
 *
 * @example
 * const obj = {
 *     "name": "test",
 *     "company": {
 *         "name": "Company A",
 *         "address": {
 *             "city": "Ohio",
 *             "country": "USA"
 *         }
 *     }
 * };
 * const separator = '.';
 * console.log(flatten(obj, separator));
 * // Output:
 * // {
 * //     "name": "test",
 * //     "company.name": "Company A",
 * //     "company.address.city": "Ohio",
 * //     "company.address.country": "USA",
 * // }
 */

export function flattenObject<K extends Record<string, unknown>>(obj: K, separator = '.'): Record<string, unknown> {
  if (!(obj && typeof obj === 'object')) {
    return {};
  }
  const result: Record<string, unknown> = {};
  recurse(obj, '', separator, result);
  return result;
}

function recurse(subObj: Record<string, unknown>, currentKey: string, sep: string, res: Record<string, unknown>): void {
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(subObj).forEach(([key, value]) => {
    const newKey = currentKey ? `${currentKey}${sep}${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      recurse(value as Record<string, unknown>, newKey, sep, res);
    } else {
      res[newKey] = value;
    }
  });
}