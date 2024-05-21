/**
 * Combines multiple arrays element-wise using a provided combining function. 
 * Returns an array where each element is the result of applying the combining function 
 * to the corresponding elements from the input arrays.
 */
export function zipWith<T, R>(arr1: T[], combine: (item: T) => R): R[];
export function zipWith<T, U, R>(arr1: T[], arr2: U[], combine: (item1: T, item2: U) => R): R[];
export function zipWith<T, U, V, R>(arr1: T[], arr2: U[], arr3: V[], combine: (item1: T, item2: U, item3: V) => R): R[];
export function zipWith<T, U, V, W, R>(arr1: T[], arr2: U[], arr3: V[], arr4: W[], combine: (item1: T, item2: U, item3: V, item4: W) => R): R[];
export function zipWith<T, R>(arr1: T[], ...rest: any[]): R[] {
  const arrs = [arr1, ...rest.slice(0, -1)];
  const combine = rest[rest.length - 1] as (...items: T[]) => R;

  const result: R[] = [];
  const maxIndex = Math.max(...arrs.map(arr => arr.length));

  for (let i = 0; i < maxIndex; i++) {
    const elements: T[] = arrs.map(arr => arr[i]);
    result.push(combine(...elements));
  }

  return result;
}