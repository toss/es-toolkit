/**
 * @name intersectionWith
 * @description
 * Returns the intersection of two arrays. The identity of two elements is compared with `areItemsEqual`.
 * @param firstArr The first array to get the intersection
 * @param secondArr The second array to get the intersection
 * @param mapper The function to compare the identity of two elements
 * @example
 * intersectionWith([1.2, 2.1], [1.4, 3.1], (x, y) => Math.floor(x) === Math.floor(y)) === [1.2]
 * intersectionWith([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], (x, y) => x.foo === y.foo) === [{ foo: 1 }]
 */
export function intersectionWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean) {
  return firstArr.filter(firstItem => {
    return secondArr.some(secondItem => {
      return areItemsEqual(firstItem, secondItem);
    });
  });
}