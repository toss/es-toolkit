/**
 * Unzips a nested array of elements.
 *
 * @param zipped - The nested array to unzip.
 * @returns A new array of unzipped elements.
 *
 * @example
 * const zipped = [['a', true, 1],['b', false, 2]];
 * const result = unzip(zipped);
 * // result will be [['a', 'b'], [true, false], [1, 2]]
 */
export function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T> {
  let maxLen = 0;

  for (let i = 0; i < zipped.length; i++) {
    if (zipped[i].length > maxLen) {
      maxLen = zipped[i].length;
    }
  }

  const result = new Array(maxLen) as Unzip<T>;

  for (let i = 0; i < maxLen; i++) {
    result[i] = new Array(zipped.length);
    for (let j = 0; j < zipped.length; j++) {
      result[i][j] = zipped[j][i];
    }
  }

  return result;
}

type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
