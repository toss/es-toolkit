/**
 * Sorts an array in ascending order.
 *
 * @template T - The type of array.
 * @param {(a: T[number], b: T[number]) => number} comparator - The function to compare elements.
 * @returns {(arr: T) => T} A function that takes an array and returns a new sorted array.
 *
 * @example
 * const arr = [3, 1, 4, 1, 5];
 * const sortNumbers = sort((a, b) => a - b);
 * const result = sortNumbers(arr);
 * // result will be [1, 1, 3, 4, 5]
 */
export function sort<T extends unknown[]>(comparator: (a: T[number], b: T[number]) => number): (arr: T) => T;
/**
 * Sorts an array in ascending order.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to sort.
 * @param {(a: T[number], b: T[number]) => number} comparator - The function to compare elements.
 * @returns {T} A new sorted array.
 *
 * @example
 * const arr = [3, 1, 4, 1, 5];
 * const result = sort(arr, (a, b) => a - b);
 * // result will be [1, 1, 3, 4, 5]
 */
export function sort<T extends unknown[]>(arr: T, comparator: (a: T[number], b: T[number]) => number): T;

export function sort<T extends unknown[]>(
  arrOrComparator: T | ((a: T[number], b: T[number]) => number),
  comparator?: (a: T[number], b: T[number]) => number
) {
  if (typeof arrOrComparator === 'function') {
    return (arr: T) => sort(arr, arrOrComparator as (a: T[number], b: T[number]) => number);
  }

  const arr = [...(arrOrComparator as T)];

  // Quick sort implementation
  const quickSort = (low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(low, high);
      quickSort(low, pivotIndex - 1);
      quickSort(pivotIndex + 1, high);
    }
  };

  const partition = (low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (comparator!(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  quickSort(0, arr.length - 1);
  return arr;
}
