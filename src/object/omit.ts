/**
 * @name omit
 * Omit properties from an object.
 * @param obj The object to omit properties from
 * @param keys The keys to omit from an object
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>
}