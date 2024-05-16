/**
 * @name partition
 * @description
 * Creates two arrays: the first array includes items for which isInTruthy returns true, and the second array includes items for which isInTruthy returns false.
 * @param arr The array to split into two arrays
 * @param isInTruthy The predicate to tell whether an item is included in the first array
 */
export function partition<T>(arr: T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const item of arr) {
    if (isInTruthy(item)) {
      truthy.push(item)
    } else {
      falsy.push(item)
    }
  }

  return [truthy, falsy];
}