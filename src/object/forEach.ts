export function forEach<T extends object>(
  object: T | null | undefined,
  callback: (value: T[keyof T], key: keyof T, object: T) => unknown
): T | null | undefined {
  if (!object) {
    return object;
  }

  const keys = Object.keys(object) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    callback(value, key, object);
  }

  return object;
}
