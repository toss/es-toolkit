/**
 * @name pick
 * Pick properties from an given object.
 * @param obj The object to pick properties from
 * @param keys The keys to pick from an object
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}