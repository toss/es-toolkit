const MAX_PROTOTYPE_DEPTH = 1000;

/**
 * Checks whether the tag reported by `Object.prototype.toString` for `value` comes from a
 * user-settable `Symbol.toStringTag` property rather than from what `value` actually is.
 *
 * `Object.prototype.toString` reads `Symbol.toStringTag`, so any value can report a tag that
 * does not describe it. Built-in branded objects such as `URL`, `Promise`, and `Intl.NumberFormat`
 * define that property as non-writable, which is what separates them from an ordinary object
 * that was simply given a name.
 *
 * ```text
 *              Symbol.toStringTag descriptor, nearest first
 *                                |
 *              missing ──────────┼────────── accessor ──► false
 *                 |              |            (a getter is not a value the
 *              false          data             owner can be said to have set)
 *                                |
 *                    writable === false ──► false
 *                                |            (branded built-in)
 *                    writable === true
 *                                |
 *                 toString() === `[object ${tag}]` ──► the tag is fully
 *                                                     explained by this property
 * ```
 *
 * @param value - The value to check.
 * @param tag - The already resolved `Object.prototype.toString.call(value)` result.
 * @returns True if the reported tag comes from a writable `Symbol.toStringTag`, otherwise false.
 *
 * @example
 * class Tagged {}
 * Tagged.prototype[Symbol.toStringTag] = 'Tagged';
 *
 * hasCustomToStringTag(new Tagged(), '[object Tagged]'); // true
 * hasCustomToStringTag(new URL('https://example.com'), '[object URL]'); // false
 */
export function hasCustomToStringTag(value: object, tag: string): boolean {
  let owner: object | null = value;
  // A Proxy may report a cyclic prototype chain. Real chains are a few links long, so a depth
  // limit ends the walk without allocating a set of visited objects on every call.
  let depth = 0;

  try {
    while (owner !== null) {
      if (++depth > MAX_PROTOTYPE_DEPTH) {
        return false;
      }

      const descriptor = Object.getOwnPropertyDescriptor(owner, Symbol.toStringTag);

      if (descriptor !== undefined) {
        if (!('value' in descriptor) || !descriptor.writable) {
          return false;
        }

        const descriptorValue: unknown = descriptor.value;

        return typeof descriptorValue === 'string' && tag === `[object ${descriptorValue}]`;
      }

      owner = Object.getPrototypeOf(owner);
    }
  } catch {
    // A Proxy trap may throw on a descriptor or prototype lookup.
    return false;
  }

  return false;
}
