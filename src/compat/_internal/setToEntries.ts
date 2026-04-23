export function setToEntries<T>(set: Set<T>): [T, T][] {
  const arr = new Array<[T, T]>(set.size);
  const values = set.values();

  for (let i = 0; i < arr.length; i++) {
    const value = values.next().value as T;
    arr[i] = [value, value];
  }

  return arr;
}
