/**
 * @name chunk
 * Separate an array into smaller arrays of length `size`.
 * If the array cannot be separated in equal size, the final sub-array will have the remaining elements.
 * @param arr The array to chunk
 * @param size The size of smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error(`Size must be an integer greater than zero.`)
  }
  
  const result: T[][] = [];
  
  for (const [index, item] of arr.entries()) {
    if (index % size === 0) {
      result.push([]);
    }

    result[result.length - 1].push(item);
  }

  return result;
}