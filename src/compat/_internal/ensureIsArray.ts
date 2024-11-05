export function ensureIsArray<T>(value: ArrayLike<T>): T[] {
  return Array.isArray(value) ? value : Array.from(value);
}
