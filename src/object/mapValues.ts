export function mapValues<T extends Record<string | number | symbol, any>, K extends keyof T, R>(
  object: T,
  iteratee: (iterateData: { object: T; key: K; value: T[K] }) => R
) {
  const result = {} as Record<K, R>;

  for (const key in object) {
    const value = object[key];
    result[key as unknown as K] = iteratee({ value, key, object } as any);
  }

  return result;
}
