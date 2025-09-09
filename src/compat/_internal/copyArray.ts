/**
 * Copies the values of `source` to `array`.
 *
 * @template T
 * @param {ArrayLike<T>} source The array to copy values from.
 * @param {T[]} [array=[]] The array to copy values to.
 * @returns {T[]} Returns `array`.
 */
function copyArray<T>(source: ArrayLike<T>, array?: T[]): T[] {
  const length = source.length;

  if (array == null) {
    array = Array(length);
  }

  for (let i = 0; i < length; i++) {
    array[i] = source[i];
  }

  return array;
}

export default copyArray;
