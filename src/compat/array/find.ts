export function find<T>(arr: readonly T[], doesMatch: (item: T, index: number, array: readonly T[]) => unknown) {
  return arr.find((item, index, array) => doesMatch(item, index, array));
}