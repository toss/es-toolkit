/**
 * Creates a function that iterates over elements of array and invokes iteratee for each element.
 *
 * @template T - The type of array.
 * @param {(value: T[number], index: number, arr: T) => void} iteratee - The function invoked per iteration.
 * @returns {(arr: T) => void} A function that takes an array and executes the iteratee function.
 *
 * @example
 * const numbers = [1, 2, 3];
 * const logNumber = forEach((num) => console.log(num));
 * logNumber(numbers);
 * // logs: 1, 2, 3
 */
export function forEach<T extends unknown[]>(
  iteratee: (value: T[number], index: number, arr: T) => void
): (arr: T) => void;
/**
 * Iterates over elements of array and invokes iteratee for each element.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to iterate over.
 * @param {(value: T[number], index: number, arr: T) => void} iteratee - The function invoked per iteration.
 * @returns {void}
 *
 * @example
 * const numbers = [1, 2, 3];
 * forEach(numbers, (num) => console.log(num));
 * // logs: 1, 2, 3
 */
export function forEach<T extends unknown[]>(
  arr: T,
  iteratee: (value: T[number], index: number, arr: T) => void
): void;

export function forEach<T extends unknown[]>(
  arrOrIteratee: T | ((value: T[number], index: number, arr: T) => void),
  iteratee?: (value: T[number], index: number, arr: T) => void
) {
  if (iteratee == null) {
    return (arr: T) => forEach(arr, arrOrIteratee as (value: T[number], index: number, arr: T) => void);
  }

  const arr = arrOrIteratee as T;
  for (let i = 0; i < arr.length; i++) {
    iteratee(arr[i], i, arr);
  }
}
