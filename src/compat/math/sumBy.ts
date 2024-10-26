export function sumBy<T>(array: ArrayLike<T> | null | undefined, iteratee?: (value: T) => number): number {
  if (!array || !array.length) {
    return 0;
  }

  let result: any = iteratee ? iteratee(array[0]) : array[0];

  for (let i = 1; i < array.length; i++) {
    const current = iteratee ? iteratee(array[i]) : array[i];

    if (current !== undefined) {
      result += current;
    }
  }

  return result;
}
