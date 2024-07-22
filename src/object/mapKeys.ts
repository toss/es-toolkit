export function mapKeys<T, K extends keyof T, N extends string | number | symbol>(
  object: T,
  iteratee: (iterateData: { object: T; key: K; value: T[K] }) => N
) {
  const result = {} as Record<N, T[K]>;

  for (const key in object) {
    const value = object[key];
    result[iteratee({ value, key, object } as any) as N] = value as any;
  }
  return result;
}
