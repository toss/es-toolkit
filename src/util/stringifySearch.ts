type QueryValue = string | number | boolean | bigint | null | undefined;

/**
 * Converts a flat object into a URL search string, such as `?a=1&b=2`.
 *
 * - `null` and `undefined` values are omitted, including inside arrays.
 * - Arrays are serialized as repeated keys, such as `a=1&a=2`. Empty arrays are omitted.
 * - Other values are converted with `String()`.
 * - Keys and values are encoded with `encodeURIComponent`, so spaces become `%20` and `+` becomes `%2B`.
 *
 * When there is nothing to serialize, it returns an empty string, the same rule as `URL.prototype.search`.
 * Nested objects are not supported.
 *
 * @template T - The type of the object to serialize.
 * @param {T} query - The object to serialize.
 * @returns {string} The search string starting with `?`, or an empty string.
 * @throws {URIError} Throws when a key or value contains an unpaired surrogate.
 *
 * @example
 * stringifySearch({ page: 1, tags: ['a', 'b'], q: 'hello world', ref: undefined });
 * // => '?page=1&tags=a&tags=b&q=hello%20world'
 *
 * @example
 * `/items${stringifySearch({ ref: undefined })}`;
 * // => '/items'
 */
export function stringifySearch<T extends object & { [K in keyof T]: QueryValue | readonly QueryValue[] }>(
  query: T
): string {
  let search = '';
  const keys = Object.keys(query) as Array<keyof T & string>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value: QueryValue | readonly QueryValue[] = query[key];
    const values: readonly QueryValue[] = Array.isArray(value) ? value : [value as QueryValue];

    for (let j = 0; j < values.length; j++) {
      const item = values[j];

      if (item == null) {
        continue;
      }

      search += `${search === '' ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`;
    }
  }

  return search;
}
