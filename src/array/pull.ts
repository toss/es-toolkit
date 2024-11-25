/**
 * 지정된 값을 배열에서 모두 제거하고 수정된 배열을 반환합니다.
 *
 * 이 함수는 원본 배열을 변형합니다.
 *
 * @template T
 * @param {T[]} arr - 요소를 제거할 배열입니다.
 * @param {...T} values - 배열에서 제거할 값들입니다.
 * @returns {T[]} 지정된 값들이 제거된 수정된 배열입니다.
 *
 * @example
 * import { pull } from './pull';
 *
 * const numbers = [1, 2, 3, 1, 2, 3];
 * pull(numbers, 1, 3);
 * console.log(numbers); // [2, 2]
 */
export function pull<T>(arr: T[], ...values: T[]): T[] {
  const valuesSet = new Set(values);

  for (let i = arr.length - 1; i >= 0; i--) {
    if (valuesSet.has(arr[i])) {
      arr.splice(i, 1);
    }
  }

  return arr;
}
