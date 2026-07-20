/**
 * Produces a stable hexadecimal hash for an arbitrary value (object, array, or
 * primitive). Structurally-equal values hash the same regardless of object-key
 * order, so it can be used as a value-based key for caching/memoization. See
 * issue #773.
 *
 * The hash is a pure-JS (isomorphic) 32-bit djb2 of a deterministic
 * serialization. Throws on circular references.
 *
 * @param value - The value to hash.
 * @returns An 8-character lowercase hex hash.
 *
 * @example
 * hashObject({ a: 1, b: 2 }) // '6e6c2a27'
 * hashObject({ a: 1, b: 2 }) === hashObject({ b: 2, a: 1 }) // true (key-order independent)
 *
 * @group object
 */
export function hashObject(value: unknown): string {
  return djb2(stableSerialize(value, new WeakSet<object>()));
}

function stableSerialize(value: unknown, seen: WeakSet<object>): string {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undef';
  }
  const type = typeof value;
  if (type === 'number' || type === 'boolean' || type === 'bigint') {
    return `${type}:${value}`;
  }
  if (type === 'string') {
    return `str:"${value}"`;
  }
  if (type === 'symbol') {
    return `sym:${(value as symbol).description ?? String(value)}`;
  }
  if (type === 'function') {
    return `fn:${(value as { name?: string }).name ?? 'anon'}`;
  }
  if (type !== 'object') {
    return String(value);
  }

  const obj = value as object;
  if (seen.has(obj)) {
    throw new Error('Cannot hash circular structure');
  }
  seen.add(obj);

  if (Array.isArray(obj)) {
    return `[${obj.map(item => stableSerialize(item, seen)).join(',')}]`;
  }
  if (obj instanceof Date) {
    return `date:${obj.getTime()}`;
  }
  if (obj instanceof RegExp) {
    return `re:${obj.source}/${obj.flags}`;
  }
  if (obj instanceof Map) {
    return `map:[${[...obj].map(([k, v]) => `${stableSerialize(k, seen)}:${stableSerialize(v, seen)}`).join(',')}]`;
  }
  if (obj instanceof Set) {
    return `set:[${[...obj].map(item => stableSerialize(item, seen)).join(',')}]`;
  }

  const keys = Reflect.ownKeys(obj)
    .map(key => String(key))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${keys.map(k => `prop:${k}=${stableSerialize((obj as Record<string, unknown>)[k], seen)}`).join(',')}}`;
}

function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (((hash << 5) + hash) ^ str.charCodeAt(i)) >>> 0;
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
