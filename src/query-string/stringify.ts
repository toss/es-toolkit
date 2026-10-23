type QueryValue = string | number | boolean | bigint | null | undefined;

/**
 * Converts a flat object into a URL search string, such as `?a=1&b=2`.
 *
 * - `null` and `undefined` values are omitted, including inside arrays.
 * - Arrays are serialized as repeated keys, such as `a=1&a=2`.
 * - Other values are converted with `String()`.
 * - Keys and values are encoded with `encodeURIComponent`, so spaces become `%20` and `+` becomes `%2B`.
 *
 * @template T - The type of the object to serialize.
 * @param query - The object to serialize.
 * @returns The search string starting with `?`, or an empty string when there is nothing to serialize.
 * @throws {URIError} Throws when a key or value contains an unpaired surrogate.
 *
 * @example
 * stringify({ page: 1, tags: ['a', 'b'], q: 'hello world', ref: undefined });
 * // => '?page=1&tags=a&tags=b&q=hello%20world'
 *
 * stringify({ ref: undefined });
 * // => ''
 */
export function stringify<T extends object & { [K in keyof T]: QueryValue | readonly QueryValue[] }>(query: T): string {
  const parts: string[] = [];
  const keys = Object.keys(query) as Array<keyof T & string>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = query[key];
    const values: readonly QueryValue[] = Array.isArray(value) ? value : [value];

    for (let j = 0; j < values.length; j++) {
      const item = values[j];

      if (item != null) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
      }
    }
  }

  return parts.length === 0 ? '' : `?${parts.join('&')}`;
}
